-- Run this ONCE if 001 failed (missing country_code, countries table, etc.)
-- Creates all required tables, fixes old profiles, then views + triggers + RLS

-- ─── Core tables (from 001 — safe to re-run) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS countries (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag_emoji TEXT NOT NULL DEFAULT '🌍',
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 999
);

INSERT INTO countries (code, name, flag_emoji, is_featured, sort_order)
VALUES ('GB', 'United Kingdom', '🇬🇧', true, 1)
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'parent', 'teacher', 'admin')) DEFAULT 'student',
  full_name TEXT,
  nickname TEXT,
  avatar_url TEXT,
  country_code TEXT DEFAULT 'GB',
  sharing_level TEXT DEFAULT 'region' CHECK (sharing_level IN ('private', 'region', 'global')),
  allow_match_quiz BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_settings (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  disabled_topic_ids JSONB DEFAULT '[]'::jsonb,
  allow_match_quiz BOOLEAN DEFAULT true,
  sharing_level TEXT DEFAULT 'region' CHECK (sharing_level IN ('private', 'region', 'global')),
  managed_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_by TEXT CHECK (created_by IN ('parent', 'vision_vee', 'student')) DEFAULT 'parent',
  world_id TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS family_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'completed',
  quiz_score INT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  awarded_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS community_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  country_code TEXT REFERENCES countries(code) NOT NULL,
  topic_title TEXT NOT NULL,
  idea_text TEXT NOT NULL,
  nickname TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topic_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT REFERENCES countries(code) NOT NULL,
  topic_id TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  activity_count INT DEFAULT 1,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(country_code, topic_id)
);

CREATE TABLE IF NOT EXISTS match_quiz_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  country_code TEXT REFERENCES countries(code) NOT NULL,
  nickname TEXT NOT NULL,
  topic_id TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_a UUID REFERENCES profiles(id) NOT NULL,
  player_b UUID REFERENCES profiles(id) NOT NULL,
  country_code TEXT REFERENCES countries(code) NOT NULL,
  topic_id TEXT NOT NULL,
  player_a_score INT DEFAULT 0,
  player_b_score INT DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'completed')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ─── Upgrade old profiles table ───────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nickname TEXT DEFAULT 'Explorer';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'GB';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sharing_level TEXT DEFAULT 'region';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS allow_match_quiz BOOLEAN DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE profiles SET country_code = 'GB' WHERE country_code IS NULL;
UPDATE profiles SET nickname = COALESCE(nickname, split_part(full_name, ' ', 1), 'Explorer') WHERE nickname IS NULL;
UPDATE profiles SET role = 'student' WHERE role IS NULL;

-- ─── Views (from 001) ───────────────────────────────────────────────────────
CREATE OR REPLACE VIEW country_explorer_counts AS
SELECT
  c.code,
  c.name,
  c.flag_emoji,
  c.is_featured,
  COUNT(p.id)::int AS explorer_count
FROM countries c
LEFT JOIN profiles p ON p.country_code = c.code AND p.role = 'student'
GROUP BY c.code, c.name, c.flag_emoji, c.is_featured, c.sort_order
ORDER BY c.is_featured DESC, c.sort_order ASC, c.name ASC;

CREATE OR REPLACE VIEW country_trending_topics AS
SELECT
  ta.country_code,
  ta.topic_id,
  ta.topic_title,
  ta.activity_count AS explorers,
  (
    SELECT ci.idea_text FROM community_ideas ci
    WHERE ci.country_code = ta.country_code AND ci.topic_title = ta.topic_title
    AND ci.is_public = true
    ORDER BY ci.created_at DESC LIMIT 1
  ) AS sample_idea
FROM topic_activity ta
ORDER BY ta.activity_count DESC;

-- ─── Triggers (from 001) ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role, country_code, nickname)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'country_code', 'GB'),
    COALESCE(NEW.raw_user_meta_data->>'nickname', 'Explorer')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    country_code = EXCLUDED.country_code,
    updated_at = NOW();

  INSERT INTO curriculum_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE OR REPLACE FUNCTION record_topic_activity()
RETURNS TRIGGER AS $$
DECLARE
  v_country TEXT;
  v_title TEXT;
BEGIN
  SELECT country_code INTO v_country FROM profiles WHERE id = NEW.user_id;
  SELECT title INTO v_title FROM (
    VALUES
      ('intro', 'Welcome to the Future'),
      ('1', 'Computer Vision'), ('2', 'Speech Recognition'), ('3', 'AI Translation'),
      ('4', 'AI Decision Making'), ('5', 'AI in Healthcare'), ('6', 'AI in Games'),
      ('7', 'Self-Driving Cars'), ('8', 'AI in Space Exploration'), ('9', 'Neural Networks'),
      ('10', 'AI & Planet Earth'), ('11', 'Machine Learning'), ('12', 'Natural Language Processing'),
      ('13', 'Robotics'), ('14', 'Recommendation Systems'), ('15', 'Facial Recognition'),
      ('16', 'Virtual Assistants'), ('17', 'AI in Art'), ('18', 'AI in Music'),
      ('19', 'AI in Sports'), ('20', 'AI in Agriculture'), ('21', 'Weather Prediction'),
      ('22', 'AI in Education'), ('23', 'Smart Traffic'), ('24', 'Secure Banking'),
      ('25', 'Smart Shopping'), ('26', 'Social Media AI'), ('27', 'AI Ethics'),
      ('28', 'Smart Manufacturing'), ('29', 'Cybersecurity'), ('30', 'Smart Photography'),
      ('31', 'AI in Food & Nutrition'), ('32', 'AI in Fashion'), ('33', 'AI in Movies'),
      ('34', 'Deep Learning'), ('35', 'AI Chatbots'), ('36', 'Emergency Services'),
      ('37', 'Digital Archaeology')
  ) AS t(id, title) WHERE t.id = NEW.topic_id::text;

  IF v_country IS NOT NULL AND v_title IS NOT NULL THEN
    INSERT INTO topic_activity (country_code, topic_id, topic_title, activity_count)
    VALUES (v_country, NEW.topic_id::text, v_title, 1)
    ON CONFLICT (country_code, topic_id)
    DO UPDATE SET activity_count = topic_activity.activity_count + 1, last_active = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_badge_awarded ON user_badges;
CREATE TRIGGER on_badge_awarded
  AFTER INSERT ON user_badges
  FOR EACH ROW EXECUTE FUNCTION record_topic_activity();

-- ─── RLS (from 001) ───────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_quiz_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "countries_public_read" ON countries;
DROP POLICY IF EXISTS "profiles_read_own" ON profiles;
DROP POLICY IF EXISTS "profiles_read_community" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "curriculum_own" ON curriculum_settings;
DROP POLICY IF EXISTS "custom_topics_own" ON custom_topics;
DROP POLICY IF EXISTS "family_parent" ON family_links;
DROP POLICY IF EXISTS "progress_own" ON user_progress;
DROP POLICY IF EXISTS "badges_own" ON user_badges;
DROP POLICY IF EXISTS "badges_read_public" ON user_badges;
DROP POLICY IF EXISTS "ideas_read_public" ON community_ideas;
DROP POLICY IF EXISTS "ideas_insert_own" ON community_ideas;
DROP POLICY IF EXISTS "topic_activity_read" ON topic_activity;
DROP POLICY IF EXISTS "match_queue_own" ON match_quiz_queue;
DROP POLICY IF EXISTS "match_queue_read" ON match_quiz_queue;
DROP POLICY IF EXISTS "match_sessions_players" ON match_quiz_sessions;

CREATE POLICY "countries_public_read" ON countries FOR SELECT USING (true);
CREATE POLICY "profiles_read_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_read_community" ON profiles FOR SELECT USING (
  sharing_level IN ('region', 'global') OR auth.uid() = id
);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "curriculum_own" ON curriculum_settings FOR ALL USING (auth.uid() = user_id OR auth.uid() = managed_by);
CREATE POLICY "custom_topics_own" ON custom_topics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "family_parent" ON family_links FOR ALL USING (auth.uid() = parent_id OR auth.uid() = child_id);
CREATE POLICY "progress_own" ON user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "badges_own" ON user_badges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "badges_read_public" ON user_badges FOR SELECT USING (true);
CREATE POLICY "ideas_read_public" ON community_ideas FOR SELECT USING (is_public = true);
CREATE POLICY "ideas_insert_own" ON community_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "topic_activity_read" ON topic_activity FOR SELECT USING (true);
CREATE POLICY "match_queue_own" ON match_quiz_queue FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "match_queue_read" ON match_quiz_queue FOR SELECT USING (true);
CREATE POLICY "match_sessions_players" ON match_quiz_sessions FOR ALL USING (
  auth.uid() = player_a OR auth.uid() = player_b
);
