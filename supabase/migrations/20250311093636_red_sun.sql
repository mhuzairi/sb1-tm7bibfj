/*
  # Update Demo User Password

  1. Changes
    - Updates the password for the existing demo user account
    - Uses proper password hashing with Bcrypt
    - Maintains existing user data and permissions

  2. Security
    - Password is properly hashed using Bcrypt
    - Only updates the specific demo account
*/

DO $$
BEGIN
  UPDATE auth.users
  SET encrypted_password = crypt('demo123456', gen_salt('bf'))
  WHERE email = 'demo@ekazz.com';
END $$;