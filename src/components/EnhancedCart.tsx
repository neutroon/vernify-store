import { useState } from 'react';
import { X, Minus, Plus, Trash2, CreditCard, ShoppingBag, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CartItem } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

interface Address {
  id?: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export const EnhancedCart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity,
  onClearCart 
}: EnhancedCartProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = total > 100 ? 0 : 9.99;
  const taxAmount = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + taxAmount;

  const [newAddress, setNewAddress] = useState<Address>({
    full_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  });

  const loadAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;

      setAddresses(data || []);
      if (data && data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const saveAddress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .insert({
          ...newAddress,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setAddresses(prev => [...prev, data]);
      setSelectedAddress(data);
      setShowAddressForm(false);
      setNewAddress({
        full_name: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'US'
      });

      toast({
        title: "Address Saved",
        description: "Your address has been saved successfully",
      });
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive"
      });
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place an order",
        variant: "destructive"
      });
      return;
    }

    if (!selectedAddress) {
      toast({
        title: "Address Required",
        description: "Please select or add a shipping address",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          shipping_address: selectedAddress as any, // Cast to any to satisfy Json type
          payment_method: paymentMethod,
          order_notes: orderNotes || null,
          shipping_cost: shippingCost,
          tax_amount: taxAmount,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items using originalId (UUID) for product_id
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.originalId || item.id.toString(), // Use originalId (UUID) for database operations
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await onClearCart();

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order #${order.id.slice(0, 8)} has been confirmed. Total: $${finalTotal.toFixed(2)}`,
        duration: 5000
      });

      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const startCheckout = () => {
    setIsCheckingOut(true);
    loadAddresses();
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
                {isCheckingOut ? 'Checkout' : `Shopping Cart (${itemCount})`}
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-amber-800 hover:text-rose-600"
                onClick={() => setIsCheckingOut(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-auto p-6">
          {!isCheckingOut ? (
            // Cart Items View
            items.length === 0 ? (
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
            )
          ) : (
            // Checkout View
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-playfair font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h3>
                
                {addresses.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddress?.id === address.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="font-semibold">{address.full_name}</div>
                        <div className="text-sm text-gray-600">
                          {address.address_line_1}
                          {address.address_line_2 && `, ${address.address_line_2}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postal_code}
                        </div>
                        <div className="text-sm text-gray-600">{address.phone}</div>
                      </div>
                    ))}
                  </div>
                )}

                <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Shipping Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={newAddress.full_name}
                            onChange={(e) => setNewAddress({...newAddress, full_name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address_line_1">Address Line 1</Label>
                        <Input
                          id="address_line_1"
                          value={newAddress.address_line_1}
                          onChange={(e) => setNewAddress({...newAddress, address_line_1: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                        <Input
                          id="address_line_2"
                          value={newAddress.address_line_2}
                          onChange={(e) => setNewAddress({...newAddress, address_line_2: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          value={newAddress.postal_code}
                          onChange={(e) => setNewAddress({...newAddress, postal_code: e.target.value})}
                        />
                      </div>
                      <Button onClick={saveAddress} className="w-full">
                        Save Address
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-playfair font-semibold text-amber-900 mb-4">
                  Payment Method
                </h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash_on_delivery" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="card" />
                    <Label htmlFor="card">Credit Card (Coming Soon)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-playfair font-semibold text-amber-900 mb-4">
                  Order Notes (Optional)
                </h3>
                <Textarea
                  placeholder="Any special instructions for your order..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
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
                <span className="font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-amber-700">
                <span>Tax</span>
                <span className="font-semibold">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gradient-to-r from-amber-200 to-rose-200 my-3"></div>
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-amber-900">Total</span>
                <span className="text-2xl bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              {!isCheckingOut ? (
                <>
                  <Button 
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                    size="lg"
                    onClick={startCheckout}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-50 py-3" 
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!selectedAddress}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Place Order
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-50 py-3" 
                    onClick={() => setIsCheckingOut(false)}
                  >
                    Back to Cart
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
