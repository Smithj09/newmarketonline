import { CartItem } from '../types';
import { supabase } from '../lib/supabase';

export const syncCartToSupabase = async (cartItems: CartItem[]) => {
  const session = await supabase.auth.getSession();
  if (session.data.session?.user) {
    const { error } = await supabase
      .from('user_carts')
      .upsert({
        user_id: session.data.session.user.id,
        items: cartItems,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error syncing cart to Supabase:', error);
    }
  }
};