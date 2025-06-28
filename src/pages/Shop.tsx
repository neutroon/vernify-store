
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { SearchFilter } from '@/components/SearchFilter';
import { EnhancedCart } from '@/components/EnhancedCart';
import { usePersistentCart } from '@/hooks/usePersistentCart';
import { usePersistentFavorites } from '@/hooks/usePersistentFavorites';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const categories = ['All', 'Floral', 'Woody', 'Fresh', 'Oriental', 'Citrus'];

  const { 
    cartItems, 
    isCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    toggleCart 
  } = usePersistentCart();

  const { 
    favorites, 
    toggleFavorite, 
    isFavorite 
  } = usePersistentFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={toggleCart}
        currentPage="shop"
      />
      
      <main className="container mx-auto px-4 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
            Fragrance <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our exquisite selection of premium fragrances, each carefully crafted to tell its own unique story
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
          isFavorite={isFavorite}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          priceRange={priceRange}
        />
      </main>

      <EnhancedCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
      />

      <Footer />
    </div>
  );
};

export default Shop;
