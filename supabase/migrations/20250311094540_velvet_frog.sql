/*
  # Authentication Schema Setup

  1. New Tables
    - `auth.users`: Core user table with essential fields
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `encrypted_password` (text)
      - `email_confirmed_at` (timestamptz)
      - `last_sign_in_at` (timestamptz)
      - `raw_app_meta_data` (jsonb)
      - `raw_user_meta_data` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `role` (text)
      - `is_super_admin` (boolean)

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users to read their own data
    - Add policy for user management
*/

-- Create auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  email_confirmed_at timestamptz DEFAULT now(),
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  role text DEFAULT 'authenticated',
  is_super_admin boolean DEFAULT false,
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON auth.users (created_at);

-- Insert demo user if it doesn't exist
INSERT INTO auth.users (
  email,
  encrypted_password,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  email_confirmed_at
) 
SELECT 
  'demo@a1.money',
  crypt('demo123456', gen_salt('bf')),
  'authenticated',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'demo@a1.money'
);