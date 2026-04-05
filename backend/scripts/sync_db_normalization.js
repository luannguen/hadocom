
import pg from 'pg';
const { Client } = pg;

// Using the DATABASE_URL from .env (retrieved earlier)
const connectionString = "postgresql://postgres:9TLYHy6SRk*%24q%23y@db.qfofluefvivsfleaeglg.supabase.co:5432/postgres";
const client = new Client({ connectionString });

async function sync() {
  await client.connect();
  console.log('Connected to Supabase DB');
  
  try {
    // 1. Rename news.summary to news.excerpt if summary exists
    await client.query('ALTER TABLE news RENAME COLUMN summary TO excerpt;');
    console.log('Checked & Renamed news.summary -> excerpt');
    
    // 2. Add status column to news if not exists
    await client.query("ALTER TABLE news ADD COLUMN IF NOT EXISTS status text DEFAULT 'published';");
    console.log('Checked & Added status column to news');
    
    // 3. Rename projects.name to projects.title if name exists
    await client.query('ALTER TABLE projects RENAME COLUMN name TO title;');
    console.log('Checked & Renamed projects.name -> title');

    console.log('Database normalization completed successfully!');
    
  } catch (err) {
    if (err.code === '42701') {
        console.log('Columns already renamed or exist. Skipping.');
    } else {
        console.error('Error during sync:', err.message);
    }
  } finally {
    await client.end();
  }
}

sync();
