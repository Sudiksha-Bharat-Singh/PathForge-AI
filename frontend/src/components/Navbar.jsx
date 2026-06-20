import React from 'react';
import './Navbar.css';

export default function Navbar({ onReset, showReset }) {
  return (
    <nav className="platform-navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={onReset} style={{ cursor: 'pointer' }}>
          <span className="brand-logo-symbol">PF</span>
          <span className="brand-name">PathForge <span className="brand-accent">AI</span></span>
        </div>
        
        <div className="nav-metadata">
          <div className="metadata-item">
            <span className="meta-indicator dot-green"></span>
            <span className="meta-text mono">SYSTEM: STABLE</span>
          </div>
          <div className="metadata-item hide-mobile">
            <span className="meta-text mono">MODEL: CLASSIFIER-V2</span>
          </div>
          {showReset && (
            <button className="nav-reset-btn mono" onClick={onReset}>
              Reset Session
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
