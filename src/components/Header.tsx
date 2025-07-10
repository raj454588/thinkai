
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
                       animation: fadeIn 1s ease-out 0.2s forwards;
                       opacity: 0;
                    }
                    .logo-icon-group .brain-path {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: draw 5s ease-in-out infinite alternate;
                    }
                    .logo-icon-group .node {
                        animation: pulse 2s ease-in-out infinite alternate;
                    }
                    @keyframes draw {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                    @keyframes pulse {
                        0%, 100% { r: 1.5; opacity: 0.7; }
                        50% { r: 2.5; opacity: 1; }
                    }
                  `}
                </style>
              </defs>
              <g className="logo-icon-group" transform="scale(1.2) translate(0, 2)">
                <path className="brain-path" d="M22.5,13.2C22.5,13.2,22.5,13.2,22.5,13.2c-1.2-0.6-2.6-0.9-4-0.9c-2.3,0-4.4,1-5.8,2.7c-0.6,0.7-1.1,1.5-1.5,2.4
	c-0.8,1.8-1.2,3.8-1.2,5.8s0.4,4,1.2,5.8c0.4,0.9,0.9,1.7,1.5,2.4c1.4,1.7,3.5,2.7,5.8,2.7c1.4,0,2.8-0.3,4-0.9
	c0.6-0.3,1.2-0.7,1.7-1.2c1.3-1.2,2.3-2.8,2.8-4.6c0.2-0.7,0.3-1.3,0.4-2.1c0.1-0.9,0.2-1.8,0.2-2.8s-0.1-1.9-0.2-2.8
	c-0.1-0.7-0.2-1.4-0.4-2.1c-0.5-1.8-1.5-3.4-2.8-4.6C23.7,13.8,23.1,13.5,22.5,13.2z M12.5,6.5C12.5,6.5,12.5,6.5,12.5,6.5
	c-1,0-1.9,0.2-2.8,0.5c-1.4,0.5-2.6,1.4-3.5,2.5C5.3,10.6,4.5,11.8,4,13.1c-0.9,2.4-1.4,5-1.4,7.7s0.5,5.3,1.4,7.7
	c0.5,1.3,1.3,2.5,2.3,3.5c1,1.1,2.2,2,3.5,2.5c0.9,0.3,1.8,0.5,2.8,0.5" stroke="url(#logo-gradient)" strokeWidth="1.2" fill="none" />
                <circle className="node" cx="12.5" cy="6.5" r="1.5" fill="url(#logo-gradient)" />
                <circle className="node" cx="18.5" cy="12.3" r="2" fill="url(#logo-gradient)" />
                <circle className="node" cx="10" cy="20.8" r="2.5" fill="url(#logo-gradient)" />
                <circle className="node" cx="18.5" cy="29.5" r="1.5" fill="url(#logo-gradient)" />
                <circle className="node" cx="27" cy="20.8" r="2" fill="url(#logo-gradient)" />

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
