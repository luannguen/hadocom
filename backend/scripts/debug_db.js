const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL.replace(/^"|"$/g, '');

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => client.query('SELECT slug, title, image_url FROM public.services'))
    .then(res => {
        console.log(JSON.stringify(res.rows, null, 2));
        client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
