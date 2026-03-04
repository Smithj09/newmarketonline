import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if both environment variables are set before creating the client
export const supabase: any = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Fallback mock object when environment variables aren't set
      from: (_table: string) => ({
        select: (_columns?: string) => ({
          eq: (_column: string, _value: any) => ({
            single: async () => ({ data: null, error: null })
          }),
          single: async () => ({ data: null, error: null })
        }),
        eq: (_column: string, _value: any) => ({
          select: (_columns?: string) => ({
            single: async () => ({ data: null, error: null })
          })
        }),
        upsert: async (_data: any) => ({ error: null })
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: (_callback: (event: string, session: any) => void) => ({ 
          data: { 
            subscription: { 
              unsubscribe: () => {} 
            } 
          } 
        })
      }
    };