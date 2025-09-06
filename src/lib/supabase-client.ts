import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database-types';

export const createSupabaseBrowserClient = () => createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// This is a placeholder for the browser client.
// In a real app, you would use this in your client components.
const supabase = createSupabaseBrowserClient();

export default supabase;
