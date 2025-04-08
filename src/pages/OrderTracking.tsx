
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Clock, Package, Truck } from 'lucide-react';

// Mock order data - in a real app this would come from a database
const mockOrder = {
  id: 'INDRA-8742',
  date: '2025-04-07',
  status: 'processing',
  items: [
    {
      id: '1',
      name: 'Gold Lunar Pendant',
      price: 249.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Pearl Drop Earrings',
      price: 189.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    }
  ],
  shipping: {
    method: 'Standard Shipping',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    estimatedDelivery: '2025-04-12',
  },
  subtotal: 439.98,
  shipping_cost: 0,
  total: 439.98,
  tracking_number: 'USPS-1234567890',
};

// Possible order statuses
const orderStatuses = [
  { key: 'processing', label: 'Processing', icon: Clock, color: 'bg-blue-500' },
  { key: 'shipped', label: 'Shipped', icon: Package, color: 'bg-purple-500' },
  { key: 'intransit', label: 'In Transit', icon: Truck, color: 'bg-orange-500' },
  { key: 'delivered', label: 'Delivered', icon: Check, color: 'bg-green-500' },
];

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(mockOrder); // In a real app, this would be null initially
  const [lookupMode, setLookupMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim() || !email.trim()) {
      setError('Please enter both order number and email');
      return;
    }
    
    // In a real app, you would fetch the order data from your backend
    // For now, we'll just check if the orderNumber matches our mock order
    if (orderNumber === 'INDRA-8742') {
      setOrder(mockOrder);
      setError('');
    } else {
      setError('Order not found. Please check your information and try again.');
    }
  };

  const handleLookupOrderClick = () => {
    setLookupMode(true);
    setOrder(null as any);
  };

  // Helper function to get current step in the order process
  const getCurrentStep = () => {
    const statusIndex = orderStatuses.findIndex(status => status.key === order?.status);
    return statusIndex >= 0 ? statusIndex : 0;
  };

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      
      <div className="container-custom py-12">
        <h1 className="font-serif text-center mb-12">Order Tracking</h1>
        
        {!order || lookupMode ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-serif text-xl mb-6">Track Your Order</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block text-sm mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. INDRA-8742"
                  className="w-full px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <button type="submit" className="btn-primary w-full py-3">
                Track Order
              </button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Use order number INDRA-8742 for demo purposes.
              </p>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl">Order #{order.id}</h2>
              <button 
                onClick={handleLookupOrderClick}
                className="text-sm text-gold hover:text-gold-dark"
              >
                Look up a different order
              </button>
            </div>
            
            {/* Order Status */}
            <div className="mb-12">
              <h3 className="font-serif text-lg mb-6">Status: {orderStatuses.find(s => s.key === order.status)?.label}</h3>
              
              <div className="relative">
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200 absolute top-5 left-0 right-0 z-0">
                  <div 
                    className="h-1 bg-gold"
                    style={{ width: `${(getCurrentStep() / (orderStatuses.length - 1)) * 100}%` }}
                  ></div>
                </div>
                
                {/* Status Steps */}
                <div className="flex justify-between relative z-10">
                  {orderStatuses.map((status, index) => {
                    const StatusIcon = status.icon;
                    const isCurrent = order.status === status.key;
                    const isCompleted = getCurrentStep() > index;
                    
                    return (
                      <div key={status.key} className="flex flex-col items-center">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCurrent 
                              ? 'bg-gold text-white' 
                              : isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <StatusIcon size={18} />
                        </div>
                        <span className={`text-sm mt-2 ${isCurrent ? 'font-medium' : ''}`}>
                          {status.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Order Details */}
              <div>
                <h3 className="font-serif text-lg mb-4">Order Details</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                    
                    <span className="text-muted-foreground">Shipping Method:</span>
                    <span>{order.shipping.method}</span>
                    
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span>{new Date(order.shipping.estimatedDelivery).toLocaleDateString()}</span>
                    
                    {order.tracking_number && (
                      <>
                        <span className="text-muted-foreground">Tracking Number:</span>
                        <span>{order.tracking_number}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gold/10">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm">{order.shipping.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <h3 className="font-serif text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-4 max-h-[200px] overflow-y-auto mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-gold/10">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gold/10 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {order.shipping_cost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${order.shipping_cost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link to="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
