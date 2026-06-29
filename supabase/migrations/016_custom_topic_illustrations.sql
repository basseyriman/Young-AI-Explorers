-- Custom topic hero illustrations (Vision Vee generated or placeholder)
-- Run after 007_vision_vee_content.sql

ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS illustration_url TEXT;
ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS illustration_prompt TEXT;

-- Public bucket for generated topic art (OpenAI → Supabase Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('topic-illustrations', 'topic-illustrations', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "topic_illustrations_public_read" ON storage.objects;
CREATE POLICY "topic_illustrations_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'topic-illustrations');

DROP POLICY IF EXISTS "topic_illustrations_service_write" ON storage.objects;
CREATE POLICY "topic_illustrations_service_write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'topic-illustrations');

DROP POLICY IF EXISTS "topic_illustrations_service_update" ON storage.objects;
CREATE POLICY "topic_illustrations_service_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'topic-illustrations');
