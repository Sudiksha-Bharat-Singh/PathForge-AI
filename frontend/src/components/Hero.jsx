import React, { useState } from 'react';

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "Current Skills",
    subtitle: "Input Competencies",
    status: "Verified",
    color: "var(--color-emerald)",
    details: "Your active stack serving as database credentials.",
    badge: "3 Skills Loaded",
    tags: ["Python", "SQL", "Machine Learning"],
    stats: "Raw inputs parsed successfully"
  },
  {
    id: 2,
    title: "AI Analysis",
    subtitle: "Diagnostics Run",
    status: "Completed",
    color: "var(--color-primary)",
    details: "Cross-referencing index files against 25+ target engineering paths.",
    badge: "128 Data Points",
    stats: "Vector distance matching complete"
  },
  {
    id: 3,
    title: "Recommended Career",
    subtitle: "Target Match",
    status: "88% Match",
    color: "var(--color-violet)",
    details: "AI Engineer selected as optimal high-demand outcome.",
    badge: "Excellent Fit",
    highlight: "AI Engineer",
    stats: "Median Salary: $155,000"
  },
  {
    id: 4,
    title: "Skill Gaps Identified",
    subtitle: "Deficiency Report",
    status: "3 Gaps Found",
    color: "#EF4444",
    details: "Key framework components needed to qualify for top-tier hiring.",
    badge: "Action Required",
    tags: ["LangChain", "Vector Databases", "Deep Learning"],
    stats: "Estimated study time: 7 weeks"
  },
  {
    id: 5,
    title: "Learning Roadmap Active",
    subtitle: "Curriculum Staged",
    status: "Phase 1 Complete",
    color: "var(--color-primary)",
    details: "Interactive learning curriculum structured into 5 sequential milestones.",
    badge: "60% Core Progress",
    stats: "Milestone: Build RAG Knowledge Hub"
  },
  {
    id: 6,
    title: "Senior Role Progression",
    subtitle: "Career Mobility",
    status: "L2 Target",
    color: "var(--color-violet)",
    details: "Advancement plan into senior role scales within 2-4 years.",
    badge: "$180K Avg Salary",
    highlight: "Senior AI Engineer",
    stats: "Focus: MLOps scaling & models fine-tuning"
  },
  {
    id: 7,
    title: "Future Specialization",
    subtitle: "Ultimate Goal Horizon",
    status: "L3 Target",
    color: "var(--color-emerald)",
    details: "Long-term technological leadership path and executive alignment.",
    badge: "AI Architect ➔ Research Lead",
    stats: "Average compensation scale: $220,000+"
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeStep, setActiveStep] = useState(3); // Default highlighting recommended career node

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content column */}
          <div className="hero-content">
            <div className="hero-pill">
              <span style={{ fontSize: '14px' }}>✨</span> AI-Powered Career Intelligence
            </div>
            
            <h1 className="hero-title">
              Turn Your Skills Into a Clear <span>Career Path.</span>
            </h1>
            
            <p className="hero-description">
              PathForge AI is a career operating system. Input your current engineering competencies to visualize your exact position in the tech ecosystem, map your optimal career trajectory, and bridge gaps with step-by-step milestones.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary" onClick={onStartAssessment}>
                Start Assessment &rarr;
              </button>
              <button className="btn-secondary" onClick={onStartAssessment}>
                View Demo
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>25+ Career Paths</h4>
                  <p>Comprehensive engineering mappings</p>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>AI Smart Matching</h4>
                  <p>Real-time analytics engine</p>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>Personalized Roadmaps</h4>
                  <p>Targeted skill building steps</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Career Transformation Journey */}
          <div className="hero-journey-container animate-slide-up">
            <div className="matcher-panel-title" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '16px' }}>
              <span>Career Transformation Journey</span>
              <span className="mono" style={{ color: 'var(--color-primary)' }}>Interactive Guide</span>
            </div>

            <div className="hero-journey-timeline">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = activeStep === step.id;
                const isCompleted = step.id < activeStep;
                
                return (
                  <div 
                    key={step.id} 
                    className={`hero-journey-node-wrapper ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(step.id)}
                    style={{ cursor: 'pointer', display: 'flex', position: 'relative', paddingBottom: idx === JOURNEY_STEPS.length - 1 ? '0' : '20px' }}
                  >
                    {/* Vertical Connecting Line */}
                    {idx !== JOURNEY_STEPS.length - 1 && (
                      <div 
                        className="hero-journey-line" 
                        style={{ 
                          position: 'absolute', 
                          left: '12px', 
                          top: '24px', 
                          bottom: '0', 
                          width: '2px', 
                          backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--border-color)', 
                          zIndex: 1 
                        }}
                      ></div>
                    )}

                    {/* Step Icon circle */}
                    <div 
                      className="hero-journey-icon-circle"
                      style={{ 
                        width: '26px', 
                        height: '26px', 
                        borderRadius: '50%', 
                        backgroundColor: isActive ? step.color : isCompleted ? 'var(--color-primary-soft)' : '#FFFFFF', 
                        border: `2px solid ${isActive ? step.color : isCompleted ? 'var(--color-primary)' : 'var(--border-color)'}`, 
                        color: isActive ? '#FFFFFF' : isCompleted ? 'var(--color-primary)' : 'var(--color-ink-subtle)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        zIndex: 2, 
                        fontWeight: 'bold', 
                        fontSize: '0.75rem',
                        transition: 'var(--transition-fast)',
                        boxShadow: isActive ? `0 0 10px rgba(37, 99, 235, 0.2)` : 'none'
                      }}
                    >
                      {isCompleted ? "✓" : step.id}
                    </div>

                    {/* Node details card */}
                    <div 
                      className={`hero-journey-card ${isActive ? 'active' : ''}`}
                      style={{ 
                        marginLeft: '16px', 
                        flex: 1, 
                        backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent', 
                        border: isActive ? '1px solid var(--border-color)' : '1px solid transparent', 
                        borderRadius: 'var(--radius-md)', 
                        padding: isActive ? '12px 16px' : '0px 10px', 
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>
                            {step.subtitle}
                          </span>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '1px 0' }}>
                            {step.highlight ? <strong>{step.highlight}</strong> : step.title}
                          </h4>
                        </div>
                        <span 
                          className="mono" 
                          style={{ 
                            fontSize: '0.72rem', 
                            color: isActive ? '#FFFFFF' : step.color, 
                            backgroundColor: isActive ? step.color : 'transparent', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          {step.status}
                        </span>
                      </div>

                      {isActive && (
                        <div className="animate-fade" style={{ marginTop: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                            {step.details}
                          </p>
                          
                          {/* Tags row */}
                          {step.tags && (
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                              {step.tags.map((tag, i) => (
                                <span 
                                  key={i} 
                                  className="mono" 
                                  style={{ 
                                    fontSize: '0.68rem', 
                                    padding: '2px 8px', 
                                    backgroundColor: '#FFFFFF', 
                                    border: '1px solid var(--border-color)', 
                                    borderRadius: '4px',
                                    color: 'var(--color-ink)'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--color-ink-subtle)', fontWeight: 500 }}>
                            <span className="mono">{step.badge}</span>
                            <span className="mono" style={{ color: 'var(--color-ink)' }}>{step.stats}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
