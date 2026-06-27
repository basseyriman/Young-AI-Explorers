-- Never let email sync trigger block auth signup
CREATE OR REPLACE FUNCTION sync_profile_email_from_auth()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    UPDATE public.profiles
    SET email = NEW.email, updated_at = NOW()
    WHERE id = NEW.id;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'sync_profile_email_from_auth failed for %: %', NEW.id, SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
