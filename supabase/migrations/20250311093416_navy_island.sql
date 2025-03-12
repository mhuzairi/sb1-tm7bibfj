/*
  # Create Demo User Account

  1. Changes
    - Creates a demo user account with email and password
    - Sets up required authentication fields
    - Uses simplified approach for better reliability
*/

-- Create the demo user account
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
)
SELECT
  gen_random_uuid(),
  'demo@ekazz.com',
  crypt('demo123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'demo@ekazz.com'
);