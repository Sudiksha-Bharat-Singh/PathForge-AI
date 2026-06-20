import React from 'react';
import './LandingPage.css';

export default function LandingPage({ onStartAssessment }) {
  return (
    <div className="landing-page container animate-slide-up">
      {/* Two-Column Hero Split */}
      <section className="hero-split-grid">
        {/* Left Side: Headline, Copy, CTA, Stats */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-glow"></span>
            <span className="badge-text">PathForge AI 2.0 Engine Active</span>
          </div>

          <h1 className="hero-title">
            Discover Your Ideal <br />
            <span className="gradient-text">Tech Career Path</span>
          </h1>

          <p className="hero-subtitle">
            Get personalized career recommendations, skill-gap analysis, learning roadmaps, and project suggestions based on your current skills.
          </p>

          <div className="hero-cta-wrapper">
            <button className="btn btn-primary btn-lg cta-btn" onClick={onStartAssessment}>
              Start Assessment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="arrow-icon">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Social Proof Statistics Section */}
          <div className="stats-row">
            <div className="stat-item">
              <strong className="stat-value">12,000+</strong>
              <span className="stat-label">Assessments Generated</span>
            </div>
            <div className="stat-item">
              <strong className="stat-value">25+</strong>
              <span className="stat-label">Career Paths Indexed</span>
            </div>
            <div className="stat-item">
              <strong className="stat-value">95%</strong>
              <span className="stat-label">Match Accuracy</span>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Product Flow Preview */}
        <div className="hero-right">
          <div className="preview-pipeline">
            {/* Step 1: Input Skills Card */}
            <div className="pipeline-card skill-input-card card animate-fade">
              <div className="card-indicator top-label">1. Current User Skills</div>
              <div className="skills-tag-display">
                <span className="preview-skill-tag active">Python</span>
                <span className="preview-skill-tag active">SQL</span>
                <span className="preview-skill-tag active">Machine Learning</span>
              </div>
            </div>

            {/* Connector Line 1 */}
            <div className="pipeline-connector">
              <div className="connector-line">
                <span className="flowing-dot"></span>
              </div>
              <div className="connector-arrow">➔</div>
            </div>

            {/* Step 2: Processing Engine Card */}
            <div className="pipeline-card engine-processing-card card">
              <div className="engine-card-layout">
                <div className="pulse-network">
                  <span className="node pulse-node"></span>
                  <span className="node-line"></span>
                  <span className="node core-node">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sparkle-spin">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#3B82F6" />
                    </svg>
                  </span>
                  <span className="node-line"></span>
                  <span className="node pulse-node"></span>
                </div>
                <div className="engine-text">
                  <h5>AI Recommendation Engine</h5>
                  <p>Matching skill parameters with occupational matrices...</p>
                </div>
              </div>
            </div>

            {/* Connector Line 2 */}
            <div className="pipeline-connector">
              <div className="connector-line">
                <span className="flowing-dot delay"></span>
              </div>
              <div className="connector-arrow">➔</div>
            </div>

            {/* Step 3: Match Results Card */}
            <div className="pipeline-card results-preview-card card">
              <div className="card-indicator result-label">2. Predicted Output Match</div>
              
              <div className="results-preview-header">
                <div className="match-badge-pill">95% Match</div>
                <div>
                  <h4 className="match-title">Data Scientist</h4>
                  <span className="match-salary-meta">Avg Salary: $128,000</span>
                </div>
              </div>

              <div className="skills-breakdown-splits">
                <div className="break-col">
                  <h6>Matched Skills</h6>
                  <div className="preview-tags-row">
                    <span className="preview-skill-tag matched">Python</span>
                    <span className="preview-skill-tag matched">SQL</span>
                    <span className="preview-skill-tag matched">Machine Learning</span>
                  </div>
                </div>

                <div className="break-col">
                  <h6>Missing Skills</h6>
                  <div className="preview-tags-row">
                    <span className="preview-skill-tag missing">Statistics</span>
                    <span className="preview-skill-tag missing">Deep Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ambient Purple/Blue glow behind the preview pipeline */}
          <div className="preview-background-glow"></div>
        </div>
      </section>
    </div>
  );
}
