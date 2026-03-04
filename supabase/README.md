This folder contains SQL migrations for Supabase.

How to apply:
1. Open your Supabase project dashboard.
2. Go to SQL Editor → New Query.
3. Paste the contents of `001_init.sql` and run it.

Notes:
- The `profiles` table links to `auth.users`. Create an admin user in Supabase Auth (email/password), then update `profiles` and set `is_admin = true` for that user's `id`.
- RLS (Row Level Security) is intentionally left commented; enable and configure policies according to your security model.
