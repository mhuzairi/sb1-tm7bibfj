/*
  # Create demo user account

  1. Changes
    - Creates a demo user account if it doesn't exist
    - Sets up proper authentication identity
    - Uses email demo@a1.money to match the auth form

  2. Security
    - Properly hashes password using bcrypt
    - Sets up minimal required user data
    - Handles existing user gracefully
*/

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
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@a1.money',
    crypt('demo123456', gen_salt('bf')),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
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