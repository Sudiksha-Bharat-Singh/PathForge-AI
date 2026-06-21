import React, { useEffect, useState } from 'react';

const LOADING_STEPS = [
  { id: 1, label: "Parsing Skill Index", desc: "Standardizing skills syntax and checking baseline vocabulary" },
  { id: 2, label: "Executing Diagnostics Mapping", desc: "Correlating active skills against 18 target career profiles" },
  { id: 3, label: "Compiling Skill-Gap Trees", desc: "Calculating priority indicators and learning durations" },
  { id: 4, label: "Synthesizing Roadmap Curriculum", desc: "Structuring learning phases, milestones, and project paths" }
];

export default function AnalysisLoader({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep < LOADING_STEPS.length) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 700); // Fast compiling transitions
      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 200);
      return () => clearTimeout(completionTimer);
    }
  }, [activeStep, onComplete]);

  return (
    <div className="scanning-workspace">
      <div className="scanning-card animate-slide-up">
        <div className="scanning-spinner"></div>
        <h2 className="scanning-title">Compiling Career Workspace</h2>
        <p className="scanning-desc">
          The PathForge AI intelligence engine is parsing your profile metrics to generate a personalized career blueprint...
        </p>

        <div className="scanning-steps">
          {LOADING_STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            return (
              <div 
                key={step.id} 
                className={`scanning-step-item ${isCompleted ? 'done' : ''} ${isActive ? 'active' : ''}`}
              >
                <span className="scanning-step-icon">
                  {isCompleted ? (
                    <span style={{ color: 'var(--color-emerald)', fontWeight: 'bold' }}>✓</span>
                  ) : isActive ? (
                    <span className="mono" style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }}>⟳</span>
                  ) : (
                    <span className="mono" style={{ color: 'var(--color-ink-subtle)' }}>•</span>
                  )}
                </span>
                <span className="scanning-step-text">
                  <strong>{step.label}</strong> &mdash; <span style={{ fontSize: '0.72rem' }}>{step.desc}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
