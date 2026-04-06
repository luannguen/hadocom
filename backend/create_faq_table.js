import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const { Client } = pg;

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
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL UNIQUE,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure unique constraint exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'faqs_question_key'
    ) THEN
        ALTER TABLE public.faqs ADD CONSTRAINT faqs_question_key UNIQUE (question);
    END IF;
END
$$;

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'faqs' AND policyname = 'Allow public select access'
    ) THEN
        CREATE POLICY "Allow public select access" ON public.faqs FOR SELECT USING (true);
    END IF;
END
$$;

-- Allow everything for authenticated users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'faqs' AND policyname = 'Allow all for authenticated'
    ) THEN
        CREATE POLICY "Allow all for authenticated" ON public.faqs FOR ALL TO authenticated USING (true);
    END IF;
END
$$;
`;

const faqs = [
  ['HADOCOM cung cấp những dịch vụ chính nào?', 'Chúng tôi chuyên cung cấp các giải pháp Hạ tầng công nghệ thông tin (Server, Networking, Storage), Phát triển phần mềm tùy chỉnh (ERP, CRM, Web & Mobile App) và Dịch vụ Bảo hành - Bảo trì hệ thống chuyên nghiệp.', 'general', 1, true],
  ['Công ty có hỗ trợ kỹ thuật 24/7 không?', 'Có, HADOCOM cam kết đồng hành cùng doanh nghiệp với đội ngũ kỹ sư sẵn sàng hỗ trợ kỹ thuật 24/7 để xử lý sự cố kịp thời, đảm bảo hệ thống vận hành liên tục và ổn định.', 'service', 2, true],
  ['HADOCOM có nhận phát triển phần mềm theo yêu cầu riêng không?', 'Chắc chắn rồi. Ngoài các sản phẩm đóng gói, chúng tôi nhận thiết kế và phát triển phần mềm theo yêu cầu đặc thù của từng khách hàng, từ các ứng dụng quản lý doanh nghiệp đến các giải pháp Web và Mobile App đột phá.', 'product', 3, true],
  ['Làm thế nào để nhận tư vấn và báo giá cho một dự án mới?', 'Bạn có thể gửi yêu cầu qua form Liên hệ trên website, gửi email đến địa chỉ chi.nt@hadocom.vn hoặc gọi trực tiếp Hotline 0775 395 879. Chúng tôi sẽ phản hồi và tư vấn phương án tối ưu nhất trong vòng 24 giờ.', 'general', 4, true],
  ['Tại sao doanh nghiệp nên chọn giải pháp hạ tầng của HADOCOM?', 'Chúng tôi là đối tác của nhiều hãng công nghệ hàng đầu thế giới (Dell, HP, Cisco, Microsoft...), mang đến giải pháp chính hãng, tối ưu chi phí đầu tư và khả năng mở rộng linh hoạt theo sự phát triển của doanh nghiệp.', 'service', 5, true]
];

async function main() {
  try {
    console.log('🏗️  Đang khởi tạo/cập nhật table "faqs" trong PostgreSQL...');
    await client.connect();
    await client.query(ddl);
    
    console.log('🚀 Đang seed dữ liệu FAQs trực tiếp qua PostgreSQL (bỏ qua RLS)...');
    for (const faq of faqs) {
      await client.query(
        `INSERT INTO public.faqs (question, answer, category, sort_order, is_active) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (question) DO UPDATE 
         SET answer = EXCLUDED.answer, category = EXCLUDED.category, sort_order = EXCLUDED.sort_order, is_active = EXCLUDED.is_active`,
        faq
      );
      console.log(`✅ Đã seed: "${faq[0]}"`);
    }

    console.log('✨ Hoàn tất quá trình thiết lập và seed dữ liệu!');
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
  } finally {
    await client.end();
  }
}

main();
