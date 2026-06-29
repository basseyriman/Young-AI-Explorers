-- Create school_pilots table
CREATE TABLE IF NOT EXISTS school_pilots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('requested', 'active', 'ended')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classrooms managed by teachers
CREATE TABLE IF NOT EXISTS classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  class_code TEXT UNIQUE NOT NULL,
  school_pilot_id UUID REFERENCES school_pilots(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link students to classrooms
CREATE TABLE IF NOT EXISTS classroom_students (
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (classroom_id, student_id)
);

-- Upgrade profiles to support school link
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS school_pilot_id UUID REFERENCES school_pilots(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE school_pilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_students ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT ALL ON TABLE public.school_pilots TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.classrooms TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.classroom_students TO anon, authenticated, service_role;

-- Policies for school_pilots
DROP POLICY IF EXISTS "Everyone can read active school pilots" ON public.school_pilots;
CREATE POLICY "Everyone can read active school pilots" ON public.school_pilots
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Admin can manage school pilots" ON public.school_pilots;
CREATE POLICY "Admin can manage school pilots" ON public.school_pilots
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policies for classrooms
DROP POLICY IF EXISTS "Teachers can manage their own classrooms" ON public.classrooms;
CREATE POLICY "Teachers can manage their own classrooms" ON public.classrooms
  FOR ALL TO authenticated USING (
    teacher_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Students can view classrooms" ON public.classrooms;
CREATE POLICY "Students can view classrooms" ON public.classrooms
  FOR SELECT TO authenticated USING (true);

-- Policies for classroom_students
DROP POLICY IF EXISTS "Teachers can manage their classroom students" ON public.classroom_students;
CREATE POLICY "Teachers can manage their classroom students" ON public.classroom_students
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.classrooms WHERE id = classroom_students.classroom_id AND teacher_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Students can join or view their own classroom links" ON public.classroom_students;
CREATE POLICY "Students can join or view their own classroom links" ON public.classroom_students
  FOR ALL TO authenticated USING (
    student_id = auth.uid()
  );

-- Policies to allow teachers to select student profiles, progress, and badges
DROP POLICY IF EXISTS "profiles_read_teacher" ON public.profiles;
CREATE POLICY "profiles_read_teacher" ON public.profiles
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.classroom_students cs
      JOIN public.classrooms c ON cs.classroom_id = c.id
      WHERE cs.student_id = profiles.id AND c.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "teachers_read_student_progress" ON public.user_progress;
CREATE POLICY "teachers_read_student_progress" ON public.user_progress
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.classroom_students cs
      JOIN public.classrooms c ON cs.classroom_id = c.id
      WHERE cs.student_id = user_progress.user_id AND c.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "teachers_read_student_badges" ON public.user_badges;
CREATE POLICY "teachers_read_student_badges" ON public.user_badges
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.classroom_students cs
      JOIN public.classrooms c ON cs.classroom_id = c.id
      WHERE cs.student_id = user_badges.user_id AND c.teacher_id = auth.uid()
    )
  );
