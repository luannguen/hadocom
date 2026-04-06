import pg from 'pg';

const { Client } = pg;

export default async function handler(req, res) {
  // 1. Kiểm tra xác thực từ Vercel Cron (Optional but Recommended)
  // Nếu bạn đã cấu hình CRON_SECRET trong Environment Variables của Vercel
  const authHeader = req.headers['authorization'];
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid CRON_SECRET' });
  }

  console.log('🚀 [Vercel-Cron] Starting keep-alive query...');

  // 2. Lấy Connection String từ biến môi trường
  let connectionString = process.env.DATABASE_URL;
  
  // Xử lý dấu ngoặc kép trong .env (nếu có)
  if (connectionString && connectionString.startsWith('"') && connectionString.endsWith('"')) {
    connectionString = connectionString.substring(1, connectionString.length - 1);
  }

  if (!connectionString) {
    console.error('❌ [Vercel-Cron] DATABASE_URL is missing.');
    return res.status(500).json({ error: 'DATABASE_URL is not configured' });
  }

  // Encode password nếu có ký tự đặc biệt
  try {
    new URL(connectionString);
  } catch (e) {
    const regex = /^(postgresql?:\/\/)([^:]+):([^@]+)@(.*)$/;
    const match = connectionString.match(regex);
    if (match) {
      const [_, protocol, user, password, rest] = match;
      connectionString = `${protocol}${user}:${encodeURIComponent(password)}@${rest}`;
    }
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    // 3. Thực hiện truy vấn để đánh thức DB
    // Chúng ta sẽ đếm số lượng users như yêu cầu ban đầu. 
    // Nếu bảng users không tồn tại, đếm bảng hệ thống.
    const checkTableRes = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    let message = '';
    if (checkTableRes.rows[0].exists) {
      const countRes = await client.query('SELECT COUNT(*) FROM public.users');
      message = `📊 Keep-Alive Success: Current user count is ${countRes.rows[0].count}`;
    } else {
      const dummyRes = await client.query('SELECT COUNT(*) FROM information_schema.tables');
      message = `📊 Keep-Alive Success: Activity recorded on system tables (Count: ${dummyRes.rows[0].count})`;
    }

    console.log('✅', message);
    return res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('❌ [Vercel-Cron] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  } finally {
    await client.end();
  }
}
