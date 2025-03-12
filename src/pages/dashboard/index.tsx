import { useEffect, useState } from 'react';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, customers: 2400 },
  { name: 'Tue', sales: 3000, customers: 1398 },
  { name: 'Wed', sales: 2000, customers: 9800 },
  { name: 'Thu', sales: 2780, customers: 3908 },
  { name: 'Fri', sales: 1890, customers: 4800 },
  { name: 'Sat', sales: 2390, customers: 3800 },
  { name: 'Sun', sales: 3490, customers: 4300 },
];

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: DollarSign,
  },
  {
    name: 'Daily Sales',
    value: '2,190',
    change: '+15.3%',
    icon: LineChartIcon,
  },
  {
    name: 'Active Customers',
    value: '1,423',
    change: '+12.5%',
    icon: Users,
  },
  {
    name: 'Growth Rate',
    value: '23.1%',
    change: '+4.3%',
    icon: TrendingUp,
  },
];

export function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{greeting}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sales Overview
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4f46e5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#9333ea"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}