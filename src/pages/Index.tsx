
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

// Mock featured products data
const featuredProducts = [
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
];

// Mock collections data
const collections = [
  {
    id: "necklaces",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    description: "Elegant pendants and statement pieces"
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    description: "From studs to drops, find your perfect match"
  },
  {
    id: "rings",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    description: "Symbols of elegance for every occasion"
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    description: "Delicate chains and statement cuffs"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616097970275-1e187b4ce59f?auto=format&fit=crop&w=2000&q=80"
            alt="Jewelry collection"
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-center items-start">
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-white mb-4 drop-shadow-md">Artisanal Jewelry for the Modern Woman</h1>
            <p className="text-white text-lg mb-8 drop-shadow-md">
              Each piece tells a story, crafted with intention and designed to elevate your everyday.
            </p>
            <div className="flex space-x-4">
              <Link to="/products" className="btn-primary">
                Shop Collection
              </Link>
              <Link to="/about" className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-black">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 container-custom">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif">New Arrivals</h2>
          <Link to="/products" className="text-gold hover:text-gold-dark flex items-center">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Collections */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <h2 className="font-serif text-center mb-16">Shop by Collection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection) => (
              <Link 
                to={`/collections/${collection.id}`} 
                key={collection.id}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-md mb-4">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl text-white drop-shadow-md">{collection.name}</h3>
                  </div>
                </div>
                <p className="text-foreground">{collection.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="py-20 bg-cream-light">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h2 className="font-serif mb-12">What Our Customers Say</h2>
          
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
            <p className="italic text-lg md:text-xl mb-6">
              "I've received countless compliments on my Indra necklace. The craftsmanship is exceptional, and it's become my everyday statement piece. Worth every penny!"
            </p>
            <p className="font-medium">— Sarah J., verified customer</p>
          </div>
        </div>
      </section>
      
      {/* About */}
      <section className="py-20 bg-gold-light/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80" 
                alt="Jewelry crafting" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="font-serif mb-6">Crafted with Intention</h2>
              <p className="mb-6">
                At Jewels by Indra, each piece is carefully designed and handcrafted using traditional techniques and ethically sourced materials. Our commitment to quality and sustainability means you're not just wearing jewelry – you're wearing a piece of art with purpose.
              </p>
              <Link to="/about" className="btn-outline inline-block">
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed */}
      <section className="py-20 container-custom">
        <h2 className="font-serif text-center mb-16">Follow Our Journey</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <a href="#" key={idx} className="block aspect-square overflow-hidden rounded-md">
              <img 
                src={`https://images.unsplash.com/photo-${1600000000000 + idx * 1000}?auto=format&fit=crop&w=400&q=80`} 
                alt="Instagram post" 
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              />
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="text-gold hover:text-gold-dark inline-flex items-center">
            @jewelsbyindra <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
