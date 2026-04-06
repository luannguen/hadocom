import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function checkNav() {
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
        const navItems = await client.query('SELECT * FROM public.navigation ORDER BY parent_id NULLS FIRST, order_index');
        console.log('🗺 Navigation Items:');
        navItems.rows.forEach(item => {
            console.log(`  - [${item.id}] ${item.label} -> ${item.path} (Parent: ${item.parent_id})`);
        });

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

checkNav();
