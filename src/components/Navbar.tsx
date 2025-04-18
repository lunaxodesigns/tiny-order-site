
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cream-light py-4 sticky top-0 z-50 border-b border-gold/10 backdrop-blur-sm bg-cream-light/90">
      <div className="container-custom flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Brand logo */}
        <div className="flex-1 md:flex-none text-center md:text-left flex items-center gap-2">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/88394157-eb99-4eb9-9c52-ce3c64c30d5d.png" 
              alt="Jewels by Indra Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="font-serif text-2xl font-semibold tracking-wider text-foreground">
              Jewels by Indra
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-foreground hover:text-gold transition-colors">Home</Link>
          <Link to="/products" className="text-foreground hover:text-gold transition-colors">Shop</Link>
          <Link to="/about" className="text-foreground hover:text-gold transition-colors">About</Link>
          <Link to="/comments" className="text-foreground hover:text-gold transition-colors">Reviews</Link>
          <Link to="/contact" className="text-foreground hover:text-gold transition-colors">Contact</Link>
        </div>

        {/* Cart icon */}
        <div className="flex-1 md:flex-none flex justify-end">
          <Link to="/cart" className="relative text-foreground hover:text-gold transition-colors">
            <ShoppingBag size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-cream-light border-b border-gold/10 shadow-lg z-50">
          <div className="flex flex-col py-4 space-y-4 px-6">
            <Link to="/" className="text-foreground hover:text-gold transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="text-foreground hover:text-gold transition-colors" onClick={toggleMenu}>Shop</Link>
            <Link to="/about" className="text-foreground hover:text-gold transition-colors" onClick={toggleMenu}>About</Link>
            <Link to="/comments" className="text-foreground hover:text-gold transition-colors" onClick={toggleMenu}>Reviews</Link>
            <Link to="/contact" className="text-foreground hover:text-gold transition-colors" onClick={toggleMenu}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
