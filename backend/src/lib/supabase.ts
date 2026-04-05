import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase URL or Anon Key is missing in ADMIN PANEL. Using defaults for development.');
    console.log('Available Env keys:', Object.keys(import.meta.env).filter(k => k.includes('SUPABASE')));
} else {
    console.log('✅ Supabase initialized in Admin Panel.');
    console.log('Connected to:', supabaseUrl);
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
