
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UserForm } from './UserForm';
import type { User } from '@/lib/types';

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: User;
  onUserUpdated: (user: User) => void;
}

export function EditUserDialog({ isOpen, onOpenChange, user, onUserUpdated }: EditUserDialogProps) {

  const handleUpdate = (values: Omit<User, 'id'>) => {
    onUserUpdated({ ...user, ...values });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm onFormSubmit={handleUpdate} defaultValues={user} />
      </DialogContent>
    </Dialog>
  );
}
