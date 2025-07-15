
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, PlusCircle, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { UserTable } from '@/components/UserTable';
import { Button } from '@/components/ui/button';
import { AddUserDialog } from '@/components/AddUserDialog';
import type { User } from '@/lib/types';


export default function AdminPage() {
  const { user, isLoading, addUser } = useAuth();
  const router = useRouter();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.username !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.username !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    addUser(newUser);
    setIsAddUserOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
            </div>
            <Button onClick={() => setIsAddUserOpen(true)}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Add User
            </Button>
        </div>

        <UserTable />
        
        <AddUserDialog 
          isOpen={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          onUserAdded={handleAddUser}
        />
      </main>
    </div>
  );
}
