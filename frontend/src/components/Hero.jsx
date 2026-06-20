import React from 'react';
import './Hero.css';

export default function Hero({ onStartAssessment }) {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="badge mono">SECTION 01: CORE VALUE</div>
          <h1 className="hero-title">Turn Your Skills Into a Clear Career Path.</h1>
          <p className="hero-description">
            PathForge AI is a career intelligence platform. Enter your current engineering competencies to visualize your exact position in the tech ecosystem, map your optimal career trajectory, and bridge gaps with step-by-step milestones.
          </p>
          <div className="hero-actions">
            <button className="hero-cta-btn" onClick={onStartAssessment}>
              Initialize Assessment &rarr;
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="network-map">
            {/* SVG illustrating connected skill nodes to career outcomes in a clean, high-precision layout */}
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="network-svg">
              <path d="M50 150 L140 100 M50 150 L140 200 M140 100 L260 80 M140 200 L260 220 M260 80 L350 150 M260 220 L350 150 M140 100 L140 200 M260 80 L260 220" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
              
              <circle cx="50" cy="150" r="6" fill="#2563EB" />
              <text x="50" y="132" textAnchor="middle" className="svg-label mono">USER SKILLS</text>
              
              <circle cx="140" cy="100" r="5" fill="#0F172A" />
              <text x="140" y="85" textAnchor="middle" className="svg-label-sub mono">Python</text>
              
              <circle cx="140" cy="200" r="5" fill="#0F172A" />
              <text x="140" y="222" textAnchor="middle" className="svg-label-sub mono">SQL</text>
              
              <circle cx="260" cy="80" r="5" fill="#0F172A" />
              <text x="260" y="65" textAnchor="middle" className="svg-label-sub mono">ML Engine</text>
              
              <circle cx="260" cy="220" r="5" fill="#0F172A" />
              <text x="260" y="242" textAnchor="middle" className="svg-label-sub mono">Roadmap</text>
              
              <circle cx="350" cy="150" r="7" fill="#7C3AED" />
              <text x="350" y="132" textAnchor="middle" className="svg-label mono text-purple">CAREER BLUEPRINT</text>
            </svg>
            <div className="network-status">
              <span className="status-dot green"></span>
              <span className="status-text mono">Intelligence Engine: Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
