import React from 'react';
import './FinalCta.css';

export default function FinalCta({ onReset }) {
  return (
    <section className="cta-section" id="final-cta">
      <div className="cta-container card">
        <div className="badge mono">SECTION 09: INITIALIZE RESET</div>
        <h2 className="cta-title">Your future career path is already hidden in your skills.</h2>
        <p className="cta-subtitle">
          Want to simulate a different pathway or add more skills? Flush all active assessment parameters to restart.
        </p>
        <div className="cta-actions">
          <button className="cta-reset-btn" onClick={onReset}>
            Reset Assessment &amp; Map New Path
          </button>
        </div>
      </div>
    </section>
  );
}
