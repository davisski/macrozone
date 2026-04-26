import { supabase } from "./store";

export function login(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
}

export function register(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
}

export function logout() {
    return supabase.auth.signOut();
}
