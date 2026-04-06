import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function seedProducts() {
    const config = {
        user: 'postgres',
        host: 'db.qfofluefvivsfleaeglg.supabase.co',
        database: 'postgres',
        password: '9TLYHy6SRk*$q#y',
        port: 5432,
        ssl: { rejectUnauthorized: false }
    };

    const client = new Client(config);

    try {
        await client.connect();
        
        // 1. Get Categories
        const categories = await client.query("SELECT id, name FROM public.categories WHERE type = 'product'");
        const catMap = {};
        categories.rows.forEach(c => catMap[c.name] = c.id);

        console.log('🌱 Seeding products...');

        const products = [
            {
                name: 'Hệ thống Lưu trữ NAS chuyên dụng',
                slug: 'nas-storage-enterprise',
                description: 'Giải pháp lưu trữ dữ liệu tập trung, an toàn và hiệu suất cao cho doanh nghiệp.',
                content: 'Hệ thống NAS (Network Attached Storage) cung cấp khả năng quản lý dữ liệu tập trung, phân quyền truy cập và sao lưu tự động. Hỗ trợ đa nền tảng và truy cập từ xa linh hoạt.',
                image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80',
                category_id: catMap['Hạ tầng CNTT'],
                is_new: true,
                is_bestseller: true,
                features: ['Tốc độ truyền tải 10Gbps', 'Hỗ trợ RAID 0, 1, 5, 10', 'Sao lưu đám mây tích hợp', 'Tiết kiệm điện năng'],
                specifications: { 'Dung lượng': 'Tối đa 128TB', 'RAM': '8GB DDR4', 'CPU': 'Intel Quad-Core' }
            },
            {
                name: 'Cụm máy nén dàn ngưng Bitzer',
                slug: 'cum-may-nen-bitzer',
                description: 'Thiết bị lạnh công nghiệp tiêu chuẩn Châu Âu, độ bền cao và hoạt động ổn định.',
                content: 'Cụm máy nén Bitzer được nhập khẩu đồng bộ, tối ưu hóa cho các kho lạnh bảo quản thực phẩm, dược phẩm. Hiệu suất làm lạnh nhanh và tiết kiệm điện.',
                image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
                category_id: catMap['Hệ thống lạnh'],
                is_new: false,
                is_bestseller: true,
                features: ['Công nghệ máy nén Bitzer', 'Dàn ngưng giải nhiệt gió/nước', 'Bảng điều khiển thông minh', 'Độ ồn thấp'],
                specifications: { 'Công suất': '5HP - 50HP', 'Môi chất': 'R404A / R134a', 'Điện áp': '380V/3P/50Hz' }
            }
        ];

        for (const p of products) {
            if (!p.category_id) continue;
            await client.query(`
                INSERT INTO public.products (name, slug, description, content, image_url, category_id, is_new, is_bestseller, features, specifications)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (slug) DO UPDATE SET
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    content = EXCLUDED.content,
                    image_url = EXCLUDED.image_url,
                    features = EXCLUDED.features,
                    specifications = EXCLUDED.specifications;
            `, [p.name, p.slug, p.description, p.content, p.image_url, p.category_id, p.is_new, p.is_bestseller, p.features, JSON.stringify(p.specifications)]);
            console.log(` ✅ Seeded: ${p.name}`);
        }

        console.log('🚀 Seeding complete!');

    } catch (err) {
        console.error('❌ Error during seeding:', err.message);
    } finally {
        await client.end();
    }
}

seedProducts();
