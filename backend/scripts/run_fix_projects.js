import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const rawConnectionString = process.env.DATABASE_URL?.replace(/^"|"$/g, '');

if (!rawConnectionString) {
    console.error('❌ ERROR: DATABASE_URL not found in .env');
    process.exit(1);
}

// Manually parse to handle special characters in password
// Format: postgresql://user:password@host:port/database
const regex = /^postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)$/;
const match = rawConnectionString.match(regex);

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
    // Fallback to connection string if regex fails
    clientConfig = {
        connectionString: rawConnectionString,
        ssl: { rejectUnauthorized: false }
    };
}

const sqlFilePath = path.join(__dirname, '../src/sql/fix_projects_schema.sql');

async function migrate() {
    const client = new Client(clientConfig);

    try {
        console.log('🚀 Connecting to Supabase Database...');
        await client.connect();
        console.log('✅ Connected.');

        console.log(`📄 Reading SQL from ${sqlFilePath}...`);
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        console.log('⚡ Executing SQL script...');
        await client.query(sql);
        console.log('🎉 Project Schema Fix Successful!');

    } catch (err) {
        console.error('❌ ERROR during migration:', err.message);
        process.exit(1);
    } finally {
        await client.end();
        console.log('👋 Connection closed.');
    }
}

migrate();
