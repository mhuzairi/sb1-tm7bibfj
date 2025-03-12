/*
  # Create authentication schema

  1. Changes
    - Create auth schema if it doesn't exist
    - Create users table with proper configuration
    - Add RLS policies for user management
    - Configure email authentication

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  is_super_admin boolean DEFAULT false,
  role text DEFAULT 'authenticated',
  email_confirmed_at timestamptz DEFAULT now(),
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own data"
  ON auth.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Insert demo user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@a1.money') THEN
    INSERT INTO auth.users (
      email,
      encrypted_password,
      role,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      'demo@a1.money',
      crypt('demo123456', gen_salt('bf')),
      'authenticated',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb
    );
  END IF;
END $$;