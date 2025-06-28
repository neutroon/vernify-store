
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Primary Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&h=1080&fit=crop&q=80"
            alt="Luxury perfume collection"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
        </div>
        
        {/* Overlay Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-transparent to-amber-900/20"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        {/* Animated Sparkles */}
        <Sparkles className="absolute top-20 left-20 h-8 w-8 text-amber-300 animate-pulse opacity-80 animate-float" />
        <Sparkles className="absolute top-32 right-32 h-6 w-6 text-rose-300 animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-40 left-40 h-7 w-7 text-amber-400 animate-pulse opacity-70" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-32 right-20 h-5 w-5 text-rose-400 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/2 left-10 h-4 w-4 text-amber-200 animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />
        <Sparkles className="absolute top-1/3 right-10 h-6 w-6 text-rose-200 animate-pulse opacity-60" style={{ animationDelay: '2.5s' }} />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-white/20 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border border-amber-300/30 rotate-45 animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
        <div className="animate-fade-in-up">
          {/* Luxury Badge */}
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-8 py-3 mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Luxury Fragrance Collection</span>
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
          </div>

          {/* Main Headline with Enhanced Typography */}
          <h1 className="text-7xl md:text-9xl font-playfair font-bold text-white mb-8 leading-tight tracking-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-amber-300 via-rose-300 via-amber-200 to-rose-300 bg-clip-text text-transparent animate-gradient-x">
              Signature Scent
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed font-light mb-6">
            Indulge in our curated collection of luxury perfumes, where each fragrance tells a unique story of elegance and sophistication
          </p>
          
          {/* Secondary Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            From timeless classics to modern masterpieces, find the perfect scent that captures your essence
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              onClick={scrollToProducts}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-10 py-6 text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-500 group border-0 rounded-full"
            >
              <span className="mr-3">Explore Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-xl border-white/40 text-white hover:bg-white/20 hover:border-white/60 px-10 py-6 text-lg font-medium transition-all duration-500 rounded-full group"
            >
              <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Our Story</span>
            </Button>
          </div>

          {/* Enhanced Social Proof */}
          <div className="flex items-center justify-center space-x-12 text-white/80">
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">2K+</div>
              <div className="text-sm font-light tracking-wide">Happy Customers</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">100+</div>
              <div className="text-sm font-light tracking-wide">Premium Brands</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">5.0★</div>
              <div className="text-sm font-light tracking-wide">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-2 backdrop-blur-sm">
            <div className="w-1 h-4 bg-white/80 rounded-full animate-scroll-indicator"></div>
          </div>
          <span className="text-white/60 text-xs font-light tracking-wide uppercase">Scroll</span>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};
