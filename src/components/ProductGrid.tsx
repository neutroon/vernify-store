
import { useMemo, useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  searchTerm?: string;
  selectedCategory?: string;
  priceRange?: [number, number];
}

export const ProductGrid = ({ 
  onAddToCart, 
  onToggleFavorite, 
  favorites,
  isFavorite,
  searchTerm = '',
  selectedCategory = 'All',
  priceRange = [0, 200]
}: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Transform Supabase data to match our Product interface
        const transformedProducts: Product[] = (data || []).map((product, index) => ({
          // Use a hash of the UUID to generate a consistent numeric ID for the frontend
          id: Math.abs(product.id.split('-').join('').slice(0, 8).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0)) || index + 1,
          name: product.name,
          price: parseFloat(product.price.toString()),
          image: product.image_url || '',
          description: product.description || '',
          category: product.category,
          // Store the original UUID for database operations
          originalId: product.id
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg animate-pulse mx-auto mb-4">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <p className="text-amber-700">Loading products...</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
          No fragrances found
        </h3>
        <p className="text-amber-600">
          Try adjusting your search terms or filters to find the perfect scent
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard
            product={product}
            onAddToCart={() => onAddToCart(product)}
            onToggleFavorite={() => onToggleFavorite(product)}
            isFavorite={isFavorite(product.id)}
          />
        </div>
      ))}
    </div>
  );
};
