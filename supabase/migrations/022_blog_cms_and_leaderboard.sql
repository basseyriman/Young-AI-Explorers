-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('Education', 'Parenting', 'Safety', 'Projects')),
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  read_time TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  author_name TEXT DEFAULT 'Bassey Riman'
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT ALL ON TABLE public.blog_posts TO anon, authenticated, service_role;

-- Policies for blog_posts
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create free-resources storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('free-resources', 'free-resources', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public read access to free-resources bucket objects
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'free-resources');

-- Enable admin write access to free-resources bucket objects
DROP POLICY IF EXISTS "Admin Uploads" ON storage.objects;
CREATE POLICY "Admin Uploads" 
ON storage.objects FOR ALL 
USING (
  bucket_id = 'free-resources' AND 
  (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
);
