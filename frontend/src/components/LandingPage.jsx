import React, { useState } from 'react';
import './LandingPage.css';

// Placeholder data as specified in the brief
const DATA_MODEL = {
  skillsEntered: ["Python", "SQL", "Statistics", "React", "Excel"],
  careers: [
    { 
      id: "ai-engineer", 
      label: "AI Engineer", 
      match: 78,
      description: "Deploys production deep learning frameworks and Large Language Model architectures.",
      requiredSkills: ["Python", "Statistics", "ML Frameworks", "Cloud", "Math"] 
    },
    { 
      id: "data-scientist", 
      label: "Data Scientist", 
      match: 84,
      description: "Analyzes datasets to build predictive classifiers and extract business insights.",
      requiredSkills: ["Python", "SQL", "Statistics", "Visualization", "ML Basics"] 
    },
    { 
      id: "ml-engineer", 
      label: "ML Engineer", 
      match: 65,
      description: "Scales training pipelines and orchestrates models in containerized clusters.",
      requiredSkills: ["Python", "ML Frameworks", "Cloud", "Software Engineering"] 
    },
    { 
      id: "data-engineer", 
      label: "Data Engineer", 
      match: 58,
      description: "Constructs ingestion tracks, normalizes schemas, and sets up ETL pipelines.",
      requiredSkills: ["SQL", "Python", "ETL Pipelines", "Cloud", "Distributed Systems"] 
    },
    { 
      id: "cloud-engineer", 
      label: "Cloud Engineer", 
      match: 41,
      description: "Configures secure virtual VPC infrastructures, DNS gateways, and release tracks.",
      requiredSkills: ["Cloud Platforms", "Networking", "DevOps", "Security"] 
    }
  ]
};

const GAP_TOOLTIPS = {
  "Visualization": "Essential for presenting patterns visually using tools like Matplotlib, Seaborn, or Tableau.",
  "ML Basics": "Required to train regression models, fit decision trees, and evaluate statistical accuracies.",
  "ML Frameworks": "Used to configure neural architectures, load weights, and optimize parameters.",
  "Cloud": "Ensures model weights and endpoints are deployable, hosted, and scaled securely.",
  "Math": "Foundation matrices, calculus equations, and optimization algebra backing model functions.",
  "Software Engineering": "Code testings, system design parameters, and Object-Oriented patterns.",
  "ETL Pipelines": "Extract, transform, and load steps handling raw file streams into central systems.",
  "Distributed Systems": "Managing data scaling setups across multiple server registries (Spark/Hadoop).",
  "Cloud Platforms": "Virtual computing resources, block storage setups, and network firewalls (AWS/GCP).",
  "Networking": "Routing policies, DNS name servers, subnet boundaries, and gateway connections.",
  "DevOps": "CI/CD automated tests, deployment scripts, and resource version monitoring.",
  "Security": "Identity policies, certificate handshakes, access filters, and key encryptions."
};

export default function LandingPage({ onStartAssessment }) {
  // Currently hovered/selected career in graph section (default is top match Data Scientist)
  const [activeCareerId, setActiveCareerId] = useState("data-scientist");
  const [hoveredGapSkill, setHoveredGapSkill] = useState(null);

  const activeCareer = DATA_MODEL.careers.find(c => c.id === activeCareerId) || DATA_MODEL.careers[1];

  const handleNodeClick = (id) => {
    setActiveCareerId(id);
  };

  return (
    <div className="landing-page animate-slide-up">
      {/* 1. HERO EXPERIENCE */}
      <section className="landing-hero-section">
        <div className="container hero-layout">
          <span className="hero-eyebrow">PATHFORGE AI · CAREER INTELLIGENCE</span>
          <h1 className="hero-headline">
            You already have the skills.<br />
            You just can't see the path yet.
          </h1>
          <p className="hero-subhead">
            Enter what you know. Watch your next career take shape.
          </p>

          <div className="hero-cta-buttons">
            <button className="btn btn-primary btn-sharp" onClick={onStartAssessment}>
              Reveal my path →
            </button>
            <a href="#graph" className="hero-scroll-link">
              See how it works ↓
            </a>
          </div>
        </div>

        {/* The Forge Line: Skill tag collector filament */}
        <div className="hero-filament-container">
          <div className="filament-track">
            {/* The single Forge Line drawing filament */}
            <div className="forge-line-glow hero-filament"></div>
            
            {/* Floating Tags drifting in */}
            <div className="drift-tag drift-1 mono-tag">
              <span className="dot"></span>Python
            </div>
            <div className="drift-tag drift-2 mono-tag">
              <span className="dot"></span>SQL
            </div>
            <div className="drift-tag drift-3 mono-tag">
              <span className="dot"></span>React
            </div>
            <div className="drift-tag drift-4 mono-tag">
              <span className="dot"></span>Figma
            </div>
            <div className="drift-tag drift-5 mono-tag">
              <span className="dot"></span>Statistics
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CAREER GRAPH */}
      <section id="graph" className="landing-graph-section">
        {/* Skill Intelligence Layer Band */}
        <div className="skill-layer-band">
          <div className="container layer-flex">
            <span className="layer-label">SKILL INTELLIGENCE LAYER</span>
          </div>
        </div>

        <div className="container graph-layout-grid">
          {/* Hand-built SVG node graph */}
          <div className="graph-visual-wrapper">
            <svg className="graph-branches-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main incoming Forge Line filament */}
              <line x1="10" y1="150" x2="100" y2="150" stroke="#3656FF" strokeWidth="2.5" className="filament-glow" />
              
              {/* Branching paths to career nodes */}
              {/* AI Engineer (top) */}
              <path d="M100 150 C 180 150, 180 30, 260 30" 
                stroke={activeCareerId === 'ai-engineer' ? '#3656FF' : '#E4E6F0'} 
                strokeWidth={activeCareerId === 'ai-engineer' ? '2.5' : '1.5'} 
                className={activeCareerId === 'ai-engineer' ? 'branch-glow' : ''}
              />
              {/* Data Scientist (upper middle) */}
              <path d="M100 150 C 180 150, 180 90, 260 90" 
                stroke={activeCareerId === 'data-scientist' ? '#3656FF' : '#E4E6F0'} 
                strokeWidth={activeCareerId === 'data-scientist' ? '2.5' : '1.5'} 
                className={activeCareerId === 'data-scientist' ? 'branch-glow' : ''}
              />
              {/* ML Engineer (middle) */}
              <line x1="100" y1="150" x2="260" y2="150" 
                stroke={activeCareerId === 'ml-engineer' ? '#3656FF' : '#E4E6F0'} 
                strokeWidth={activeCareerId === 'ml-engineer' ? '2.5' : '1.5'} 
                className={activeCareerId === 'ml-engineer' ? 'branch-glow' : ''}
              />
              {/* Data Engineer (lower middle) */}
              <path d="M100 150 C 180 150, 180 210, 260 210" 
                stroke={activeCareerId === 'data-engineer' ? '#3656FF' : '#E4E6F0'} 
                strokeWidth={activeCareerId === 'data-engineer' ? '2.5' : '1.5'} 
                className={activeCareerId === 'data-engineer' ? 'branch-glow' : ''}
              />
              {/* Cloud Engineer (bottom) */}
              <path d="M100 150 C 180 150, 180 270, 260 270" 
                stroke={activeCareerId === 'cloud-engineer' ? '#3656FF' : '#E4E6F0'} 
                strokeWidth={activeCareerId === 'cloud-engineer' ? '2.5' : '1.5'} 
                className={activeCareerId === 'cloud-engineer' ? 'branch-glow' : ''}
              />

              {/* Career Nodes */}
              <g className="graph-nodes-group">
                {/* AI Engineer Node */}
                <circle cx="260" cy="30" r="7" className={`graph-node ${activeCareerId === 'ai-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('ai-engineer')} />
                {/* Data Scientist Node */}
                <circle cx="260" cy="90" r="7" className={`graph-node ${activeCareerId === 'data-scientist' ? 'active pulse-breath' : ''}`} onClick={() => handleNodeClick('data-scientist')} />
                {/* ML Engineer Node */}
                <circle cx="260" cy="150" r="7" className={`graph-node ${activeCareerId === 'ml-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('ml-engineer')} />
                {/* Data Engineer Node */}
                <circle cx="260" cy="210" r="7" className={`graph-node ${activeCareerId === 'data-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('data-engineer')} />
                {/* Cloud Engineer Node */}
                <circle cx="260" cy="270" r="7" className={`graph-node ${activeCareerId === 'cloud-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('cloud-engineer')} />
              </g>
            </svg>

            {/* Labels on Graph overlay */}
            <div className="graph-node-labels">
              <span className={`node-text-label label-ai ${activeCareerId === 'ai-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('ai-engineer')}>AI Engineer</span>
              <span className={`node-text-label label-ds ${activeCareerId === 'data-scientist' ? 'active' : ''}`} onClick={() => handleNodeClick('data-scientist')}>Data Scientist</span>
              <span className={`node-text-label label-ml ${activeCareerId === 'ml-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('ml-engineer')}>ML Engineer</span>
              <span className={`node-text-label label-de ${activeCareerId === 'data-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('data-engineer')}>Data Engineer</span>
              <span className={`node-text-label label-cloud ${activeCareerId === 'cloud-engineer' ? 'active' : ''}`} onClick={() => handleNodeClick('cloud-engineer')}>Cloud Engineer</span>
            </div>
          </div>

          {/* Interactive detail panel showing on the right */}
          <div className="graph-info-card card">
            <span className="mono-label tracking-wide">ANALYZING PROFILE MATCH</span>
            <h3>{activeCareer.label}</h3>
            <p className="graph-desc-paragraph">{activeCareer.description}</p>
            
            <div className="match-score-row">
              <strong className="match-percent-mono">{activeCareer.match}%</strong>
              <span className="match-status-label">similarity match</span>
            </div>
            
            <div className="skills-requirement-summary">
              <span className="meta-explain">Skills entered matching this path:</span>
              <div className="chips-display">
                {activeCareer.requiredSkills.map((skill, idx) => {
                  const hasSkill = DATA_MODEL.skillsEntered.includes(skill);
                  return (
                    <span key={idx} className={`mono-tag skill-chip ${hasSkill ? 'owned' : 'missing'}`}>
                      {hasSkill ? '●' : '○'} {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILL GAP VISUALIZATION */}
      <section className="landing-gap-section section-padding-raised">
        <div className="container">
          <div className="section-header">
            <span className="mono-label">SECTION 02 · GAP ANALYSIS</span>
            <h2>The Skill Gap</h2>
            <p>Where your profile meets your target career.</p>
          </div>

          {/* The segment bridge */}
          <div className="gap-bridge-container card">
            <div className="gap-bridge-row">
              {activeCareer.requiredSkills.map((skill, idx) => {
                const hasSkill = DATA_MODEL.skillsEntered.includes(skill);
                return (
                  <div 
                    key={idx} 
                    className={`bridge-segment ${hasSkill ? 'lit' : 'unlit'}`}
                    onMouseEnter={() => !hasSkill && setHoveredGapSkill(skill)}
                    onMouseLeave={() => setHoveredGapSkill(null)}
                  >
                    <div className="segment-indicator">
                      {hasSkill ? (
                        <svg className="check-bullet" width="10" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="plus-sign">+</span>
                      )}
                    </div>
                    <span className="segment-label-mono">{skill}</span>
                    
                    {/* Tooltip on hover */}
                    {!hasSkill && hoveredGapSkill === skill && (
                      <div className="segment-tooltip animate-fade">
                        <p>{GAP_TOOLTIPS[skill] || "Essential tools for matching industry expectations."}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="gap-bridge-summary">
              <p>
                You're <strong style={{color: 'var(--color-line-blue)'}}>
                  {activeCareer.requiredSkills.filter(s => !DATA_MODEL.skillsEntered.includes(s)).length} skills
                </strong> from {activeCareer.label}. {activeCareer.requiredSkills.filter(s => !DATA_MODEL.skillsEntered.includes(s)).join(" and ")} is the gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREER ROADMAP PREVIEW */}
      <section className="landing-roadmap-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="mono-label">SECTION 03 · STRUCTURED PATHWAY</span>
            <h2>The Learning Pathway</h2>
            <p>Step-by-step phased instructions built to bridge the gap.</p>
          </div>

          <div className="roadmap-timeline-container">
            {/* The Forge line widens to become a timeline filament */}
            <div className="timeline-filament">
              <div className="filament-progress-fill"></div>
            </div>

            {/* Waypoint steps */}
            <div className="timeline-waypoints-grid">
              <div className="timeline-waypoint card">
                <div className="waypoint-bullet">
                  <span className="bullet-inner">1</span>
                </div>
                <span className="mono-label waypoint-step">PHASE 1 · 2–3 WEEKS</span>
                <h5>Learn data visualization</h5>
                <p>Master representing statistics visually using Tableau, Matplotlib, and Seaborn workflows.</p>
              </div>

              <div className="timeline-waypoint card">
                <div className="waypoint-bullet">
                  <span className="bullet-inner">2</span>
                </div>
                <span className="mono-label waypoint-step">PHASE 2 · 3–4 WEEKS</span>
                <h5>Build portfolio projects</h5>
                <p>Implement regressions and fit decision trees to datasets to lock in machine learning basics.</p>
              </div>

              <div className="timeline-waypoint card">
                <div className="waypoint-bullet">
                  <span className="bullet-inner">3</span>
                </div>
                <span className="mono-label waypoint-step">PHASE 3 · ONGOING</span>
                <h5>Strengthen databases</h5>
                <p>Wrangle transactions and scale dataset operations using advanced relational queries in SQL.</p>
              </div>

              <div className="timeline-waypoint card">
                <div className="waypoint-bullet">
                  <span className="bullet-inner font-target">★</span>
                </div>
                <span className="mono-label waypoint-step">TARGET · PLACEMENT</span>
                <h5>Apply with evidence</h5>
                <p>Deploy your models as live portfolios and apply with an evidence-backed technical resume.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT RECOMMENDATION SHOWCASE */}
      <section className="landing-projects-section section-padding-raised">
        <div className="container">
          <div className="section-header">
            <span className="mono-label">SECTION 04 · PORTFOLIO LABS</span>
            <h2>Recommended Projects</h2>
            <p>Validate your knowledge using tailored, real-world sandboxes.</p>
          </div>

          <div className="projects-placard-grid">
            {/* Project 1 */}
            <div className="project-placard card">
              <span className="mono-label project-id">01 — CAPSTONE PROJECT</span>
              <h4>Customer Churn Prediction</h4>
              <p>Apply classification models directly to usage datasets. Build, clean, and score your predictions.</p>
              <div className="project-placard-footer">
                <span className="mono-label tag-title">SKILLS GAINED:</span>
                <span className="mono-tag-chip">Python</span>
                <span className="mono-tag-chip">ML Basics</span>
                <span className="mono-tag-chip">Visualization</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-placard card">
              <span className="mono-label project-id">02 — ALGORITHMS LAB</span>
              <h4>Recommendation System</h4>
              <p>Design a collaborative filtering system suggesting items to users based on shopping carts overlaps.</p>
              <div className="project-placard-footer">
                <span className="mono-label tag-title">SKILLS GAINED:</span>
                <span className="mono-tag-chip">Python</span>
                <span className="mono-tag-chip">ML Basics</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-placard card">
              <span className="mono-label project-id">03 — QUANTITATIVE LAB</span>
              <h4>A/B Test Analytics Dashboard</h4>
              <p>Process conversions metrics and report retention statistical findings to executives.</p>
              <div className="project-placard-footer">
                <span className="mono-label tag-title">SKILLS GAINED:</span>
                <span className="mono-tag-chip">SQL</span>
                <span className="mono-tag-chip">Statistics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA & FOOTER */}
      <section className="landing-cta-section section-padding">
        <div className="container cta-layout">
          {/* Converging Forge Line */}
          <div className="convergence-indicator">
            <span className="line-branch branch-l"></span>
            <span className="line-branch branch-r"></span>
            <span className="core-filament-line"></span>
            <span className="tapered-point"></span>
          </div>

          <h2 className="cta-headline">Your path starts with five minutes.</h2>
          <p className="cta-subhead">
            Tell us what you know. We'll show you where it leads.
          </p>

          <button className="btn btn-primary btn-sharp btn-lg" onClick={onStartAssessment}>
            Begin forging my path →
          </button>
        </div>
      </section>
    </div>
  );
}
