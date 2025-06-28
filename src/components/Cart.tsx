
import { X, Minus, Plus, Trash2, CreditCard, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { CartItem } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    toast({
      title: "Checkout Started",
      description: "Redirecting to secure payment...",
      duration: 3000
    });
    // In production, this would integrate with a payment processor
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order of ${itemCount} item${itemCount > 1 ? 's' : ''} totaling $${total.toFixed(2)} has been confirmed.`,
        duration: 5000
      });
      onClose();
    }, 2000);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-gradient-to-b from-white to-rose-50">
        <DrawerHeader className="border-b border-amber-100 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <DrawerTitle className="text-xl font-playfair text-amber-900">
                Shopping Cart ({itemCount})
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="text-amber-800 hover:text-rose-600">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
                Your cart is empty
              </h3>
              <p className="text-amber-600 mb-8">
                Discover our exquisite fragrances and add them to your cart
              </p>
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white px-8 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.quantity}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-playfair font-semibold text-amber-900 text-lg">{item.name}</h4>
                    <p className="text-amber-600 text-sm mb-2">{item.description}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                      ${item.price} each
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-amber-50 rounded-full p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="h-8 w-8 rounded-full hover:bg-amber-100 text-amber-700"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-bold text-amber-900">{item.quantity}</span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-full hover:bg-amber-100 text-amber-700"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-amber-100 p-6 bg-white/90 backdrop-blur-md space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-amber-700">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-amber-700">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-200 to-rose-200 my-3"></div>
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-amber-900">Total</span>
                <span className="text-2xl bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg"
                onClick={handleCheckout}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Secure Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-amber-300 text-amber-800 hover:bg-amber-50 py-3" 
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
