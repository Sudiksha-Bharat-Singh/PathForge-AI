import React, { useEffect, useState } from 'react';
import './AnalysisPage.css';

const LOADING_STEPS = [
  "Scanning occupational taxonomies and dataset profiles...",
  "Correlating input skills against job requirements...",
  "Running gap analysis and prioritizing study vectors...",
  "Structuring customized roadmap phases...",
  "Generating real-world application projects...",
  "Finalizing career path dashboard..."
];

export default function AnalysisPage({ onComplete }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    // Progressively update loading steps
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 550); // Fast enough to complete all steps in ~3 seconds

    // Complete the loading screen after 3.2 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="analysis-page container animate-fade">
      <div className="analysis-container">
        {/* Animated Neural Nodes Loader */}
        <div className="neural-loader">
          <div className="orbital-ring ring-1"></div>
          <div className="orbital-ring ring-2"></div>
          <div className="orbital-ring ring-3"></div>
          <div className="central-node">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sparkle-icon">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="url(#spark-grad)" />
              <defs>
                <linearGradient id="spark-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="glow-accent"></span>
        </div>

        {/* Status Text Stepper */}
        <div className="loading-status-wrapper">
          <span className="badge-loading">PathForge AI Engine Active</span>
          <h3>Synthesizing Career Match</h3>
          
          <div className="status-timeline">
            {LOADING_STEPS.map((step, idx) => {
              let statusClass = "pending";
              if (idx < currentStepIdx) statusClass = "completed";
              else if (idx === currentStepIdx) statusClass = "active";

              return (
                <div className={`status-line-item ${statusClass}`} key={idx}>
                  <div className="status-marker">
                    {statusClass === 'completed' ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="marker-inner"></span>
                    )}
                  </div>
                  <span className="status-text">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
