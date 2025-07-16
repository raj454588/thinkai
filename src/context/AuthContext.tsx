
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


// Mock user data
const initialUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', emailVerified: true, mobile: '0000000000', age: 30, gender: 'male', aiKnowledge: 'advanced', password: 'adminpassword' },
  { id: '2', username: 'jug.k', email: 'jug@example.com', emailVerified: true, mobile: '1234567890', age: 25, gender: 'male', aiKnowledge: 'intermediate', password: 'password123' },
  { id: '3', username: 'akshay.h', email: 'akshay@example.com', emailVerified: true, mobile: '0987654321', age: 28, gender: 'male', aiKnowledge: 'intermediate', password: 'password456' },
  { id: '4', username: 'new_dev', email: 'dev@example.com', emailVerified: true, mobile: '5555555555', age: 22, gender: 'female', aiKnowledge: 'beginner', password: 'password789' },
];

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  isLoading: boolean;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id' | 'emailVerified'>) => { success: boolean, error?: string };
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
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
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
    // When logging in, we need the most up-to-date user list
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const userToLogin = currentUsers.find(u => u.username === username);

    if (userToLogin) {
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

  const addUser = (newUser: Omit<User, 'id' | 'emailVerified'>) => {
    if (users.some(u => u.username === newUser.username)) {
      return { success: false, error: "Username already exists." };
    }
     if (users.some(u => u.email === newUser.email)) {
      return { success: false, error: "Email already exists." };
    }
    // New users are automatically verified in this simplified flow
    const userWithId = { ...newUser, id: Date.now().toString(), emailVerified: true };
    const updatedUsers = [...users, userWithId];
    syncUsersToStorage(updatedUsers);
    return { success: true };
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    syncUsersToStorage(updatedUsers);

    // Also update the currently logged-in user state if they are the one being updated
    if(user?.id === updatedUser.id) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

     toast({ title: "Success", description: "User details updated successfully." });
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
    deleteUser,
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
