import { useState } from 'react';
import { ShoppingCart, Store, Menu, User, Search, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { cartCount } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This would come from a real auth context
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAuthModal = () => {
    setAuthModalOpen(!authModalOpen);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-pink-600 to-pink-800 p-2 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                MarketPlace
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6">
                <a href="#" className="text-black hover:text-pink-600 font-medium transition-colors">Home</a>
                <a href="#" className="text-black hover:text-pink-600 font-medium transition-colors">Categories</a>
                <a href="#" className="text-black hover:text-pink-600 font-medium transition-colors">Deals</a>
                <a href="#" className="text-black hover:text-pink-600 font-medium transition-colors">Contact</a>
              </nav>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none w-64"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-2 hover:bg-pink-100 rounded-lg transition-colors"
                  >
                    <User className="w-6 h-6 text-black" />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-black py-2 z-50">
                      <a 
                        href="#" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-pink-100"
                      >
                        <Package className="w-4 h-4" />
                        My Orders
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-pink-100"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </a>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-black hover:bg-pink-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={toggleAuthModal}
                  className="flex items-center gap-2 p-2 hover:bg-pink-100 rounded-lg transition-colors"
                >
                  <User className="w-6 h-6 text-black" />
                </button>
              )}
              
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-pink-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-600 to-pink-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="md:hidden p-2 hover:bg-pink-100 rounded-lg transition-colors">
                <Menu className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={toggleAuthModal} 
        mode={authMode} 
        onSwitchMode={switchAuthMode} 
      />
    </>
  );
}