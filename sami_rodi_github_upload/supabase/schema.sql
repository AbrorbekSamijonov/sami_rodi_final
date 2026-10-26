create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  customer_type text,
  interest text,
  system_size_kw numeric,
  message text,
  consent boolean not null default false,
  source text default 'website'
);

-- RLS on with no policies: anon/authenticated clients can do nothing.
-- The service role key (server-side only) bypasses RLS and performs inserts.
alter table leads enable row level security;
