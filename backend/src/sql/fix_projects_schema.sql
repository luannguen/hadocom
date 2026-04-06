-- 🛠 FIX PROJECTS SCHEMA FOR HADOCOM 🛠
-- Đảm bảo bảng projects có đầy đủ các cột cần thiết cho trang Admin

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'projects') THEN
        CREATE TABLE public.projects (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name text NOT NULL,
            slug text UNIQUE NOT NULL,
            description text,
            content text,
            image_url text,
            client text,
            completion_date date,
            category_id uuid,
            tags text[] DEFAULT '{}',
            is_featured boolean DEFAULT false,
            created_at timestamptz DEFAULT now(),
            updated_at timestamptz DEFAULT now()
        );
    ELSE
        -- Nếu bảng đã tồn tại, kiểm tra và thêm các cột thiếu
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='name') THEN
            ALTER TABLE public.projects ADD COLUMN name text NOT NULL DEFAULT 'Untitled';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='slug') THEN
            ALTER TABLE public.projects ADD COLUMN slug text;
            -- Update slug based on id or name to avoid nulls if any
            UPDATE public.projects SET slug = id::text WHERE slug IS NULL;
            ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;
            ALTER TABLE public.projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='client') THEN
            ALTER TABLE public.projects ADD COLUMN client text;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='completion_date') THEN
            ALTER TABLE public.projects ADD COLUMN completion_date date;
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='is_featured') THEN
            ALTER TABLE public.projects ADD COLUMN is_featured boolean DEFAULT false;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='content') THEN
            ALTER TABLE public.projects ADD COLUMN content text;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='image_url') THEN
            ALTER TABLE public.projects ADD COLUMN image_url text;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='category_id') THEN
            ALTER TABLE public.projects ADD COLUMN category_id uuid;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='tags') THEN
            ALTER TABLE public.projects ADD COLUMN tags text[] DEFAULT '{}';
        END IF;
    END IF;
END $$;

-- Disable RLS để dev dễ dàng (theo pattern dự án hiện tại)
ALTER TABLE IF EXISTS public.projects DISABLE ROW LEVEL SECURITY;

-- Reload schema cache cho PostgREST
NOTIFY pgrst, 'reload schema';
