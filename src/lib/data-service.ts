import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database-types";

// NOTE: This is a SERVER-SIDE client.
// It should only be used in server components and server actions.
export const createSupabaseServerClient = () => {
    const cookieStore = cookies();
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
};


// Example data fetching function
export async function getInternships() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('internships')
        .select(`
            *,
            organizations (
                name,
                logo_url
            )
        `)
        .eq('status', 'Active');
    
    if (error) {
        console.error("Error fetching internships: ", error);
        return [];
    }

    // Transforming the data to match the old structure for minimal UI changes
    return data.map(item => ({
        id: item.id,
        title: item.title,
        organization: item.organizations?.name || 'N/A',
        logoUrl: item.organizations?.logo_url || '',
        location: item.location || 'N/A',
        duration: item.duration || 'N/A',
        description: item.description || '',
        tags: item.tags || [],
        status: item.status as 'Active' | 'Closed' | 'Blocked',
    }));
}
