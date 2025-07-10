
import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 flex items-center">
             <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f77737" />
                  <stop offset="50%" stopColor="#f56040" />
                  <stop offset="100%" stopColor="#c13584" />
                </linearGradient>
                <style>
                  {`
                    .logo-text {
                      font-family: 'Space Grotesk', sans-serif;
                      font-size: 36px;
                      font-weight: bold;
                      fill: url(#logo-gradient);
                    }
                  `}
                </style>
              </defs>
              <rect x="2" y="2" width="96" height="96" rx="20" ry="20" fill="black" />
               <path
                d="M30,35 C20,40 20,60 30,65 C35,68 40,65 40,60 L40,40 C40,35 35,32 30,35 Z 
                   M30,35 C35,32 42,35 42,40 L42,45 
                   C38,43 35,45 35,50 C35,55 38,57 42,55 L42,60 
                   C42,65 35,68 30,65"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="58" y="65" textAnchor="middle" className="logo-text">
                AI
              </text>
               <rect x="2" y="2" width="96" height="96" rx="20" ry="20" fill="transparent" stroke="url(#logo-gradient)" strokeWidth="4" />
             </svg>
          </div>
           <span className="font-headline text-2xl font-bold text-foreground">Think AI Lite</span>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
