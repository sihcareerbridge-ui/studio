
'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { Database } from '@/lib/database-types';
import type { Role } from '@/lib/types';
import { redirect } from 'next/navigation';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  name: z.string().min(2, 'Name is required.'),
});

export async function signup(formData: FormData) {
  const cookieStore = cookies();
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

  const parsed = signupSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { email, password, name } = parsed.data;

  // This action will now ONLY create the user in auth.users
  // and set their name. Role selection happens after email confirmation.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'pending', // A temporary status
        name: name,
        role_selected: false,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user?.identities?.length === 0) {
    return { success: false, error: 'This user already exists. Please try logging in.' };
  }

  return { success: true, message: 'Check your email to confirm signup.' };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required.'),
});

export async function login(formData: FormData) {
  const cookieStore = cookies();
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

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(', '),
      role: null,
    };
  }

  const { email, password } = parsed.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message, role: null };
  }
  
  if (data.user?.user_metadata.role_selected === false) {
    redirect('/select-role');
  }

  return { success: true, role: data.user.user_metadata.role as Role, error: null };
}


const resetPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
});

export async function requestPasswordReset(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
          },
        }
      );

    const parsed = resetPasswordSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      };
    }
    
    const { email } = parsed.data;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, message: 'Password reset link sent. Please check your email.' };
}

export async function setRoleAction(role: Role) {
    const cookieStore = cookies();
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
        return { success: false, error: 'User not found.' };
    }

    const { error } = await supabase.auth.updateUser({
        data: {
            role: role,
            role_selected: true
        }
    });

    if (error) {
        return { success: false, error: error.message };
    }
    
    // In a real app, you would have a database trigger to create a profile row.
    // For now, we redirect to a profile completion page.
    redirect('/complete-profile');
}
