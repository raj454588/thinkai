import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-foreground">
          Think AI <span className="text-primary font-medium">Lite</span>
        </h1>
      </div>
    </header>
  );
}
