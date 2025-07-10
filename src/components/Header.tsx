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
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
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
                    .logo-icon-group {
                       animation: fadeIn 1s ease-out 0.2s forwards, shimmer 5s infinite linear;
                       opacity: 0;
                    }
                    @keyframes shimmer {
                      0% { filter: brightness(1); }
                      50% { filter: brightness(1.2); }
                      100% { filter: brightness(1); }
                    }
                  `}
                </style>
              </defs>
              <g className="logo-icon-group">
                <path 
                  d="M4.167 8.333A4.167 4.167 0 0 0 0 12.5v15a4.167 4.167 0 0 0 4.167 4.167h15a4.167 4.167 0 0 0 4.166-4.167v-15A4.167 4.167 0 0 0 19.166 8.333H4.167zm0-2.5h15a6.667 6.667 0 0 1 6.666 6.667v15a6.667 6.667 0 0 1-6.666 6.667h-15A6.667 6.667 0 0 1-2.5 27.5v-15A6.667 6.667 0 0 1 4.167 5.833z" 
                  transform="scale(1.2)" 
                  fill="url(#logo-gradient)" 
                />
                <g stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M19.125 19.958c0 2.95-1.575 4.125-3.208 4.125-1.25 0-1.792-.667-2.25-1.25-.833-1.042-2.25-2.292-2.25-4.542s1.417-3.5 2.25-4.542c.458-.583 1-1.25 2.25-1.25 1.633 0 3.208 1.175 3.208 4.125zM13.667 12.458c-2.042 0-2.917 1.25-3.542 2.25-.5.833-1.25 2.25-1.25 4.542 0 .5.042.958.125 1.375" />
                  <path d="M20.833 15.167h2.292m-2.292 4.791h3.958m-3.958 4.792h2.292" />
                  <circle cx="28.083" cy="15.167" r="1.25" />
                  <circle cx="29.75" cy="19.958" r="1.25" />
                  <circle cx="28.083" cy="24.75" r="1.25" />
                </g>
              </g>
              <text x="40" y="29" className="logo-text">Think AI Lite</text>
            </svg>
          </div>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
