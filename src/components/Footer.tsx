
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cream text-foreground pt-12 pb-8 border-t border-gold/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Jewels by Indra</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Handcrafted jewelry that elevates your everyday style. Each piece is designed with intention and made with quality materials.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-gold">All Jewelry</Link></li>
              <li><Link to="/collections/necklaces" className="text-sm text-muted-foreground hover:text-gold">Necklaces</Link></li>
              <li><Link to="/collections/earrings" className="text-sm text-muted-foreground hover:text-gold">Earrings</Link></li>
              <li><Link to="/collections/bracelets" className="text-sm text-muted-foreground hover:text-gold">Bracelets</Link></li>
              <li><Link to="/collections/rings" className="text-sm text-muted-foreground hover:text-gold">Rings</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-gold">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-muted-foreground hover:text-gold">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-sm text-muted-foreground hover:text-gold">Returns & Exchanges</Link></li>
              <li><Link to="/sizing" className="text-sm text-muted-foreground hover:text-gold">Sizing Guide</Link></li>
              <li><Link to="/care" className="text-sm text-muted-foreground hover:text-gold">Jewelry Care</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg">Stay Connected</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive updates and exclusive offers.</p>
            <form className="space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-l-md border border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground hover:text-gold">Instagram</a>
              <a href="#" className="text-foreground hover:text-gold">Pinterest</a>
              <a href="#" className="text-foreground hover:text-gold">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gold/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Jewels by Indra. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-gold">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
