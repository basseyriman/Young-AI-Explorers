-- Complete signup profile + curriculum fields in trigger (runs as SECURITY DEFINER, bypasses RLS)
-- Run after 011_countries_signup_fix.sql

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_country TEXT;
  v_role TEXT;
  v_sharing TEXT;
  v_match BOOLEAN;
  v_parent_email TEXT;
  v_birth_year INT;
BEGIN
  v_country := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'country_code'), ''), 'GB');
  IF NOT EXISTS (SELECT 1 FROM countries WHERE code = v_country) THEN
    v_country := 'GB';
  END IF;

  v_role := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'role'), ''), 'student');
  IF v_role NOT IN ('student', 'parent', 'teacher', 'admin') THEN
    v_role := 'student';
  END IF;

  v_sharing := CASE WHEN v_role = 'student' THEN 'private' ELSE 'region' END;
  v_match := v_role <> 'student';
  v_parent_email := NULLIF(TRIM(NEW.raw_user_meta_data->>'parent_email'), '');
  v_birth_year := NULL;
  IF v_role = 'student' AND NULLIF(TRIM(NEW.raw_user_meta_data->>'birth_year'), '') IS NOT NULL THEN
    BEGIN
      v_birth_year := (NEW.raw_user_meta_data->>'birth_year')::INT;
    EXCEPTION WHEN OTHERS THEN
      v_birth_year := NULL;
    END;
  END IF;

  INSERT INTO profiles (
    id, full_name, role, country_code, nickname, email,
    sharing_level, allow_match_quiz, parent_email, parent_consent_at, birth_year
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    v_role,
    v_country,
    COALESCE(NEW.raw_user_meta_data->>'nickname', 'Explorer'),
    NEW.email,
    v_sharing,
    v_match,
    CASE WHEN v_role = 'student' THEN v_parent_email ELSE NULL END,
    CASE WHEN v_role = 'student' AND v_parent_email IS NOT NULL THEN NOW() ELSE NULL END,
    CASE WHEN v_role = 'student' THEN v_birth_year ELSE NULL END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    country_code = EXCLUDED.country_code,
    nickname = EXCLUDED.nickname,
    email = EXCLUDED.email,
    sharing_level = EXCLUDED.sharing_level,
    allow_match_quiz = EXCLUDED.allow_match_quiz,
    parent_email = EXCLUDED.parent_email,
    parent_consent_at = EXCLUDED.parent_consent_at,
    birth_year = EXCLUDED.birth_year,
    updated_at = NOW();

  INSERT INTO curriculum_settings (user_id, sharing_level, allow_match_quiz)
  VALUES (NEW.id, v_sharing, v_match)
  ON CONFLICT (user_id) DO UPDATE SET
    sharing_level = EXCLUDED.sharing_level,
    allow_match_quiz = EXCLUDED.allow_match_quiz,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
