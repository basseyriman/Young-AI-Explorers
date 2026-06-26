-- Users and Roles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'parent', 'teacher', 'admin')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Curriculum
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  topic_number INT,
  title TEXT NOT NULL,
  introduction TEXT,
  main_lesson TEXT,
  examples JSONB,
  fun_facts JSONB,
  did_you_know JSONB,
  key_takeaways JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Progress & Gamification
CREATE TABLE user_progress (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  quiz_score INT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id INT REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS Policies (Row Level Security)
-- Note: Enable RLS on these tables in Supabase dashboard

-- Extended platform features (communities, curriculum, match quiz)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS region TEXT DEFAULT 'global';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sharing_level TEXT DEFAULT 'region' CHECK (sharing_level IN ('private', 'region', 'global'));

CREATE TABLE IF NOT EXISTS family_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

CREATE TABLE IF NOT EXISTS custom_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  created_by TEXT CHECK (created_by IN ('parent', 'vision_vee', 'student')),
  world_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_settings (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  disabled_topic_ids JSONB DEFAULT '[]'::jsonb,
  allow_match_quiz BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS explorer_regions (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  flag TEXT,
  explorer_count INT DEFAULT 0
);

INSERT INTO explorer_regions (id, label, flag, explorer_count) VALUES
  ('uk', 'United Kingdom', '🇬🇧', 1240),
  ('nigeria', 'Nigeria', '🇳🇬', 2180),
  ('ghana', 'Ghana', '🇬🇭', 890),
  ('uganda', 'Uganda', '🇺🇬', 640),
  ('tanzania', 'Tanzania', '🇹🇿', 520),
  ('global', 'Global', '🌍', 8400)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS regional_trending (
  id SERIAL PRIMARY KEY,
  region_id TEXT REFERENCES explorer_regions(id),
  topic_title TEXT NOT NULL,
  explorer_count INT DEFAULT 0,
  sample_idea TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_a UUID REFERENCES profiles(id),
  player_b UUID REFERENCES profiles(id),
  region_id TEXT REFERENCES explorer_regions(id),
  topic_id TEXT,
  player_a_score INT DEFAULT 0,
  player_b_score INT DEFAULT 0,
  status TEXT CHECK (status IN ('waiting', 'active', 'completed')) DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example policies:
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
-- CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
-- CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);
