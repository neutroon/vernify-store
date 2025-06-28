
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop&q=80"
          alt="Luxury perfume background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 z-10">
        <Sparkles className="absolute top-20 left-20 h-6 w-6 text-amber-300 animate-pulse opacity-60" />
        <Sparkles className="absolute top-40 right-32 h-4 w-4 text-rose-300 animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-40 left-40 h-5 w-5 text-amber-400 animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-32 right-20 h-4 w-4 text-rose-400 animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Premium Fragrances Collection</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Signature Scent
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Indulge in our curated collection of luxury perfumes, where each fragrance tells a unique story of elegance and sophistication
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              onClick={scrollToProducts}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-medium transition-all duration-300"
            >
              Discover Our Story
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center space-x-8 text-white/70">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm">Premium Brands</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5★</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
