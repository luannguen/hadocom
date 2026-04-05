import pkg from 'pg';
const { Client } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL?.replace(/^"|"$/g, '');

const sql = `
-- Fix Banners
UPDATE public.banners 
SET image_url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
WHERE image_url LIKE '@/assets/%';

-- Fix Services
UPDATE public.services 
SET image_url = CASE 
    WHEN slug = 'ha-tang-cntt' THEN 'https://images.unsplash.com/photo-1558494949-ef010ca63328?q=80&w=800&auto=format&fit=crop'
    WHEN slug = 'phat-trien-phan-mem' THEN 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
    WHEN slug = 'bao-hanh-bao-tri' THEN 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop'
    ELSE 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop'
END
WHERE image_url LIKE '@/assets/%';

-- Fix Projects
UPDATE public.projects 
SET image_url = CASE 
    WHEN slug = 'trien-khai-ha-tang-mang' THEN 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop'
    WHEN slug = 'xay-dung-he-thong-erp' THEN 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    ELSE 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
END
WHERE image_url LIKE '@/assets/%';

-- Fix News
UPDATE public.news 
SET image_url = CASE 
    WHEN slug = 'hadocom-ho-tro-chuyen-doi-so-2024' THEN 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'
    WHEN slug = 'khai-truong-van-phong-moi-hcm' THEN 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    ELSE 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'
END
WHERE image_url LIKE '@/assets/%';
`;

async function fixAllImages() {
    // Manually parse to handle special characters in password
    const regex = /^postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)$/;
    const match = connectionString?.match(regex);

    let clientConfig;
    if (match) {
        const [_, user, password, host, port, database] = match;
        clientConfig = {
            user,
            password,
            host,
            port: parseInt(port),
            database,
            ssl: { rejectUnauthorized: false }
        };
    } else {
        clientConfig = {
            connectionString,
            ssl: { rejectUnauthorized: false }
        };
    }

    const client = new Client(clientConfig);

    try {
        console.log('🚀 Connecting to database...');
        await client.connect();
        console.log('⚡ Updating all broken image URLs in all tables...');
        await client.query(sql);
        console.log('🎉 All image URLs updated successfully!');
    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await client.end();
        console.log('👋 Done.');
    }
}

fixAllImages();
