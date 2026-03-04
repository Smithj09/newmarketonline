# DorMark Backend Setup Guide

Your Supabase project is now connected to the frontend via `.env.local`.

## Next Steps

### 1. Apply Database Migrations
Go to your Supabase dashboard → **SQL Editor** → **New Query** and run:

```sql
-- From supabase/migrations/001_init.sql
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

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

create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  total_amount numeric(10,2) default 0,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade,
  product_id uuid references public.products,
  quantity int default 1,
  unit_price numeric(10,2) default 0
);

create index if not exists idx_products_category on public.products(category);
create index if not exists idx_orders_user on public.orders(user_id);
```

### 2. Create an Admin User
- Go to **Authentication** → **Users** → **Add User**
- Enter email and password (e.g., `admin@dormark.com`, `admin123`)
- Click **Create user**

### 3. Set Admin Flag
After creating the user, go to **SQL Editor** and run:
```sql
update public.profiles set is_admin = true where id = (select id from auth.users where email = 'admin@dormark.com');
```

### 4. Seed Sample Products (Optional)
In **SQL Editor**:
```sql
insert into public.products (name, description, price, category, image_url, stock, rating, review_count)
values
('Wooden Chair','Comfortable wooden chair',49.99,'Home','https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',12,4.5,10),
('Bluetooth Headphones','Noise-cancelling over-ear',99.99,'Electronics','https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg',25,4.7,40),
('Running Shoes','Lightweight running shoes',79.99,'Fitness','https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',30,4.3,22);
```

## Test Login
1. Start dev server: `npm run dev`
2. Click **Dashboard** in header
3. Enter your admin email and password
4. Dashboard should load with admin controls

## Notes
- The frontend now loads products from Supabase on mount
- Product CRUD operations (add/edit/delete) sync with the database
- Auth state is managed by Supabase; logout via the admin buttons in the dashboard header
