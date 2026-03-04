import { useState } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { ProductDetail } from './components/ProductDetail';
import { Footer } from './components/Footer';
import { SellerDashboard } from './components/SellerDashboard';
import { products } from './data/products';
import { Product } from './types';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Welcome to DorMark</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto opacity-90">
              Discover amazing products from trusted sellers around the world
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button className="bg-white text-pink-700 font-bold py-3 px-6 sm:px-8 rounded-lg hover:bg-pink-50 transition-colors shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-grow">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="section-title text-2xl sm:text-3xl">
            Featured Products
          </h2>
          <p className="section-subtitle text-base sm:text-lg">
            Handpicked selection from DorMark
          </p>
        </div>

        <ProductGrid
          products={products}
          onViewDetails={setSelectedProduct}
        />
      </main>



      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;