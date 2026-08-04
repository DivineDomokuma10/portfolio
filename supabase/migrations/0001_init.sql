create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  techs jsonb not null default '[]',
  image_url text,
  github_url text,
  live_url text,
  category text not null default 'web' check (category in ('web','mobile')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  techs jsonb not null default '[]',
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id integer primary key default 1 check (id = 1),
  about_paragraphs jsonb not null default '[]',
  contact jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create index if not exists projects_category_sort_idx on projects (category, sort_order);
