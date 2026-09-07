-- ═══════════════════════════════════════════════════════════════
-- YatraSetu 2.0 — Database Schema
-- Run this in Supabase SQL Editor to add new tables
-- ═══════════════════════════════════════════════════════════════

-- MODULE A: Decongestion Engine
create table if not exists destination_metrics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  state text,
  category text, -- 'hill_station' | 'beach' | 'heritage' | 'spiritual' | 'nature'
  lat numeric,
  lng numeric,
  bookings_7d int default 0,
  bookings_30d int default 0,
  weather_flag text default 'clear', -- 'clear' | 'caution' | 'avoid'
  crowd_score numeric default 20, -- 0 (empty) to 100 (overloaded)
  updated_at timestamptz default now()
);

create table if not exists destination_alternatives (
  id uuid primary key default gen_random_uuid(),
  source_destination_id uuid references destination_metrics(id),
  alt_destination_id uuid references destination_metrics(id),
  similarity_reason text, -- 'same_category' | 'same_region' | 'same_theme'
  rank int default 1
);

-- MODULE B: Heritage Storyteller
create table if not exists heritage_sites (
  id uuid primary key default gen_random_uuid(),
  destination_name text,
  name text not null,
  lat numeric,
  lng numeric,
  wikipedia_slug text,
  generated_story text, -- cached Gemini output
  story_language text default 'en',
  category text, -- 'fort' | 'temple' | 'palace' | 'monument' | 'natural'
  updated_at timestamptz default now()
);

create table if not exists user_heritage_visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  heritage_site_id uuid references heritage_sites(id),
  visited_at timestamptz default now()
);

-- MODULE C: Local Partners (curated stays for offbeat destinations)
create table if not exists local_partners (
  id uuid primary key default gen_random_uuid(),
  destination_name text,
  name text,
  type text, -- 'homestay' | 'guesthouse' | 'hotel' | 'camp'
  price_range text,
  contact_info text,
  description text,
  is_verified boolean default true,
  source text default 'manual_research'
);

-- RLS policies
alter table destination_metrics enable row level security;
alter table destination_alternatives enable row level security;
alter table heritage_sites enable row level security;
alter table local_partners enable row level security;

create policy "Public read destination_metrics" on destination_metrics for select using (true);
create policy "Public read destination_alternatives" on destination_alternatives for select using (true);
create policy "Public read heritage_sites" on heritage_sites for select using (true);
create policy "Public read local_partners" on local_partners for select using (true);
create policy "Users can insert visits" on user_heritage_visits for insert with check (true);
create policy "Users can read own visits" on user_heritage_visits for select using (true);
