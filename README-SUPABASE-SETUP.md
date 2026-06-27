# Supabase Setup — Young AI Explorers

Your project is configured for:

**https://lvdygbetmlqjnhrmvwjq.supabase.co**

## One-time database setup

1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/lvdygbetmlqjnhrmvwjq/sql)
2. Run **`supabase/migrations/001_full_platform.sql`**
3. Run **`supabase/migrations/002_seed_countries.sql`**
4. Run **`supabase/migrations/003_school_inquiries.sql`** (school demo/workshop/pilot forms)
5. Run **`supabase/migrations/004_fix_school_inquiries_grants.sql`** — **required** so public forms can submit (GRANT INSERT to anon)
6. Run **`supabase/migrations/005_admin_read_school_inquiries.sql`** — so `/dashboard/admin` can list submissions
7. Run **`supabase/migrations/006_trust_layer.sql`** — parent-child linking, topic approval, COPPA fields, sharing enforcement

This creates:
- `countries` — all nations + featured list
- `profiles` — linked to auth with country, role, sharing settings
- `curriculum_settings`, `custom_topics`, `family_links`
- `user_progress`, `user_badges` — real progress (no mock data)
- `community_ideas`, `topic_activity` — live trending per country
- `match_quiz_queue`, `match_quiz_sessions` — real matchmaking
- `school_inquiries` — demo, workshop, and pilot request submissions
- Row Level Security policies
- Auto-profile trigger on signup

## Environment variables (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://lvdygbetmlqjnhrmvwjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GROQ_API_KEY=your_groq_key
```

## Vision Vee AI Assistant

Requires `GROQ_API_KEY` for `/api/chat`. Without it, the assistant shows an error message.

## Features wired to Supabase

| Feature | Table(s) |
|---------|----------|
| Registration country | `profiles.country_code`, `countries` |
| Parent curriculum | `curriculum_settings`, `custom_topics`, `family_links` |
| Trust & safety | `family_links.managed_by`, `custom_topics.is_approved`, student COPPA fields on `profiles` |
| Student progress | `user_badges`, `user_progress` |
| Community trending | `topic_activity`, `community_ideas` |
| Match Quiz | `match_quiz_queue`, `match_quiz_sessions` |
| Explorer counts | `country_explorer_counts` view |
| School inquiries | `school_inquiries` |

## Dashboard routes by role

| Role | Dashboard |
|------|-----------|
| student | `/dashboard/student` |
| parent | `/dashboard/parent` |
| teacher | `/dashboard/teacher` |
| admin | `/dashboard/admin` |

## Legal & school pages

- `/privacy`, `/terms`, `/cookies`
- `/school/curriculum` — printable curriculum guide (Save as PDF)
- `/school/demo`, `/school/workshop`, `/school/pilot` — inquiry forms

## No mock data

Community trends, explorer counts, and matchmaking all read from Supabase. Empty states appear until users register and complete lessons.
