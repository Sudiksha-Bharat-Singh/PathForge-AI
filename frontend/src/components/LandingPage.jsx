import React from 'react';
import './LandingPage.css';

export default function LandingPage({ onStartAssessment }) {
  return (
    <div className="landing-page container animate-slide-up">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">
          <span className="badge-glow"></span>
          <span className="badge-text">Introducing PathForge AI 2.0</span>
        </div>
        
        <h1 className="hero-title">
          Forge Your Future. <br />
          <span className="gradient-text">Guided by Artificial Intelligence.</span>
        </h1>
        
        <p className="hero-subtitle">
          Map your current skill sets, analyze career gaps against thousands of live market benchmarks, 
          and generate personalized learning roadmaps complete with real-world projects.
        </p>

        <div className="hero-cta-group">
          <button className="btn btn-primary btn-lg cta-btn" onClick={onStartAssessment}>
            Start Skills Assessment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <a href="#features" className="btn btn-secondary btn-lg">
            How it works
          </a>
        </div>
      </section>

      {/* Dashboard Preview Mockup Card */}
      <section className="hero-preview">
        <div className="preview-container card">
          <div className="preview-header">
            <div className="preview-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="preview-url">pathforge.ai/dashboard/ai-engineer</div>
          </div>
          <div className="preview-body-mock">
            <div className="mock-sidebar">
              <div className="mock-side-item active"></div>
              <div className="mock-side-item"></div>
              <div className="mock-side-item"></div>
            </div>
            <div className="mock-content">
              <div className="mock-row header-mock">
                <div className="mock-avatar"></div>
                <div className="mock-text-group">
                  <div className="mock-title-bar"></div>
                  <div className="mock-sub-bar"></div>
                </div>
              </div>
              <div className="mock-grid">
                <div className="mock-card">
                  <div className="mock-circle-chart">
                    <span className="mock-percent">88%</span>
                  </div>
                  <div className="mock-text-bar-wide"></div>
                  <div className="mock-text-bar-narrow"></div>
                </div>
                <div className="mock-card-list">
                  <div className="mock-list-item"></div>
                  <div className="mock-list-item"></div>
                  <div className="mock-list-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="glow-background"></div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="landing-features">
        <h2 className="section-title">Designed for modern careers</h2>
        <p className="section-subtitle">
          We combine skills intelligence with structured education to bridge the gap between where you are and where you want to be.
        </p>

        <div className="grid-3 features-grid">
          <div className="card card-hover feature-card">
            <div className="feature-icon blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3>Skills Mapping</h3>
            <p>Input your skills or choose from tags. Our profiling engine indexes overlaps and organizes your assets.</p>
          </div>

          <div className="card card-hover feature-card">
            <div className="feature-icon violet">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3>Custom Roadmaps</h3>
            <p>Receive step-by-step phased instructions detailing specific curriculum topics to study chronologically.</p>
          </div>

          <div className="card card-hover feature-card">
            <div className="feature-icon magenta">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3>Real-world Projects</h3>
            <p>Bridge the gap with practical sandbox projects designed specifically to gain and validate target skills.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
