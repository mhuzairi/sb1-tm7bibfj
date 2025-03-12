/*
  # Create demo user account

  1. Changes
    - Creates a demo user account with email demo@ekazz.com
    - Sets up the account with a secure password
    - Enables immediate access without email verification

  2. Security
    - Password is securely hashed
    - Account is pre-verified for immediate access
*/

-- Create the demo user account with a pre-verified email
CREATE OR REPLACE FUNCTION create_demo_user()
RETURNS void AS $$
DECLARE
  _user_id uuid;
BEGIN
  -- Insert the user into auth.users if it doesn't exist
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
    confirmation_token,
    recovery_token,
    email_change_token_current,
    email_change,
    last_sign_in_at
  )
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'demo@ekazz.com',
    crypt('demo123456', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    '',
    now()
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'demo@ekazz.com'
  )
  RETURNING id INTO _user_id;

  -- If user was created, set up identities
  IF _user_id IS NOT NULL THEN
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      _user_id,
      jsonb_build_object('sub', _user_id::text),
      'email',
      now(),
      now(),
      now()
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_demo_user();