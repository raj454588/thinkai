
import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
             <span className="text-4xl" role="img" aria-label="Robot logo">🤖</span>
          </div>
           <span className="font-headline text-2xl font-bold text-foreground">Think AI Lite</span>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
