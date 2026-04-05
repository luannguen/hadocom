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
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'job_applications'
    `))
    .then(res => {
        if (res.rows.length === 0) {
            console.log('Table "job_applications" does not exist.');
        } else {
            console.log('Table "job_applications" exists.');
            return client.query('SELECT * FROM job_applications LIMIT 1');
        }
    })
    .then(res => {
        if (res && res.rows.length > 0) {
            console.log('Sample application:', JSON.stringify(res.rows[0], null, 2));
        } else if (res) {
            console.log('No applications found in the table.');
        }
        return client.query(`
            SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'job_applications'
        `);
    })
    .then(res => {
        console.log('RLS Policies for "job_applications":', JSON.stringify(res.rows, null, 2));
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
        process.exit(1);
    });
