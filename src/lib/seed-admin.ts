
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database-types';
import * as readline from 'readline';

// IMPORTANT: Do not expose this to the browser
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

async function createAdmin() {
  const email = await question('Enter admin email: ');
  const password = await question('Enter admin password: ');

  if (!email || !password) {
    console.error('Email and password are required.');
    rl.close();
    return;
  }
  
  if (password.length < 6) {
    console.error('Password must be at least 6 characters long.');
    rl.close();
    return;
  }

  rl.close();

  console.log(`\nAttempting to create admin user for ${email}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Auto-confirm the email
    user_metadata: {
      role: 'admin',
      name: 'Admin User',
    },
  });

  if (error) {
    if (error.message.includes('User already exists')) {
        console.warn(`User with email ${email} already exists. Skipping creation.`);
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
