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
    .then(() => client.query('SELECT id, title FROM jobs'))
    .then(res => {
        console.log('Available Jobs:');
        console.table(res.rows);
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
    });
