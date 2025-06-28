
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const values = [
    {
      icon: Heart,
      title: "Passion for Perfume",
      description: "We believe that fragrance is an art form that speaks to the soul and creates lasting memories."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every bottle in our collection is carefully selected for its exceptional quality and unique character."
    },
    {
      icon: Users,
      title: "Personal Service",
      description: "Our fragrance experts are here to help you discover your perfect scent through personalized consultations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentPage="about"
      />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
            About <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Essence Boutique</span>
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed font-light">
            Founded with a passion for exceptional fragrances, Essence Boutique has been curating the world's finest perfumes for discerning customers who appreciate the art of scent.
          </p>
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-6">Our Story</h2>
            <p className="text-amber-700 leading-relaxed mb-6">
              Essence Boutique began as a dream to share the transformative power of fragrance with the world. Our founder, a renowned perfumer with over 20 years of experience, traveled the globe to discover the most exquisite scents from master perfumers and luxury houses.
            </p>
            <p className="text-amber-700 leading-relaxed mb-6">
              Today, we continue that tradition by offering a carefully curated selection of premium fragrances that tell stories, evoke emotions, and create lasting memories. Each bottle in our collection is chosen for its unique character and exceptional quality.
            </p>
            <p className="text-amber-700 leading-relaxed">
              We believe that finding your signature scent is a personal journey, and we're here to guide you every step of the way with our expertise and passion for the art of perfumery.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=600&fit=crop&q=80"
              alt="Perfume creation process"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute top-4 right-4">
              <Sparkles className="h-8 w-8 text-amber-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-playfair font-bold text-amber-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">{value.title}</h3>
                <p className="text-amber-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-900 mb-2">20+</div>
              <div className="text-amber-700">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900 mb-2">1000+</div>
              <div className="text-amber-700">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900 mb-2">50+</div>
              <div className="text-amber-700">Premium Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-900 mb-2">500+</div>
              <div className="text-amber-700">Unique Fragrances</div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center">
          <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-6">Our Mission</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed font-light">
            To make the world more beautiful, one fragrance at a time. We're committed to helping every customer discover their perfect scent and experience the joy and confidence that comes with wearing a fragrance that truly represents who they are.
          </p>
        </div>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default About;
