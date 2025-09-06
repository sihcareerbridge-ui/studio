import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database-types'; // This will be generated in a later step

const supabase = createPagesBrowserClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export default supabase;
