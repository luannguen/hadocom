import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const { Client } = pg;

// Connection config from .env or hardcoded for Supabase
const client = new Client({
  host: 'db.qfofluefvivsfleaeglg.supabase.co',
  port: 5432,
  user: 'postgres',
  password: '9TLYHy6SRk*$q#y',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

const ddl = `
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'partners' AND policyname = 'Allow public select access'
    ) THEN
        CREATE POLICY "Allow public select access" ON public.partners FOR SELECT USING (true);
    END IF;
END
$$;

-- Allow everything for authenticated users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'partners' AND policyname = 'Allow all for authenticated'
    ) THEN
        CREATE POLICY "Allow all for authenticated" ON public.partners FOR ALL TO authenticated USING (true);
    END IF;
END
$$;
`;

const initialPartners = [
  "Microsoft", "Oracle", "Citrix", "SolarWinds",
  "Red Hat", "IBM", "Dell", "HP",
  "Symantec", "Juniper", "NetApp", "EMC",
  "Schneider", "Fujitsu", "McAfee", "Cisco",
  "Bitdefender", "VMware", "Huawei", "ZTE",
  "Emerson", "Santak", "Eaton", "Alcatel-Lucent",
];

async function main() {
  try {
    console.log('🏗️  Đang khởi tạo table "partners" trong PostgreSQL...');
    await client.connect();
    await client.query(ddl);
    
    console.log('🚀 Đang seed dữ liệu Partners ban đầu...');
    for (let i = 0; i < initialPartners.length; i++) {
      const name = initialPartners[i];
      await client.query(
        `INSERT INTO public.partners (name, sort_order, is_active) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (name) DO NOTHING`,
        [name, i, true]
      );
      console.log(`✅ Đã seed: "${name}"`);
    }

    console.log('✨ Hoàn tất quá trình thiết lập!');
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
  } finally {
    await client.end();
  }
}

main();
