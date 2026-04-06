import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

// Use connection details from .env or fallback to hardcoded (for dev convenience in this project)
const client = new Client({
  host: process.env.DB_HOST || 'db.qfofluefvivsfleaeglg.supabase.co',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '9TLYHy6SRk*$q#y',
  database: process.env.DB_NAME || 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

const ddl = `
-- 1. Create Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'attended', 'cancelled'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- 3. Policies
-- Allow public to insert (anonymous registration)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_registrations' AND policyname = 'Allow public insert'
    ) THEN
        CREATE POLICY "Allow public insert" ON public.event_registrations FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Allow authenticated users (admin) to manage all
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_registrations' AND policyname = 'Allow all for authenticated'
    ) THEN
        CREATE POLICY "Allow all for authenticated" ON public.event_registrations FOR ALL TO authenticated USING (true);
    END IF;
END
$$;

-- 4. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_event_registrations'
    ) THEN
        CREATE TRIGGER set_updated_at_event_registrations
        BEFORE UPDATE ON public.event_registrations
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END
$$;
`;

async function main() {
  try {
    console.log('🏗️  Đang khởi tạo table "event_registrations" trong PostgreSQL...');
    await client.connect();
    await client.query(ddl);
    console.log('✨ Hoàn tất quá trình thiết lập bảng "event_registrations"!');
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
  } finally {
    await client.end();
  }
}

main();
