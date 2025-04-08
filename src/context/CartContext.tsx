
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate subtotal
    const newSubtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems;

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item if it doesn't exist
        newItems = [...prevItems, { product, quantity }];
      }

      toast.success(`${product.name} added to cart`, {
        description: `Quantity: ${quantity}`,
        position: 'top-right',
      });

      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.product.id !== productId)
    );
    
    toast.info('Item removed from cart', {
      position: 'top-right',
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
