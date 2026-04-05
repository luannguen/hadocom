const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv for the backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL.replace(/^"|"$/g, '');

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('jobs', 'job_applications')
    `))
    .then(res => {
        console.log('Existing tables:', res.rows.map(r => r.table_name));
        return client.query('SELECT * FROM jobs LIMIT 1');
    })
    .then(res => {
        console.log('Sample job:', res.rows[0]);
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
        process.exit(1);
    });
