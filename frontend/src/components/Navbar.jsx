import React from 'react';

export default function Navbar({ onReset, isAppMode, onStartAssessment }) {
  return (
    <nav className="platform-navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={onReset}>
          <span className="nav-logo-icon"></span>
          <span>PathForge <span style={{ color: 'var(--color-primary)' }}>AI</span></span>
        </div>
        
        {!isAppMode ? (
          <>
            <div className="nav-links hide-mobile" style={{ display: 'flex', gap: '24px' }}>
              <a href="#home" className="nav-link" onClick={onReset}>Home</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#careers" className="nav-link">Careers</a>
              <a href="#about" className="nav-link">About</a>
            </div>
            <div className="nav-actions">
              <button className="btn-nav-cta" onClick={onStartAssessment}>
                Start Assessment
              </button>
            </div>
          </>
        ) : (
          <div className="nav-actions">
            <span className="mono" style={{ color: 'var(--color-violet)', fontWeight: 600, padding: '4px 10px', backgroundColor: 'var(--color-violet-soft)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', marginRight: '12px' }}>
              CAREER COMMAND CENTER
            </span>
            <button className="btn-nav-reset mono" onClick={onReset}>
              Reset Session
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
