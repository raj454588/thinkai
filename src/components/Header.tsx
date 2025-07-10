
import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="infinityGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M 25 50 C 25 25, 40 25, 50 50 C 60 75, 75 75, 75 50 C 75 25, 60 25, 50 50 C 40 75, 25 75, 25 50 Z"
                stroke="url(#infinityGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
              <text
                x="50"
                y="58"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="28"
                fontWeight="bold"
                fill="hsl(var(--foreground))"
                textAnchor="middle"
              >
                AI
              </text>
            </svg>
          </div>
           <span className="font-headline text-2xl font-bold text-foreground">Think AI</span>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
