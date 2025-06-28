
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

export const usePersistentFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load favorites from database when user logs in
  useEffect(() => {
    if (user) {
      loadFavoritesFromDatabase();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const loadFavoritesFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: wishlistData, error } = await supabase
        .from('wishlist')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            description,
            category
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const transformedFavorites: Product[] = (wishlistData || []).map((item, index) => ({
        // Generate consistent numeric ID for frontend
        id: Math.abs(item.products.id.split('-').join('').slice(0, 8).split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0)) || index + 1,
        name: item.products.name,
        price: parseFloat(item.products.price.toString()),
        image: item.products.image_url || '',
        description: item.products.description || '',
        category: item.products.category,
        originalId: item.products.id
      }));

      setFavorites(transformedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast({
        title: "Error",
        description: "Failed to load your favorites",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (product: Product) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to manage favorites",
        variant: "destructive"
      });
      return;
    }

    const isFavorite = favorites.some(fav => fav.id === product.id);

    try {
      // Use originalId (UUID) for database operations
      const productId = product.originalId || product.id.toString();

      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;

        setFavorites(prevFavorites => 
          prevFavorites.filter(fav => fav.id !== product.id)
        );

        toast({
          title: "Removed from favorites",
          description: "Item has been removed from your favorites",
          duration: 2000
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('wishlist')
          .insert({
            user_id: user.id,
            product_id: productId
          });

        if (error) throw error;

        setFavorites(prevFavorites => [...prevFavorites, product]);

        toast({
          title: "Added to favorites",
          description: "Item has been added to your favorites",
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite
  };
};
