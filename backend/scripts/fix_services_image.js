import pkg from 'pg';
const { Client } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL?.replace(/^"|"$/g, '');

async function fixSpecific() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('🚀 Connected to database.');

        // 1. Force fix 'Hạ tầng CNTT' service
        const res1 = await client.query(`
            UPDATE public.services 
            SET image_url = 'https://images.unsplash.com/photo-1558494949-ef010ca63328?q=80&w=800&auto=format&fit=crop'
            WHERE slug = 'ha-tang-cntt' OR title = 'Hạ tầng CNTT'
            RETURNING slug, title;
        `);
        console.log(`✅ Updated ${res1.rowCount} service rows for Hạ tầng CNTT.`);

        // 2. Final check on Banners just in case
        const res2 = await client.query(`
            UPDATE public.banners 
            SET image_url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
            WHERE title = 'Công nghệ vững chắc Vận hành bền bỉ'
            RETURNING title;
        `);
        console.log(`✅ Updated ${res2.rowCount} banner rows.`);

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await client.end();
        console.log('👋 Done.');
    }
}

fixSpecific();
