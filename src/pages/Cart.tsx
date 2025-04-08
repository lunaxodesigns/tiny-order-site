
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  
  // Calculate shipping
  const shipping = subtotal > 200 ? 0 : 15;
  
  // Calculate total
  const total = subtotal + shipping;
  
  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-light">
        <Navbar />
        
        <div className="container-custom py-20">
          <h1 className="font-serif text-center mb-6">Your Cart</h1>
          
          <div className="max-w-lg mx-auto text-center space-y-6 py-10">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground" />
            <h2 className="font-serif text-2xl">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added any jewelry to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
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
        <h1 className="font-serif text-center mb-12">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Header (desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-gold/10 text-sm text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-gold/10">
                {/* Product Image and Info */}
                <div className="md:col-span-6 flex gap-4">
                  <div className="w-20 h-20 bg-white rounded-md overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1 md:hidden"
                    >
                      <Trash2 size={14} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="md:hidden">Price:</span>
                  <span>${item.product.price.toFixed(2)}</span>
                </div>
                
                {/* Quantity */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="md:hidden">Quantity:</span>
                  <div className="flex items-center border border-gold/30 rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-muted-foreground hover:text-gold"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2 py-1 w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-muted-foreground hover:text-gold"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Total and Remove button */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                  <span className="md:hidden">Total:</span>
                  <div className="flex flex-col items-end">
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1 hidden md:flex"
                    >
                      <Trash2 size={14} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Continue Shopping */}
            <div className="flex justify-start pt-4">
              <Link to="/products" className="text-gold hover:text-gold-dark flex items-center">
                <ArrowRight size={16} className="mr-2 transform rotate-180" /> Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-6 rounded-md">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              
              <div className="space-y-4">
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
                
                {shipping > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="h-px bg-gold/10 w-full" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Link to="/checkout" className="btn-primary w-full text-center py-3 mt-4 block">
                  Proceed to Checkout
                </Link>
                
                <div className="text-xs text-center text-muted-foreground mt-4">
                  Taxes calculated at checkout. Shipping is free on orders over $200.
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

export default Cart;
