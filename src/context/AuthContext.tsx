
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


// Mock user data
const initialUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', emailVerified: true, mobile: '0000000000', skill: 'Superuser', aiKnowledge: 'advanced', password: 'adminpassword' },
  { id: '2', username: 'jug.k', email: 'jug@example.com', emailVerified: true, mobile: '1234567890', skill: 'React, Genkit', aiKnowledge: 'intermediate', password: 'password123' },
  { id: '3', username: 'akshay.h', email: 'akshay@example.com', emailVerified: true, mobile: '0987654321', skill: 'Next.js, Tailwind', aiKnowledge: 'intermediate', password: 'password456' },
  { id: '4', username: 'new_dev', email: 'dev@example.com', emailVerified: true, mobile: '5555555555', skill: 'HTML, CSS', aiKnowledge: 'beginner', password: 'password789' },
];

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  isLoading: boolean;
  login: (username: string, password?: string) => boolean;
  loginWithEmail: (email: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id' | 'emailVerified'>) => { success: boolean, error?: string };
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  verifyUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd verify a token and fetch users from an API
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.emailVerified) {
             setUser(parsedUser);
        }
      }
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers(initialUsers);
        localStorage.setItem('users', JSON.stringify(initialUsers));
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
      localStorage.removeItem('user');
      localStorage.removeItem('users');
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password?: string) => {
    const userToLogin = users.find(u => u.username === username);

    if (userToLogin) {
      if (!userToLogin.emailVerified) {
        toast({
            title: "Verification Required",
            description: "Please verify your email before logging in.",
            variant: "destructive",
        });
        return false;
      }
      
      if (!password || userToLogin.password === password) {
        setUser(userToLogin);
        localStorage.setItem('user', JSON.stringify(userToLogin));
        return true;
      }
    }
    return false;
  };

  const loginWithEmail = (email: string) => {
    const userToLogin = users.find(u => u.email === email);
    if (userToLogin && userToLogin.emailVerified) {
        setUser(userToLogin);
        localStorage.setItem('user', JSON.stringify(userToLogin));
        return true;
    }
    return false;
  }
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const syncUsersToStorage = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  const addUser = (newUser: Omit<User, 'id' | 'emailVerified'>) => {
    if (users.some(u => u.username === newUser.username)) {
      return { success: false, error: "Username already exists." };
    }
     if (users.some(u => u.email === newUser.email)) {
      return { success: false, error: "Email already exists." };
    }
    const userWithId = { ...newUser, id: Date.now().toString(), emailVerified: false };
    const updatedUsers = [...users, userWithId];
    syncUsersToStorage(updatedUsers);
    return { success: true };
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    syncUsersToStorage(updatedUsers);
     toast({ title: "Success", description: "User updated successfully." });
  };

  const deleteUser = (userId: string) => {
    if (user?.id === userId) {
      toast({
        title: "Error",
        description: "You cannot delete your own account.",
        variant: "destructive",
      });
      return;
    }
    const updatedUsers = users.filter(u => u.id !== userId);
    syncUsersToStorage(updatedUsers);
    toast({ title: "Success", description: "User deleted successfully." });
  };
  
  const verifyUserEmail = (email: string) => {
    const updatedUsers = users.map(u => u.email === email ? { ...u, emailVerified: true } : u);
    syncUsersToStorage(updatedUsers);
  };
  
  const value = {
    isAuthenticated: !!user,
    user,
    users,
    isLoading,
    login,
    loginWithEmail,
    logout,
    addUser,
    updateUser,
    deleteUser,
    verifyUserEmail,
  };

  return (
    <AuthContext.Provider value={value}>
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
