import React, { useState, useEffect } from 'react';

const SKILLS = [
  { id: 'python', name: 'Python', cx: 100, cy: 88, fx: 40, fy: 70, w: 110 },
  { id: 'sql', name: 'SQL', cx: 130, cy: 198, fx: 80, fy: 180, w: 100 },
  { id: 'ml', name: 'Machine Learning', cx: 120, cy: 308, fx: 30, fy: 290, w: 160 },
  { id: 'react', name: 'React', cx: 145, cy: 418, fx: 90, fy: 400, w: 100 },
  { id: 'aws', name: 'AWS', cx: 90, cy: 528, fx: 40, fy: 510, w: 90 }
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
    fy: 30,
    cx: 845,
    cy: 60,
    skills: ['python', 'ml'],
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
    demand: 'High Growth',
    sparkline: 'M 0 8 Q 12 1, 24 9 T 40 2',
    fx: 780,
    fy: 145,
    cx: 885,
    cy: 175,
    skills: ['python', 'ml'],
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
    demand: 'Strong Demand',
    sparkline: 'M 0 10 L 10 6 L 20 8 L 30 2 L 40 4',
    fx: 720,
    fy: 260,
    cx: 825,
    cy: 290,
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
    demand: 'Growing',
    sparkline: 'M 0 9 Q 8 2, 20 7 T 40 3',
    fx: 790,
    fy: 375,
    cx: 895,
    cy: 405,
    skills: ['aws'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
    )
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    match: 78,
    salary: '₹9L–27L',
    growth: '+13%',
    demand: 'High Demand',
    sparkline: 'M 0 8 Q 10 1, 20 9 T 40 4',
    fx: 740,
    fy: 490,
    cx: 845,
    cy: 520,
    skills: ['sql', 'aws'],
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
  }
];

// Screen center where paths meet/start
const LAPTOP_SCREEN = { cx: 508, cy: 380 };

export default function Hero({ onStartAssessment }) {
  const [time, setTime] = useState(0); // 0 to 12000 ms
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career'|'skill', id: string }
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // 12s Animation Sequence loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev >= 12000 ? 0 : prev + 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Compute active step based on visual loop duration
  // Step 1: Skills appear (0s - 1s)
  // Step 2: Skills travel (1s - 3s)
  // Step 3: Analysis state (3s - 4s)
  // Step 4: Staggered reveal (4s - 6s)
  // Step 5: Counter count up (6s - 8s)
  // Step 6: Persistent interactive idle (8s+)
  let activeStep = 1;
  if (time >= 1000 && time < 3000) activeStep = 2;
  else if (time >= 3000 && time < 4000) activeStep = 3;
  else if (time >= 4000 && time < 6000) activeStep = 4;
  else if (time >= 6000 && time < 8000) activeStep = 5;
  else if (time >= 8000) activeStep = 6;

  // Parallax tilt track
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setTilt({
      rx: -(y / (rect.height / 2)) * 3,
      ry: (x / (rect.width / 2)) * 3
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Bidirectional hover highlight states
  const isSkillHighlighted = (skillId) => {
    if (activeStep < 6) return activeStep === 1 || activeStep === 2; // Active during early sequence stages
    if (!activeRoute) return true;
    if (activeRoute.type === 'skill') return activeRoute.id === skillId;
    if (activeRoute.type === 'career') {
      const career = CAREER_NODES.find(c => c.id === activeRoute.id);
      return career ? career.skills.includes(skillId) : false;
    }
    return false;
  };

  const isCareerHighlighted = (careerId, idx) => {
    if (activeStep < 6) {
      if (activeStep === 4) {
        // Staggered reveal sequence
        return time >= 4000 + idx * 400;
      }
      return activeStep >= 4;
    }
    if (!activeRoute) return true;
    if (activeRoute.type === 'career') return activeRoute.id === careerId;
    if (activeRoute.type === 'skill') {
      const career = CAREER_NODES.find(c => c.id === careerId);
      return career ? career.skills.includes(activeRoute.id) : false;
    }
    return false;
  };

  const isPathHighlighted = (fromSkillId, toCareerId) => {
    if (activeStep < 6) return activeStep >= 4;
    if (!activeRoute) return true;
    
    if (activeRoute.type === 'career' && activeRoute.id === toCareerId) {
      const career = CAREER_NODES.find(c => c.id === toCareerId);
      return career ? career.skills.includes(fromSkillId) : false;
    }
    
    if (activeRoute.type === 'skill' && activeRoute.id === fromSkillId) {
      const career = CAREER_NODES.find(c => c.id === toCareerId);
      return career ? career.skills.includes(fromSkillId) : false;
    }
    
    return false;
  };

  // Staggered matching countup score calculation
  const getDisplayMatchValue = (career, idx) => {
    if (activeStep < 5) return 0;
    if (activeStep === 5) {
      // Linear count up from 0 to career.match
      const stepProgress = (time - 6000) / 2000;
      return Math.round(career.match * Math.min(stepProgress, 1));
    }
    return career.match;
  };

  const isIdle = activeStep === 6;
  const fadeOthers = isIdle && activeRoute !== null;

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

          {/* Right Column: Custom Human Workspace Centerpiece */}
          <div className="hero-illustration-wrapper">
            <div 
              className={`hero-human-canvas visual-step-${activeStep}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.rx === 0 ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 1000 650" className="canvas-svg" width="100%" height="100%">
                
                {/* Background Depth: Dotted matrix grids and organic ambient shapes */}
                <g className="canvas-bg-layer" opacity="0.08">
                  <defs>
                    <pattern id="illustration-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="var(--color-primary)" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="650" fill="url(#illustration-grid)" />
                  <path d="M 150 150 Q 300 200, 500 100 T 850 150" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="6 6" />
                  <path d="M 100 450 Q 350 350, 500 550 T 900 450" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeDasharray="4 4" />
                </g>

                {/* SVG Pathways (Skills -> Laptop -> Careers) */}
                <g className="canvas-routes-layer">
                  {/* Left Skills to Laptop connections */}
                  {SKILLS.map(skill => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    return (
                      <g key={`in-${skill.id}`}>
                        {/* Glow backing path */}
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 120} ${skill.cy}, ${LAPTOP_SCREEN.cx - 120} ${LAPTOP_SCREEN.cy}, ${LAPTOP_SCREEN.cx} ${LAPTOP_SCREEN.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary-soft)' : 'transparent'} 
                          strokeWidth="8"
                          strokeOpacity="0.4"
                          className="path-bg"
                        />
                        {/* Connecting bezier curve */}
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 120} ${skill.cy}, ${LAPTOP_SCREEN.cx - 120} ${LAPTOP_SCREEN.cy}, ${LAPTOP_SCREEN.cx} ${LAPTOP_SCREEN.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary)' : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2' : '1.2'}
                          strokeOpacity={isFaded ? '0.15' : '0.8'}
                          className={`illustration-route input-route ${isHigh ? 'highlighted' : ''}`}
                        />
                      </g>
                    );
                  })}

                  {/* Laptop to Right Careers connections */}
                  {CAREER_NODES.map((career, idx) => {
                    const showPath = isCareerHighlighted(career.id, idx);
                    return career.skills.map(skillId => {
                      const isHigh = isPathHighlighted(skillId, career.id);
                      const isFaded = fadeOthers && !isHigh;
                      return (
                        <g key={`out-${career.id}-${skillId}`} opacity={showPath ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>
                          <path 
                            d={`M ${LAPTOP_SCREEN.cx} ${LAPTOP_SCREEN.cy} C ${LAPTOP_SCREEN.cx + 100} ${LAPTOP_SCREEN.cy}, ${career.cx - 120} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? 'var(--color-violet-soft)' : 'transparent'} 
                            strokeWidth="8"
                            strokeOpacity="0.4"
                            className="path-bg"
                          />
                          <path 
                            d={`M ${LAPTOP_SCREEN.cx} ${LAPTOP_SCREEN.cy} C ${LAPTOP_SCREEN.cx + 100} ${LAPTOP_SCREEN.cy}, ${career.cx - 120} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? 'var(--color-violet)' : 'var(--border-color)'} 
                            strokeWidth={isHigh ? '2' : '1.2'}
                            strokeOpacity={isFaded ? '0.15' : '0.8'}
                            className={`illustration-route output-route ${isHigh ? 'highlighted' : ''}`}
                          />
                        </g>
                      );
                    });
                  })}
                </g>

                {/* Left & Right Interactive Node Layers */}
                <g className="canvas-elements-layer">
                  
                  {/* LEFT ZONE: Skill Capsules */}
                  {SKILLS.map((skill, idx) => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    
                    // Travel animation offsets
                    let skillStyle = {};
                    if (activeStep === 2) {
                      const progress = (time - 1000) / 2000; // 0 to 1
                      const deltaX = (LAPTOP_SCREEN.cx - skill.cx) * progress * 0.85;
                      const deltaY = (LAPTOP_SCREEN.cy - skill.cy) * progress * 0.85;
                      skillStyle = {
                        transform: `translate(${deltaX}px, ${deltaY}px) scale(${1 - progress * 0.4})`,
                        opacity: 1 - progress,
                        transition: 'none'
                      };
                    } else {
                      skillStyle = {
                        animation: isIdle ? `float-capsule ${5 + idx * 0.7}s ease-in-out infinite alternate` : 'none',
                        opacity: isFaded ? 0.2 : (activeStep === 3 ? 0 : 1),
                        transition: 'opacity 0.4s ease, transform 0.4s ease'
                      };
                    }

                    return (
                      <foreignObject 
                        key={skill.id} 
                        x={skill.fx} 
                        y={skill.fy} 
                        width={skill.w} 
                        height="40"
                        className="foreign-container"
                        style={skillStyle}
                      >
                        <div 
                          className={`hero-skill-capsule ${isHigh ? 'active' : ''}`}
                          onMouseEnter={() => isIdle && setActiveRoute({ type: 'skill', id: skill.id })}
                          onMouseLeave={() => isIdle && setActiveRoute(null)}
                        >
                          <span className="skill-dot"></span>
                          {skill.name}
                        </div>
                      </foreignObject>
                    );
                  })}

                  {/* CENTER ZONE: Premium Ambitious Student/Developer Workstation */}
                  <g className="workstation-mascot-group">
                    {/* Ergonomic Office Chair */}
                    <g className="chair-element">
                      <rect x="424" y="380" width="8" height="110" rx="4" fill="#334155" /> {/* back vertical bar */}
                      {/* Backrest curved profile */}
                      <path d="M 390 280 Q 425 250, 460 280 L 460 380 Q 425 385, 390 380 Z" fill="#475569" stroke="#1E293B" strokeWidth="1" />
                      {/* Armrest loop */}
                      <path d="M 400 350 Q 385 350, 390 385" fill="none" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
                      {/* Headrest padding */}
                      <rect x="410" y="240" width="30" height="20" rx="10" fill="#1E293B" />
                      {/* Seat Cushion */}
                      <ellipse cx="440" cy="390" rx="45" ry="10" fill="#1E293B" />
                      {/* Swivel legs base */}
                      <path d="M 428 400 L 428 470 L 380 500 M 428 470 L 476 500" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
                    </g>
                    
                    {/* Desk setup */}
                    <g className="desk-element">
                      <rect x="330" y="420" width="320" height="12" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                      <line x1="360" y1="432" x2="360" y2="600" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
                      <line x1="610" y1="432" x2="610" y2="600" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
                    </g>

                    {/* Ambitious Developer/Student Avatar */}
                    <g className="avatar-mascot character-breathing">
                      {/* Torso & Hoodie profile */}
                      <path d="M 410 390 C 410 325, 475 325, 475 390 Z" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
                      {/* Hoodie front pocket & strings */}
                      <path d="M 424 380 Q 442 390, 460 380" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
                      <line x1="438" y1="358" x2="438" y2="378" stroke="var(--color-ink-subtle)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="446" y1="358" x2="446" y2="378" stroke="var(--color-ink-subtle)" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Arms typing on laptop screen */}
                      <g className="avatar-arms character-typing-offset">
                        <path d="M 414 350 C 435 375, 475 385, 502 414" fill="none" stroke="var(--color-primary)" strokeWidth="11" strokeLinecap="round" />
                        <path d="M 470 350 C 480 370, 488 385, 514 414" fill="none" stroke="var(--color-primary)" strokeWidth="11" strokeLinecap="round" strokeOpacity="0.8" />
                        {/* Hands typing */}
                        <circle cx="502" cy="414" r="5" fill="#FDBA74" />
                        <circle cx="514" cy="414" r="5" fill="#FDBA74" />
                      </g>

                      {/* Head group with head movement */}
                      <g className="avatar-head character-head-movement">
                        {/* Neck */}
                        <rect x="436" y="302" width="10" height="15" fill="#FDBA74" />
                        {/* Face structure */}
                        <circle cx="441" cy="288" r="18" fill="#FDBA74" />
                        {/* Ambitious specs/glasses */}
                        <rect x="444" y="280" width="10" height="8" rx="2" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
                        <line x1="441" y1="284" x2="444" y2="284" stroke="var(--color-ink)" strokeWidth="1.5" />
                        {/* Haircut profile */}
                        <path d="M 422 288 C 422 268, 460 268, 460 288 C 454 280, 428 280, 422 288 Z" fill="#1E293B" />
                        {/* Eye tracking toward laptop */}
                        <circle cx="450" cy="284" r="1.5" fill="#1E293B" />
                      </g>
                    </g>
                    
                    {/* Active Workstation Laptop */}
                    <g className="workstation-laptop">
                      {/* Base chassis */}
                      <path d="M 488 412 L 552 412 L 562 422 L 478 422 Z" fill="#64748B" stroke="#475569" strokeWidth="1" />
                      {/* Open Lid screen casing */}
                      <path d="M 494 412 L 480 348 L 542 348 L 554 412 Z" fill="#0F172A" />
                      {/* Active display interface glassmorphic overlay */}
                      <polygon points="492,409 482,352 539,352 550,409" fill="var(--color-violet-soft)" className="laptop-display-glass" />
                      
                      {/* Diagnostic Matching Sweeps & Pulse arcs */}
                      <path d="M 486 370 Q 511 360, 536 370" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" strokeOpacity="0.4" className="laptop-sweep-laser" />
                      <circle cx="511" cy="380" r="12" fill="none" stroke="var(--color-violet)" strokeWidth="1" strokeDasharray="3 3" className="laptop-pulse-rings" />
                      
                      {/* Laptop screen particles flow */}
                      {activeStep === 2 && (
                        <g className="screen-active-particles">
                          <circle cx="508" cy="378" r="4" fill="var(--color-primary)" className="scanning-dot" />
                          <circle cx="515" cy="384" r="3" fill="var(--color-violet)" className="scanning-dot" />
                        </g>
                      )}
                    </g>
                  </g>

                  {/* RIGHT ZONE: Career Opportunity Constellation Nodes */}
                  {CAREER_NODES.map((career, idx) => {
                    const isShow = isCareerHighlighted(career.id, idx);
                    const isHigh = isCareerHighlighted(career.id, idx) && (activeStep < 6 || isCareerHighlighted(career.id, idx));
                    const isFaded = fadeOthers && !isCareerHighlighted(career.id, idx);
                    const displayMatch = getDisplayMatchValue(career, idx);

                    return (
                      <foreignObject 
                        key={career.id} 
                        x={career.fx} 
                        y={career.fy} 
                        width="210" 
                        height="64"
                        className="foreign-container"
                        style={{
                          animation: isIdle ? `float-career ${6 + idx * 0.8}s ease-in-out infinite alternate` : 'none',
                          opacity: isShow ? (isFaded ? 0.2 : 1) : 0,
                          transform: isShow ? 'scale(1)' : 'scale(0.8) translate(-20px, 0)',
                          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          pointerEvents: isIdle ? 'auto' : 'none'
                        }}
                      >
                        <div 
                          className={`hero-career-node-card ${isIdle && isHigh && activeRoute?.id === career.id ? 'active' : ''}`}
                          onMouseEnter={() => isIdle && setActiveRoute({ type: 'career', id: career.id })}
                          onMouseLeave={() => isIdle && setActiveRoute(null)}
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
                                  stroke={isIdle && activeRoute?.id === career.id ? 'var(--color-primary)' : 'var(--color-ink-subtle)'} 
                                  strokeWidth="1.5" 
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span className="node-growth-badge">{career.growth}</span>
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
