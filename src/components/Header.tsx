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
                    stdDeviation="2"
                    result="coloredBlur"
                  ></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="coloredBlur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
                <style>
                  {`
                    @keyframes pulse-node {
                      0%, 100% { r: 3; opacity: 0.7; }
                      50% { r: 4; opacity: 1; }
                    }
                    .node {
                       animation: pulse-node 3s ease-in-out infinite;
                    }
                    .node:nth-child(2) { animation-delay: 0.3s; }
                    .node:nth-child(3) { animation-delay: 0.6s; }
                    .node:nth-child(4) { animation-delay: 0.9s; }
                    .node:nth-child(5) { animation-delay: 1.2s; }
                    .node:nth-child(6) { animation-delay: 1.5s; }
                    .node:nth-child(7) { animation-delay: 1.8s; }
                    .node:nth-child(8) { animation-delay: 2.1s; }
                    .node:nth-child(9) { animation-delay: 2.4s; }
                    
                    @keyframes draw-line {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                    .line {
                        stroke-dasharray: 100;
                        stroke-dashoffset: 100;
                        animation: draw-line 5s ease-in-out infinite;
                    }
                    .line:nth-child(2) { animation-delay: 0.5s; }
                    .line:nth-child(3) { animation-delay: 1s; }
                    .line:nth-child(4) { animation-delay: 1.5s; }
                    .line:nth-child(5) { animation-delay: 2s; }
                    .line:nth-child(6) { animation-delay: 2.5s; }

                    .logo-text {
                      font-family: 'Space Grotesk', sans-serif;
                      font-size: 24px;
                      font-weight: bold;
                      fill: hsl(var(--foreground));
                    }

                    .ai-text {
                      font-family: 'Inter', sans-serif;
                      font-size: 18px;
                      font-weight: 500;
                      fill: hsl(var(--primary-foreground));
                    }
                  `}
                </style>
              </defs>

              <g transform="translate(0, 2)">
                <g filter="url(#glow)">
                  <path d="M25 2C15.6 2 8 9.65 8 19C8 28.35 15.6 36 25 36C29.2 36 33.35 34.2 36.5 31.5M25 2C34.4 2 42 9.65 42 19C42 28.35 34.4 36 25 36C20.8 36 16.65 34.2 13.5 31.5" stroke="hsl(var(--primary))" stroke-width="3" fill="hsla(var(--primary), 0.2)" />
                  <g class="nodes" fill="hsl(var(--accent))">
                      <circle cx="15" cy="12" r="3" class="node" />
                      <circle cx="12" cy="22" r="3" class="node" />
                      <circle cx="20" cy="29" r="3" class="node" />
                      <circle cx="35" cy="12" r="3" class="node" />
                      <circle cx="38" cy="22" r="3" class="node" />
                      <circle cx="30" cy="29" r="3" class="node" />
                      <circle cx="25" cy="5" r="3" class="node" />
                      <circle cx="25" cy="33" r="3" class="node" />
                  </g>
                  <rect x="17" y="11" width="16" height="16" rx="4" fill="hsl(var(--primary))" />
                  <text x="25" y="25" text-anchor="middle" class="ai-text">AI</text>
                  
                  <g class="lines" stroke="hsl(var(--accent))" stroke-width="1.5" opacity="0.8">
                      <line x1="25" y1="5" x2="25" y2="11" class="line" />
                      <line x1="15" y1="12" x2="17" y2="15" class="line" />
                      <line x1="12" y1="22" x2="17" y2="19" class="line" />
                      <line x1="35" y1="12" x2="33" y2="15" class="line" />
                      <line x1="38" y1="22" x2="33" y2="19" class="line" />
                      <line x1="25" y1="33" x2="25" y2="27" class="line" />
                  </g>
                </g>
              </g>

              <text x="55" y="29" className="logo-text">Think AI</text>
            </svg>
          </div>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
