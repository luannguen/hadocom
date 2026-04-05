const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');
const path = require('path');

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
        AND table_name = 'contacts'
    `))
    .then(res => {
        if (res.rows.length === 0) {
            console.log('Table "contacts" does not exist.');
        } else {
            console.log('Table "contacts" exists.');
            return client.query('SELECT * FROM contacts LIMIT 1');
        }
    })
    .then(res => {
        if (res) console.log('Sample contact:', res.rows[0]);
        return client.query(`
            SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'contacts'
        `);
    })
    .then(res => {
        console.log('RLS Policies for "contacts":', JSON.stringify(res.rows, null, 2));
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
        process.exit(1);
    });
