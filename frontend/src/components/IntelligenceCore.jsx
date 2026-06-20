import React, { useEffect, useState } from 'react';
import './IntelligenceCore.css';

const TERMINAL_STEPS = [
  "Resolving skill vector coefficients...",
  "Querying career taxonomy database...",
  "Correlating matches using cosine similarities...",
  "Calculating priority gap indices...",
  "Generating evidence-backed milestones...",
  "Ecosystem synthesis complete."
];

export default function IntelligenceCore({ activeSkills, isScanning, onScanComplete }) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setActiveStepIdx(0);
      return;
    }

    // Step progression timer
    const stepInterval = setInterval(() => {
      setActiveStepIdx((prev) => {
        if (prev < TERMINAL_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450); // Completes in ~2.7s

    // Auto-trigger completion after 3s
    const timeout = setTimeout(() => {
      onScanComplete();
    }, 3000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [isScanning, onScanComplete]);

  if (!isScanning) return null;

  return (
    <section className="core-os-section animate-fade">
      <div className="container core-layout-grid">
        {/* Left Side: Technical connection schematic */}
        <div className="core-schematic card">
          <svg className="schematic-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Input nodes */}
            <circle cx="30" cy="50" r="3" fill="var(--color-line-blue)" />
            <circle cx="30" cy="100" r="3" fill="var(--color-line-blue)" />
            <circle cx="30" cy="150" r="3" fill="var(--color-line-blue)" />
            
            {/* Branching curves towards the central processor line */}
            <path d="M30 50 C 70 50, 70 100, 100 100" stroke="var(--border-hairline)" strokeWidth="1" />
            <line x1="30" y1="100" x2="100" y2="100" stroke="var(--color-line-blue)" strokeWidth="1.5" />
            <path d="M30 150 C 70 150, 70 100, 100 100" stroke="var(--border-hairline)" strokeWidth="1" />

            {/* Central scanning terminal point */}
            <circle cx="100" cy="100" r="5" fill="#ffffff" stroke="var(--color-line-blue)" strokeWidth="3" className="scanner-dot" />

            {/* Output curves towards target nodes */}
            <path d="M100 100 C 130 100, 130 60, 170 60" stroke="var(--border-hairline)" strokeWidth="1" />
            <path d="M100 100 C 130 100, 130 100, 170 100" stroke="var(--color-line-blue)" strokeWidth="1.5" className="flowing-path-stroke" />
            <path d="M100 100 C 130 100, 130 140, 170 140" stroke="var(--border-hairline)" strokeWidth="1" />

            <circle cx="170" cy="60" r="3" fill="var(--border-medium)" />
            <circle cx="170" cy="100" r="4" fill="var(--color-line-blue)" />
            <circle cx="170" cy="140" r="3" fill="var(--border-medium)" />
          </svg>
        </div>

        {/* Right Side: Status timeline steppers */}
        <div className="core-terminal-panel card">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title-mono">pathforge-intelligence-core.sh</span>
          </div>
          
          <div className="terminal-body-mono">
            {TERMINAL_STEPS.map((step, idx) => {
              let status = "pending";
              if (idx < activeStepIdx) status = "success";
              else if (idx === activeStepIdx) status = "processing";

              return (
                <div key={idx} className={`terminal-line ${status}`}>
                  <span className="terminal-indicator">
                    {status === 'success' && '✓'}
                    {status === 'processing' && '➔'}
                    {status === 'pending' && '○'}
                  </span>
                  <span className="terminal-text">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
