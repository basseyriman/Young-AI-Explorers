-- Vision Vee content pipeline: store generated lessons, quizzes, badges on custom topics
-- Run after 006_trust_layer.sql

ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS content_status TEXT
  DEFAULT 'pending'
  CHECK (content_status IN ('pending', 'generating', 'ready', 'failed'));

ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS lesson_content JSONB;
ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS quiz_content JSONB;
ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS badge_name TEXT;
ALTER TABLE custom_topics ADD COLUMN IF NOT EXISTS generated_at TIMESTAMPTZ;

-- Backfill: parent-created topics that were already approved can be generated on next access
UPDATE custom_topics SET content_status = 'pending' WHERE content_status IS NULL;
