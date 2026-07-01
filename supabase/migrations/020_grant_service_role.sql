-- Grant full permissions to service_role on all custom schema tables
-- This ensures that admin operations (like generation tasks or database seeding) do not fail with "permission denied"
GRANT ALL ON TABLE public.custom_topics TO service_role;
GRANT ALL ON TABLE public.profiles TO service_role;
GRANT ALL ON TABLE public.user_progress TO service_role;
GRANT ALL ON TABLE public.user_badges TO service_role;
GRANT ALL ON TABLE public.family_links TO service_role;
GRANT ALL ON TABLE public.curriculum_settings TO service_role;
GRANT ALL ON TABLE public.community_ideas TO service_role;
GRANT ALL ON TABLE public.topic_activity TO service_role;
GRANT ALL ON TABLE public.match_quiz_queue TO service_role;
GRANT ALL ON TABLE public.match_quiz_sessions TO service_role;
GRANT ALL ON TABLE public.countries TO service_role;
GRANT ALL ON TABLE public.school_inquiries TO service_role;
