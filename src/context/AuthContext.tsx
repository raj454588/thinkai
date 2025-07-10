
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


// Mock user data
const initialUsers: User[] = [
  { id: '1', username: 'admin', mobile: '0000000000', skill: 'Superuser', aiKnowledge: 'advanced', password: 'adminpassword' },
  { id: '2', username: 'jug.k', mobile: '1234567890', skill: 'React, Genkit', aiKnowledge: 'intermediate', password: 'password123' },
  { id: '3', username: 'akshay.h', mobile: '0987654321', skill: 'Next.js, Tailwind', aiKnowledge: 'intermediate', password: 'password456' },
  { id: '4', username: 'new_dev', mobile: '5555555555', skill: 'HTML, CSS', aiKnowledge: 'beginner', password: 'password789' },
];

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  isLoading: boolean;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
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
        setUser(JSON.parse(storedUser));
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
      // In a real app, you'd verify the hashed password. Here we mock it.
      // For sign-up, we don't have a password to check.
      if (!password || userToLogin.password === password) {
        setUser(userToLogin);
        localStorage.setItem('user', JSON.stringify(userToLogin));
        return true;
      }
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const syncUsersToStorage = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  const addUser = (newUser: Omit<User, 'id'>) => {
    if (users.some(u => u.username === newUser.username)) {
      toast({
        title: "Error",
        description: "Username already exists.",
        variant: "destructive",
      });
      return;
    }
    const userWithId = { ...newUser, id: Date.now().toString() };
    const updatedUsers = [...users, userWithId];
    syncUsersToStorage(updatedUsers);
    toast({ title: "Success", description: "User added successfully." });
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
  
  const value = {
    isAuthenticated: !!user,
    user,
    users,
    isLoading,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser
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
