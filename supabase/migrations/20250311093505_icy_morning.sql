/*
  # Create Demo User Account

  1. Changes
    - Creates a demo user account with email and password
    - Sets up required authentication fields
    - Uses proper password hashing
    - Includes necessary metadata for Supabase Auth
    - Prevents duplicate entries

  2. Security
    - Password is properly hashed using Bcrypt
    - User is created with authenticated role
*/

-- Create the demo user with all required fields in a single transaction
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'demo@ekazz.com',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'demo@ekazz.com'
);