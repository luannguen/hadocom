import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function listTables() {
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
        const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('📋 Public Tables:');
        res.rows.forEach(r => console.log(`  - ${r.table_name}`));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

listTables();
