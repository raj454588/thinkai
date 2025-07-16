
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Users, LayoutDashboard } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  const currentTab = pathname.includes('analytics') ? 'analytics' : 'users';

  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-headline font-bold">Admin Dashboard</h1>
            </div>
        </div>

        <Tabs value={currentTab} className="mb-8">
            <TabsList>
                <TabsTrigger value="users" asChild>
                    <Link href="/admin">
                        <Users className="mr-2 h-4 w-4" /> User Management
                    </Link>
                </TabsTrigger>
                <TabsTrigger value="analytics" asChild>
                     <Link href="/admin/analytics">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Analytics
                    </Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
        
        {children}
      </main>
    </div>
  );
}
