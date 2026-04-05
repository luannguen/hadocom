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
    .then(() => client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
    .then(res => {
        console.log('Tables in public schema:');
        console.table(res.rows);
        return client.query("SELECT * FROM job_applications");
    })
    .then(res => {
        console.log(`Found ${res.rows.length} applications in the database.`);
        if (res.rows.length > 0) {
            console.table(res.rows.map(r => ({ id: r.id, name: r.full_name, job: r.job_id })));
        }
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
    });
