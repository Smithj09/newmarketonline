import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  // Generate random rating for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // Random rating between 4-5
  const reviewCount = Math.floor(Math.random() * 100) + 10; // Random review count

  return (
    <div className="card group">
      <div 
        onClick={() => onViewDetails(product)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Sèlman {product.stock} rete
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
              Epwise
            </span>
          )}
        </div>

        <div className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-pink-700 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="text-sm font-semibold text-pink-900 mb-1 line-clamp-1">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center bg-pink-100 px-1.5 py-0.5 rounded self-start">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-pink-700 ml-1">{rating}.0</span>
            </div>
          </div>
          
          <p className="text-xs text-pink-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-1 btn-primary px-2 py-1 text-xs min-w-[70px] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-3 h-3" />
              Ajoute nan Panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}