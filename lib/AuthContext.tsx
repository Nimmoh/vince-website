'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'provider' | 'admin';
  isProvider: boolean;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isProvider: boolean;
  isAdmin: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role?: 'customer' | 'provider';
  businessName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('vincevic_token');
    const savedUser = localStorage.getItem('vincevic_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Login failed');
    }

    setToken(data.data.token);
    setUser(data.data.user);
    localStorage.setItem('vincevic_token', data.data.token);
    localStorage.setItem('vincevic_user', JSON.stringify(data.data.user));
  };

  const register = async (registerData: RegisterData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Registration failed');
    }

    setToken(data.data.token);
    setUser(data.data.user);
    localStorage.setItem('vincevic_token', data.data.token);
    localStorage.setItem('vincevic_user', JSON.stringify(data.data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vincevic_token');
    localStorage.removeItem('vincevic_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isProvider: user?.role === 'provider',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
