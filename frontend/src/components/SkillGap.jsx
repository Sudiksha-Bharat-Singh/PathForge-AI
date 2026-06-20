import React from 'react';
import './SkillGap.css';

export default function SkillGap({ recommendation }) {
  if (!recommendation) return null;

  const { matched_skills, missing_skills, gap_analysis } = recommendation;

  return (
    <section className="gap-section" id="skill-gap">
      <div className="section-header">
        <div className="badge mono">SECTION 05: SKILL GAP ANALYSIS</div>
        <h2 className="section-title">What am I missing?</h2>
        <p className="section-subtitle">
          Compare your active competencies against the required framework and review prioritized actions.
        </p>
      </div>

      <div className="gap-grid">
        {/* Left Side: Overlap Checklist */}
        <div className="gap-col overlap-card card">
          <h3 className="gap-col-title mono">COMPETENCY OVERLAP MATRIX</h3>
          
          <div className="skills-split-container">
            {/* Matched Skills */}
            <div className="skills-split-group">
              <span className="split-group-lbl mono text-green">MATCHED SKILLS ({matched_skills.length})</span>
              <div className="split-pills-list">
                {matched_skills.map(skill => (
                  <div key={skill} className="pill-matched mono">
                    <span className="status-indicator-green">&bull;</span>
                    {skill}
                  </div>
                ))}
                {matched_skills.length === 0 && (
                  <span className="empty-lbl mono">No matched skills identified.</span>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="skills-split-group">
              <span className="split-group-lbl mono text-red">MISSING SKILLS ({missing_skills.length})</span>
              <div className="split-pills-list">
                {missing_skills.map(skill => (
                  <div key={skill} className="pill-missing mono">
                    <span className="status-indicator-red">&bull;</span>
                    {skill}
                  </div>
                ))}
                {missing_skills.length === 0 && (
                  <span className="empty-lbl mono">No missing skills! You possess 100% of the target competencies.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Priority Gap Actions */}
        <div className="gap-col priorities-card card">
          <h3 className="gap-col-title mono">PRIORITIZED ACTION PLAN</h3>
          
          <div className="gap-items-list">
            {gap_analysis.map((gap, idx) => (
              <div key={idx} className="gap-item-card">
                <div className="gap-item-header">
                  <h4 className="gap-item-topic">{gap.topic}</h4>
                  <div className="gap-item-badges">
                    <span className={`badge-priority mono ${gap.priority.toLowerCase()}`}>
                      {gap.priority} PRIORITY
                    </span>
                    <span className="badge-difficulty mono">
                      {gap.difficulty}
                    </span>
                  </div>
                </div>
                <p className="gap-item-text">{gap.gap}</p>
                <div className="gap-item-action-box">
                  <span className="action-box-lbl mono">RECOMMENDED ACTION</span>
                  <p className="action-box-text">{gap.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
