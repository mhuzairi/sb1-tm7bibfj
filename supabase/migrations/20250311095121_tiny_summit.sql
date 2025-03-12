/*
  # Create demo user

  1. Changes
    - Creates a demo user account with email 'demo@a1.money'
    - Sets up proper authentication identities
    - Uses proper password hashing
    - Avoids setting generated columns directly

  2. Notes
    - The confirmed_at column is automatically generated, so we don't set it directly
    - Uses proper error handling for existing users
*/

-- Create the demo user with properly hashed password
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert the user if they don't exist
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@a1.money',
    crypt('demo123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO new_user_id;

  -- If we inserted a new user, set up their identity
  IF new_user_id IS NOT NULL THEN
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      new_user_id,
      json_build_object('sub', new_user_id::text, 'email', 'demo@a1.money'),
      'email',
      now(),
      now(),
      now()
    );
  END IF;
END $$;