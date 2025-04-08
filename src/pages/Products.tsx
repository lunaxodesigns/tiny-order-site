
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Mock products data
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

const Products = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });

  // Filter and sort products based on current filters
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceRange === 'under200' && product.price >= 200) {
      return false;
    }
    if (filters.priceRange === '200to300' && (product.price < 200 || product.price > 300)) {
      return false;
    }
    if (filters.priceRange === 'over300' && product.price <= 300) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort products
    if (filters.sortBy === 'priceAsc') {
      return a.price - b.price;
    }
    if (filters.sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    // Default: newest (could use product ID or date in a real application)
    return parseInt(b.id) - parseInt(a.id);
  });

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="container-custom text-center">
          <h1 className="font-serif mb-4">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted jewelry pieces, thoughtfully designed to elevate your everyday style and special moments.
          </p>
        </div>
      </div>
      
      {/* Product Listing */}
      <div className="container-custom py-12">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label htmlFor="category" className="mr-2 text-sm">Category:</label>
              <select 
                id="category"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="border border-gold/30 rounded px-3 py-1 bg-white"
              >
                <option value="all">All Categories</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="rings">Rings</option>
                <option value="bracelets">Bracelets</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="mr-2 text-sm">Price:</label>
              <select 
                id="price"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="border border-gold/30 rounded px-3 py-1 bg-white"
              >
                <option value="all">All Prices</option>
                <option value="under200">Under $200</option>
                <option value="200to300">$200 - $300</option>
                <option value="over300">Over $300</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="sort" className="mr-2 text-sm">Sort by:</label>
            <select 
              id="sort"
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="border border-gold/30 rounded px-3 py-1 bg-white"
            >
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="font-serif mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
