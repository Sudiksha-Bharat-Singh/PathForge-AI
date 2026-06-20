import React from 'react';
import './ProjectShowcase.css';

export default function ProjectShowcase({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="project-showcase" className="projects-os-section">
      <div className="container">
        {/* IA Q&A Header */}
        <div className="os-section-header">
          <span className="os-section-question">WHAT SHOULD I BUILD?</span>
          <h2 className="os-section-title">Recommended Projects</h2>
          <p className="os-section-explain">Hands-on sandbox labs designed to validate your knowledge and deploy as live evidence.</p>
        </div>

        <div className="projects-os-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-capsule-card card">
              <div className="capsule-header">
                <span className={`difficulty-badge-mono ${proj.difficulty.toLowerCase()}`}>
                  {proj.difficulty}
                </span>
                <span className="duration-badge-mono">
                  Est. {proj.time_to_build}
                </span>
              </div>

              <h4>{proj.name}</h4>
              <p>{proj.description}</p>

              <div className="capsule-skills-footer">
                <span className="skills-meta-title">Skills Gained:</span>
                <div className="capsule-skills-row">
                  {proj.skills_gained.map((skill, tagIdx) => (
                    <span key={tagIdx} className="capsule-skill-tag-mono">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
