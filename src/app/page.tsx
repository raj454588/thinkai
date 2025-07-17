
"use client";

import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { InfoSection } from "@/components/InfoSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8 flex flex-col items-center justify-start gap-8 md:gap-12">
        <ChatInterface />
        <InfoSection />
      </main>
    </div>
  );
}
