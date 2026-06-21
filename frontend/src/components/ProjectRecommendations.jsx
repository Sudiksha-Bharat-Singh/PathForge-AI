import React from 'react';

export default function ProjectRecommendations({ recommendation }) {
  if (!recommendation) return null;

  const { projects, role } = recommendation;

  return (
    <div className="projects-section-card animate-slide-up">
      <div style={{ marginBottom: '28px' }}>
        <span className="section-badge" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
          Portfolio Builder
        </span>
        <h2 style={{ fontSize: '1.45rem', marginTop: '6px', fontWeight: 700 }}>Recommended Projects</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
          Build production-grade systems to validate your expertise and build a robust portfolio for a {role}.
        </p>
      </div>

      <div className="projects-layout-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-recommendation-card">
            <div>
              <div className="project-card-meta">
                <span className={`project-card-difficulty mono ${project.difficulty.toLowerCase()}`}>
                  {project.difficulty}
                </span>
                <span className="project-card-duration mono">
                  EST: {project.time_to_build}
                </span>
              </div>
              
              <h3 className="project-card-title">{project.name}</h3>
              <p className="project-card-desc">{project.description}</p>
            </div>

            <div>
              <div className="project-card-outcomes">
                <span className="project-outcomes-lbl mono">SKILLS LOCKED IN</span>
                <div className="project-outcomes-pills">
                  {project.skills_gained.map((skill, i) => (
                    <span key={i} className="project-outcome-pill mono">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="project-card-footer">
                <span className="project-impact-lbl mono">PORTFOLIO IMPACT</span>
                <span className="project-impact-badge">
                  {project.portfolio_impact}% &bull; {project.impact_rating || "High"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
