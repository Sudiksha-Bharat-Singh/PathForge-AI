import React from 'react';

export default function SkillGap({ recommendation }) {
  if (!recommendation) return null;

  const { skill_categories, role } = recommendation;

  // Fallbacks if not predefined
  const haveSkills = skill_categories?.have || recommendation.matched_skills || [];
  const missingSkills = skill_categories?.missing || (recommendation.missing_skills || []).map(name => ({
    name, priority: "High", difficulty: "Intermediate", time: "2 weeks"
  }));
  const optionalSkills = skill_categories?.optional || [
    { name: "REST APIs", priority: "Low", difficulty: "Easy", time: "1 week" },
    { name: "Git workflows", priority: "Low", difficulty: "Easy", time: "1 week" }
  ];
  const futureSkills = skill_categories?.future || [
    { name: "System Design", priority: "Medium", difficulty: "Advanced", time: "3 weeks" },
    { name: "Cloud Deployments", priority: "Medium", difficulty: "Advanced", time: "3 weeks" }
  ];

  return (
    <div className="skill-gap-section animate-slide-up">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-badge" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
          Competency Matrix
        </span>
        <h2 style={{ fontSize: '1.45rem', marginTop: '6px', fontWeight: 700 }}>Skill Gap Analysis</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
          Detailed comparison of your current engineering profile against standard industry requirements for a {role}.
        </p>
      </div>

      <div className="skill-gap-matrix">
        {/* Column 1: Skills You Have */}
        <div className="gap-matrix-col">
          <div className="gap-col-header">
            <span className="gap-indicator-dot emerald"></span>
            <span>Skills You Have ({haveSkills.length})</span>
          </div>
          <div className="gap-skills-list">
            {haveSkills.map((skill, idx) => (
              <div key={idx} className="gap-skill-item" style={{ borderLeft: '3px solid var(--color-emerald)' }}>
                <div className="gap-skill-name">{typeof skill === 'string' ? skill : skill.name}</div>
                <div className="gap-skill-meta">
                  <span className="gap-pill-priority low" style={{ backgroundColor: 'var(--color-emerald-soft)', color: 'var(--color-emerald)' }}>
                    Matched
                  </span>
                  <span className="gap-pill-difficulty">Unlocked</span>
                </div>
              </div>
            ))}
            {haveSkills.length === 0 && (
              <div className="gap-skill-empty">No matching skills found.</div>
            )}
          </div>
        </div>

        {/* Column 2: Critical Missing Skills */}
        <div className="gap-matrix-col">
          <div className="gap-col-header">
            <span className="gap-indicator-dot pb-red" style={{ backgroundColor: '#EF4444' }}></span>
            <span>Critical Missing ({missingSkills.length})</span>
          </div>
          <div className="gap-skills-list">
            {missingSkills.map((skill, idx) => (
              <div key={idx} className="gap-skill-item" style={{ borderLeft: '3px solid #EF4444' }}>
                <div className="gap-skill-name">{skill.name}</div>
                <div className="gap-skill-meta">
                  <span className={`gap-pill-priority ${skill.priority.toLowerCase()}`}>
                    {skill.priority}
                  </span>
                  <span className="gap-pill-difficulty">{skill.difficulty}</span>
                  <span className="gap-pill-duration">{skill.time}</span>
                </div>
              </div>
            ))}
            {missingSkills.length === 0 && (
              <div className="gap-skill-empty">0 critical missing skills!</div>
            )}
          </div>
        </div>

        {/* Column 3: Optional Skills */}
        <div className="gap-matrix-col">
          <div className="gap-col-header">
            <span className="gap-indicator-dot amber"></span>
            <span>Optional Skills ({optionalSkills.length})</span>
          </div>
          <div className="gap-skills-list">
            {optionalSkills.map((skill, idx) => (
              <div key={idx} className="gap-skill-item" style={{ borderLeft: '3px solid var(--color-amber)' }}>
                <div className="gap-skill-name">{skill.name}</div>
                <div className="gap-skill-meta">
                  <span className={`gap-pill-priority ${skill.priority.toLowerCase()}`}>
                    {skill.priority}
                  </span>
                  <span className="gap-pill-difficulty">{skill.difficulty}</span>
                  <span className="gap-pill-duration">{skill.time}</span>
                </div>
              </div>
            ))}
            {optionalSkills.length === 0 && (
              <div className="gap-skill-empty">None identified.</div>
            )}
          </div>
        </div>

        {/* Column 4: Future Skills */}
        <div className="gap-matrix-col">
          <div className="gap-col-header">
            <span className="gap-indicator-dot violet"></span>
            <span>Future Skills ({futureSkills.length})</span>
          </div>
          <div className="gap-skills-list">
            {futureSkills.map((skill, idx) => (
              <div key={idx} className="gap-skill-item" style={{ borderLeft: '3px solid var(--color-violet)' }}>
                <div className="gap-skill-name">{skill.name}</div>
                <div className="gap-skill-meta">
                  <span className={`gap-pill-priority ${skill.priority.toLowerCase()}`}>
                    {skill.priority}
                  </span>
                  <span className="gap-pill-difficulty">{skill.difficulty}</span>
                  <span className="gap-pill-duration">{skill.time}</span>
                </div>
              </div>
            ))}
            {futureSkills.length === 0 && (
              <div className="gap-skill-empty">None identified.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
