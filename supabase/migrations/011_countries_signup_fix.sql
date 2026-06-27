-- Ensure all countries exist for signup FK + safe profile trigger fallback
-- Run after 002_seed_countries.sql (safe to re-run)

INSERT INTO countries (code, name, flag_emoji, is_featured, sort_order) VALUES
  ('GB', 'United Kingdom', '🇬🇧', true, 1),
  ('NG', 'Nigeria', '🇳🇬', true, 2),
  ('GH', 'Ghana', '🇬🇭', true, 3),
  ('UG', 'Uganda', '🇺🇬', true, 4),
  ('TZ', 'Tanzania', '🇹🇿', true, 5),
  ('US', 'United States', '🇺🇸', true, 6),
  ('IN', 'India', '🇮🇳', true, 7),
  ('CA', 'Canada', '🇨🇦', true, 8),
  ('AU', 'Australia', '🇦🇺', true, 9),
  ('ZA', 'South Africa', '🇿🇦', true, 10),
  ('KE', 'Kenya', '🇰🇪', true, 11),
  ('IE', 'Ireland', '🇮🇪', true, 12),
  ('GLOBAL', 'Global / International', '🌍', true, 0)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name, flag_emoji = EXCLUDED.flag_emoji,
  is_featured = EXCLUDED.is_featured, sort_order = EXCLUDED.sort_order;

INSERT INTO countries (code, name, flag_emoji, is_featured, sort_order) VALUES
  ('AF','Afghanistan','🇦🇫',false,100),('AL','Albania','🇦🇱',false,100),
  ('DZ','Algeria','🇩🇿',false,100),('AR','Argentina','🇦🇷',false,100),
  ('AM','Armenia','🇦🇲',false,100),('AT','Austria','🇦🇹',false,100),
  ('AZ','Azerbaijan','🇦🇿',false,100),('BH','Bahrain','🇧🇭',false,100),
  ('BD','Bangladesh','🇧🇩',false,100),('BY','Belarus','🇧🇾',false,100),
  ('BE','Belgium','🇧🇪',false,100),('BJ','Benin','🇧🇯',false,100),
  ('BO','Bolivia','🇧🇴',false,100),('BA','Bosnia and Herzegovina','🇧🇦',false,100),
  ('BW','Botswana','🇧🇼',false,100),('BR','Brazil','🇧🇷',false,100),
  ('BN','Brunei','🇧🇳',false,100),('BG','Bulgaria','🇧🇬',false,100),
  ('BF','Burkina Faso','🇧🇫',false,100),('BI','Burundi','🇧🇮',false,100),
  ('KH','Cambodia','🇰🇭',false,100),('CM','Cameroon','🇨🇲',false,100),
  ('CV','Cape Verde','🇨🇻',false,100),('CF','Central African Republic','🇨🇫',false,100),
  ('TD','Chad','🇹🇩',false,100),('CL','Chile','🇨🇱',false,100),
  ('CN','China','🇨🇳',false,100),('CO','Colombia','🇨🇴',false,100),
  ('CG','Congo','🇨🇬',false,100),('CD','DR Congo','🇨🇩',false,100),
  ('CR','Costa Rica','🇨🇷',false,100),('CI','Côte d''Ivoire','🇨🇮',false,100),
  ('HR','Croatia','🇭🇷',false,100),('CU','Cuba','🇨🇺',false,100),
  ('CY','Cyprus','🇨🇾',false,100),('CZ','Czech Republic','🇨🇿',false,100),
  ('DK','Denmark','🇩🇰',false,100),('DJ','Djibouti','🇩🇯',false,100),
  ('DO','Dominican Republic','🇩🇴',false,100),('EC','Ecuador','🇪🇨',false,100),
  ('EG','Egypt','🇪🇬',false,100),('SV','El Salvador','🇸🇻',false,100),
  ('GQ','Equatorial Guinea','🇬🇶',false,100),('ER','Eritrea','🇪🇷',false,100),
  ('EE','Estonia','🇪🇪',false,100),('ET','Ethiopia','🇪🇹',false,100),
  ('FI','Finland','🇫🇮',false,100),('FR','France','🇫🇷',false,100),
  ('GA','Gabon','🇬🇦',false,100),('GM','Gambia','🇬🇲',false,100),
  ('GE','Georgia','🇬🇪',false,100),('DE','Germany','🇩🇪',false,100),
  ('GR','Greece','🇬🇷',false,100),('GT','Guatemala','🇬🇹',false,100),
  ('GN','Guinea','🇬🇳',false,100),('GW','Guinea-Bissau','🇬🇼',false,100),
  ('GY','Guyana','🇬🇾',false,100),('HT','Haiti','🇭🇹',false,100),
  ('HN','Honduras','🇭🇳',false,100),('HK','Hong Kong','🇭🇰',false,100),
  ('HU','Hungary','🇭🇺',false,100),('IS','Iceland','🇮🇸',false,100),
  ('ID','Indonesia','🇮🇩',false,100),('IR','Iran','🇮🇷',false,100),
  ('IQ','Iraq','🇮🇶',false,100),('IL','Israel','🇮🇱',false,100),
  ('IT','Italy','🇮🇹',false,100),('JM','Jamaica','🇯🇲',false,100),
  ('JP','Japan','🇯🇵',false,100),('JO','Jordan','🇯🇴',false,100),
  ('KZ','Kazakhstan','🇰🇿',false,100),('KW','Kuwait','🇰🇼',false,100),
  ('LA','Laos','🇱🇦',false,100),('LV','Latvia','🇱🇻',false,100),
  ('LB','Lebanon','🇱🇧',false,100),('LS','Lesotho','🇱🇸',false,100),
  ('LR','Liberia','🇱🇷',false,100),('LY','Libya','🇱🇾',false,100),
  ('LT','Lithuania','🇱🇹',false,100),('LU','Luxembourg','🇱🇺',false,100),
  ('MG','Madagascar','🇲🇬',false,100),('MW','Malawi','🇲🇼',false,100),
  ('MY','Malaysia','🇲🇾',false,100),('MV','Maldives','🇲🇻',false,100),
  ('ML','Mali','🇲🇱',false,100),('MT','Malta','🇲🇹',false,100),
  ('MR','Mauritania','🇲🇷',false,100),('MU','Mauritius','🇲🇺',false,100),
  ('MX','Mexico','🇲🇽',false,100),('MD','Moldova','🇲🇩',false,100),
  ('MN','Mongolia','🇲🇳',false,100),('ME','Montenegro','🇲🇪',false,100),
  ('MA','Morocco','🇲🇦',false,100),('MZ','Mozambique','🇲🇿',false,100),
  ('MM','Myanmar','🇲🇲',false,100),('NA','Namibia','🇳🇦',false,100),
  ('NP','Nepal','🇳🇵',false,100),('NL','Netherlands','🇳🇱',false,100),
  ('NZ','New Zealand','🇳🇿',false,100),('NI','Nicaragua','🇳🇮',false,100),
  ('NE','Niger','🇳🇪',false,100),('NO','Norway','🇳🇴',false,100),
  ('OM','Oman','🇴🇲',false,100),('PK','Pakistan','🇵🇰',false,100),
  ('PS','Palestine','🇵🇸',false,100),('PA','Panama','🇵🇦',false,100),
  ('PG','Papua New Guinea','🇵🇬',false,100),('PY','Paraguay','🇵🇾',false,100),
  ('PE','Peru','🇵🇪',false,100),('PH','Philippines','🇵🇭',false,100),
  ('PL','Poland','🇵🇱',false,100),('PT','Portugal','🇵🇹',false,100),
  ('QA','Qatar','🇶🇦',false,100),('RO','Romania','🇷🇴',false,100),
  ('RU','Russia','🇷🇺',false,100),('RW','Rwanda','🇷🇼',false,100),
  ('SA','Saudi Arabia','🇸🇦',false,100),('SN','Senegal','🇸🇳',false,100),
  ('RS','Serbia','🇷🇸',false,100),('SL','Sierra Leone','🇸🇱',false,100),
  ('SG','Singapore','🇸🇬',false,100),('SK','Slovakia','🇸🇰',false,100),
  ('SI','Slovenia','🇸🇮',false,100),('SO','Somalia','🇸🇴',false,100),
  ('KR','South Korea','🇰🇷',false,100),('SS','South Sudan','🇸🇸',false,100),
  ('ES','Spain','🇪🇸',false,100),('LK','Sri Lanka','🇱🇰',false,100),
  ('SD','Sudan','🇸🇩',false,100),('SR','Suriname','🇸🇷',false,100),
  ('SE','Sweden','🇸🇪',false,100),('CH','Switzerland','🇨🇭',false,100),
  ('SY','Syria','🇸🇾',false,100),('TW','Taiwan','🇹🇼',false,100),
  ('TJ','Tajikistan','🇹🇯',false,100),('TH','Thailand','🇹🇭',false,100),
  ('TG','Togo','🇹🇬',false,100),('TT','Trinidad and Tobago','🇹🇹',false,100),
  ('TN','Tunisia','🇹🇳',false,100),('TR','Turkey','🇹🇷',false,100),
  ('TM','Turkmenistan','🇹🇲',false,100),('AE','United Arab Emirates','🇦🇪',false,100),
  ('UY','Uruguay','🇺🇾',false,100),('UZ','Uzbekistan','🇺🇿',false,100),
  ('VE','Venezuela','🇻🇪',false,100),('VN','Vietnam','🇻🇳',false,100),
  ('YE','Yemen','🇾🇪',false,100),('ZM','Zambia','🇿🇲',false,100),
  ('ZW','Zimbabwe','🇿🇼',false,100)
ON CONFLICT (code) DO NOTHING;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_country TEXT;
BEGIN
  v_country := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'country_code'), ''), 'GB');
  IF NOT EXISTS (SELECT 1 FROM countries WHERE code = v_country) THEN
    v_country := 'GB';
  END IF;

  INSERT INTO profiles (id, full_name, role, country_code, nickname, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    v_country,
    COALESCE(NEW.raw_user_meta_data->>'nickname', 'Explorer'),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    country_code = EXCLUDED.country_code,
    email = EXCLUDED.email,
    updated_at = NOW();

  INSERT INTO curriculum_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
