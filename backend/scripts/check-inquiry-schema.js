import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function checkSchemas() {
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
        const tables = ['contacts', 'service_inquiries'];
        
        for (const table of tables) {
            const columns = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}'`);
            console.log(`🏛 ${table} Table Columns:`);
            columns.rows.forEach(c => {
                console.log(`  - ${c.column_name} (${c.data_type})`);
            });
            console.log('---');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

checkSchemas();
