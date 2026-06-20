import React from 'react';
import './CareerBlueprint.css';

export default function CareerBlueprint({ career }) {
  if (!career) return null;

  // Trajectory stages based on the matched career role
  const getTrajectoryStages = (role) => {
    if (role === "AI Engineer") {
      return ["Software Dev Foundation", "AI Engineer", "Senior AI Systems Architect", "Principal Research Scientist"];
    } else if (role === "Data Scientist") {
      return ["Junior Data Analyst", "Data Scientist", "Senior Data Scientist", "AI Research Scientist"];
    } else {
      // Frontend Developer
      return ["Junior Web UI Builder", "Frontend Developer", "Senior Frontend Architect", "VP of UI Engineering"];
    }
  };

  const stages = getTrajectoryStages(career.role);

  return (
    <section id="career-blueprint" className="blueprint-os-section">
      <div className="container">
        {/* IA Q&A Header */}
        <div className="os-section-header">
          <span className="os-section-question">WHAT CAREER FITS ME?</span>
          <h2 className="os-section-title">The Career Blueprint</h2>
          <p className="os-section-explain">Your predicted match and linear projection path throughout the industry.</p>
        </div>

        {/* Blueprint Overview card */}
        <div className="blueprint-overview-row">
          <div className="blueprint-hero-node card">
            <div className="hero-node-header">
              <span className="node-eyebrow-match">TOP PREDICTION MATCH</span>
              <h3>{career.role}</h3>
              <p>{career.description}</p>
            </div>
            
            <div className="hero-node-metrics">
              <div className="metric-box">
                <span className="metric-value-mono">{career.match_percentage}%</span>
                <span className="metric-label">Match Similarity</span>
              </div>
              <div className="metric-box">
                <span className="metric-value-mono">{career.salary_range?.average}</span>
                <span className="metric-label">Average Salary Range</span>
              </div>
            </div>
          </div>

          {/* Connected timeline evolution map */}
          <div className="blueprint-evolution-card card">
            <h4>Ecosystem Evolution Path</h4>
            <p className="evolution-explain-mono">Linear sequence tracking progression from foundation levels to principal architect stages.</p>

            <div className="evolution-timeline-track">
              {/* Connector line background */}
              <div className="evolution-connector-line"></div>

              {stages.map((stage, idx) => {
                const isMatchedRole = stage.toLowerCase() === career.role.toLowerCase();
                return (
                  <div key={idx} className={`evolution-node ${isMatchedRole ? 'active' : ''}`}>
                    <div className="node-bullet-point">
                      <span className="node-index-num">{idx + 1}</span>
                    </div>
                    <div className="node-details">
                      <span className="node-title-mono">{stage}</span>
                      <span className="node-subtitle-mono">
                        {idx === 0 && "Foundation Phase"}
                        {idx === 1 && "Core Practitioner"}
                        {idx === 2 && "Advanced Technical Lead"}
                        {idx === 3 && "Principal Visionary"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
