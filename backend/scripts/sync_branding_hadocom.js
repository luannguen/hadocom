
import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://postgres:9TLYHy6SRk*%24q%23y@db.qfofluefvivsfleaeglg.supabase.co:5432/postgres";
const client = new Client({ connectionString });

async function syncBranding() {
  await client.connect();
  console.log('Connected to DB for HADOCOM Rebranding...');
  
  try {
    // 1. Update Admin User
    console.log('Updating Admin User...');
    const oldAdmin = 'admin@vrc.com.vn';
    const newAdmin = 'admin@hadocom.vn';
    
    // Update public.users
    await client.query(
      "UPDATE public.users SET email = $1, full_name = 'HADOCOM Administrator' WHERE email = $2",
      [newAdmin, oldAdmin]
    );
    
    // Update auth.users (if possible, though usually handled via Supabase API, but direct SQL for dev is fine)
    await client.query(
      "UPDATE auth.users SET email = $1, raw_user_meta_data = raw_user_meta_data || '{\"full_name\": \"HADOCOM Administrator\"}'::jsonb WHERE email = $2",
      [newAdmin, oldAdmin]
    );

    // 2. Update Site Settings
    console.log('Updating Site Settings...');
    const settings = [
      { key: 'site_name', value: 'HADOCOM' },
      { key: 'site_title', value: 'HADOCOM - Công ty TNHH Giải pháp Công nghệ Hadocom' },
      { key: 'site_description', value: 'HADOCOM chuyên cung cấp giải pháp hạ tầng CNTT, phát triển phần mềm và dịch vụ bảo hành – bảo trì hệ thống cho doanh nghiệp, tổ chức.' },
      { key: 'site_keywords', value: 'HADOCOM, hạ tầng CNTT, phát triển phần mềm, bảo trì hệ thống, giải pháp công nghệ vừng chắc, vận hành bền bỉ' },
      { key: 'logo_url', value: '/logo-hadocom.png' }, // Placeholder to be verified
      { key: 'favicon_url', value: '/favicon-hadocom.ico' },
      { key: 'contact_email', value: 'chi.nt@hadocom.vn' },
      { key: 'contact_phone', value: '0775 395 879' },
      { key: 'company_address', value: 'TP. Hồ Chí Minh, Việt Nam' },
      { key: 'copyright_text', value: `© ${new Date().getFullYear()} HADOCOM. All rights reserved.` },
      { key: 'company_slogan', value: 'Công nghệ vững chắc – Vận hành bền bỉ – Đồng hành dài lâu' }
    ];

    for (const s of settings) {
      await client.query(
        "INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()",
        [s.key, s.value]
      );
    }

    // 3. Global Content Replacement (VRC/VietVinh -> HADOCOM)
    console.log('Performing global content replacement...');
    const tables = [
      { table: 'news', columns: ['title', 'excerpt', 'content'] },
      { table: 'projects', columns: ['title', 'description', 'content'] },
      { table: 'services', columns: ['title', 'description', 'content'] },
      { table: 'banners', columns: ['title', 'description', 'badge'] },
      { table: 'team_members', columns: ['bio'] },
      { table: 'navigation', columns: ['label'] }
    ];

    for (const t of tables) {
      for (const col of t.columns) {
        // Case-insensitive replacement for VietVinh and VRC
        await client.query(`UPDATE ${t.table} SET ${col} = REPLACE(${col}, 'VietVinh', 'HADOCOM') WHERE ${col} ILIKE '%VietVinh%'`);
        await client.query(`UPDATE ${t.table} SET ${col} = REPLACE(${col}, 'VRC', 'HADOCOM') WHERE ${col} ILIKE '%VRC%'`);
        await client.query(`UPDATE ${t.table} SET ${col} = REPLACE(${col}, 'Viet Vinh', 'HADOCOM') WHERE ${col} ILIKE '%Viet Vinh%'`);
      }
    }

    console.log('✅ HADOCOM Rebranding successful!');
    
  } catch (err) {
    console.error('❌ Error during rebranding:', err.message);
  } finally {
    await client.end();
  }
}

syncBranding();
