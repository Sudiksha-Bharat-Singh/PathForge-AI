import React from 'react';

export default function FinalCta({ onReset }) {
  return (
    <div className="onboarding-preview-block" style={{ marginTop: '40px', borderStyle: 'solid' }}>
      <span className="section-badge" style={{ backgroundColor: 'var(--color-violet-soft)', color: 'var(--color-violet)' }}>
        Reset Parameters
      </span>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '8px 0' }}>Simulate Another Pathway?</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', marginBottom: '20px' }}>
        Reset your selected engineering capabilities to run new assessments and map alternative blueprints.
      </p>
      <button className="btn-secondary" onClick={onReset}>
        Reset Session &amp; Restart
      </button>
    </div>
  );
}
