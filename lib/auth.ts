import { supabase } from "../supabaseClient";

export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getUser = async () => {
  return supabase.auth.getUser();
};
