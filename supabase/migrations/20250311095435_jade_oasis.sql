/*
  # Advanced Features Schema

  1. New Tables
    - `customers`
      - Customer profiles and loyalty data
    - `loyalty_points`
      - Points transactions and history
    - `ai_recommendations`
      - AI-generated insights and recommendations
    - `custom_workflows`
      - Custom POS and order workflows
    - `debt_analysis`
      - Debt tracking and optimization suggestions
    - `forecasts`
      - Business forecasts and predictions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Customers table for CRM
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text,
  phone text,
  loyalty_tier text DEFAULT 'bronze',
  total_points integer DEFAULT 0,
  total_spent decimal(10,2) DEFAULT 0,
  last_visit timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Loyalty points transactions
CREATE TABLE IF NOT EXISTS loyalty_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  points integer NOT NULL,
  transaction_type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- AI recommendations
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  impact_score decimal(3,2),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  implemented_at timestamptz
);

-- Custom workflows
CREATE TABLE IF NOT EXISTS custom_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  description text,
  workflow_type text NOT NULL,
  steps jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Debt analysis
CREATE TABLE IF NOT EXISTS debt_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  debt_name text NOT NULL,
  amount decimal(10,2) NOT NULL,
  interest_rate decimal(5,2),
  priority_score decimal(3,2),
  optimization_strategy text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forecasts
CREATE TABLE IF NOT EXISTS forecasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  forecast_type text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  data jsonb NOT NULL,
  confidence_score decimal(3,2),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE debt_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE forecasts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own customers"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own customers"
  ON customers FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their customers' loyalty points"
  ON loyalty_points FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM customers
    WHERE customers.id = loyalty_points.customer_id
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their customers' loyalty points"
  ON loyalty_points FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM customers
    WHERE customers.id = loyalty_points.customer_id
    AND customers.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM customers
    WHERE customers.id = loyalty_points.customer_id
    AND customers.user_id = auth.uid()
  ));

CREATE POLICY "Users can view their recommendations"
  ON ai_recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their recommendations"
  ON ai_recommendations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their workflows"
  ON custom_workflows FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their workflows"
  ON custom_workflows FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their debt analysis"
  ON debt_analysis FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their debt analysis"
  ON debt_analysis FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their forecasts"
  ON forecasts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their forecasts"
  ON forecasts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS customers_user_id_idx ON customers(user_id);
CREATE INDEX IF NOT EXISTS loyalty_points_customer_id_idx ON loyalty_points(customer_id);
CREATE INDEX IF NOT EXISTS ai_recommendations_user_id_idx ON ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS custom_workflows_user_id_idx ON custom_workflows(user_id);
CREATE INDEX IF NOT EXISTS debt_analysis_user_id_idx ON debt_analysis(user_id);
CREATE INDEX IF NOT EXISTS forecasts_user_id_idx ON forecasts(user_id);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_workflows_updated_at
  BEFORE UPDATE ON custom_workflows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_debt_analysis_updated_at
  BEFORE UPDATE ON debt_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();