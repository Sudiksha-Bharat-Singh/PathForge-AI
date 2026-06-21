import React, { useState, useEffect, useRef } from 'react';

const SKILLS = [
  { id: 'python', name: 'Python', cx: 85, cy: 47, fx: 30, fy: 30, w: 110 },
  { id: 'sql', name: 'SQL', cx: 120, cy: 107, fx: 70, fy: 90, w: 100 },
  { id: 'ml', name: 'Machine Learning', cx: 100, cy: 167, fx: 20, fy: 150, w: 160 },
  { id: 'react', name: 'React', cx: 130, cy: 227, fx: 80, fy: 210, w: 100 },
  { id: 'aws', name: 'AWS', cx: 85, cy: 287, fx: 40, fy: 270, w: 90 },
  { id: 'docker', name: 'Docker', cx: 125, cy: 347, fx: 75, fy: 330, w: 100 },
  { id: 'git', name: 'Git', cx: 70, cy: 407, fx: 30, fy: 390, w: 80 },
  { id: 'js', name: 'JavaScript', cx: 125, cy: 467, fx: 65, fy: 450, w: 120 },
  { id: 'tf', name: 'TensorFlow', cx: 90, cy: 527, fx: 25, fy: 510, w: 130 }
];

const CAREER_NODES = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    match: 96,
    salary: '₹12L–40L',
    growth: '+18%',
    demand: 'Surging',
    sparkline: 'M 0 10 Q 10 2, 20 8 T 40 1',
    fx: 740,
    fy: 20,
    cx: 845,
    cy: 50,
    skills: ['python', 'ml', 'tf'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
    )
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    match: 94,
    salary: '₹12L–38L',
    growth: '+16%',
    demand: 'Surging',
    sparkline: 'M 0 8 Q 12 1, 24 9 T 40 2',
    fx: 780,
    fy: 95,
    cx: 885,
    cy: 125,
    skills: ['python', 'ml', 'tf'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    )
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    match: 88,
    salary: '₹10L–30L',
    growth: '+12%',
    demand: 'High',
    sparkline: 'M 0 10 L 10 6 L 20 8 L 30 2 L 40 4',
    fx: 720,
    fy: 170,
    cx: 825,
    cy: 200,
    skills: ['python', 'sql', 'ml'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    )
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    match: 85,
    salary: '₹10L–28L',
    growth: '+14%',
    demand: 'High',
    sparkline: 'M 0 9 Q 8 2, 20 7 T 40 3',
    fx: 790,
    fy: 245,
    cx: 895,
    cy: 275,
    skills: ['aws', 'docker', 'git'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
    )
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    match: 82,
    salary: '₹8L–26L',
    growth: '+11%',
    demand: 'Growing',
    sparkline: 'M 0 11 Q 15 2, 25 10 T 40 5',
    fx: 730,
    fy: 320,
    cx: 835,
    cy: 350,
    skills: ['python', 'sql', 'git', 'js'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>
    )
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    match: 80,
    salary: '₹7L–24L',
    growth: '+10%',
    demand: 'Growing',
    sparkline: 'M 0 10 L 10 4 L 20 6 L 30 1 L 40 3',
    fx: 800,
    fy: 395,
    cx: 905,
    cy: 425,
    skills: ['react', 'js', 'git'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
    )
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    match: 78,
    salary: '₹9L–27L',
    growth: '+13%',
    demand: 'High',
    sparkline: 'M 0 8 Q 10 1, 20 9 T 40 4',
    fx: 740,
    fy: 470,
    cx: 845,
    cy: 500,
    skills: ['sql', 'aws', 'docker'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    match: 75,
    salary: '₹9L–28L',
    growth: '+12%',
    demand: 'Growing',
    sparkline: 'M 0 9 L 8 4 L 16 7 L 28 2 L 40 5',
    fx: 780,
    fy: 545,
    cx: 885,
    cy: 575,
    skills: ['aws', 'docker', 'git'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    )
  }
];

// Core hub coordinate
const CORE = { cx: 450, cy: 290 };

export default function Hero({ onStartAssessment }) {
  const [loadStep, setLoadStep] = useState(0); // 0: mount, 1: skills, 2: core, 3: galaxy, 4: counting, 5: idle
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career'|'skill', id: string }
  const [counterValues, setCounterValues] = useState({});
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Sequenced page-load triggers
  useEffect(() => {
    // 1. Skill capsules fade in (0ms)
    const t1 = setTimeout(() => setLoadStep(1), 50);
    // 2. Core hub activates (400ms)
    const t2 = setTimeout(() => setLoadStep(2), 400);
    // 3. Career galaxy fades in (800ms)
    const t3 = setTimeout(() => setLoadStep(3), 800);
    // 4. Counters countup starts (1200ms)
    const t4 = setTimeout(() => {
      setLoadStep(4);
      // Trigger counter values countup
      const duration = 1000;
      const startTime = performance.now();

      const animateCounters = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing cubic out
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const newCounters = {};
        CAREER_NODES.forEach(node => {
          newCounters[node.id] = Math.round(node.match * ease);
        });
        
        setCounterValues(newCounters);

        if (progress < 1) {
          requestAnimationFrame(animateCounters);
        } else {
          setLoadStep(5); // Transition to persistent idle state
        }
      };

      requestAnimationFrame(animateCounters);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Parallax coordinate tracking
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Rotate max 3.5 degrees for premium micro parallax
    setTilt({
      rx: -(y / (rect.height / 2)) * 3.5,
      ry: (x / (rect.width / 2)) * 3.5
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Bidirectional highlighting computed properties
  const isSkillHighlighted = (skillId) => {
    if (!activeRoute) return false;
    if (activeRoute.type === 'skill') return activeRoute.id === skillId;
    if (activeRoute.type === 'career') {
      const career = CAREER_NODES.find(c => c.id === activeRoute.id);
      return career ? career.skills.includes(skillId) : false;
    }
    return false;
  };

  const isCareerHighlighted = (careerId) => {
    if (!activeRoute) return false;
    if (activeRoute.type === 'career') return activeRoute.id === careerId;
    if (activeRoute.type === 'skill') {
      const career = CAREER_NODES.find(c => c.id === careerId);
      return career ? career.skills.includes(activeRoute.id) : false;
    }
    return false;
  };

  const isPathHighlighted = (fromSkillId, toCareerId) => {
    if (!activeRoute) return false;
    
    // If hovering a career node, highlight paths connecting to its prerequisite skills
    if (activeRoute.type === 'career' && activeRoute.id === toCareerId) {
      const career = CAREER_NODES.find(c => c.id === toCareerId);
      return career ? career.skills.includes(fromSkillId) : false;
    }
    
    // If hovering a skill node, highlight paths connecting to any compatible careers
    if (activeRoute.type === 'skill' && activeRoute.id === fromSkillId) {
      const career = CAREER_NODES.find(c => c.id === toCareerId);
      return career ? career.skills.includes(fromSkillId) : false;
    }
    
    return false;
  };

  const fadeOthers = activeRoute !== null;

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Content column */}
          <div className="hero-content animate-slide-up">
            <div className="hero-pill">
              <span style={{ fontSize: '14px' }}>✨</span> AI-Powered Career Intelligence
            </div>
            
            <h1 className="hero-title">
              Turn Your Skills Into a Clear <span>Career Path.</span>
            </h1>
            
            <p className="hero-description">
              PathForge AI is a career operating system. Input your current engineering competencies to visualize your exact position in the tech ecosystem, map your optimal career trajectory, and bridge gaps with step-by-step milestones.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary" onClick={onStartAssessment}>
                Start Assessment &rarr;
              </button>
              <button className="btn-secondary" onClick={onStartAssessment}>
                View Demo
              </button>
            </div>

            <div className="hero-features">
              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>25+ Career Paths</h4>
                  <p>Comprehensive engineering mappings</p>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>AI Smart Matching</h4>
                  <p>Real-time analytics engine</p>
                </div>
              </div>

              <div className="hero-feature-item">
                <div className="hero-feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/></svg>
                </div>
                <div className="hero-feature-text">
                  <h4>Personalized Roadmaps</h4>
                  <p>Targeted skill building steps</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Custom Career Intelligence Network */}
          <div className="hero-illustration-wrapper">
            <div 
              className={`hero-intelligence-canvas load-step-${loadStep}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.rx === 0 ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 1000 640" className="canvas-svg" width="100%" height="100%">
                
                {/* LAYER 1: Background Grid Pattern */}
                <g className="canvas-layer-bg">
                  <defs>
                    <pattern id="grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.2" fill="rgba(37, 99, 235, 0.08)" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="640" fill="url(#grid-dots)" />
                  <circle cx={CORE.cx} cy={CORE.cy} r="220" fill="none" stroke="rgba(37, 99, 235, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx={CORE.cx} cy={CORE.cy} r="140" fill="none" stroke="rgba(124, 58, 237, 0.03)" strokeWidth="1" />
                </g>

                {/* LAYER 2: PathForge Routing Network Connections */}
                <g className="canvas-layer-mid">
                  {/* Left Skills to Central Core Connections */}
                  {SKILLS.map(skill => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    return (
                      <g key={`in-${skill.id}`}>
                        {/* Static glow backing path */}
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 120} ${skill.cy}, ${CORE.cx - 100} ${CORE.cy}, ${CORE.cx} ${CORE.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary-soft)' : 'transparent'} 
                          strokeWidth="6"
                          className="path-bg"
                        />
                        {/* Main curve path */}
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 120} ${skill.cy}, ${CORE.cx - 100} ${CORE.cy}, ${CORE.cx} ${CORE.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary)' : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2' : '1.2'}
                          strokeOpacity={isFaded ? '0.15' : '1'}
                          className={`connection-route input-route ${isHigh ? 'highlighted' : ''}`}
                        />
                        {/* Dynamic matching pulses flowing from left to right along paths */}
                        {(!fadeOthers || isHigh) && (
                          <circle r="3" fill="var(--color-primary)">
                            <animateMotion 
                              path={`M ${skill.cx} ${skill.cy} C ${skill.cx + 120} ${skill.cy}, ${CORE.cx - 100} ${CORE.cy}, ${CORE.cx} ${CORE.cy}`} 
                              dur={`${3 + (skill.cx % 4)}s`} 
                              repeatCount="indefinite" 
                              begin={`${skill.cy * 0.01}s`}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {/* Central Core to Right Careers Connections */}
                  {CAREER_NODES.map(career => {
                    return career.skills.map(skillId => {
                      const skill = SKILLS.find(s => s.id === skillId);
                      if (!skill) return null;
                      const isHigh = isPathHighlighted(skillId, career.id);
                      const isFaded = fadeOthers && !isHigh;
                      return (
                        <g key={`out-${career.id}-${skillId}`}>
                          {/* Glow overlay */}
                          <path 
                            d={`M ${CORE.cx} ${CORE.cy} C ${CORE.cx + 100} ${CORE.cy}, ${career.cx - 120} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? 'var(--color-violet-soft)' : 'transparent'} 
                            strokeWidth="6"
                            className="path-bg"
                          />
                          {/* Route line */}
                          <path 
                            d={`M ${CORE.cx} ${CORE.cy} C ${CORE.cx + 100} ${CORE.cy}, ${career.cx - 120} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? 'var(--color-violet)' : 'var(--border-color)'} 
                            strokeWidth={isHigh ? '2' : '1.2'}
                            strokeOpacity={isFaded ? '0.15' : '1'}
                            className={`connection-route output-route ${isHigh ? 'highlighted' : ''}`}
                          />
                          {/* Pulse animation */}
                          {(!fadeOthers || isHigh) && (
                            <circle r="3" fill="var(--color-violet)">
                              <animateMotion 
                                path={`M ${CORE.cx} ${CORE.cy} C ${CORE.cx + 100} ${CORE.cy}, ${career.cx - 120} ${career.cy}, ${career.cx} ${career.cy}`} 
                                dur={`${2.5 + (career.cy % 3)}s`} 
                                repeatCount="indefinite" 
                                begin={`${career.cy * 0.005}s`}
                              />
                            </circle>
                          )}
                        </g>
                      );
                    });
                  })}
                </g>

                {/* LAYER 3: Core Hub Emblem & Floating Nodes */}
                <g className="canvas-layer-fg">
                  
                  {/* Central PathForge Core Hub */}
                  <g className="core-hub-group">
                    {/* Ring Glows */}
                    <circle cx={CORE.cx} cy={CORE.cy} r="65" fill="none" stroke="var(--color-primary-soft)" strokeWidth="8" strokeOpacity="0.4" className="core-outer-glow" />
                    <circle cx={CORE.cx} cy={CORE.cy} r="50" fill="#FFFFFF" stroke="var(--border-color)" strokeWidth="1" className="core-glass-backing" />
                    
                    {/* Dynamic Scanning sweep circles */}
                    <circle cx={CORE.cx} cy={CORE.cy} r="45" fill="none" stroke="url(#core-grad)" strokeWidth="3" className="core-scan-ring" />
                    <circle cx={CORE.cx} cy={CORE.cy} r="35" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeDasharray="15 8" className="core-inner-rotating-ring" />
                    
                    {/* Centered Logo Emblem */}
                    <g transform={`translate(${CORE.cx - 18}, ${CORE.cy - 18})`}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="core-emblem-logo">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--color-primary)" />
                        <path d="M2 17l10 5 10-5" stroke="var(--color-violet)" />
                        <path d="M2 12l10 5 10-5" stroke="var(--color-violet)" />
                      </svg>
                    </g>
                    
                    {/* Active Match Scanning lasers */}
                    <line x1={CORE.cx - 45} y1={CORE.cy} x2={CORE.cx + 45} y2={CORE.cy} stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.6" className="core-laser-beam" />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="var(--color-violet)" />
                      </linearGradient>
                    </defs>
                  </g>

                  {/* LEFT ZONE: Skill Capsules (HTML Foreign Objects) */}
                  {SKILLS.map((skill, idx) => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    return (
                      <foreignObject 
                        key={skill.id} 
                        x={skill.fx} 
                        y={skill.fy} 
                        width={skill.w} 
                        height="40"
                        className="foreign-container"
                        style={{
                          animation: `float-capsule ${5 + idx * 0.8}s ease-in-out infinite alternate`,
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <div 
                          className={`hero-skill-capsule ${isHigh ? 'active' : ''} ${isFaded ? 'faded' : ''}`}
                          onMouseEnter={() => setActiveRoute({ type: 'skill', id: skill.id })}
                          onMouseLeave={() => setActiveRoute(null)}
                        >
                          <span className="skill-dot"></span>
                          {skill.name}
                        </div>
                      </foreignObject>
                    );
                  })}

                  {/* RIGHT ZONE: Career Nodes Galaxy Staggered */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = isCareerHighlighted(career.id);
                    const isFaded = fadeOthers && !isHigh;
                    const displayMatch = counterValues[career.id] || 0;
                    return (
                      <foreignObject 
                        key={career.id} 
                        x={career.fx} 
                        y={career.fy} 
                        width="210" 
                        height="64"
                        className="foreign-container"
                        style={{
                          animation: `float-career ${6 + idx * 0.9}s ease-in-out infinite alternate`,
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          animationDelay: `${idx * 0.1}s`
                        }}
                      >
                        <div 
                          className={`hero-career-node-card ${isHigh ? 'active' : ''} ${isFaded ? 'faded' : ''}`}
                          onMouseEnter={() => setActiveRoute({ type: 'career', id: career.id })}
                          onMouseLeave={() => setActiveRoute(null)}
                        >
                          <div className="node-card-row">
                            <span className="node-icon">{career.icon}</span>
                            <span className="node-title">{career.title}</span>
                          </div>
                          
                          <div className="node-card-stats-row">
                            <span className="node-match">{displayMatch}% Match</span>
                            <span className="node-salary">{career.salary}</span>
                            <span className="node-sparkline">
                              <svg width="34" height="12" viewBox="0 0 34 12" className="sparkline-svg">
                                <path 
                                  d={career.sparkline} 
                                  fill="none" 
                                  stroke={isHigh ? 'var(--color-primary)' : 'var(--color-ink-subtle)'} 
                                  strokeWidth="1.5" 
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span className={`node-growth-badge ${career.demand.toLowerCase()}`}>{career.growth}</span>
                          </div>
                        </div>
                      </foreignObject>
                    );
                  })}

                </g>

              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
