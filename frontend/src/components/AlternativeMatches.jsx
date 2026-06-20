import React from 'react';
import './AlternativeMatches.css';

export default function AlternativeMatches({ alternatives, onSelectAlternative, currentRole }) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="alternatives-section" id="alternative-matches">
      <div className="section-header">
        <div className="badge mono">SECTION 08: OCCUPATIONAL DIRECTORY</div>
        <h2 className="section-title">What other paths are available?</h2>
        <p className="section-subtitle">
          Based on your skills, the engine mapped alternative trajectories. Click any role to pivot your blueprint.
        </p>
      </div>

      <div className="alternatives-grid">
        {alternatives.map((alt, idx) => {
          const isCurrent = alt.role === currentRole;
          return (
            <button
              key={idx}
              className={`alternative-card card ${isCurrent ? 'active-role' : ''}`}
              onClick={() => !isCurrent && onSelectAlternative(alt)}
              disabled={isCurrent}
            >
              <div className="alt-meta">
                <span className="alt-match-score mono">{alt.match_percentage}% MATCH</span>
                {isCurrent && <span className="current-badge mono">ACTIVE BLUEPRINT</span>}
              </div>
              
              <h3 className="alt-title">{alt.role}</h3>
              <p className="alt-desc">{alt.description}</p>
              
              <div className="alt-footer">
                <span className="alt-salary mono">{alt.salary_range.average} avg</span>
                {!isCurrent && <span className="alt-cta mono">Pivot Trajectory &rarr;</span>}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
