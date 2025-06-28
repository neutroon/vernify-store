
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';

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

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  favorites: number[];
}

export const ProductGrid = ({ onAddToCart, onToggleFavorite, favorites }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard
            product={product}
            onAddToCart={() => onAddToCart(product)}
            onToggleFavorite={() => onToggleFavorite(product.id)}
            isFavorite={favorites.includes(product.id)}
          />
        </div>
      ))}
    </div>
  );
};
