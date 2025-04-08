
import { Link } from 'react-router-dom';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group fade-in relative overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-md mb-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
          
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-gold text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold-dark"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        
        <h3 className="font-serif text-lg mb-1 text-foreground">{product.name}</h3>
        <p className="text-gold font-medium">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
