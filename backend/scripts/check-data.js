import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function checkData() {
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
        
        const productsCount = await client.query('SELECT COUNT(*) FROM public.products');
        const categories = await client.query("SELECT id, name, slug, type FROM public.categories WHERE type = 'product'");
        
        console.log(`📦 Total Products: ${productsCount.rows[0].count}`);
        console.log(`📂 Product Categories:`);
        categories.rows.forEach(c => console.log(`  - ${c.name} (${c.slug}) [${c.id}]`));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

checkData();
