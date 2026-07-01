-- Create a security definer function to check if a user is an admin
-- This avoids infinite recursion in RLS policies since SECURITY DEFINER functions run with the privileges of the owner (bypassing RLS)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql;

-- Recreate classrooms policy using the helper to avoid recursion
DROP POLICY IF EXISTS "Teachers can manage their own classrooms" ON public.classrooms;
CREATE POLICY "Teachers can manage their own classrooms" ON public.classrooms
  FOR ALL TO authenticated USING (
    teacher_id = auth.uid() OR
    public.is_admin(auth.uid())
  );

-- Recreate classroom_students policy using the helper to avoid recursion
DROP POLICY IF EXISTS "Teachers can manage their classroom students" ON public.classroom_students;
CREATE POLICY "Teachers can manage their classroom students" ON public.classroom_students
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.classrooms WHERE id = classroom_students.classroom_id AND teacher_id = auth.uid()) OR
    public.is_admin(auth.uid())
  );
