import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
                DorMakSmellsgood
              </h3>
            </div>
            <p className="text-pink-600 mb-4">
              Your one-stop destination for all your shopping needs. Quality products at competitive prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Home</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Products</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">About Us</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Contact</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-800 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">Track Order</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-pink-800 mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-pink-600">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-pink-600">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>support@dormaksmellsgood.com</span>
              </li>
              <li className="flex items-start gap-2 text-pink-600">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 Commerce St, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pink-200 mt-12 pt-8 text-center text-pink-600">
          <p>&copy; {new Date().getFullYear()} DorMakSmellsgood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}