
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.includes(productId);
      
      if (isFavorite) {
        toast({
          title: "Removed from favorites",
          description: "Item has been removed from your favorites",
          duration: 2000
        });
        return prevFavorites.filter(id => id !== productId);
      } else {
        toast({
          title: "Added to favorites",
          description: "Item has been added to your favorites",
          duration: 2000
        });
        return [...prevFavorites, productId];
      }
    });
  };

  return {
    favorites,
    toggleFavorite
  };
};
