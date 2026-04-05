import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correctly resolve .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { Client } = pg;

async function runRepair() {
  // REPAIR: Manual parsing to handle special characters in password like '#'
  // The password in .env is: 9TLYHy6SRk*$q#y
  // We need to URL encode the password component.
  
  const rawUrl = process.env.DATABASE_URL?.replace(/^"|"$/g, '');
  if (!rawUrl) {
    console.error('❌ DATABASE_URL not found in .env');
    process.exit(1);
  }

  // Handle the special case where '#' in password breaks URL parsing
  let connectionString = rawUrl;
  if (rawUrl.includes('9TLYHy6SRk*$q#y')) {
    connectionString = rawUrl.replace('9TLYHy6SRk*$q#y', encodeURIComponent('9TLYHy6SRk*$q#y'));
  }
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🚀 Connecting to Supabase database (with URI encoding fix)...');
    await client.connect();
    console.log('✅ Connected.');

    const sqlPath = path.resolve(__dirname, '../sql/repair_recruitment_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('⏳ Applying recruitment schema repair...');
    await client.query(sql);
    console.log('✨ SQL Migration applied successfully.');

  } catch (err) {
    console.error('❌ Error applying migration:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runRepair();
