create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  plan jsonb not null,
  created_at timestamptz default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references plans(id),
  url text not null,
  role text,
  created_at timestamptz default now()
);
