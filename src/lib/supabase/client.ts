import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Build-safe guard: return null if env vars are missing
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase env vars missing - returning null client');
        return null as any;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
