import React, { useState } from 'react';

export default function CareerBlueprint({ recommendation }) {
  const [activeStep, setActiveStep] = useState(1); // 1-indexed (1 is Current, 2 is Target...)
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!recommendation) return null;

  const { role, evolution_path, matched_skills } = recommendation;
  
  // Safe fallback if evolution_path is not defined
  const steps = evolution_path || [
    { role: "Current Profile", desc: "Assessed baseline competencies" },
    { role: role, desc: `Target Match specialist` },
    { role: `Senior ${role}`, desc: "Lead developer and design systems architect" },
    { role: `${role} Architect`, desc: "Steers technological system designs" },
    { role: `Principal ${role} Lead`, desc: "Directs long-term research and deployments" }
  ];

  const handleShare = () => {
    const textToCopy = `My Career Blueprint on PathForge AI:\n\n${steps.map((s, i) => `${i + 1}. ${s.role}`).join(' ➔ ')}\n\nGenerate your personalized career path at PathForge AI!`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    });
  };

  return (
    <div className="blueprint-section-card animate-slide-up">
      <div className="blueprint-card-header">
        <div>
          <span className="section-badge" style={{ backgroundColor: 'var(--color-violet-soft)', color: 'var(--color-violet)' }}>
            Signature Trajectory
          </span>
          <h2 style={{ fontSize: '1.45rem', marginTop: '6px', fontWeight: 700 }}>Occupational Evolution Path</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
            Your optimal path mapping from current competencies to advanced industry specializations.
          </p>
        </div>
        
        <button className="blueprint-badge-share" onClick={handleShare}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          {shareSuccess ? "Blueprint Copied!" : "Share Blueprint"}
        </button>
      </div>

      {/* Timeline nodes */}
      <div className="blueprint-timeline-flow">
        {/* Connection line background */}
        <svg className="blueprint-connector-svg" width="100%" height="4">
          <line 
            x1="10%" 
            y1="2" 
            x2="90%" 
            y2="2" 
            className="blueprint-connector-line" 
          />
          <line 
            x1="10%" 
            y1="2" 
            x2={`${10 + (activeStep - 1) * 20}%`} 
            y2="2" 
            className="blueprint-connector-line active" 
          />
        </svg>

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = activeStep === stepNum;
          return (
            <div 
              key={idx} 
              className={`blueprint-node-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveStep(stepNum)}
            >
              <div className="blueprint-node-marker">
                {stepNum}
              </div>
              <h4 className="blueprint-node-role">{step.role}</h4>
              <p className="blueprint-node-desc">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Step Explanation Detail Bar */}
      <div style={{ marginTop: '24px', backgroundColor: 'var(--bg-surface)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ width: '8px', height: '36px', backgroundColor: activeStep === 1 ? 'var(--color-primary)' : 'var(--color-violet)', borderRadius: '4px' }}></div>
        <div>
          <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>
            PHASE {activeStep} DESCRIPTION
          </span>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '2px 0 4px' }}>
            {steps[activeStep - 1].role}
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
            {activeStep === 1 
              ? `You are entering the trajectory using your verified skills: ${matched_skills.join(", ")}.`
              : steps[activeStep - 1].desc
            }
          </p>
        </div>
      </div>
    </div>
  );
}
