
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle } from 'lucide-react';
import { UserTable } from '@/components/UserTable';
import { Button } from '@/components/ui/button';
import { AddUserDialog } from '@/components/AddUserDialog';
import type { User } from '@/lib/types';


export default function AdminPage() {
  const { addUser } = useAuth();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    addUser(newUser);
    setIsAddUserOpen(false);
  };

  return (
    <div>
        <div className="flex items-center justify-end mb-4">
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
    </div>
  );
}
