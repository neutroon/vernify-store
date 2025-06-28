
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Fragrance Lane", "Beverly Hills, CA 90210", "United States"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Toll-free: 1-800-ESSENCE"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@essenceboutique.com", "support@essenceboutique.com"]
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Fri: 10am-8pm", "Sat-Sun: 10am-6pm", "Holidays: 12pm-5pm"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentPage="contact"
      />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
            Contact <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            We'd love to hear from you. Get in touch with our fragrance experts for personalized recommendations or any questions.
          </p>
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-amber-700 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-rose-500/10 to-amber-500/10 rounded-2xl border border-rose-200/50">
              <h3 className="font-bold text-amber-900 mb-4">Need Fragrance Advice?</h3>
              <p className="text-amber-700 text-sm mb-4">
                Our certified fragrance consultants are available for personalized scent consultations. Book a free 30-minute session to discover your perfect fragrance.
              </p>
              <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white">
                Book Consultation
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">First Name</label>
                  <Input placeholder="Your first name" className="border-amber-200 focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Last Name</label>
                  <Input placeholder="Your last name" className="border-amber-200 focus:border-rose-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" className="border-amber-200 focus:border-rose-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Phone (Optional)</label>
                <Input type="tel" placeholder="Your phone number" className="border-amber-200 focus:border-rose-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Subject</label>
                <Input placeholder="How can we help you?" className="border-amber-200 focus:border-rose-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us more about your inquiry..." 
                  className="border-amber-200 focus:border-rose-500 min-h-[120px]"
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-playfair font-bold text-amber-900 text-center mb-8">Find Our Store</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-4 h-96 flex items-center justify-center">
            <div className="text-center text-amber-700">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-amber-500" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">Map integration would be implemented here</p>
            </div>
          </div>
        </div>
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

export default Contact;
