import { useState } from 'react';
import { Search, Plus, Minus, Trash2, Receipt } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Espresso', price: 3.50, category: 'Beverages' },
  { id: 2, name: 'Cappuccino', price: 4.50, category: 'Beverages' },
  { id: 3, name: 'Croissant', price: 3.00, category: 'Pastries' },
  { id: 4, name: 'Chicken Sandwich', price: 8.50, category: 'Food' },
  { id: 5, name: 'Greek Salad', price: 9.00, category: 'Food' },
  { id: 6, name: 'Chocolate Cake', price: 5.50, category: 'Desserts' },
];

export function POSPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const filteredProducts = SAMPLE_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Current Order</h2>
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={cart.length === 0}>
            <Receipt className="h-5 w-5 mr-2" />
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}