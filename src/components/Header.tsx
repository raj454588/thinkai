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
                      animation: fadeIn 1s ease-out forwards;
                    }
                     @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(5px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    .logo-icon {
                       animation: fadeIn 1s ease-out 0.2s forwards;
                       opacity: 0;
                    }
                    @keyframes pulse {
                      0%, 100% { transform: scale(1); opacity: 1; }
                      50% { transform: scale(1.05); opacity: 0.8; }
                    }
                    .pulse-group {
                      animation: pulse 4s infinite ease-in-out;
                    }
                  `}
                </style>
              </defs>
              <g className="logo-icon pulse-group">
                <path d="M5 20 a 15 15 0 0 1 30 0 a 15 15 0 0 1 -30 0" fill="hsl(var(--primary))" fillOpacity="0.5" />
                <path d="M5 20 a 15 15 0 0 1 30 0" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="4" fill="hsl(var(--accent))" />
                <path d="M12 12 l8 8 m-8 0 l8 -8" stroke="hsl(var(--background))" strokeWidth="1.5" />
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
