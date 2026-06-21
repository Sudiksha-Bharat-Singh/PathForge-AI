import React from 'react';

export default function AlternativeMatches({ alternatives, onSelectAlternative, currentRole }) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="alt-matches-section-card animate-slide-up">
      <div style={{ marginBottom: '20px' }}>
        <span className="section-badge" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
          Occupational Overlays
        </span>
        <h2 style={{ fontSize: '1.25rem', marginTop: '6px', fontWeight: 700 }}>Alternative Career Paths</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
          Our intelligence pipeline also matches you with these secondary trajectories. Click to examine blueprints.
        </p>
      </div>

      <div className="alt-matches-slider">
        {alternatives.map((career, idx) => {
          const isActive = career.role === currentRole;
          return (
            <div 
              key={idx} 
              className={`alt-match-item-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectAlternative(career)}
            >
              <div className="alt-match-item-header">
                <span className="alt-match-title">{career.role}</span>
                <span className="alt-match-percentage mono">{career.match_percentage}% Match</span>
              </div>
              <div className="alt-match-salary mono">
                Avg: {career.salary_range.average}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
