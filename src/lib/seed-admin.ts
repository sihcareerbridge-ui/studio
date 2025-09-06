import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database-types';

// IMPORTANT: Do not expose this to the browser
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAIL = 'admin@careermatch.com';
const ADMIN_PASSWORD = 'password'; // Use a strong password in a real scenario

async function createAdmin() {
  console.log('Attempting to create admin user...');

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true, // Auto-confirm the email
    user_metadata: {
      role: 'admin',
      name: 'Admin User',
    },
  });

  if (error) {
    if (error.message.includes('User already exists')) {
        console.warn(`User with email ${ADMIN_EMAIL} already exists. Skipping creation.`);
        return;
    }
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }

  if (data.user) {
    console.log('Admin user created successfully!');
    console.log('Email:', data.user.email);
    console.log('User ID:', data.user.id);
  }
}

createAdmin();
