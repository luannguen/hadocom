
import pg from 'pg';
import fs from 'fs';
const { Client } = pg;
const connectionString = "postgresql://postgres:9TLYHy6SRk*%24q%23y@db.qfofluefvivsfleaeglg.supabase.co:5432/postgres";
const client = new Client({ connectionString });
async function migrate() {
  try {
    await client.connect();
    const sql = fs.readFileSync('src/sql/update_hadocom_branding_final.sql', 'utf8');
    await client.query(sql);
    console.log('✅ Final HADOCOM Migration Completed Successfully!');
  } catch (err) {
    console.error('❌ Migration Error:', err.message);
  } finally {
    await client.end();
  }
}
migrate();
