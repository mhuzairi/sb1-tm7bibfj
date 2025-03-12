import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, Users, ShoppingBag, Clock } from 'lucide-react';

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const categoryData = [
  { name: 'Beverages', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Desserts', value: 200 },
  { name: 'Other', value: 100 },
];

const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#9333ea'];

const metrics = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Average Order',
    value: '$45.67',
    change: '-2.4%',
    trend: 'down',
    icon: ShoppingBag,
  },
  {
    title: 'Avg. Service Time',
    value: '12 min',
    change: '+5.3%',
    trend: 'up',
    icon: Clock,
  },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Key metrics and performance indicators for your business.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <metric.icon className="h-6 w-6 text-gray-400" />
              <span className={`text-sm font-medium flex items-center ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}