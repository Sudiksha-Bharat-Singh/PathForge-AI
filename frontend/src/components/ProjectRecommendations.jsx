import React from 'react';
import './ProjectRecommendations.css';

export default function ProjectRecommendations({ recommendation }) {
  if (!recommendation) return null;

  const { projects } = recommendation;

  return (
    <section className="projects-section" id="project-recommendations">
      <div className="section-header">
        <div className="badge mono">SECTION 07: PROJECT BUILDER</div>
        <h2 className="section-title">What should I build?</h2>
        <p className="section-subtitle">
          Apply your studies by building production-grade projects designed to lock in core engineering skills.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card card">
            <div className="project-meta">
              <span className={`project-difficulty mono ${project.difficulty.toLowerCase()}`}>
                {project.difficulty}
              </span>
              <span className="project-time mono">
                EST. TIME: {project.time_to_build}
              </span>
            </div>
            
            <h3 className="project-title">{project.name}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-outcomes">
              <span className="outcomes-lbl mono">SKILLS LOCKED IN</span>
              <div className="outcomes-pills">
                {project.skills_gained.map((skill, i) => (
                  <span key={i} className="outcome-pill mono">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
