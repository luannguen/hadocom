import pg from 'pg';
const { Client } = pg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db.qfofluefvivsfleaeglg.supabase.co',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '9TLYHy6SRk*$q#y',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: { rejectUnauthorized: false }
};

async function fixRLS() {
  const sql = `
    -- 1. Đảm bảo RLS được bật
    ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

    -- 2. Xóa các chính sách cũ để làm mới
    DROP POLICY IF EXISTS "Allow public insert" ON public.event_registrations;
    DROP POLICY IF EXISTS "Allow public select" ON public.event_registrations;
    DROP POLICY IF EXISTS "Allow all for authenticated" ON public.event_registrations;

    -- 3. Tạo chính sách INSERT cho tất cả (public)
    CREATE POLICY "Allow public insert" 
    ON public.event_registrations 
    FOR INSERT 
    TO public
    WITH CHECK (true);

    -- 4. Tạo chính sách SELECT cho tất cả (public)
    -- Cần thiết để .select() trả về dữ liệu sau khi insert
    CREATE POLICY "Allow public select" 
    ON public.event_registrations 
    FOR SELECT 
    TO public
    USING (true);

    -- 5. Đảm bảo chính sách quản trị cho authenticated (Admin)
    CREATE POLICY "Allow all for authenticated" 
    ON public.event_registrations 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

    -- 6. Cấp quyền tường minh cho các vai trò
    GRANT INSERT, SELECT ON TABLE public.event_registrations TO anon;
    GRANT ALL ON TABLE public.event_registrations TO authenticated;
    GRANT ALL ON TABLE public.event_registrations TO service_role;
  `;

  const client = new Client(config);
  try {
    await client.connect();
    console.log('✅ Đã kết nối đến cơ sở dữ liệu.');
    await client.query(sql);
    console.log('🚀 Đã cập nhật chính sách RLS thành công!');
  } catch (err) {
    console.error('❌ Lỗi thực thi SQL:', err.message);
  } finally {
    await client.end();
  }
}

fixRLS();
