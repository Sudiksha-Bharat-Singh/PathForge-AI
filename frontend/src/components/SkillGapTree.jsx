import React from 'react';
import './SkillGapTree.css';

export default function SkillGapTree({ career }) {
  if (!career) return null;

  // Split into structural Q&A groupings: Unlocked, In Progress, and Future
  const unlocked = career.matched_skills;
  const inProgress = career.missing_skills.slice(0, 4); // Immediate gaps
  const future = career.missing_skills.slice(4); // Advanced/Secondary roadmap gaps

  return (
    <section id="skill-gap-tree" className="gap-tree-os-section">
      <div className="container">
        {/* IA Q&A Header */}
        <div className="os-section-header">
          <span className="os-section-question">WHAT AM I MISSING?</span>
          <h2 className="os-section-title">The Skill Tree</h2>
          <p className="os-section-explain">Interactive ecosystem mapping unlocked assets, immediate gaps, and future milestones.</p>
        </div>

        <div className="tree-ecosystem card">
          {/* SVG Links connector track */}
          <div className="tree-vector-background">
            <svg className="tree-vectors-svg" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Draw wires connecting the column layers */}
              <path d="M220 50 C 300 50, 300 120, 380 120" stroke="var(--border-hairline)" strokeWidth="1" />
              <path d="M220 120 C 300 120, 300 120, 380 120" stroke="var(--color-line-blue-soft)" strokeWidth="1.5" />
              <path d="M220 190 C 300 190, 300 120, 380 120" stroke="var(--border-hairline)" strokeWidth="1" />
              
              <path d="M420 120 C 500 120, 500 60, 580 60" stroke="var(--border-hairline)" strokeWidth="1" />
              <path d="M420 120 C 500 120, 500 180, 580 180" stroke="var(--border-hairline)" strokeWidth="1" />
            </svg>
          </div>

          <div className="tree-columns-grid">
            {/* Column 1: Unlocked (Green) */}
            <div className="tree-column unlocked-column">
              <h5 className="tree-column-header-mono">
                <span className="col-dot green"></span>
                UNLOCKED ({unlocked.length})
              </h5>
              <div className="tree-nodes-list">
                {unlocked.map((skill, idx) => (
                  <div key={idx} className="tree-node-item card unlocked-node">
                    <span className="node-icon-status">✓</span>
                    <span className="node-label-mono">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Progress (Blue/Violet Gaps) */}
            <div className="tree-column progress-column">
              <h5 className="tree-column-header-mono">
                <span className="col-dot blue"></span>
                IN PROGRESS ({inProgress.length})
              </h5>
              <div className="tree-nodes-list">
                {inProgress.map((skill, idx) => (
                  <div key={idx} className="tree-node-item card progress-node">
                    <span className="node-icon-status">●</span>
                    <span className="node-label-mono">{skill}</span>
                  </div>
                ))}
                {inProgress.length === 0 && (
                  <div className="empty-tree-node">No active gaps.</div>
                )}
              </div>
            </div>

            {/* Column 3: Future (Gray Locked) */}
            <div className="tree-column future-column">
              <h5 className="tree-column-header-mono">
                <span className="col-dot gray"></span>
                FUTURE SKILLS ({future.length})
              </h5>
              <div className="tree-nodes-list">
                {future.map((skill, idx) => (
                  <div key={idx} className="tree-node-item card future-node">
                    <span className="node-icon-status">○</span>
                    <span className="node-label-mono">{skill}</span>
                  </div>
                ))}
                {future.length === 0 && (
                  <div className="empty-tree-node">Ecosystem complete.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
