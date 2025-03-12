import { useState } from 'react';
import { Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Menu,
  X,
  Home,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Brain,
  LineChart,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'POS', href: '/dashboard/pos', icon: CreditCard },
  { name: 'AI Insights', href: '/dashboard/insights', icon: Brain },
  { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <div className="relative flex w-full max-w-xs flex-1">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
            <Button variant="ghost" onClick={async () => {
              await signOut();
              navigate('/');
            }}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link to="/" className="flex items-center" onClick={onClose}>
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-indigo-400" />
            <span className="ml-2 text-2xl font-bold text-white">A1.money</span>
            <span className="ml-1 text-sm text-gray-400">by Ekazz</span>
          </div>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}