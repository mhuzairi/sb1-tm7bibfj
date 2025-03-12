/*
  # Create demo user account

  1. Changes
    - Creates a demo user account with credentials:
      - Email: demo@ekazz.com
      - Password: demo123456
    - Uses Supabase's built-in auth system
    - Ensures email uniqueness

  2. Security
    - Password is securely hashed
    - Uses Supabase's auth schema
*/

-- Create the demo user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'demo@ekazz.com'
  ) THEN
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
    ) VALUES (
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
    );
  END IF;
END $$;