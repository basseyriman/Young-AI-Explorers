-- One-time: delete a test account so you can register again with the same email
-- Run in Supabase SQL Editor. Replace the email below if needed.
-- Run 010_user_delete_cascade_fix.sql first if Auth dashboard delete still fails.

DO $$
DECLARE
  uid UUID;
  user_email TEXT := 'basseyriman@gmail.com';
BEGIN
  SELECT id INTO uid FROM auth.users WHERE email = user_email;

  IF uid IS NULL THEN
    RAISE NOTICE 'No auth user found for %', user_email;
    RETURN;
  END IF;

  RAISE NOTICE 'Deleting user % (%)', user_email, uid;

  UPDATE curriculum_settings SET managed_by = NULL WHERE managed_by = uid;
  DELETE FROM match_quiz_sessions WHERE player_a = uid OR player_b = uid;
  DELETE FROM match_quiz_queue WHERE user_id = uid;
  DELETE FROM family_links WHERE parent_id = uid OR child_id = uid;
  DELETE FROM custom_topics WHERE user_id = uid;
  DELETE FROM community_ideas WHERE user_id = uid;
  DELETE FROM user_badges WHERE user_id = uid;
  DELETE FROM user_progress WHERE user_id = uid;
  DELETE FROM curriculum_settings WHERE user_id = uid;
  DELETE FROM profiles WHERE id = uid;
  DELETE FROM auth.users WHERE id = uid;

  RAISE NOTICE 'Done. You can sign up again with %', user_email;
END $$;
