
import { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { SearchFilter } from '@/components/SearchFilter';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const categories = ['All', 'Floral', 'Oriental', 'Citrus', 'Gourmand', 'Aquatic'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentPage="home"
      />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-16" id="products-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
            Our <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our carefully curated selection of premium fragrances, each bottle containing a unique story waiting to be discovered
          </p>
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
          </div>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <ProductGrid 
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          priceRange={priceRange}
        />
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

export default Index;
