import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Client } = pg;

async function runSQL() {
    const args = process.argv.slice(2);
    const sqlFile = args[0] || 'src/sql/update_products_schema.sql';

    // Hardcoded fields from .env for stability
    const config = {
        user: 'postgres',
        host: 'db.qfofluefvivsfleaeglg.supabase.co',
        database: 'postgres',
        password: '9TLYHy6SRk*$q#y', // Extracted from DATABASE_URL in .env
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    };

    const client = new Client(config);

    try {
        await client.connect();
        console.log('✅ Connected to Supabase via Postgres (Object Config)');

        const sqlPath = path.resolve(__dirname, '..', sqlFile);
        if (!fs.existsSync(sqlPath)) {
            console.error(`❌ SQL file not found: ${sqlPath}`);
            process.exit(1);
        }
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log(`⏳ Executing SQL migration from: ${sqlFile}...`);
        await client.query(sql);
        console.log('🚀 SQL Migration completed successfully!');

    } catch (err) {
        console.error('❌ Error executing SQL:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runSQL();
