
import { HeroSection } from '@/components/HeroSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { CustomerReviews } from '@/components/CustomerReviews';
import { EnhancedCart } from '@/components/EnhancedCart';
import { usePersistentCart } from '@/hooks/usePersistentCart';
import { usePersistentFavorites } from '@/hooks/usePersistentFavorites';

const Index = () => {
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
        currentPage="home"
      />
      
      <main>
        <HeroSection />
        
        <section className="py-20 bg-white/50 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-4">
                Featured <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Fragrances</span>
              </h2>
              <p className="text-amber-700 max-w-2xl mx-auto font-light">
                Discover our handpicked selection of premium fragrances, each one a masterpiece of scent artistry
              </p>
              <div className="flex justify-center mt-8">
                <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
              </div>
            </div>
            
            <ProductGrid
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
              isFavorite={isFavorite}
            />
          </div>
        </section>

        <CustomerReviews />
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

export default Index;
