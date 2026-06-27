-- School inquiry forms (demo, workshop, pilot requests)
CREATE TABLE IF NOT EXISTS school_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('demo', 'workshop', 'pilot')),
  school_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  country_code TEXT DEFAULT 'GB',
  message TEXT,
  preferred_date TEXT,
  student_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE school_inquiries ENABLE ROW LEVEL SECURITY;

-- Required: anon/authenticated must have INSERT grant (RLS alone is not enough)
GRANT INSERT ON TABLE public.school_inquiries TO anon, authenticated;

-- Anyone can submit; only service role reads (admin dashboard future)
DROP POLICY IF EXISTS "Anyone can submit school inquiry" ON public.school_inquiries;
CREATE POLICY "Anyone can submit school inquiry"
  ON public.school_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
