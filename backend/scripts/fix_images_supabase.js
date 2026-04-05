import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixImages() {
  console.log('🚀 Connecting to Supabase...');

  // 1. Fix 'Hạ tầng CNTT'
  const { data: sData, error: sError } = await supabase
    .from('services')
    .update({ 
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010ca63328?q=80&w=800&auto=format&fit=crop' 
    })
    .or('slug.eq.ha-tang-cntt,title.eq.Hạ tầng CNTT');

  if (sError) {
    console.error('❌ Error updating service:', sError.message);
  } else {
    console.log('✅ Updated Hạ tầng CNTT service image.');
  }

  // 2. Fix Banners
  const { data: bData, error: bError } = await supabase
    .from('banners')
    .update({ 
      image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop' 
    })
    .eq('title', 'Công nghệ vững chắc Vận hành bền bỉ');

  if (bError) {
    console.error('❌ Error updating banner:', bError.message);
  } else {
    console.log('✅ Updated Banner image.');
  }

  console.log('👋 Done.');
}

fixImages();
