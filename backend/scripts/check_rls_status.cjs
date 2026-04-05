const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const rawUrl = process.env.DATABASE_URL.replace(/^"|"$/g, '');
let connectionString = rawUrl;
if (rawUrl.includes('9TLYHy6SRk*$q#y')) {
    connectionString = rawUrl.replace('9TLYHy6SRk*$q#y', encodeURIComponent('9TLYHy6SRk*$q#y'));
}

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => client.query(`
        SELECT relname, relrowsecurity 
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' 
        AND relname = 'job_applications'
    `))
    .then(res => {
        if (res.rows.length > 0) {
            console.log(`Table: ${res.rows[0].relname}, RLS Enabled: ${res.rows[0].relrowsecurity}`);
        } else {
            console.log('Table job_applications not found in pg_class');
        }
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
    });
