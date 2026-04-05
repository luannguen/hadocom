-- 🛠 HADOCOM DATABASE RESTORATION SCRIPT (UPDATED) 🛠
-- Run this in your Supabase SQL Editor to fix all 404 and Load Fail errors.

-- 1. Create Categories Table (Generic)
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    type text NOT NULL, -- 'product', 'news', 'project', 'event'
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    content text,
    image_url text,
    category_id uuid REFERENCES public.categories(id),
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Create Static Pages Table
CREATE TABLE IF NOT EXISTS public.static_pages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    content jsonb NOT NULL DEFAULT '{}',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. Create Contacts Table (Contact Messages)
CREATE TABLE IF NOT EXISTS public.contacts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text,
    status text DEFAULT 'new', -- 'new', 'read', 'replied'
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Enable RLS (Optional- but usually disabled for your dev setup)
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.static_pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;

-- 6. Initial Seed
INSERT INTO public.categories (name, slug, type)
VALUES 
    ('Hệ thống lạnh', 'he-thong-lanh', 'product'),
    ('Hạ tầng CNTT', 'ha-tang-cntt', 'product'),
    ('Thi công mạng', 'thi-cong-mang', 'project'),
    ('Xây dựng ERP', 'xay-dung-erp', 'project')
ON CONFLICT (slug) DO NOTHING;
