-- Fix FK constraints that block deleting users from Supabase Auth dashboard
-- curriculum_settings.managed_by and match_quiz_sessions players had no ON DELETE action
-- Run after 009_backfill_profiles.sql

ALTER TABLE curriculum_settings
  DROP CONSTRAINT IF EXISTS curriculum_settings_managed_by_fkey;

ALTER TABLE curriculum_settings
  ADD CONSTRAINT curriculum_settings_managed_by_fkey
  FOREIGN KEY (managed_by) REFERENCES profiles(id) ON DELETE SET NULL;

ALTER TABLE match_quiz_sessions
  DROP CONSTRAINT IF EXISTS match_quiz_sessions_player_a_fkey;

ALTER TABLE match_quiz_sessions
  DROP CONSTRAINT IF EXISTS match_quiz_sessions_player_b_fkey;

ALTER TABLE match_quiz_sessions
  ADD CONSTRAINT match_quiz_sessions_player_a_fkey
  FOREIGN KEY (player_a) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE match_quiz_sessions
  ADD CONSTRAINT match_quiz_sessions_player_b_fkey
  FOREIGN KEY (player_b) REFERENCES profiles(id) ON DELETE CASCADE;
