
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { EditUserDialog } from './EditUserDialog';
import { DeleteUserDialog } from './DeleteUserDialog';
import type { User } from '@/lib/types';


export function UserTable() {
  const { users, updateUser, deleteUser, user: currentUser } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    updateUser(user);
    setEditingUser(null);
  };
  
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    setDeletingUser(null);
  }

  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="hidden md:table-cell">Mobile</TableHead>
              <TableHead>AI Knowledge</TableHead>
              <TableHead className="hidden lg:table-cell">Skills</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="hidden md:table-cell">{user.mobile}</TableCell>
                <TableCell>
                  <Badge variant={
                      user.aiKnowledge === 'advanced' ? 'default' : 
                      user.aiKnowledge === 'intermediate' ? 'secondary' : 'outline'
                  } className="capitalize">
                      {user.aiKnowledge}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{user.skill}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingUser(user)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingUser(user)}
                        disabled={currentUser?.id === user.id}
                        className="text-red-600 focus:text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <EditUserDialog
          isOpen={!!editingUser}
          onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}
          user={editingUser}
          onUserUpdated={handleEditUser}
        />
      )}

      {deletingUser && (
          <DeleteUserDialog 
            isOpen={!!deletingUser}
            onOpenChange={(isOpen) => !isOpen && setDeletingUser(null)}
            user={deletingUser}
            onUserDeleted={() => handleDeleteUser(deletingUser.id)}
          />
      )}
    </>
  );
}

