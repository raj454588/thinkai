import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 flex items-center">
            <svg
              viewBox="0 0 200 40"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto"
            >
              <defs>
                <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
                </linearGradient>
                 <style>
                  {`
                    @keyframes flicker {
                      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                        text-shadow:
                          -0.2rem -0.2rem 1rem hsl(var(--primary) / 0.5),
                          0.2rem 0.2rem 1rem hsl(var(--accent) / 0.5),
                          0 0 2rem hsl(var(--primary)),
                          0 0 4rem hsl(var(--accent)),
                          0 0 6rem #fff,
                          0 0 8rem #fff,
                          0 0 10rem #fff;
                      }
                      20%, 24%, 55% {
                        text-shadow: none;
                      }
                    }
                    .animated-text {
                      font-family: 'Space Grotesk', sans-serif;
                      font-size: 38px;
                      font-weight: bold;
                      fill: url(#text-gradient);
                      animation: flicker 5s linear infinite;
                    }
                  `}
                </style>
              </defs>
              <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="animated-text">
                Think AI
              </text>
            </svg>
          </div>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
