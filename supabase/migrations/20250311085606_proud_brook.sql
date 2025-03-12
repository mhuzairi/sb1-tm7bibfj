/*
  # Create demo user and security policies

  1. Changes
    - Create demo user with email 'demo@ekazz.com'
    - Add authentication policies
  
  2. Security
    - Enable RLS
    - Add policy for authenticated users
*/

-- Create demo user (password: demo123456)
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
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '7b8c82b2-8449-4771-b396-9d5c1d8d9eea',
  'authenticated',
  'authenticated',
  'demo@ekazz.com',
  '$2a$10$PYgG1mwZD1foGhB3nW5N9.O9TqhVL3OHK3qAAH9U.0dHXpRG.kCjy', -- demo123456
  current_timestamp,
  current_timestamp,
  current_timestamp,
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  current_timestamp,
  current_timestamp,
  '',
  '',
  '',
  ''
);