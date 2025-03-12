import { useState } from 'react';
import { Search, Filter, MoreVertical, Star, Mail, Phone } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  loyaltyPoints: number;
  status: 'active' | 'inactive';
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '(555) 123-4567',
    totalOrders: 42,
    totalSpent: 1250.80,
    lastVisit: '2024-03-15',
    loyaltyPoints: 450,
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '(555) 234-5678',
    totalOrders: 28,
    totalSpent: 890.50,
    lastVisit: '2024-03-12',
    loyaltyPoints: 280,
    status: 'active'
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    phone: '(555) 345-6789',
    totalOrders: 15,
    totalSpent: 450.25,
    lastVisit: '2024-02-28',
    loyaltyPoints: 150,
    status: 'inactive'
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    phone: '(555) 456-7890',
    totalOrders: 35,
    totalSpent: 980.60,
    lastVisit: '2024-03-14',
    loyaltyPoints: 350,
    status: 'active'
  }
];

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredCustomers = SAMPLE_CUSTOMERS.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || customer.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your customer relationships and view customer insights.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button>
            Add Customer
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loyalty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">Last visit: {customer.lastVisit}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.totalOrders} orders
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-900">{customer.loyaltyPoints} points</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}