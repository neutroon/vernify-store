
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Heart, ShoppingBag, Settings, Package, Calendar } from 'lucide-react';
import { Cart } from '@/components/Cart';

const Dashboard = () => {
  const { user } = useAuth();
  const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, addToCart } = useCart();
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock order data - in a real app, this would come from your backend
  const [orders] = useState([
    {
      id: '1',
      date: '2024-06-25',
      status: 'delivered',
      total: 299.99,
      items: 3
    },
    {
      id: '2',
      date: '2024-06-20',
      status: 'shipped',
      total: 149.50,
      items: 2
    },
    {
      id: '3',
      date: '2024-06-15',
      status: 'processing',
      total: 89.99,
      items: 1
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.length} 
        onCartClick={toggleCart}
        currentPage="dashboard"
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={toggleCart}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'User'}
          </h1>
          <p className="text-amber-700/80">
            Manage your account and view your activity
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cartItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Items in your cart
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{favorites.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Saved items
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This year
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest orders and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-amber-100 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Package className="h-8 w-8 text-amber-600" />
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.date)} • {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="font-medium">${order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View all your past orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 border border-amber-100 rounded-lg hover:bg-amber-50/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Package className="h-10 w-10 text-amber-600" />
                        <div>
                          <h3 className="font-medium text-lg">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.date)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="font-bold text-lg">${order.total}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorites</CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                      <div key={product.id} className="border border-amber-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="aspect-square bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg mb-4 flex items-center justify-center">
                          <span className="text-4xl">👗</span>
                        </div>
                        <h3 className="font-medium mb-2">{product.name}</h3>
                        <p className="text-amber-600 font-bold">${product.price}</p>
                        <Button 
                          className="w-full mt-3" 
                          size="sm"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-amber-900 mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-amber-700/70 mb-4">
                      Start browsing and add items to your favorites!
                    </p>
                    <Button onClick={() => window.location.href = '/shop'}>
                      Browse Products
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Full Name
                      </label>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        {user?.user_metadata?.full_name || 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Email Address
                      </label>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-amber-100 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your orders and new products
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-amber-100 rounded-lg">
                      <div>
                        <h4 className="font-medium">Privacy Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Control how your data is used and shared
                        </p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
