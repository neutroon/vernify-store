
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ShoppingCart, Star, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { CustomerReviews } from '@/components/CustomerReviews';

// Mock product data - in a real app this would come from an API
const products = [
  {
    id: 1,
    name: "Rose Elegance",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0a0ba3fe65a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop"
    ],
    description: "A sophisticated blend of Bulgarian roses and white musk that captures the essence of a blooming garden at dawn. This exquisite fragrance opens with fresh rose petals, develops into a heart of white florals, and settles into a warm, musky base that lingers beautifully on the skin.",
    category: "Floral",
    inStock: true,
    volume: "50ml",
    notes: {
      top: ["Bulgarian Rose", "Pink Pepper", "Bergamot"],
      middle: ["White Rose", "Jasmine", "Lily of the Valley"],
      base: ["White Musk", "Sandalwood", "Amber"]
    }
  },
  {
    id: 2,
    name: "Midnight Oud",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop"
    ],
    description: "Rich and mysterious with notes of premium oud and golden amber. This luxurious fragrance transports you to exotic lands with its deep, complex composition that evolves throughout the day.",
    category: "Oriental",
    inStock: true,
    volume: "75ml",
    notes: {
      top: ["Saffron", "Black Pepper", "Cardamom"],
      middle: ["Oud", "Rose", "Patchouli"],
      base: ["Amber", "Vanilla", "Musk"]
    }
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const product = products.find(p => p.id === parseInt(id || ''));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <Header 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/shop')}
          className="mb-6 text-amber-700 hover:text-amber-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-2xl">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-rose-500 scale-105' 
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-200">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-rose-800 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-amber-600">{product.volume}</span>
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-amber-700">(127 reviews)</span>
              </div>
            </div>

            <p className="text-amber-700 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-amber-800 font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white h-12 text-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className={`h-12 w-12 ${
                    favorites.includes(product.id) 
                      ? 'text-rose-500 border-rose-500 bg-rose-50' 
                      : 'text-amber-600 border-amber-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm text-amber-700">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm text-amber-700">Authentic</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-sm text-amber-700">30-Day Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="notes" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">Fragrance Notes</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">Top Notes</h3>
                  <ul className="space-y-2">
                    {product.notes.top.map((note, index) => (
                      <li key={index} className="text-amber-700 flex items-center">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">Middle Notes</h3>
                  <ul className="space-y-2">
                    {product.notes.middle.map((note, index) => (
                      <li key={index} className="text-amber-700 flex items-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">Base Notes</h3>
                  <ul className="space-y-2">
                    {product.notes.base.map((note, index) => (
                      <li key={index} className="text-amber-700 flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">Product Information</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-amber-700">Volume:</dt>
                      <dd className="font-medium text-amber-900">{product.volume}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-amber-700">Category:</dt>
                      <dd className="font-medium text-amber-900">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-amber-700">Concentration:</dt>
                      <dd className="font-medium text-amber-900">Eau de Parfum</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-amber-700">Longevity:</dt>
                      <dd className="font-medium text-amber-900">6-8 hours</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-amber-900 mb-4">Care Instructions</h3>
                  <ul className="space-y-2 text-amber-700">
                    <li>• Store in a cool, dry place</li>
                    <li>• Avoid direct sunlight</li>
                    <li>• Keep bottle upright</li>
                    <li>• Use within 3 years of opening</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <CustomerReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default ProductDetails;
