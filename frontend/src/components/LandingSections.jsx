import React from 'react';

// 1. How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Input Skills",
      desc: "Select the languages, frameworks, or database technologies you have worked with from our categorized tag directory."
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Our diagnostic engine computes structural similarity indices against 25+ target engineering paths in real-time."
    },
    {
      num: "03",
      title: "Career Matching",
      desc: "Receive your top matched role with salary ranges, readiness quotients, growth indexing, and market trend forecasts."
    },
    {
      num: "04",
      title: "Roadmap Generation",
      desc: "Explore a vertical progression timeline detailing exact course milestones and topics across 5 structured phases."
    },
    {
      num: "05",
      title: "Project Locking",
      desc: "Apply your knowledge by building production-grade projects categorized by difficulty and portfolio impact."
    }
  ];

  return (
    <section className="assessment-section" id="how-it-works" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">DIAGNOSTIC PROCESS</span>
          <h2 className="section-title">How PathForge AI Works</h2>
          <p className="section-subtitle">
            A structured workflow converting your current technology stack into a defined, senior-level career trajectory.
          </p>
        </div>

        <div className="blueprint-timeline-flow" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          {steps.map((step, idx) => (
            <div key={idx} className="blueprint-node-card" style={{ cursor: 'default' }}>
              <div className="blueprint-node-marker" style={{ backgroundColor: 'var(--color-primary-soft)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                {step.num}
              </div>
              <h4 className="blueprint-node-role">{step.title}</h4>
              <p className="blueprint-node-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      title: "Career Matching",
      desc: "Calculates mathematical overlays between your active skills and industry profiles to pinpoint your target fit."
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      title: "Skill Gap Analysis",
      desc: "Sorts missing proficiencies into Critical, Optional, and Future skills, detailing learning difficulty and times."
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
      title: "Learning Roadmaps",
      desc: "Organizes vertical curriculum roadmaps with expandable course segments, specific milestones, and objectives."
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
      title: "Project Recommendations",
      desc: "Recommends key portfolio projects rated by duration, difficulty, and weighted portfolio impact percentages."
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      title: "Career Readiness Score",
      desc: "Indexes your overall market readiness on a scale from 0 to 100 based on core credentials."
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      title: "Salary Insights",
      desc: "Compares entry-level, mid-level, and senior-level average salaries to help you plan compensation growth."
    }
  ];

  return (
    <section className="assessment-section" id="features" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">PLATFORM CAPABILITIES</span>
          <h2 className="section-title">Core Operating Features</h2>
          <p className="section-subtitle">
            PathForge AI is built with six diagnostic modules designed to forecast and accelerate your career.
          </p>
        </div>

        <div className="projects-layout-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {features.map((feat, idx) => (
            <div key={idx} className="project-recommendation-card" style={{ cursor: 'default' }}>
              <div className="project-card-meta" style={{ marginBottom: '8px' }}>
                <span className="hero-feature-icon" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {feat.icon}
                </span>
              </div>
              <h3 className="project-card-title" style={{ fontSize: '1.05rem', fontWeight: 700, margin: '8px 0' }}>{feat.title}</h3>
              <p className="project-card-desc" style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. Careers Section
function CareersSection() {
  const careers = [
    {
      role: "AI Engineer",
      salary: "$155,000 Avg",
      demand: "Surging (+18% YoY)",
      desc: "Integrates Large Language Models (LLMs) and vector architectures to build intelligent autonomous applications."
    },
    {
      role: "Data Scientist",
      salary: "$128,000 Avg",
      demand: "Steady (+12% YoY)",
      desc: "Maintains analytics telemetry, designs statistical models, and performs data-mining operations."
    },
    {
      role: "Backend Developer",
      salary: "$115,000 Avg",
      demand: "Moderate (+8% YoY)",
      desc: "Architects high-performance server-side APIs, database routing layouts, and cache networks."
    },
    {
      role: "Frontend Developer",
      salary: "$105,000 Avg",
      demand: "Moderate (+6% YoY)",
      desc: "Designs user interface layouts, optimizes render loops, and builds design system tokens."
    },
    {
      role: "Cybersecurity Analyst",
      salary: "$110,000 Avg",
      demand: "Strong (+15% YoY)",
      desc: "Performs target network audits, configures firewall systems, and mitigates security incidents."
    }
  ];

  return (
    <section className="assessment-section" id="careers" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">SUPPORTED PATHWAYS</span>
          <h2 className="section-title">Explore Career Paths</h2>
          <p className="section-subtitle">
            PathForge matches your stack against standardized technology careers in our active database profiles.
          </p>
        </div>

        <div className="alt-matches-slider" style={{ overflowX: 'unset', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {careers.map((c, idx) => (
            <div key={idx} className="alt-match-item-card" style={{ cursor: 'default', minWidth: 'auto', padding: '20px' }}>
              <div className="alt-match-item-header" style={{ display: 'block', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '2px' }}>{c.role}</h3>
                <span className="mono" style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 600 }}>{c.demand}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', margin: '8px 0 12px', lineHeight: '1.4' }}>
                {c.desc}
              </p>
              <div className="alt-match-salary mono" style={{ fontSize: '0.72rem', borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontWeight: 600 }}>
                Median Salary: {c.salary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. About Section
function AboutSection() {
  return (
    <section className="assessment-section" id="about" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="hero-grid" style={{ gap: '40px' }}>
          <div className="hero-content">
            <span className="section-badge">OUR MISSION</span>
            <h2 className="section-title" style={{ textAlign: 'left', margin: '6px 0 16px' }}>Democratizing Career Engineering</h2>
            <p className="hero-description" style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
              Discovering suitable technology careers should not rely on guesswork or static templates. PathForge AI was built to empower students and junior developers by matching their actual programming capabilities directly against operational engineering standards.
            </p>
            <p className="hero-description" style={{ fontSize: '0.95rem', marginBottom: '0' }}>
              By analyzing skill gaps, structuring roadmap objectives, and suggesting concrete portfolio projects, we help you trace the shortest, most efficient route to locking in senior-level roles.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="kpi-card" style={{ minHeight: 'auto', padding: '24px' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>PROFILES</div>
              <div className="kpi-val" style={{ margin: '4px 0', fontSize: '2rem' }}>25+</div>
              <div className="kpi-subtext">Technology pathways mapped</div>
            </div>
            
            <div className="kpi-card" style={{ minHeight: 'auto', padding: '24px' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>CONFIDENCE</div>
              <div className="kpi-val" style={{ margin: '4px 0', fontSize: '2rem', color: 'var(--color-primary)' }}>94%</div>
              <div className="kpi-subtext">Engine matching accuracy</div>
            </div>

            <div className="kpi-card" style={{ minHeight: 'auto', padding: '24px' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>DATA INDEXES</div>
              <div className="kpi-val" style={{ margin: '4px 0', fontSize: '2rem', color: 'var(--color-violet)' }}>18</div>
              <div className="kpi-subtext">Standardized career indices</div>
            </div>

            <div className="kpi-card" style={{ minHeight: 'auto', padding: '24px' }}>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--color-ink-subtle)', fontWeight: 600 }}>VACANCIES</div>
              <div className="kpi-val" style={{ margin: '4px 0', fontSize: '2rem' }}>Live</div>
              <div className="kpi-subtext">Market supply telemetry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingSections() {
  return (
    <>
      <HowItWorksSection />
      <FeaturesSection />
      <CareersSection />
      <AboutSection />
    </>
  );
}
