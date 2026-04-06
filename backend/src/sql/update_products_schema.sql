-- 🛠 UPDATE PRODUCTS TABLE SCHEMA 🛠
-- Run this in your Supabase SQL Editor to add missing columns for Product Detail views.

-- 1. Add new columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_bestseller boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}'::text[], 
ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}'::jsonb;

-- 2. Update existing rows if any
UPDATE public.products SET features = '{}' WHERE features IS NULL;
UPDATE public.products SET specifications = '{}'::jsonb WHERE specifications IS NULL;

-- 3. Verify the schema
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products';
