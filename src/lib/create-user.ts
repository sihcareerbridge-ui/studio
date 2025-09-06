
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database-types';
import * as readline from 'readline';
import type { Role } from './types';

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

async function createUser() {
  const email = await question('Enter user email: ');
  const password = await question('Enter user password: ');
  const role = await question('Enter user role (admin, host, or student): ') as Role;
  const name = await question('Enter user full name: ');

  if (!email || !password || !role || !name) {
    console.error('Email, password, role, and name are required.');
    rl.close();
    return;
  }

  if (!['admin', 'host', 'student'].includes(role)) {
    console.error('Invalid role. Must be one of: admin, host, student');
    rl.close();
    return;
  }
  
  if (password.length < 8) {
    console.error('Password must be at least 8 characters long.');
    rl.close();
    return;
  }

  rl.close();

  console.log(`\nAttempting to create ${role} user for ${email}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Auto-confirm the email
    user_metadata: {
      role: role,
      name: name,
    },
  });

  if (error) {
    if (error.message.includes('User already exists')) {
        console.warn(`User with email ${email} already exists. Skipping creation.`);
        return;
    }
    console.error('Error creating user:', error.message);
    process.exit(1);
  }

  if (data.user) {
    console.log('User created successfully!');
    console.log('Email:', data.user.email);
    console.log('User ID:', data.user.id);
  }
}

createUser();
