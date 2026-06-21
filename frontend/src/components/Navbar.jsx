import React from 'react';

export default function Navbar({ onReset, isAppMode, onStartAssessment, activeSection }) {
  
  const handleScrollTo = (id, e) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleKeyDown = (id, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleScrollTo(id, e);
    }
  };

  return (
    <nav className="platform-navbar" role="navigation" aria-label="Main Navigation">
      <div className="nav-container">
        <div 
          className="nav-logo" 
          onClick={onReset}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onReset()}
          role="button"
          aria-label="PathForge AI Logo, click to reset"
        >
          <span className="nav-logo-icon"></span>
          <span>PathForge <span style={{ color: 'var(--color-primary)' }}>AI</span></span>
        </div>
        
        {!isAppMode ? (
          <>
            <div className="nav-links hide-mobile" style={{ display: 'flex', gap: '24px' }}>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => handleScrollTo('home', e)}
                onKeyDown={(e) => handleKeyDown('home', e)}
                tabIndex={0}
                aria-current={activeSection === 'home' ? 'page' : undefined}
              >
                Home
              </a>
              <a 
                href="#how-it-works" 
                className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
                onClick={(e) => handleScrollTo('how-it-works', e)}
                onKeyDown={(e) => handleKeyDown('how-it-works', e)}
                tabIndex={0}
                aria-current={activeSection === 'how-it-works' ? 'page' : undefined}
              >
                How it Works
              </a>
              <a 
                href="#features" 
                className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                onClick={(e) => handleScrollTo('features', e)}
                onKeyDown={(e) => handleKeyDown('features', e)}
                tabIndex={0}
                aria-current={activeSection === 'features' ? 'page' : undefined}
              >
                Features
              </a>
              <a 
                href="#careers" 
                className={`nav-link ${activeSection === 'careers' ? 'active' : ''}`}
                onClick={(e) => handleScrollTo('careers', e)}
                onKeyDown={(e) => handleKeyDown('careers', e)}
                tabIndex={0}
                aria-current={activeSection === 'careers' ? 'page' : undefined}
              >
                Careers
              </a>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleScrollTo('about', e)}
                onKeyDown={(e) => handleKeyDown('about', e)}
                tabIndex={0}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                About
              </a>
            </div>
            <div className="nav-actions">
              <button 
                className="btn-nav-cta" 
                onClick={onStartAssessment}
                aria-label="Start Skills Assessment"
              >
                Start Assessment
              </button>
            </div>
          </>
        ) : (
          <div className="nav-actions">
            <span className="mono" style={{ color: 'var(--color-violet)', fontWeight: 600, padding: '4px 10px', backgroundColor: 'var(--color-violet-soft)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', marginRight: '12px' }}>
              CAREER COMMAND CENTER
            </span>
            <button 
              className="btn-nav-reset mono" 
              onClick={onReset}
              aria-label="Reset current active diagnostic session"
            >
              Reset Session
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
