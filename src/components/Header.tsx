import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute h-full w-full animate-[spin_8s_linear_infinite] text-primary/50"
            >
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="m4.93 4.93 2.83 2.83" />
              <path d="m16.24 16.24 2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="m4.93 19.07 2.83-2.83" />
              <path d="m16.24 7.76 2.83-2.83" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-full w-full animate-[pulse_2s_ease-in-out_infinite] text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]"
            >
              <path d="M9.06 18.36a5 5 0 0 1-5-5" />
              <path d="M14.94 5.64a5 5 0 0 1 5 5" />
              <path d="M18.36 14.94a5 5 0 0 1-5 5" />
              <path d="M5.64 9.06a5 5 0 0 1 5-5" />
              <path d="M12 12a3 3 0 1 1-3-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-headline font-bold text-foreground">
            Think AI
          </h1>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
