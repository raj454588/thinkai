import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
             <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
                <style>
                  {`
                    @keyframes twinkle {
                      0%, 100% { opacity: 1; transform: scale(1); }
                      50% { opacity: 0.6; transform: scale(0.9); }
                    }
                    .star-1 { animation: twinkle 3s ease-in-out infinite; animation-delay: 0s; }
                    .star-2 { animation: twinkle 3s ease-in-out infinite; animation-delay: 0.5s; }
                    .star-3 { animation: twinkle 3s ease-in-out infinite; animation-delay: 1s; }
                  `}
                </style>
              </defs>
              
              <path
                d="M78,20 H45 C33.954,20 25,28.954 25,40 V75 C25,86.046 33.954,95 45,95 H78 C89.046,95 98,86.046 98,75 V40 C98,28.954 89.046,20 78,20 Z"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              <text x="50" y="68" fontFamily="Space Grotesk, sans-serif" fontSize="38" fontWeight="bold" fill="url(#logo-gradient)" textAnchor="middle">AI</text>
              
              <g fill="url(#logo-gradient)">
                <path className="star-1" d="M22 15 L24.5 24.5 L34 27 L24.5 29.5 L22 39 L19.5 29.5 L10 27 L19.5 24.5 Z" />
                <path className="star-2" d="M42 38 L44.5 44.5 L51 46 L44.5 47.5 L42 54 L39.5 47.5 L33 46 L39.5 44.5 Z" />
                <path className="star-3" d="M12 55 L13.5 60.5 L18 62 L13.5 63.5 L12 69 L10.5 63.5 L6 62 L10.5 60.5 Z" />
              </g>
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
