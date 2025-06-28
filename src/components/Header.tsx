
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage?: string;
}

export const Header = ({ cartCount, onCartClick, currentPage = 'home' }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-amber-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-amber-900 to-rose-800 bg-clip-text text-transparent">
                Essence
              </span>
              <div className="text-xs text-amber-600 font-medium tracking-wide">BOUTIQUE</div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className={`text-amber-800 hover:text-rose-600 transition-colors font-medium ${
                currentPage === 'home' ? 'text-rose-600 border-b-2 border-rose-600 pb-1' : ''
              }`}
            >
              Home
            </button>
            <a href="#" className="text-amber-800 hover:text-rose-600 transition-colors font-medium">
              Fragrances
            </a>
            <a href="#" className="text-amber-800 hover:text-rose-600 transition-colors font-medium">
              Collections
            </a>
            <a href="#" className="text-amber-800 hover:text-rose-600 transition-colors font-medium">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative hover-scale group ${
                currentPage === 'favorites' ? 'bg-rose-100 text-rose-600' : 'text-amber-800 hover:text-rose-600'
              }`}
              onClick={() => navigate('/favorites')}
            >
              <Heart className="h-5 w-5 group-hover:fill-current transition-all" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover-scale text-amber-800 hover:text-rose-600 group"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-scale-in font-bold shadow-lg">
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
