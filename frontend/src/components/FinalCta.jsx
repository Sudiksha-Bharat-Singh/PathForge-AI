import React from 'react';
import './FinalCta.css';

export default function FinalCta({ onReset }) {
  return (
    <footer className="footer-os-section">
      <div className="container cta-os-layout">
        {/* Converging Forge Line schematic */}
        <div className="os-convergence">
          <span className="os-line-branch branch-left"></span>
          <span className="os-line-branch branch-right"></span>
          <span className="os-core-line"></span>
          <span className="os-tapered-point"></span>
        </div>

        <h2 className="cta-os-headline">Your future career path is already hidden in your skills.</h2>
        
        <button className="btn btn-primary btn-sharp btn-lg" onClick={onReset}>
          Re-Initialize OS Constellation
        </button>

        {/* Quiet Footer links */}
        <div className="os-footer-meta">
          <span className="footer-brand-mono">PATHFORGE AI</span>
          <div className="footer-links-mono">
            <a href="#hero-section" onClick={(e) => { e.preventDefault(); onReset(); }}>System Reset</a>
            <a href="https://github.com/Sudiksha-Bharat-Singh/PathForge-AI" target="_blank" rel="noreferrer">GitHub Workspace</a>
          </div>
          <p>© {new Date().getFullYear()} PathForge AI. Licensed for Advanced Career Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
