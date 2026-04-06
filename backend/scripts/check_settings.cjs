const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSettings() {
    console.log('Fetching site_settings...');
    const { data, error } = await supabase
        .from('site_settings')
        .select('*');

    if (error) {
        console.error('Error:', error);
        process.exit(1);
    }

    console.log('Current Settings:');
    console.log(JSON.stringify(data, null, 2));
}

checkSettings();
