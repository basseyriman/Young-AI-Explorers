-- Trust layer: parent-child linking, COPPA consent, topic approval, sharing enforcement
-- Run after 001–005 in Supabase SQL Editor

-- ─── Profile trust fields ─────────────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS parent_consent_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS parent_email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS birth_year INT;

CREATE INDEX IF NOT EXISTS profiles_email_lower_idx ON profiles (LOWER(email));

-- Sync email from auth.users into profiles (enables parent→child lookup by email)
CREATE OR REPLACE FUNCTION sync_profile_email_from_auth()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET email = NEW.email, updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
CREATE TRIGGER on_auth_user_email_updated
  AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE FUNCTION sync_profile_email_from_auth();

-- Backfill emails for existing users
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

-- ─── Custom topic approval defaults ───────────────────────────────────────────
-- Parent-added topics stay approved; Vision Vee / student suggestions need approval
ALTER TABLE custom_topics ALTER COLUMN is_approved SET DEFAULT false;

UPDATE custom_topics SET is_approved = true WHERE created_by = 'parent' AND is_approved = false;

-- ─── RLS: parents manage linked children's curriculum & topics ───────────────
DROP POLICY IF EXISTS "custom_topics_own" ON custom_topics;
CREATE POLICY "custom_topics_own" ON custom_topics FOR ALL USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM family_links fl
    WHERE fl.parent_id = auth.uid() AND fl.child_id = custom_topics.user_id
  )
  OR EXISTS (
    SELECT 1 FROM curriculum_settings cs
    WHERE cs.user_id = custom_topics.user_id AND cs.managed_by = auth.uid()
  )
);

DROP POLICY IF EXISTS "curriculum_own" ON curriculum_settings;
CREATE POLICY "curriculum_own" ON curriculum_settings FOR ALL USING (
  auth.uid() = user_id OR auth.uid() = managed_by
);

DROP POLICY IF EXISTS "family_parent" ON family_links;
CREATE POLICY "family_parent" ON family_links FOR ALL USING (
  auth.uid() = parent_id OR auth.uid() = child_id
);

-- Parents may read linked children's profiles (for dashboard display)
DROP POLICY IF EXISTS "profiles_read_community" ON profiles;
CREATE POLICY "profiles_read_community" ON profiles FOR SELECT USING (
  auth.uid() = id
  OR sharing_level IN ('region', 'global')
  OR EXISTS (
    SELECT 1 FROM family_links fl
    WHERE fl.parent_id = auth.uid() AND fl.child_id = profiles.id
  )
);

-- ─── Community: respect sharing levels in trending view ────────────────────────
CREATE OR REPLACE VIEW country_trending_topics AS
SELECT
  ta.country_code,
  ta.topic_id,
  ta.topic_title,
  ta.activity_count AS explorers,
  (
    SELECT ci.idea_text FROM community_ideas ci
    INNER JOIN profiles p ON p.id = ci.user_id
    WHERE ci.country_code = ta.country_code
      AND ci.topic_title = ta.topic_title
      AND ci.is_public = true
      AND p.sharing_level IN ('region', 'global')
    ORDER BY ci.created_at DESC
    LIMIT 1
  ) AS sample_idea
FROM topic_activity ta
WHERE ta.activity_count > 0
ORDER BY ta.activity_count DESC;

-- ─── Lookup child profile by email (server-side via RLS on profiles.email) ───
CREATE OR REPLACE FUNCTION lookup_student_by_email(child_email TEXT)
RETURNS TABLE(id UUID, role TEXT, full_name TEXT, nickname TEXT, email TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.role, p.full_name, p.nickname, p.email
  FROM profiles p
  WHERE p.role = 'student' AND LOWER(p.email) = LOWER(TRIM(child_email))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION lookup_student_by_email(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION lookup_student_by_email(TEXT) TO anon;
