-- UPDATE SCHEMA FOR HADOCOM

-- 1. Services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';

-- 2. Projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- 3. Team Members table
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS icon text;

-- 4. Banners table
ALTER TABLE banners ADD COLUMN IF NOT EXISTS badge text;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS button_text text;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]';
