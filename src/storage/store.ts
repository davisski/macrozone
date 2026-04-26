import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { create } from 'zustand';

console.log("Supabase URL:", Constants.expoConfig?.extra?.supabaseUrl);
console.log("Supabase Publishable Key:", Constants.expoConfig?.extra?.supabaseAnonKey);

const supabase = createClient(Constants.expoConfig?.extra?.supabaseUrl, Constants.expoConfig?.extra?.supabaseAnonKey);

interface StoreState {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export { supabase };
