-- Backfill missing profiles for auth users (fixes custom_topics_user_id_fkey errors)
-- Run after 008_table_grants.sql

INSERT INTO profiles (id, email, full_name, role, country_code, nickname, sharing_level, allow_match_quiz)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', ''),
  COALESCE(u.raw_user_meta_data->>'role', 'student'),
  COALESCE(u.raw_user_meta_data->>'country_code', 'GB'),
  COALESCE(u.raw_user_meta_data->>'nickname', 'Explorer'),
  CASE WHEN COALESCE(u.raw_user_meta_data->>'role', 'student') = 'student' THEN 'private' ELSE 'region' END,
  COALESCE(u.raw_user_meta_data->>'role', 'student') <> 'student'
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

INSERT INTO curriculum_settings (user_id)
SELECT u.id
FROM auth.users u
LEFT JOIN curriculum_settings cs ON cs.user_id = u.id
WHERE cs.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;
