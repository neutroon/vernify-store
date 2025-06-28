
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/types/product';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock products data - in production this would come from an API
const products: Product[] = [
  {
    id: 1,
    name: "Rose Elegance",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    description: "A sophisticated blend of Bulgarian roses and white musk",
    category: "Floral"
  },
  {
    id: 2,
    name: "Midnight Oud",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    description: "Rich and mysterious with notes of oud and amber",
    category: "Oriental"
  },
  {
    id: 3,
    name: "Citrus Breeze",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    description: "Fresh and invigorating with bergamot and lemon",
    category: "Citrus"
  },
  {
    id: 4,
    name: "Vanilla Dreams",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
    description: "Warm and comforting with vanilla and sandalwood",
    category: "Gourmand"
  },
  {
    id: 5,
    name: "Ocean Mist",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
    description: "Fresh aquatic scent with sea salt and driftwood",
    category: "Aquatic"
  },
  {
    id: 6,
    name: "Golden Amber",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    description: "Luxurious amber with hints of spice and leather",
    category: "Oriental"
  }
];

const Favorites = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => {}}
        currentPage="favorites"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-amber-800 hover:text-amber-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-amber-900 mb-4">
            Your <span className="text-rose-600">Favorites</span>
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Your carefully curated collection of exquisite fragrances
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💝</span>
            </div>
            <h3 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
              No favorites yet
            </h3>
            <p className="text-amber-600 mb-8">
              Start exploring our collection and add fragrances to your favorites
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-8 py-3 text-lg"
            >
              Explore Fragrances
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => addToCart(product)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
