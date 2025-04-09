// contexts/AuthContext.js
"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from "../supabse/supabaseClient"; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
     
      setLoading(false);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/');
      console.log(user)
    }
  }, [user, router]);

  // Sign up a new user
  const signup = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setUser(user);
      return { user };
    } catch (error) {
      console.error("Error signing up:", error.message);
      return { error };
    }
  };

  // Login an existing user
  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(user);
      router.push('/')
      console.log(user)
      return { user };
    } catch (error) {
      console.error("Error logging in:", error.message);
      return { error };
    }
  };

  // Log out the user
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
