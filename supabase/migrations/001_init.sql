-- Initialize tables for DorMark

-- Profiles (link to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Products
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  category text,
  image_url text,
  stock int default 0,
  rating numeric(3,2) default 0,
  review_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Orders
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  total_amount numeric(10,2) default 0,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Order items
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade,
  product_id uuid references public.products,
  quantity int default 1,
  unit_price numeric(10,2) default 0
);

-- INDEXES
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_orders_user on public.orders(user_id);

-- Enable Row Level Security recommendations (configure policies in Supabase UI)
-- alter table public.products enable row level security;
-- alter table public.orders enable row level security;

-- Example policy: allow admins full access to products
-- create policy "Admins can manage products" on public.products
-- for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- Seed an admin user manually via Supabase Auth and then set profiles.is_admin = true for that user.
