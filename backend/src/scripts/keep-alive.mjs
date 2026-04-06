import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env từ file .env (nếu có, chủ yếu dùng cho local dev)
try {
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });
} catch (e) {
    // Bỏ qua lỗi nếu không tìm thấy .env (như trong GitHub Actions)
}

const { Client } = pg;

async function keepAlive() {
    console.log('🚀 [Keep-Alive] Starting connection to Supabase...');
    
    // Xử lý DATABASE_URL nếu có dấu ngoặc kép (thường gặp trong file .env)
    let connectionString = process.env.DATABASE_URL;
    if (connectionString && connectionString.startsWith('"') && connectionString.endsWith('"')) {
        connectionString = connectionString.substring(1, connectionString.length - 1);
    }

    if (!connectionString) {
        console.error('❌ [Keep-Alive] DATABASE_URL is missing in .env');
        process.exit(1);
    }

    // Xử lý encode mật khẩu nếu chứa ký tự đặc biệt như #, $, *
    try {
        // Thử xem có parse được thẳng không
        new URL(connectionString);
    } catch (e) {
        console.log('⚠️ [Keep-Alive] URL contains special characters, attempting to encode password...');
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
        console.log('✅ [Keep-Alive] Connected to database.');

        // 1. Kiểm tra xem có bảng users không
        const checkTableRes = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `);
        
        const hasUsersTable = checkTableRes.rows[0].exists;
        
        if (hasUsersTable) {
            // 2. Nếu có bảng users, thực hiện đếm (theo yêu cầu của user)
            const countRes = await client.query('SELECT COUNT(*) FROM public.users');
            console.log(`📊 [Keep-Alive] Current user count: ${countRes.rows[0].count}`);
        } else {
            // 3. Nếu không có bảng users, thực hiện đếm bảng bất kỳ (ví dụ: settings hoặc thông tin hệ thống)
            // để đảm bảo vẫn có transaction tương tác với DB.
            const dummyRes = await client.query('SELECT COUNT(*) FROM information_schema.tables');
            console.log(`📊 [Keep-Alive] Activity recorded. Table count: ${dummyRes.rows[0].count}`);
        }

        console.log('✨ [Keep-Alive] Successfully interacted with database to prevent freezing.');
    } catch (err) {
        console.error('❌ [Keep-Alive] Error during database interaction:', err.message);
    } finally {
        await client.end();
        console.log('🚪 [Keep-Alive] Connection closed.');
    }
}

keepAlive();
