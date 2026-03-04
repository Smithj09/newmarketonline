import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
                DorMark
              </h3>
            </div>
            <p className="text-sm font-medium text-white mb-2">
              produits de qualité, bons prix
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Accueil</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Produits</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">À Propos</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Contact</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Service Client</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Politique de Livraison</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Politique de Remboursement</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Conditions Générales</a></li>
              <li><a href="#" className="text-white hover:text-pink-300 transition-colors">Suivi de Commande</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Informations de Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>support@dormark.com</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 Commerce St, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DorMark. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}