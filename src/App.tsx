import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Tablet, 
  Brain, 
  CreditCard, 
  LineChart,
  ShieldCheck,
  Boxes,
  Users,
  ArrowRight
} from 'lucide-react';
import { AuthPage } from './pages/auth';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { DashboardPage } from './pages/dashboard';
import { POSPage } from './pages/dashboard/pos';
import { InsightsPage } from './pages/dashboard/insights';
import { AnalyticsPage } from './pages/dashboard/analytics';
import { CustomersPage } from './pages/dashboard/customers';
import { SettingsPage } from './pages/dashboard/settings';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">A1.money</span>
              <span className="ml-1 text-sm text-gray-500">by Ekazz</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                AI-Powered Financial Management + POS
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                The complete solution for SMBs combining advanced financial tools with 
                modern tablet POS capabilities, powered by artificial intelligence.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 flex items-center group"
                >
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg hover:border-gray-400"
                >
                  Experience Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1661956602868-6ae368943878?auto=format&fit=crop&w=800&q=80"
                alt="Modern POS interface on tablet"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-contain bg-gray-50"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Business</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-indigo-600" />}
            title="AI Financial Dashboard"
            description="Get automated debt reduction strategies and real-time cash flow forecasting powered by AI."
          />
          <FeatureCard
            icon={<Tablet className="h-8 w-8 text-indigo-600" />}
            title="Tablet POS System"
            description="Modern point-of-sale with offline mode, split billing, and seamless kitchen integration."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-indigo-600" />}
            title="Fraud Detection"
            description="Advanced AI monitoring for both POS transactions and accounting entries."
          />
          <FeatureCard
            icon={<Boxes className="h-8 w-8 text-indigo-600" />}
            title="Smart Inventory"
            description="AI-powered stock predictions and automated purchase order generation."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-indigo-600" />}
            title="Customer Experience"
            description="Loyalty programs with facial recognition and voice-activated modifications."
          />
          <FeatureCard
            icon={<LineChart className="h-8 w-8 text-indigo-600" />}
            title="Cross-System Insights"
            description="Real-time POS data automatically adjusts financial forecasts and planning."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="49"
              features={[
                "Tablet POS + Inventory",
                "Budget tracking",
                "Low-stock alerts",
                "Email support"
              ]}
            />
            <PricingCard
              title="Pro"
              price="99"
              featured={true}
              features={[
                "Everything in Basic",
                "CRM + Loyalty Programs",
                "Debt optimizer",
                "5 AI recommendations/month",
                "Priority email support"
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="299"
              features={[
                "Everything in Pro",
                "Custom menu/order workflows",
                "Full forecasting suite",
                "Unlimited AI insights",
                "24/7 priority support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-2xl font-bold">A1.money</span>
                <span className="ml-1 text-sm text-gray-400">by Ekazz</span>
              </div>
              <p className="text-gray-400">
                Empowering SMBs with intelligent financial and POS solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2025 A1.money by Ekazz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="pos" element={<POSPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
}

function PricingCard({ title, price, features, featured = false }: PricingCardProps) {
  const navigate = useNavigate();
  return (
    <div className={`
      rounded-xl p-8
      ${featured ? 'bg-indigo-50 border-2 border-indigo-500' : 'bg-gray-50'}
    `}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-600">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`
        w-full py-2 px-4 rounded-lg font-medium
        ${featured 
          ? 'bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center group' 
          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'}
      `}
      onClick={() => navigate('/login')}
      >
        Get Started {featured && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
      </button>
    </div>
  );
}

export default App;