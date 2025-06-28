
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-xl font-bold text-gray-800">Essence</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Fragrances</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Collections</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover-scale">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover-scale"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
