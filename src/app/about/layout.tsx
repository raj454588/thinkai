
'use client';

import { Header } from '@/components/Header';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
