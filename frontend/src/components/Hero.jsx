import React, { useState, useEffect } from 'react';

export default function Hero({ onStartAssessment }) {
  const [demoState, setDemoState] = useState(0); // 0: Input Skills, 1: Scanning, 2: Result

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoState((prev) => (prev + 1) % 3);
    }, 4500); // changes state every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column */}
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

          {/* Right Column: Interactive Career Recommendation Flow */}
          <div className="hero-visual">
            <div className="matcher-panel-title">
              <span>Interactive Engine Simulator</span>
              <span className="mono" style={{ color: 'var(--color-primary)' }}>
                {demoState === 0 && 'STEP 1: INGEST SKILLS'}
                {demoState === 1 && 'STEP 2: MODEL MATCHING'}
                {demoState === 2 && 'STEP 3: COMPILATION'}
              </span>
            </div>

            {/* Simulated flow based on timer */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {demoState === 0 && (
                <div className="animate-fade" style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-ink-subtle)', marginBottom: '14px', fontSize: '0.85rem', fontWeight: 600 }}>
                    YOUR INPUT SKILLS
                  </div>
                  <div className="matcher-skills-row" style={{ justifyContent: 'center' }}>
                    <span className="matcher-skill-tag">Python</span>
                    <span className="matcher-skill-tag">SQL</span>
                    <span className="matcher-skill-tag">Machine Learning</span>
                  </div>
                  <div style={{ color: 'var(--color-ink-subtle)', fontSize: '0.72rem', marginTop: '16px' }}>
                    Parsing text logs & database mappings...
                  </div>
                </div>
              )}

              {demoState === 1 && (
                <div className="animate-fade">
                  <div className="matcher-engine-card">
                    <div className="matcher-engine-loader"></div>
                    <div className="matcher-engine-text mono">PathForge AI Engine</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', marginTop: '8px' }}>
                      Analyzing credentials, industry vacancy statistics, and career models...
                    </p>
                  </div>
                </div>
              )}

              {demoState === 2 && (
                <div className="matcher-match-card">
                  <div className="matcher-match-header">
                    <div className="matcher-match-info">
                      <span className="badge-success">Excellent Match</span>
                      <h3 style={{ marginTop: '4px' }}>AI Engineer</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>
                        Average Salary: $125k - $160k
                      </p>
                    </div>
                    <div className="matcher-match-score-circle">
                      88%
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '12px' }}>
                    <div>
                      <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--color-ink-subtle)', display: 'block', fontWeight: 600 }}>
                        READY INDEX
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>72 / 100</span>
                    </div>
                    <div>
                      <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--color-ink-subtle)', display: 'block', fontWeight: 600 }}>
                        CONFIDENCE
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-violet)' }}>96% Confident</span>
                    </div>
                  </div>

                  <div className="matcher-match-meta">
                    <div className="matcher-meta-item">
                      <span className="matcher-meta-label">Future Role</span>
                      <span className="matcher-meta-val" style={{ color: 'var(--color-violet)' }}>AI Architect</span>
                    </div>
                    <div className="matcher-meta-item" style={{ alignItems: 'flex-end' }}>
                      <span className="matcher-meta-label">Salary Index</span>
                      <span className="matcher-meta-val" style={{ color: 'var(--color-emerald)' }}>High Demand</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="matcher-connector">
              <div className="matcher-connector-line"></div>
              <div className="matcher-connector-arrow">▼</div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              Select skills below to customize this profile mapping.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
