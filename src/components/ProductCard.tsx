
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
  const reviewCount = Math.floor(Math.random() * 200) + 50; // 50-250 reviews

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 bg-white/95 backdrop-blur-md border-amber-100/50 hover:border-rose-200/50 hover:bg-white cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={1}>
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100'
              }`}
            />
          </AspectRatio>
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Sparkle effect on hover */}
          <div className={`absolute top-4 left-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
          </div>

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg ${
              isFavorite ? 'text-rose-500 bg-rose-50' : 'text-amber-600'
            }`}
            onClick={(e) => handleButtonClick(e, onToggleFavorite)}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${isFavorite ? 'fill-current scale-110' : ''}`} />
          </Button>

          {/* Quick view button - appears on hover */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md hover:bg-white text-amber-800 hover:text-rose-600 transition-all duration-300 shadow-lg ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            onClick={(e) => handleButtonClick(e, handleCardClick)}
          >
            View Details
          </Button>

          {/* Add to cart button - slides up on hover */}
          <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <Button 
              onClick={(e) => handleButtonClick(e, onAddToCart)}
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 font-medium group/btn"
            >
              <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-amber-800 bg-gradient-to-r from-amber-100 to-rose-100 px-3 py-1 rounded-full border border-amber-200/50">
              {product.category}
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-800 to-rose-800 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>
          
          <h3 className="text-xl font-playfair font-bold text-amber-900 mb-2 group-hover:text-rose-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Star rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-amber-700/70">({reviewCount})</span>
          </div>
          
          <p className="text-amber-700/80 text-sm leading-relaxed font-light">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
