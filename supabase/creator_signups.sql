-- Table backing the /join creator signup form (app/api/join/route.ts).
-- Run this once in the Supabase SQL editor (or via the CLI) for the project.
-- Idempotent: safe to re-run.

create table if not exists public.creator_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  tiktok      text,
  instagram   text,
  brands      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Keep updated_at fresh on upsert (the API upserts on the email conflict).
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists creator_signups_set_updated_at on public.creator_signups;
create trigger creator_signups_set_updated_at
  before update on public.creator_signups
  for each row execute function public.set_updated_at();

-- The form writes through the service-role key (server-side, bypasses RLS).
-- Enable RLS with no public policies so the anon key cannot read the list.
alter table public.creator_signups enable row level security;
