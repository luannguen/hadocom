const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.DATABASE_URL.replace(/^"|"$/g, '');
// Handle special chars in password for node-postgres if needed, 
// but usually it handles the URI fine if formatted correctly.
// Let's use the explicit parts to avoid parsing issues.

const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => client.query("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5"))
    .then(res => {
        console.log('Recent 5 contacts:');
        console.table(res.rows.map(r => ({
            name: r.name,
            email: r.email,
            subject: r.subject,
            created_at: r.created_at
        })));
        client.end();
    })
    .catch(err => {
        console.error('Error:', err.message);
        client.end();
        process.exit(1);
    });
