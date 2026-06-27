-- Fix: school form submissions fail with "permission denied for table school_inquiries"
-- Run this in Supabase SQL Editor after 003_school_inquiries.sql

GRANT INSERT ON TABLE public.school_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit school inquiry" ON public.school_inquiries;

CREATE POLICY "Anyone can submit school inquiry"
  ON public.school_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
