
import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
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

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white/80 backdrop-blur-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={1}>
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          </AspectRatio>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white transition-all duration-300 ${
              isFavorite ? 'text-red-500' : 'text-gray-600'
            }`}
            onClick={onToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Button 
              onClick={onAddToCart}
              className="w-full bg-white/90 text-gray-800 hover:bg-white backdrop-blur-md"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
