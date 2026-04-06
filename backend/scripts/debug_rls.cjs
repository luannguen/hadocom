const pkg = require('pg');
const { Client } = pkg;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
    user: 'postgres',
    host: 'db.qfofluefvivsfleaeglg.supabase.co',
    database: 'postgres',
    password: '9TLYHy6SRk*$q#y',
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

const client = new Client(config);

async function main() {
    try {
        await client.connect();
        console.log('✅ Connected to DB');

        const { rows: policies } = await client.query(`
            SELECT tablename, policyname, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename IN ('event_registrations', 'events');
        `);
        console.log('--- POLICIES ---');
        policies.forEach(p => {
            console.log(`Table: ${p.tablename} | Policy: ${p.policyname} | Cmd: ${p.cmd} | Roles: ${JSON.stringify(p.roles)}`);
            console.log(`  Qual: ${p.qual}`);
            console.log(`  With Check: ${p.with_check}`);
        });

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

main();
