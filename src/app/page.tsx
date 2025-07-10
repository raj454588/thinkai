import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { LandingSections } from "@/components/LandingSections";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col gap-12">
        <ChatInterface />
        <LandingSections />
      </main>
    </div>
  );
}
