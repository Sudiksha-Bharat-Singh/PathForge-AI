import React from 'react';
import './Navbar.css';

export default function Navbar({ currentScreen, onReset }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container container">
        <div className="navbar-logo" onClick={onReset} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-container">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="url(#logo-grad)" />
              <path d="M12 6L5 20H19L12 6Z" fill="#ffffff" fillOpacity="0.2" />
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">PathForge <span className="logo-subtext">AI</span></span>
        </div>

        <nav className="navbar-nav">
          <span className="nav-breadcrumb">
            {currentScreen === 'landing' && 'Home'}
            {currentScreen === 'assessment' && 'Skills Assessment'}
            {currentScreen === 'analysis' && 'AI Profiling'}
            {currentScreen === 'dashboard' && 'Dashboard Overview'}
          </span>
          
          <div className="navbar-actions">
            <span className="navbar-badge">v1.2 Beta</span>
            {currentScreen !== 'landing' && (
              <button className="btn btn-secondary nav-reset-btn" onClick={onReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Restart Path
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
