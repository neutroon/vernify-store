
import { useState } from 'react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { toast } = useToast();

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);
      
      if (isFavorite) {
        toast({
          title: "Removed from favorites",
          description: "Item has been removed from your favorites",
          duration: 2000
        });
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        toast({
          title: "Added to favorites",
          description: "Item has been added to your favorites",
          duration: 2000
        });
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
