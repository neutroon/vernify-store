
import { useState } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { Header } from '@/components/Header';
import { Cart } from '@/components/Cart';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Essence <span className="text-purple-600">Boutique</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of premium perfumes, crafted to capture your unique essence
          </p>
        </div>

        <ProductGrid 
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </main>

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
