
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product, CartItem } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

export const usePersistentCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: cartData, error } = await supabase
        .from('cart')
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

      const transformedItems: CartItem[] = (cartData || []).map((item, index) => ({
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
        quantity: item.quantity,
        originalId: item.products.id
      }));

      setCartItems(transformedItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Error",
        description: "Failed to load your cart",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      // Use originalId (UUID) for database operations
      const productId = product.originalId || product.id.toString();
      
      const { data, error } = await supabase
        .from('cart')
        .upsert(
          {
            user_id: user.id,
            product_id: productId,
            quantity: 1
          },
          {
            onConflict: 'user_id,product_id',
            ignoreDuplicates: false
          }
        )
        .select();

      if (error) throw error;

      // Update local state
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          toast({
            title: "Updated cart",
            description: `${product.name} quantity increased`,
            duration: 2000
          });
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart`,
            duration: 2000
          });
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });

      // If item already exists, increment quantity
      if (data && data.length > 0) {
        const cartItem = data[0];
        const { error: updateError } = await supabase
          .from('cart')
          .update({ quantity: cartItem.quantity + 1 })
          .eq('id', cartItem.id);

        if (updateError) throw updateError;
      }

    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user) return;

    try {
      // Find the item to get its originalId
      const item = cartItems.find(item => item.id === id);
      const productId = item?.originalId || id.toString();

      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
        duration: 2000
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (!user) return;

    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    try {
      // Find the item to get its originalId
      const item = cartItems.find(item => item.id === id);
      const productId = item?.originalId || id.toString();

      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return {
    cartItems,
    isCartOpen,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  };
};
