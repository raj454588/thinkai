import { NavMenu } from './NavMenu';

export function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 flex items-center">
            <svg
              viewBox="0 0 220 50"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto"
            >
              <defs>
                <linearGradient
                  id="brain-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: 'hsl(var(--primary))' }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: 'hsl(var(--accent))' }}
                  />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur
                    stdDeviation="2.5"
                    result="coloredBlur"
                  ></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="coloredBlur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <style>
                  {`
                    @keyframes pulse {
                      0%, 100% { r: 1.5; opacity: 0.8; }
                      50% { r: 2.5; opacity: 1; }
                    }
                    .node {
                       animation: pulse 3s ease-in-out infinite;
                    }
                    .node:nth-child(2) { animation-delay: 0.2s; }
                    .node:nth-child(3) { animation-delay: 0.5s; }
                    .node:nth-child(4) { animation-delay: 0.8s; }
                    .node:nth-child(5) { animation-delay: 1.1s; }
                    .node:nth-child(6) { animation-delay: 1.4s; }
                    .node:nth-child(7) { animation-delay: 1.7s; }
                    .node:nth-child(8) { animation-delay: 2s; }
                    .node:nth-child(9) { animation-delay: 2.3s; }
                    .node:nth-child(10) { animation-delay: 2.6s; }
                    
                    @keyframes draw-line {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                    .line {
                        stroke-dasharray: 50;
                        stroke-dashoffset: 50;
                        animation: draw-line 4s ease-in-out infinite;
                    }
                    .line:nth-child(2) { animation-delay: 0.3s; }
                    .line:nth-child(3) { animation-delay: 0.6s; }
                    .line:nth-child(4) { animation-delay: 0.9s; }
                    .line:nth-child(5) { animation-delay: 1.2s; }
                    .line:nth-child(6) { animation-delay: 1.5s; }
                    .line:nth-child(7) { animation-delay: 1.8s; }
                    .line:nth-child(8) { animation-delay: 2.1s; }

                    .logo-text {
                      font-family: 'Space Grotesk', sans-serif;
                      font-size: 24px;
                      font-weight: bold;
                      fill: hsl(var(--foreground));
                    }
                  `}
                </style>
              </defs>

              <g filter="url(#glow)">
                <path
                  d="M25,5 C12,5 5,15 5,25 C5,35 12,45 25,45 C32,45 38,40 42,35 M25,5 C38,5 45,15 45,25 C45,35 38,45 25,45 M25,5 Q30,15 25,25 M25,45 Q30,35 25,25 M20,15 C15,20 15,30 20,35 M30,15 C35,20 35,30 30,35"
                  stroke="url(#brain-gradient)"
                  strokeWidth="1.5"
                  fill="none"
                />

                <g className="lines" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.7">
                    <line x1="15" y1="15" x2="25" y2="8" className="line" />
                    <line x1="25" y1="8" x2="35" y2="15" className="line" />
                    <line x1="10" y1="25" x2="18" y2="20" className="line" />
                    <line x1="40" y1="25" x2="32" y2="30" className="line" />
                    <line x1="18" y1="30" x2="25" y2="42" className="line" />
                    <line x1="25" y1="42" x2="32" y2="30" className="line" />
                    <line x1="25" y1="25" x2="18" y2="20" className="line" />
                    <line x1="25" y1="25" x2="32" y2="30" className="line" />
                </g>

                <g className="nodes" fill="hsl(var(--primary))">
                  <circle cx="25" cy="8" r="1.5" className="node" />
                  <circle cx="15" cy="15" r="1.5" className="node" />
                  <circle cx="35" cy="15" r="1.5" className="node" />
                  <circle cx="18" cy="20" r="1.5" className="node" />
                  <circle cx="10" cy="25" r="1.5" className="node" />
                  <circle cx="40" cy="25" r="1.5" className="node" />
                  <circle cx="18" cy="30" r="1.5" className="node" />
                  <circle cx="32" cy="30" r="1.5" className="node" />
                  <circle cx="25" cy="42" r="1.5" className="node" />
                  <circle cx="25" cy="25" r="2" className="node" />
                </g>
              </g>

              <text x="60" y="33" className="logo-text">Think AI</text>
            </svg>
          </div>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}