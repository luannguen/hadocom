import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function describeTable() {
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
        const res = await client.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'service_inquiries'
            ORDER BY ordinal_position
        `);
        console.log('📋 Columns in service_inquiries:');
        res.rows.forEach(r => console.log(`  - ${r.column_name} (${r.data_type}, nullable: ${r.is_nullable})`));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

describeTable();
