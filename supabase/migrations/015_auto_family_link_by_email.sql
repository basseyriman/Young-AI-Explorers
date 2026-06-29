-- Auto-link parent ↔ student when student.parent_email matches parent profile email
-- Run after 014_auth_email_sync_safe.sql

CREATE OR REPLACE FUNCTION sync_family_links_for_user(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_email TEXT;
  v_parent_email TEXT;
BEGIN
  SELECT role, email, parent_email
  INTO v_role, v_email, v_parent_email
  FROM profiles
  WHERE id = p_user_id;

  IF v_role IS NULL THEN
    RETURN;
  END IF;

  IF v_role = 'student' AND v_parent_email IS NOT NULL AND TRIM(v_parent_email) <> '' THEN
    INSERT INTO family_links (parent_id, child_id)
    SELECT p.id, p_user_id
    FROM profiles p
    WHERE p.role IN ('parent', 'admin')
      AND p.email IS NOT NULL
      AND LOWER(TRIM(p.email)) = LOWER(TRIM(v_parent_email))
    ON CONFLICT (parent_id, child_id) DO NOTHING;
  END IF;

  IF v_role IN ('parent', 'admin') AND v_email IS NOT NULL AND TRIM(v_email) <> '' THEN
    INSERT INTO family_links (parent_id, child_id)
    SELECT p_user_id, s.id
    FROM profiles s
    WHERE s.role = 'student'
      AND s.parent_email IS NOT NULL
      AND TRIM(s.parent_email) <> ''
      AND LOWER(TRIM(s.parent_email)) = LOWER(TRIM(v_email))
    ON CONFLICT (parent_id, child_id) DO NOTHING;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION sync_family_links_for_user(UUID) TO authenticated;

-- Backfill links for existing student/parent pairs
INSERT INTO family_links (parent_id, child_id)
SELECT p.id, s.id
FROM profiles s
INNER JOIN profiles p
  ON p.role IN ('parent', 'admin')
  AND p.email IS NOT NULL
  AND LOWER(TRIM(p.email)) = LOWER(TRIM(s.parent_email))
WHERE s.role = 'student'
  AND s.parent_email IS NOT NULL
  AND TRIM(s.parent_email) <> ''
ON CONFLICT (parent_id, child_id) DO NOTHING;

CREATE OR REPLACE FUNCTION auto_link_family_on_profile_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM sync_family_links_for_user(NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS profiles_auto_family_link ON profiles;
CREATE TRIGGER profiles_auto_family_link
  AFTER INSERT OR UPDATE OF parent_email, email, role ON profiles
  FOR EACH ROW EXECUTE FUNCTION auto_link_family_on_profile_change();
