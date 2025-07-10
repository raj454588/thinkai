import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 flex items-center">
            <svg
              viewBox="0 0 200 40"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto"
            >
              <defs>
                  <style>
                  {`
                    .logo-text {
                      font-family: 'Space Grotesk', sans-serif;
                      font-size: 28px;
                      font-weight: bold;
                      fill: hsl(var(--foreground));
                    }
                     @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(5px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    .logo-text {
                      animation: fadeIn 1s ease-out forwards;
                    }
                    .logo-icon {
                       animation: fadeIn 1s ease-out 0.2s forwards;
                       opacity: 0;
                    }
                  `}
                </style>
              </defs>
              <g className="logo-icon">
                <path d="M10 5 L10 15 L20 15 L20 25 L30 25 L30 35 L5 35 L5 5 Z" fill="hsl(var(--primary))" />
                <rect x="5" y="5" width="25" height="30" rx="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                 <circle cx="17.5" cy="20" r="4" fill="hsl(var(--background))" />
                 <circle cx="17.5" cy="20" r="2" fill="hsl(var(--accent))" />
              </g>
              <text x="40" y="29" className="logo-text">Think AI</text>
            </svg>
          </div>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
