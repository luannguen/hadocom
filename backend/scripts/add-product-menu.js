import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function addProductMenu() {
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
        
        // 1. Get Explore parent ID
        const exploreRes = await client.query("SELECT id FROM public.navigation WHERE label = 'nav.explore' LIMIT 1");
        if (exploreRes.rows.length === 0) {
            console.error('❌ Could not find nav.explore in navigation table');
            return;
        }
        const parentId = exploreRes.rows[0].id;

        // 2. Check if nav.products already exists as child
        const checkRes = await client.query("SELECT id FROM public.navigation WHERE label = 'nav.products' AND parent_id = $1", [parentId]);
        
        if (checkRes.rows.length > 0) {
            console.log('ℹ️ nav.products already exists in Explore submenu');
        } else {
            // 3. Add it
            await client.query(`
                INSERT INTO public.navigation (label, path, parent_id, order_index, position)
                VALUES ('nav.products', '/san-pham', $1, 0, 'header')
            `, [parentId]);
            console.log('✅ Added nav.products to Explore submenu in Database');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

addProductMenu();
