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
UPDATE public.projects 
SET image_url = 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop'
WHERE slug = 'trien-khai-ha-tang-mang';

UPDATE public.projects 
SET image_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
WHERE slug = 'xay-dung-he-thong-erp';
`;

async function fixImages() {
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
        console.log('⚡ Updating project image URLs...');
        await client.query(sql);
        console.log('🎉 Project images updated successfully!');
    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        await client.end();
        console.log('👋 Done.');
    }
}

fixImages();
