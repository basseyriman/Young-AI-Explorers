-- Fix "permission denied for table family_links" (and related RLS subquery tables)
-- Migration 006 policies reference family_links / curriculum_settings in EXISTS subqueries;
-- authenticated role needs table-level GRANTs or those subqueries fail even for own rows.
-- Run after 007_vision_vee_content.sql

GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.family_links TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.custom_topics TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.curriculum_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_badges TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.community_ideas TO authenticated;
GRANT SELECT ON TABLE public.topic_activity TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.match_quiz_queue TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.match_quiz_sessions TO authenticated;
GRANT SELECT ON TABLE public.countries TO authenticated;
