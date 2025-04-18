
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, Heart, Gem } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-cream-light">
      <Helmet>
        <title>About Jewels by Indra | Our Story & Craftsmanship</title>
        <meta name="description" content="Discover the story behind Jewels by Indra, our commitment to craftsmanship, and our journey in creating timeless jewelry pieces." />
        <meta name="keywords" content="Jewels by Indra, jewelry craftsmanship, artisan jewelry, handmade jewelry, jewelry designer, sustainable jewelry" />
      </Helmet>

      <Navbar />

      <main className="container-custom py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Jewels by Indra, we believe that every piece of jewelry tells a story. Our journey began with a passion for creating timeless pieces that celebrate life's precious moments.
          </p>
        </div>

        {/* Founder Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
              alt="Jewelry artisan at work"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-4">Our Founder's Vision</h2>
            <p className="text-muted-foreground mb-6">
              Founded by Indra Josephine in 2020, our brand emerged from a deep appreciation for artisanal craftsmanship and sustainable practices. With over a decade of experience in fine jewelry design, Indra brings her unique perspective to each collection.
            </p>
            <p className="text-muted-foreground">
              Every piece in our collection is thoughtfully designed and handcrafted, combining traditional techniques with contemporary aesthetics to create jewelry that's both timeless and modern.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Award className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-3">Quality Craftsmanship</h3>
            <p className="text-muted-foreground">
              Each piece is meticulously crafted by skilled artisans using the finest materials and time-honored techniques.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Heart className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-3">Sustainable Practices</h3>
            <p className="text-muted-foreground">
              We're committed to ethical sourcing and sustainable practices throughout our creation process.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Gem className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-3">Timeless Design</h3>
            <p className="text-muted-foreground">
              Our designs blend classic elegance with modern sophistication for enduring beauty.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
