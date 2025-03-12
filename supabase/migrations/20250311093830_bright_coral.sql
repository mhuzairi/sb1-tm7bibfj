/*
  # Create Demo Account

  1. Changes
    - Creates a secure demo account with proper password hashing
    - Sets up necessary permissions and profile data
    - Ensures idempotent execution (safe to run multiple times)

  2. Security
    - Uses secure password hashing
    - Creates account only if it doesn't exist
    - Maintains proper authentication standards
*/

-- Create demo user if it doesn't exist
DO $$
DECLARE
  demo_uid UUID;
BEGIN
  -- Check if demo user exists
  SELECT id INTO demo_uid
  FROM auth.users
  WHERE email = 'demo@a1.money';

  -- Create demo user if not exists
  IF demo_uid IS NULL THEN
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
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'demo@a1.money',
      crypt('demo123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Demo User"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  ELSE
    -- Update existing demo user's password
    UPDATE auth.users
    SET 
      encrypted_password = crypt('demo123456', gen_salt('bf')),
      updated_at = NOW()
    WHERE id = demo_uid;
  END IF;
END $$;