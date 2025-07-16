
'use client';

import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { DeveloperCard } from '@/components/DeveloperCard';
import { Users } from 'lucide-react';

export default function DevelopersPage() {
  const { users } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center gap-3 mb-8">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-bold">Developer Showcase</h1>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
            Meet the community of developers and AI enthusiasts using Think AI.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map(user => (
                <DeveloperCard key={user.id} user={user} />
            ))}
        </div>
      </main>
    </div>
  );
}
