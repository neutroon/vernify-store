
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage?: string;
}

export const Header = ({ cartCount, onCartClick, currentPage = 'home' }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate opacity based on scroll position
      // Start showing header after 100px scroll, fully visible at 300px
      const opacity = Math.min(currentScrollY / 300, 1);
      setHeaderOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', key: 'home' },
    { name: 'Shop', path: '/shop', key: 'shop' },
    { name: 'Collections', path: '/collections', key: 'collections' },
    { name: 'About', path: '/about', key: 'about' },
    { name: 'Contact', path: '/contact', key: 'contact' },
  ];

  const headerBgOpacity = currentPage === 'home' ? headerOpacity : 0.95;
  const headerBlur = currentPage === 'home' ? (headerOpacity > 0 ? 'backdrop-blur-xl' : '') : 'backdrop-blur-md';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBlur}`}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity})`,
        borderBottomColor: `rgba(245, 158, 11, ${headerBgOpacity * 0.2})`,
        borderBottomWidth: headerBgOpacity > 0 ? '1px' : '0px',
        boxShadow: headerBgOpacity > 0 ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <span 
                className="text-2xl font-playfair font-bold bg-gradient-to-r from-amber-900 to-rose-800 bg-clip-text text-transparent"
                style={{ 
                  opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.7) : 1 
                }}
              >
                Essence
              </span>
              <div 
                className="text-xs text-amber-600/80 font-medium tracking-wide"
                style={{ 
                  opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.6) : 0.8 
                }}
              >
                BOUTIQUE
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button 
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`transition-all duration-300 font-medium relative group ${
                  currentPage === item.key ? 'text-rose-600' : 'text-amber-800 hover:text-rose-600'
                }`}
                style={{ 
                  opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.7) : 1 
                }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 group-hover:w-full ${
                  currentPage === item.key ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative hover-scale group transition-all duration-300 ${
                currentPage === 'favorites' ? 'bg-rose-100 text-rose-600' : 'text-amber-800 hover:text-rose-600'
              }`}
              style={{ 
                opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.7) : 1 
              }}
              onClick={() => navigate('/favorites')}
            >
              <Heart className="h-5 w-5 group-hover:fill-current transition-all duration-300" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover-scale text-amber-800 hover:text-rose-600 group transition-all duration-300"
              style={{ 
                opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.7) : 1 
              }}
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-scale-in font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-amber-800 hover:text-rose-600"
              style={{ 
                opacity: currentPage === 'home' ? Math.max(headerOpacity, 0.7) : 1 
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav 
            className="lg:hidden mt-4 pb-4 border-t pt-4 animate-fade-in"
            style={{ 
              borderTopColor: `rgba(245, 158, 11, ${Math.max(headerOpacity, 0.2)})`,
              backgroundColor: `rgba(255, 255, 255, ${Math.max(headerOpacity, 0.9)})`
            }}
          >
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                    currentPage === item.key 
                      ? 'bg-rose-100 text-rose-600 font-medium' 
                      : 'text-amber-800 hover:bg-amber-50 hover:text-rose-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
