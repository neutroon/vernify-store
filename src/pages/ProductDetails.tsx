
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { CustomerReviews } from '@/components/CustomerReviews';
import { useToast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id || '1'),
    name: 'Midnight Elegance',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=800&fit=crop&q=80'
    ],
    description: 'An intoxicating blend of dark berries, vanilla, and amber that captures the essence of sophisticated evenings. This luxurious fragrance opens with fresh bergamot and blackcurrant, evolving into a heart of jasmine and rose, before settling into a warm base of sandalwood and musk.',
    category: 'Oriental',
    inStock: true,
    volume: '50ml',
    rating: 4.8,
    reviews: 127,
    notes: {
      top: ['Bergamot', 'Blackcurrant', 'Pink Pepper'],
      middle: ['Jasmine', 'Rose', 'Lily of the Valley'],
      base: ['Sandalwood', 'Vanilla', 'Amber', 'Musk']
    }
  };

  const handleAddToCart = () => {
    // Create a cart item with quantity
    const cartItem = {
      ...product,
      quantity: quantity
    };
    addToCart(cartItem);
    
    // Show toast after successful add to cart
    setTimeout(() => {
      toast({
        title: "Added to cart!",
        description: `${quantity} x ${product.name} added to your cart.`,
      });
    }, 0);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    const isCurrentlyFavorite = isFavorite(product.id);
    
    // Show toast after successful toggle
    setTimeout(() => {
      toast({
        title: isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites",
        description: isCurrentlyFavorite ? 
          `${product.name} removed from your favorites.` : 
          `${product.name} added to your favorites.`,
      });
    }, 0);
  };

  const isProductFavorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => {}}
        currentPage="product"
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-amber-600 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-rose-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/shop')}
            className="hover:text-rose-600 transition-colors"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-amber-800 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-rose-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-amber-600 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-rose-600 mb-6">
                ${product.price}
              </p>
              <p className="text-amber-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-amber-800 font-medium">Quantity:</span>
              <div className="flex items-center border border-amber-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-amber-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-amber-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white py-6 text-lg font-medium"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleFavorite}
                className={`px-6 py-6 border-2 transition-all ${
                  isProductFavorite
                    ? 'border-rose-500 text-rose-500 bg-rose-50'
                    : 'border-amber-300 text-amber-600 hover:border-rose-500 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isProductFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="notes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="notes">Fragrance Notes</TabsTrigger>
                    <TabsTrigger value="details">Product Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notes" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Top Notes</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.notes.top.map((note, index) => (
                            <Badge key={index} variant="outline" className="border-rose-200 text-rose-600">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Middle Notes</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.notes.middle.map((note, index) => (
                            <Badge key={index} variant="outline" className="border-amber-200 text-amber-600">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Base Notes</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.notes.base.map((note, index) => (
                            <Badge key={index} variant="outline" className="border-amber-200 text-amber-600">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4 mt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Volume:</span>
                        <span className="font-medium text-amber-900">{product.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Category:</span>
                        <span className="font-medium text-amber-900">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Stock:</span>
                        <span className="font-medium text-green-600">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Reviews */}
        <CustomerReviews productId={product.id} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
