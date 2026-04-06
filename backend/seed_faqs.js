import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const faqs = [
  {
    question: 'HADOCOM cung cấp những dịch vụ chính nào?',
    answer: 'Chúng tôi chuyên cung cấp các giải pháp Hạ tầng công nghệ thông tin (Server, Networking, Storage), Phát triển phần mềm tùy chỉnh (ERP, CRM, Web & Mobile App) và Dịch vụ Bảo hành - Bảo trì hệ thống chuyên nghiệp.',
    category: 'general',
    sort_order: 1,
    is_active: true
  },
  {
    question: 'Công ty có hỗ trợ kỹ thuật 24/7 không?',
    answer: 'Có, HADOCOM cam kết đồng hành cùng doanh nghiệp với đội ngũ kỹ sư sẵn sàng hỗ trợ kỹ thuật 24/7 để xử lý sự cố kịp thời, đảm bảo hệ thống vận hành liên tục và ổn định.',
    category: 'service',
    sort_order: 2,
    is_active: true
  },
  {
    question: 'HADOCOM có nhận phát triển phần mềm theo yêu cầu riêng không?',
    answer: 'Chắc chắn rồi. Ngoài các sản phẩm đóng gói, chúng tôi nhận thiết kế và phát triển phần mềm theo yêu cầu đặc thù của từng khách hàng, từ các ứng dụng quản lý doanh nghiệp đến các giải pháp Web và Mobile App đột phá.',
    category: 'product',
    sort_order: 3,
    is_active: true
  },
  {
    question: 'Làm thế nào để nhận tư vấn và báo giá cho một dự án mới?',
    answer: 'Bạn có thể gửi yêu cầu qua form Liên hệ trên website, gửi email đến địa chỉ chi.nt@hadocom.vn hoặc gọi trực tiếp Hotline 0775 395 879. Chúng tôi sẽ phản hồi và tư vấn phương án tối ưu nhất trong vòng 24 giờ.',
    category: 'general',
    sort_order: 4,
    is_active: true
  },
  {
    question: 'Tại sao doanh nghiệp nên chọn giải pháp hạ tầng của HADOCOM?',
    answer: 'Chúng tôi là đối tác của nhiều hãng công nghệ hàng đầu thế giới (Dell, HP, Cisco, Microsoft...), mang đến giải pháp chính hãng, tối ưu chi phí đầu tư và khả năng mở rộng linh hoạt theo sự phát triển của doanh nghiệp.',
    category: 'service',
    sort_order: 5,
    is_active: true
  }
];

async function seed() {
  console.log('🚀 Đang bắt đầu seed dữ liệu FAQs...');

  for (const faq of faqs) {
    const { data, error } = await supabase
      .from('faqs')
      .upsert(faq, { onConflict: 'question' });

    if (error) {
      console.error(`❌ Lỗi khi seed câu hỏi: "${faq.question}"`, error.message);
    } else {
      console.log(`✅ Đã seed thành công: "${faq.question}"`);
    }
  }

  console.log('✨ Hoàn tất quá trình seed dữ liệu!');
}

seed();
