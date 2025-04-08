
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

// Mock products data (same as in Products.tsx)
const allProducts = [
  {
    id: "1",
    name: "Gold Lunar Pendant",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    description: "A stunning crescent moon pendant crafted in 18k gold with delicate detailing."
  },
  {
    id: "2",
    name: "Pearl Drop Earrings",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    category: "earrings",
    description: "Elegant freshwater pearl earrings set in sterling silver, perfect for every occasion."
  },
  {
    id: "3",
    name: "Diamond Constellation Ring",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
    category: "rings",
    description: "A celestial-inspired ring featuring ethically sourced diamonds set in 14k gold."
  },
  {
    id: "4",
    name: "Sapphire Tennis Bracelet",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1603561596142-501172dded88?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    description: "An elegant bracelet featuring a continuous line of blue sapphires in a delicate gold setting."
  },
  {
    id: "5",
    name: "Emerald Stud Earrings",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1586878341524-7c93a915283e?auto=format&fit=crop&w=800&q=80",
    category: "earrings",
    description: "Classic emerald studs set in 14k gold, perfect for everyday elegance."
  },
  {
    id: "6",
    name: "Twisted Gold Bangle",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1608050072142-ade9265d4cc5?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    description: "A modern bangle with a distinctive twisted design in polished 18k gold."
  },
  {
    id: "7",
    name: "Opal Statement Necklace",
    price: 319.99,
    image: "https://images.unsplash.com/photo-1551836022-aadb801c60e9?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    description: "A striking statement necklace featuring Australian opals set in sterling silver."
  },
  {
    id: "8",
    name: "Rose Gold Twist Ring",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category: "rings",
    description: "An elegant twisted band in warm rose gold, the perfect everyday ring."
  },
];

// Additional product details for the mock data
const productDetails = {
  "1": {
    materials: "18k Gold",
    dimensions: "Chain: 18 inches, Pendant: 1.2 inches",
    care: "Clean with warm soapy water and a soft cloth. Store in a jewelry box when not wearing.",
    additionalImages: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565518020493-364574032648?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    ]
  },
  // Additional product details would be added for other products in a real application
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Find the product from our "database"
  const product = allProducts.find(p => p.id === productId) as Product;
  
  // Get product details if available
  const details = productId ? productDetails[productId as keyof typeof productDetails] : null;
  
  // Get similar products (same category)
  const similarProducts = product 
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) 
    : [];

  // Handle quantity change
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Reset scroll position when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setSelectedImage(0);
  }, [productId]);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-cream-light">
        <Navbar />
        <div className="container-custom py-20 text-center">
          <h1 className="font-serif mb-6">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      
      <div className="container-custom py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/products" className="text-muted-foreground hover:text-gold flex items-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-md bg-white">
              {details && details.additionalImages ? (
                <img 
                  src={details.additionalImages[selectedImage]} 
                  alt={product.name} 
                  className="object-contain w-full h-full"
                />
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            
            {/* Thumbnail Images */}
            {details && details.additionalImages && (
              <div className="flex space-x-2">
                {details.additionalImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-gold' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h5 className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </h5>
              <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.name}</h1>
              <p className="text-2xl text-gold font-medium">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="h-px bg-gold/10 w-full" />
            
            <div>
              <p className="text-foreground">{product.description}</p>
            </div>
            
            {details && (
              <div className="space-y-4">
                <div className="h-px bg-gold/10 w-full" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-serif text-sm mb-1">Materials</h3>
                    <p className="text-sm text-muted-foreground">{details.materials}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm mb-1">Dimensions</h3>
                    <p className="text-sm text-muted-foreground">{details.dimensions}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif text-sm mb-1">Care Instructions</h3>
                  <p className="text-sm text-muted-foreground">{details.care}</p>
                </div>
                
                <div className="h-px bg-gold/10 w-full" />
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-4">Quantity</span>
                <div className="flex items-center border border-gold/30 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-muted-foreground hover:text-gold"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-muted-foreground hover:text-gold"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
            </div>
            
            {/* Free Shipping Notice */}
            <div className="bg-cream rounded-md p-4 text-center">
              <p className="text-sm">
                Free shipping on all orders over $200. 30-day returns.
              </p>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif mb-10">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
