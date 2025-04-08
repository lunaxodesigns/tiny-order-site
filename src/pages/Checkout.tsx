
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAddress: boolean;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  sameAddress: true,
};

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Calculate shipping and total
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: val,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    // Basic validation (can be expanded)
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would submit the order to your backend here
      // For now, we'll just simulate a successful order
      
      setTimeout(() => {
        // Show order confirmation
        setOrderPlaced(true);
        
        // Clear cart after successful order
        clearCart();
        
        // Show success toast
        toast.success('Order placed successfully!', {
          description: 'Thank you for your purchase.',
          position: 'top-right',
        });
        
        // In a real app, you would redirect to a order confirmation page with the order ID
        // For now we'll just display a confirmation message
      }, 1000);
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-cream-light">
        <Navbar />
        
        <div className="container-custom py-20 text-center">
          <h1 className="font-serif mb-6">Your Cart is Empty</h1>
          <p className="mb-8">You need to add items to your cart before proceeding to checkout.</p>
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Order confirmation view
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-cream-light">
        <Navbar />
        
        <div className="container-custom py-20 max-w-2xl mx-auto text-center">
          <div className="bg-white p-10 rounded-lg shadow-sm">
            <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
            <h1 className="font-serif text-3xl mb-4">Order Confirmed!</h1>
            <p className="mb-8 text-muted-foreground">
              Thank you for your purchase! Your order #INDRA-{Math.floor(Math.random() * 10000)} has been placed and is being processed.
            </p>
            <p className="mb-4">
              We've sent a confirmation email to <span className="font-medium">{formData.email}</span> with your order details.
            </p>
            <div className="mt-10 space-y-4">
              <Link to="/order-tracking" className="btn-primary block w-full py-3">
                Track Your Order
              </Link>
              <Link to="/" className="text-gold hover:text-gold-dark inline-flex items-center">
                <ArrowLeft size={16} className="mr-2" /> Return to Home
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link to="/cart" className="text-muted-foreground hover:text-gold flex items-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Cart
          </Link>
        </div>
        
        <h1 className="font-serif text-center mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Shipping Address</h2>
                
                <div>
                  <label htmlFor="address" className="block text-sm mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.city ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm mb-1">
                      Zip/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.zipCode ? 'border-red-300' : 'border-gold/30'} rounded-md focus:outline-none focus:ring-1 focus:ring-gold`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm mb-1">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gold/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    name="sameAddress"
                    checked={formData.sameAddress}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="sameAddress" className="text-sm">
                    Billing address is same as shipping address
                  </label>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Payment Information</h2>
                <p className="text-muted-foreground mb-2">
                  Payment will be handled securely in the next step after order placement.
                </p>
              </div>
              
              {/* Review order and submit */}
              <div className="mt-8">
                <button 
                  type="submit" 
                  className="btn-primary w-full py-3"
                >
                  Place Order <ArrowRight size={16} className="ml-2" />
                </button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 rounded-md sticky top-24">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              
              {/* Cart Items Summary */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 border-t border-gold/10 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="h-px bg-gold/10 w-full" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
