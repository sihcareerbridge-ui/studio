
'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { Database } from '@/lib/database-types';
import type { Role } from '@/lib/types';

const studentSchema = z.object({
  university: z.string().min(2, 'University is required.'),
  degree: z.string().min(2, 'Degree is required.'),
  skills: z.string().min(2, 'At least one skill is required.'),
  bio: z.string().optional(),
});

const hostSchema = z.object({
  organization: z.string().min(2, 'Organization name is required.'),
  website: z.string().url('Please enter a valid URL.'),
  bio: z.string().optional(),
});


export async function completeProfileAction(formData: FormData, role: Role) {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
            cookieStore.set({ name, value, ...options });
          },
        remove(name: string, options) {
            cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not found. Please log in again.' };
  }

  const rawFormData = Object.fromEntries(formData);
  
  if (role === 'student') {
    const parsed = studentSchema.safeParse(rawFormData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      };
    }
    const { university, degree, skills, bio } = parsed.data;

    const { error } = await supabase.from('students').insert({
        id: user.id,
        email: user.email!,
        name: user.user_metadata.name,
        university: university,
        degree: degree,
        skills: skills.split(',').map(s => s.trim()),
        bio: bio,
        // other fields can be null or have defaults
    });

    if (error) {
        console.error('Error creating student profile:', error);
        return { success: false, error: error.message };
    }

  } else if (role === 'host') {
    const parsed = hostSchema.safeParse(rawFormData);
     if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      };
    }
    const { organization, website, bio } = parsed.data;

    const { error } = await supabase.from('organizations').insert({
        owner_id: user.id,
        name: organization,
        email: user.email!,
        // website: website, // website column does not exist in schema
        bio: bio,
    });
     if (error) {
        console.error('Error creating host profile:', error);
        return { success: false, error: error.message };
    }
  }

  return { success: true };
}
