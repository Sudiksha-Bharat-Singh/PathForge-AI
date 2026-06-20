import React from 'react';
import './CareerBlueprint.css';

// Helper to determine next career tiers dynamically based on target role
const getEvolutionPath = (role) => {
  switch (role) {
    case "AI Engineer":
      return [
        { title: "AI Engineer", level: "L1 / Target Match", desc: "Builds NLP systems, structures RAG vector databases, and integrates LLMs." },
        { title: "Senior AI Architect", level: "L2 / 2-4 Years", desc: "Architects scalable multi-agent systems, optimizes inference cache speeds, and orchestrates model fine-tuning." },
        { title: "Principal AI Scientist", level: "L3 / 5+ Years", desc: "Designs custom foundational models, oversees AI research divisions, and defines system governance." }
      ];
    case "Data Scientist":
      return [
        { title: "Data Scientist", level: "L1 / Target Match", desc: "Maintains analytics scripts, implements statistical classifiers, and performs predictive modeling." },
        { title: "Senior Data Scientist", level: "L2 / 2-4 Years", desc: "Designs A/B validation systems, advises on analytical architecture, and refines feature pipelines." },
        { title: "Lead AI Researcher", level: "L3 / 5+ Years", desc: "Orchestrates machine learning lifecycles, shapes business-level telemetry policies, and manages core data divisions." }
      ];
    case "Backend Developer":
      return [
        { title: "Backend Developer", level: "L1 / Target Match", desc: "Builds RESTful APIs, optimizes relational schemas, and configures cache networks." },
        { title: "Senior Backend Engineer", level: "L2 / 2-4 Years", desc: "Architects decoupled microservices, manages cloud database scaling, and guides environment containerization." },
        { title: "Staff Infrastructure Engineer", level: "L3 / 5+ Years", desc: "Designs highly available globally distributed database servers, manages CI/CD pipelines, and monitors system health." }
      ];
    case "Cybersecurity Analyst":
      return [
        { title: "Cybersecurity Analyst", level: "L1 / Target Match", desc: "Performs system audits, configures secure firewall filters, and resolves threat incidents." },
        { title: "Senior Security Engineer", level: "L2 / 2-4 Years", desc: "Executes target penetration testing pipelines, deploys cryptographical standards, and designs SIEM monitors." },
        { title: "Chief Information Security Officer (CISO)", level: "L3 / 5+ Years", desc: "Formulates compliance frameworks, directs enterprise vulnerability mitigations, and manages security teams." }
      ];
    case "Frontend Developer":
      return [
        { title: "Frontend Developer", level: "L1 / Target Match", desc: "Designs layout components, optimizes render speeds, and constructs client state trees." },
        { title: "Senior Frontend Engineer", level: "L2 / 2-4 Years", desc: "Establishes unified design system libraries, configures page pre-fetching pathways, and guides asset pipelines." },
        { title: "Principal UI Architect", level: "L3 / 5+ Years", desc: "Shapes frontend tech stacks across projects, optimizes network latency, and builds cross-platform UI architectures." }
      ];
    default:
      return [
        { title: role, level: "Target Match", desc: "Core practitioner specializing in target industry skillsets." },
        { title: `Senior ${role}`, level: "2-4 Years", desc: "Deep technical practitioner driving system improvements." },
        { title: `Lead / Principal ${role}`, level: "5+ Years", desc: "Strategic system architect steering long-term platform evolution." }
      ];
  }
};

export default function CareerBlueprint({ recommendation }) {
  if (!recommendation) return null;

  const { role, description, match_percentage, salary_range, readiness } = recommendation;
  const evolutionSteps = getEvolutionPath(role);

  return (
    <section className="blueprint-section" id="career-blueprint">
      <div className="section-header">
        <div className="badge mono">SECTION 04: SIGNATURE BLUEPRINT</div>
        <h2 className="section-title">Your Personalized Career Blueprint</h2>
        <p className="section-subtitle">
          Based on your current skills, our intelligence engine maps you to this core trajectory.
        </p>
      </div>

      <div className="blueprint-container card">
        <div className="blueprint-meta-header">
          <div className="blueprint-main-title">
            <span className="blueprint-role">{role}</span>
            <p className="blueprint-desc-text">{description}</p>
          </div>
          
          <div className="blueprint-badges">
            <div className="match-pill">
              <span className="match-val mono">{match_percentage}%</span>
              <span className="match-lbl mono">MATCH SCORE</span>
            </div>
            
            <div className="stat-pill">
              <span className="stat-lbl mono">SALARY INDEX</span>
              <span className="stat-val mono">{salary_range.average} avg</span>
              <span className="stat-sub mono">{salary_range.min} &ndash; {salary_range.max}</span>
            </div>
          </div>
        </div>

        {/* Career Evolution Trajectory Map - Line and Nodes */}
        <div className="trajectory-flow-container">
          <h3 className="trajectory-title mono">OCCUPATIONAL EVOLUTION TRAJECTORY</h3>
          
          <div className="trajectory-timeline">
            {/* The line that connects the nodes */}
            <div className="timeline-connector-line"></div>
            
            <div className="timeline-nodes-grid">
              {/* Leftmost Node representing current state */}
              <div className="timeline-card current-state">
                <div className="timeline-marker dot-green"></div>
                <div className="timeline-card-content">
                  <span className="timeline-card-level mono text-emerald">CURRENT PROFILE</span>
                  <h4 className="timeline-card-title">Assessed Competencies</h4>
                  <p className="timeline-card-desc">Your active verified skills serve as the database foundations.</p>
                </div>
              </div>

              {/* Trajectory Evolution Steps */}
              {evolutionSteps.map((step, idx) => (
                <div key={idx} className="timeline-card trajectory-state">
                  <div className="timeline-marker dot-blue"></div>
                  <div className="timeline-card-content">
                    <span className="timeline-card-level mono">{step.level}</span>
                    <h4 className="timeline-card-title">{step.title}</h4>
                    <p className="timeline-card-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Readiness Subsystem details */}
        <div className="readiness-footer">
          <div className="readiness-gauge">
            <div className="readiness-gauge-bar" style={{ width: `${readiness.score}%` }}></div>
          </div>
          <div className="readiness-meta">
            <div className="readiness-score-label">
              <span className="readiness-indicator-dot"></span>
              <span className="mono">CAREER READINESS SCORE: {readiness.score}%</span>
            </div>
            <span className="readiness-level mono">{readiness.level} &bull; {readiness.label}</span>
          </div>
          <p className="readiness-desc-msg">{readiness.description}</p>
        </div>
      </div>
    </section>
  );
}
