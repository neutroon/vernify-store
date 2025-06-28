
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Collections = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const collections = [
    {
      name: "Signature Collection",
      description: "Our most exclusive and sought-after fragrances",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=600&fit=crop&q=80",
      count: "12 Fragrances"
    },
    {
      name: "Floral Garden",
      description: "Delicate and romantic scents inspired by blooming gardens",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80",
      count: "8 Fragrances"
    },
    {
      name: "Oriental Mystique",
      description: "Rich, warm, and mysterious fragrances from the East",
      image: "https://images.unsplash.com/photo-1594736797933-d0a0ba3fe65a?w=800&h=600&fit=crop&q=80",
      count: "10 Fragrances"
    },
    {
      name: "Fresh Citrus",
      description: "Bright, energizing scents perfect for everyday wear",
      image: "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=800&h=600&fit=crop&q=80",
      count: "6 Fragrances"
    },
    {
      name: "Gourmand Delights",
      description: "Sweet, edible-inspired fragrances that tantalize the senses",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&h=600&fit=crop&q=80",
      count: "7 Fragrances"
    },
    {
      name: "Aquatic Breeze",
      description: "Fresh, clean scents reminiscent of ocean waves",
      image: "https://images.unsplash.com/photo-1586807480822-0e95ba6fe1d0?w=800&h=600&fit=crop&q=80",
      count: "5 Fragrances"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentPage="collections"
      />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
            Our <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Collections</span>
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our carefully curated fragrance collections, each telling a unique olfactory story
          </p>
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-6 w-6 text-amber-300 animate-pulse" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-playfair font-bold mb-2">{collection.name}</h3>
                  <p className="text-sm text-white/90 mb-3">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-300 font-medium">{collection.count}</span>
                    <Button size="sm" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30">
                      Explore <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-8 py-4">
            View All Products
          </Button>
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

export default Collections;
