-- Allow admins to read school inquiry submissions in /dashboard/admin
GRANT SELECT ON TABLE public.school_inquiries TO authenticated;

DROP POLICY IF EXISTS "Admins can read school inquiries" ON public.school_inquiries;

CREATE POLICY "Admins can read school inquiries"
  ON public.school_inquiries
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
