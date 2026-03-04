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

  const rating = product.rating;

  return (
    <div className="card group">
      <div 
        onClick={() => onViewDetails(product)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-1 right-1 bg-pink-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              Seulement {product.stock} restants
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-1 right-1 bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              Épuisé
            </span>
          )}
        </div>

        <div className="p-2">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <div className="flex-1 min-w-0">
              <span className="text-[0.6rem] font-medium text-pink-700 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="text-xs font-semibold text-pink-900 line-clamp-1">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center bg-pink-100 px-1 py-0.5 rounded">
              <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
              <span className="text-[0.6rem] font-medium text-pink-700 ml-0.5">{rating}.0</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex items-center gap-0.5 btn-primary px-1.5 py-0.5 text-[0.6rem] min-w-[60px] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-2.5 h-2.5" />
                Ajouter
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}