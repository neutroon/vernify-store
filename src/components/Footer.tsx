
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-rose-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-playfair font-bold mb-4">
              Stay in the Scent
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter and be the first to discover new fragrances, exclusive offers, and perfume stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-amber-300"
              />
              <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <span className="text-2xl font-playfair font-bold">Essence</span>
                <div className="text-xs text-white/70 font-medium tracking-wide">BOUTIQUE</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Crafting exceptional fragrances that capture the essence of elegance and sophistication since 2020.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons would go here */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-sm">ig</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-sm">fb</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-sm">tw</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Story', 'Fragrances', 'Collections', 'Gift Cards', 'Size Guide'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Customer Care</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-playfair font-semibold">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-300" />
                <span className="text-white/80">hello@essenceboutique.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-300" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-300 mt-1" />
                <span className="text-white/80">123 Fragrance Avenue<br />New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Essence Boutique. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-rose-400 fill-current" />
              <span>for fragrance lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
