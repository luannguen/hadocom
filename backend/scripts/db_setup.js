import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

// Extract password precisely from postgresql://postgres:PASSWORD@host...
const dbUrl = process.env.DATABASE_URL || "";
const passwordMatch = dbUrl.match(/postgres:([^@]+)@/);
const password = passwordMatch ? passwordMatch[1] : "";

const pool = new Pool({
  user: 'postgres',
  host: 'db.qfofluefvivsfleaeglg.supabase.co',
  database: 'postgres',
  password: password,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  const sqlPath = path.resolve(__dirname, '../src/sql/init_full_db.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('--- Đang kết nối tới Supabase Database... ---');
  const client = await pool.connect();
  
  try {
    console.log('--- Đang thực thi script khởi tạo và seed dữ liệu... ---');
    await client.query('BEGIN');
    await client.query(sql);
    
    // Run admin seed
    const adminSqlPath = path.resolve(__dirname, '../src/sql/seed_admin.sql');
    const adminSql = fs.readFileSync(adminSqlPath, 'utf8');
    await client.query(adminSql);
    
    // Run permissions seed
    const permsSqlPath = path.resolve(__dirname, '../src/sql/seed_permissions.sql');
    const permsSql = fs.readFileSync(permsSqlPath, 'utf8');
    await client.query(permsSql);

    await client.query('COMMIT');
    console.log('✅ Đã khởi tạo và seed dữ liệu thành công!');
    
    // Verification query
    const res = await client.query("SELECT count(*) FROM services");
    console.log(`📊 Số lượng dịch vụ hiện có: ${res.rows[0].count}`);
    
    const bannerRes = await client.query("SELECT count(*) FROM banners");
    console.log(`📊 Số lượng banner hiện có: ${bannerRes.rows[0].count}`);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Lỗi khi thiết lập database:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();
