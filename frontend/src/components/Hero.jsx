import React, { useState, useEffect } from 'react';

export default function Hero({ onStartAssessment }) {
  const [matchScore, setMatchScore] = useState(0);
  const [readinessScore, setReadinessScore] = useState(0);
  const [animateBars, setAnimateBars] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Mounting animations to count up scores and animate heights
  useEffect(() => {
    // Animate match score to 88%
    const matchInterval = setInterval(() => {
      setMatchScore((prev) => {
        if (prev >= 88) {
          clearInterval(matchInterval);
          return 88;
        }
        return prev + 2;
      });
    }, 20);

    // Animate readiness to 72%
    const readinessInterval = setInterval(() => {
      setReadinessScore((prev) => {
        if (prev >= 72) {
          clearInterval(readinessInterval);
          return 72;
        }
        return prev + 2;
      });
    }, 25);

    // Trigger bar graph transition
    const barTimer = setTimeout(() => {
      setAnimateBars(true);
    }, 150);

    return () => {
      clearInterval(matchInterval);
      clearInterval(readinessInterval);
      clearTimeout(barTimer);
    };
  }, []);

  // Parallax mouse follow calculation
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around center (0, 0)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate maximum 8 degrees
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    setTilt({ rx: rotateX, ry: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

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

          {/* Right Column: Premium Product Preview Card */}
          <div style={{ perspective: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              className="hero-blueprint-preview-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.rx === 0 ? 'transform 0.5s ease' : 'none'
              }}
            >
              {/* Card Header */}
              <div className="preview-card-header">
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Career Blueprint</h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)' }}>Generated by PathForge AI</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>88% Match</div>
                  <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--color-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-emerald)', borderRadius: '50%', display: 'inline-block' }}></span>
                    READY
                  </div>
                </div>
              </div>

              {/* Grid content */}
              <div className="preview-card-grid">
                
                {/* Left Column: Skills telemetry */}
                <div className="preview-grid-col">
                  {/* Current Profile */}
                  <div style={{ marginBottom: '16px' }}>
                    <span className="preview-section-title">CURRENT PROFILE</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      <span className="preview-skill-tag matched">Python</span>
                      <span className="preview-skill-tag matched">SQL</span>
                      <span className="preview-skill-tag matched">Machine Learning</span>
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <span className="preview-section-title" style={{ color: '#EF4444' }}>MISSING SKILLS</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      <span className="preview-skill-tag gap">LangChain</span>
                      <span className="preview-skill-tag gap">Vector DBs</span>
                      <span className="preview-skill-tag gap">Deep Learning</span>
                    </div>
                  </div>
                </div>

                {/* Center Column: Match Score Circle Centered */}
                <div className="preview-grid-col center-col">
                  <div className="preview-score-circle-container">
                    <svg width="105" height="105" style={{ transform: 'rotate(-90deg)' }}>
                      <circle 
                        cx="52.5" 
                        cy="52.5" 
                        r="45" 
                        fill="none" 
                        stroke="var(--border-color)" 
                        strokeWidth="6" 
                      />
                      <circle 
                        cx="52.5" 
                        cy="52.5" 
                        r="45" 
                        fill="none" 
                        stroke="var(--color-primary)" 
                        strokeWidth="6" 
                        strokeDasharray="282.7"
                        strokeDashoffset={282.7 - (282.7 * matchScore) / 100}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                      />
                    </svg>
                    <div className="preview-score-inner">
                      <span className="preview-score-num">{matchScore}%</span>
                      <span className="preview-score-role">AI Engineer</span>
                    </div>
                  </div>

                  {/* Readiness status bar */}
                  <div style={{ width: '100%', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '2px' }}>
                      <span style={{ color: 'var(--color-ink-muted)' }}>Readiness Index</span>
                      <span className="mono" style={{ fontWeight: 600 }}>{readinessScore}/100</span>
                    </div>
                    <div style={{ height: '5px', backgroundColor: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${readinessScore}%`, 
                          height: '100%', 
                          backgroundColor: 'var(--color-violet)', 
                          borderRadius: '999px',
                          transition: 'width 0.4s ease' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Salary & Path details */}
                <div className="preview-grid-col">
                  {/* Salary Growth */}
                  <div style={{ marginBottom: '16px' }}>
                    <span className="preview-section-title">SALARY OUTLOOK</span>
                    <div className="preview-salary-chart-container">
                      <div className="preview-salary-bar-col">
                        <div 
                          className="preview-salary-bar" 
                          style={{ height: animateBars ? '35%' : '0%' }}
                        ></div>
                        <span className="preview-salary-label">₹8L</span>
                        <span className="preview-salary-sub">Yr 1</span>
                      </div>
                      <div className="preview-salary-bar-col">
                        <div 
                          className="preview-salary-bar highlighted" 
                          style={{ height: animateBars ? '65%' : '0%' }}
                        ></div>
                        <span className="preview-salary-label">₹18L</span>
                        <span className="preview-salary-sub">Yr 3</span>
                      </div>
                      <div className="preview-salary-bar-col">
                        <div 
                          className="preview-salary-bar" 
                          style={{ height: animateBars ? '95%' : '0%' }}
                        ></div>
                        <span className="preview-salary-label">₹35L</span>
                        <span className="preview-salary-sub">Yr 5</span>
                      </div>
                    </div>
                  </div>

                  {/* Future Path */}
                  <div>
                    <span className="preview-section-title">FUTURE PATHWAY</span>
                    <div className="preview-pathway-linear">
                      <div className="preview-pathway-step">AI Engineer</div>
                      <div className="preview-pathway-arrow">➔</div>
                      <div className="preview-pathway-step">Senior AI</div>
                      <div className="preview-pathway-arrow">➔</div>
                      <div className="preview-pathway-step highlighted">AI Architect</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom tag line */}
              <div className="preview-card-footer-line">
                <span className="mono">SYSTEM INDEX: ACCELERATING</span>
                <span className="mono">VERIFIED BY PATHFORGE MODEL-V2</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
