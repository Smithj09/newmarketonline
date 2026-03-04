import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { supabase } from '../lib/supabase';
import { syncCartToSupabase } from '../utils/cartUtils';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage and sync with Supabase if user is logged in
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const session = await supabase.auth.getSession();
        if (session.data.session?.user) {
          // Load cart from Supabase for logged-in user
          const { data, error } = await supabase
            .from('user_carts')
            .select('*')
            .eq('user_id', session.data.session.user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') {
            console.error('Error loading cart from Supabase:', error);
          } else if (data) {
            setCartItems(data.items || []);
          } else {
            // If no cart exists, initialize with localStorage
            const saved = localStorage.getItem('cart');
            setCartItems(saved ? JSON.parse(saved) : []);
          }
        } else {
          // Load from localStorage for guest users
          const saved = localStorage.getItem('cart');
          setCartItems(saved ? JSON.parse(saved) : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        const saved = localStorage.getItem('cart');
        setCartItems(saved ? JSON.parse(saved) : []);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();

    // Listen for auth changes to sync cart between guest and authenticated states
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_IN') {
        // User signed in, load their cart from Supabase
        const { data, error } = await supabase
          .from('user_carts')
          .select('*')
          .eq('user_id', session?.user.id || '')
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading cart from Supabase:', error);
        } else if (data) {
          setCartItems(data.items || []);
        }
      } else if (event === 'SIGNED_OUT') {
        // User signed out, save current cart to localStorage and clear Supabase cart
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCartItems([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync cart to localStorage and Supabase
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Update Supabase if user is logged in
      syncCartToSupabase(cartItems);
    }
  }, [cartItems, isLoading]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: crypto.randomUUID(), product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}