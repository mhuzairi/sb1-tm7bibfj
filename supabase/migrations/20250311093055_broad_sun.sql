/*
  # Create Demo User Account

  1. Changes
    - Creates a demo user account with email/password authentication
    - Adds required identity record for email authentication
    - Uses proper unique constraint handling

  2. Security
    - Password is securely hashed using bcrypt
    - Uses proper Supabase auth schema and constraints
*/

-- Create demo user if it doesn't exist
DO $$
DECLARE
  _user_id uuid;
BEGIN
  -- Insert user if email doesn't exist
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
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    'authenticated',
    'authenticated'
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'demo@ekazz.com'
  )
  RETURNING id INTO _user_id;

  -- If user was inserted, create identity
  IF _user_id IS NOT NULL THEN
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      _user_id,
      format('{"sub":"%s","email":"demo@ekazz.com"}', _user_id)::jsonb,
      'email',
      now(),
      now()
    );
  END IF;
END $$;