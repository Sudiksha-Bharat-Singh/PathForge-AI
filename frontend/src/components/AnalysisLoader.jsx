import React, { useEffect, useState } from 'react';
import './AnalysisLoader.css';

const LOADING_STEPS = [
  { id: 1, label: "Cleaning competencies payload", desc: "Standardizing skills syntax and filtering vocabulary" },
  { id: 2, label: "Executing mapping functions", desc: "Computing overlaps with career frameworks" },
  { id: 3, label: "Compiling skill-gap trees", desc: "Prioritizing deficiencies and missing toolsets" },
  { id: 4, label: "Generating roadmap pathways", desc: "Structuring sequential phases and project recommendations" }
];

export default function AnalysisLoader({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep < LOADING_STEPS.length) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 1000); // 1.0s per pipeline step
      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(completionTimer);
    }
  }, [activeStep, onComplete]);

  return (
    <section className="loader-section">
      <div className="loader-container card">
        <div className="badge mono">SECTION 03: INTELLIGENCE ENGINE</div>
        <h2 className="loader-title">What is happening behind the scenes?</h2>
        <p className="loader-subtitle">
          The career intelligence platform is analyzing your skills to output a custom blueprint.
        </p>

        <div className="pipeline-container">
          {/* Timeline pipe representing pipeline flow */}
          <div className="pipeline-track">
            <div 
              className="pipeline-progress" 
              style={{ width: `${(activeStep / (LOADING_STEPS.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="pipeline-nodes">
            {LOADING_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isActive = idx === activeStep;
              
              let nodeClass = "pipeline-node";
              if (isCompleted) nodeClass += " completed";
              if (isActive) nodeClass += " active";
              
              return (
                <div key={step.id} className="pipeline-node-wrapper">
                  <div className={nodeClass}>
                    {isCompleted ? (
                      <span className="check-mark">&#10003;</span>
                    ) : (
                      <span className="step-num mono">{step.id}</span>
                    )}
                  </div>
                  <div className="pipeline-meta">
                    <span className="pipeline-label mono">{step.label}</span>
                    <span className="pipeline-desc">{step.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="loader-footer mono text-purple animate-pulse">
          {activeStep < LOADING_STEPS.length ? "PROCESSING QUANTITATIVE SKILLS DATA..." : "COMPILING BLUEPRINT OUTPUT..."}
        </div>
      </div>
    </section>
  );
}
