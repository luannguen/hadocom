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
        AND relname IN ('jobs', 'job_applications', 'contacts')
    `))
    .then(res => {
        console.table(res.rows.map(r => ({ Table: r.relname, RLS: r.relrowsecurity })));
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
    });
