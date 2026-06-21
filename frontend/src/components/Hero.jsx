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
    salary: '\u20B912L\u201340L',
    growth: '+18%',
    demand: 'Surging',
    sparkline: 'M -20 10 Q -10 2, 0 8 T 20 1',
    cx: 830,
    cy: 100,
    skills: ['python', 'ml'],
    theme: 'violet'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    match: 88,
    salary: '\u20B910L\u201330L',
    growth: '+12%',
    demand: 'Strong Demand',
    sparkline: 'M -20 8 Q -10 1, 0 9 T 20 2',
    cx: 800,
    cy: 240,
    skills: ['python', 'sql', 'ml'],
    theme: 'emerald'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    match: 85,
    salary: '\u20B910L\u201328L',
    growth: '+14%',
    demand: 'Growing',
    sparkline: 'M -20 9 Q -8 2, 0 7 T 20 3',
    cx: 860,
    cy: 380,
    skills: ['aws'],
    theme: 'primary'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    match: 78,
    salary: '\u20B99L\u201327L',
    growth: '+13%',
    demand: 'High Demand',
    sparkline: 'M -20 8 L -10 4 L 0 6 L 10 1 L 20 3',
    cx: 810,
    cy: 520,
    skills: ['sql', 'aws'],
    theme: 'amber'
  }
];

// Holographic workstation screen center (in front of standing character)
const AI_HUB_SCREEN = { cx: 500, cy: 320 };

export default function Hero({ onStartAssessment }) {
  const [time, setTime] = useState(0); // 0 to 12000 ms
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career'|'skill'|'hub', id?: string }
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // 12s Sequential Loop Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev >= 12000 ? 0 : prev + 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Steps
  // 1: Skills appear (0s - 1s)
  // 2: Skills travel (1s - 3s)
  // 3: Hub scanning (3s - 4.5s)
  // 4: Staggered reveal (4.5s - 6s)
  // 5: Count up (6s - 7.5s)
  // 6: Interactive idle (7.5s+)
  let activeStep = 1;
  if (time >= 1000 && time < 3000) activeStep = 2;
  else if (time >= 3000 && time < 4500) activeStep = 3;
  else if (time >= 4500 && time < 6000) activeStep = 4;
  else if (time >= 6000 && time < 7500) activeStep = 5;
  else if (time >= 7500) activeStep = 6;

  // Parallax tilt tracking
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setTilt({
      rx: -(y / (rect.height / 2)) * 2,
      ry: (x / (rect.width / 2)) * 2
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Bidirectional highlighting calculations
  const isSkillHighlighted = (skillId) => {
    if (activeStep < 6) return activeStep === 1 || activeStep === 2;
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
        return time >= 4500 + idx * 350;
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

  const getDisplayMatchValue = (career, idx) => {
    if (activeStep < 5) return 0;
    if (activeStep === 5) {
      const stepProgress = (time - 6000) / 1500;
      return Math.round(career.match * Math.min(stepProgress, 1));
    }
    return career.match;
  };

  const isIdle = activeStep === 6;
  const fadeOthers = isIdle && activeRoute !== null;
  const isHubHovered = isIdle && activeRoute?.type === 'hub';

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

          {/* Right Column: Custom Human Standing Mascot & Holographic AI Hub Centerpiece */}
          <div className="hero-illustration-wrapper">
            <div 
              className={`hero-borderless-canvas visual-step-${activeStep}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.rx === 0 ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 1000 650" className="canvas-svg" width="100%" height="100%">
                
                {/* Background blueprint details (opacity < 10%) */}
                <g className="canvas-bg-layer" opacity="0.06">
                  <defs>
                    <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.8" fill="var(--color-primary)" />
                    </pattern>
                  </defs>
                  <rect width="1000" height="650" fill="url(#grid-pattern)" />
                  {/* Concentric scan tracks */}
                  <circle cx="440" cy="340" r="260" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="8 8" />
                  <path d="M 50 200 C 200 100, 300 500, 440 340" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeDasharray="4 4" />
                </g>

                {/* SVG Connecting pathways (Left skills -> Hub -> Right Career Worlds) */}
                <g className="canvas-routes-layer">
                  {/* Skills to Hub curves */}
                  {SKILLS.map(skill => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    return (
                      <g key={`in-${skill.id}`}>
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 100} ${skill.cy}, ${AI_HUB_SCREEN.cx - 100} ${AI_HUB_SCREEN.cy}, ${AI_HUB_SCREEN.cx} ${AI_HUB_SCREEN.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary-soft)' : 'transparent'} 
                          strokeWidth="8"
                          strokeOpacity="0.4"
                          className="path-bg"
                        />
                        <path 
                          d={`M ${skill.cx} ${skill.cy} C ${skill.cx + 100} ${skill.cy}, ${AI_HUB_SCREEN.cx - 100} ${AI_HUB_SCREEN.cy}, ${AI_HUB_SCREEN.cx} ${AI_HUB_SCREEN.cy}`} 
                          fill="none" 
                          stroke={isHigh ? 'var(--color-primary)' : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2' : '1.1'}
                          strokeOpacity={isFaded ? '0.15' : '0.7'}
                          className={`illustration-route input-route ${isHigh ? 'highlighted' : ''}`}
                        />
                      </g>
                    );
                  })}

                  {/* Hub to Career destination curves (highly clean & minimized) */}
                  {CAREER_NODES.map((career, idx) => {
                    const showPath = isCareerHighlighted(career.id, idx);
                    return career.skills.map(skillId => {
                      const isHigh = isPathHighlighted(skillId, career.id);
                      const isFaded = fadeOthers && !isHigh;
                      return (
                        <g key={`out-${career.id}-${skillId}`} opacity={showPath ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}>
                          <path 
                            d={`M ${AI_HUB_SCREEN.cx} ${AI_HUB_SCREEN.cy} C ${AI_HUB_SCREEN.cx + 80} ${AI_HUB_SCREEN.cy}, ${career.cx - 80} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? `var(--color-${career.theme}-soft)` : 'transparent'} 
                            strokeWidth="8"
                            strokeOpacity="0.4"
                            className="path-bg"
                          />
                          <path 
                            d={`M ${AI_HUB_SCREEN.cx} ${AI_HUB_SCREEN.cy} C ${AI_HUB_SCREEN.cx + 80} ${AI_HUB_SCREEN.cy}, ${career.cx - 80} ${career.cy}, ${career.cx} ${career.cy}`} 
                            fill="none" 
                            stroke={isHigh ? `var(--color-${career.theme})` : 'var(--border-color)'} 
                            strokeWidth={isHigh ? '2' : '1.1'}
                            strokeOpacity={isFaded ? '0.15' : '0.7'}
                            className={`illustration-route output-route ${isHigh ? 'highlighted' : ''}`}
                          />
                        </g>
                      );
                    });
                  })}
                </g>

                {/* Foreground mascot interactive elements */}
                <g className="canvas-elements-layer">
                  
                  {/* LEFT ZONE: Skill Capsules */}
                  {SKILLS.map((skill, idx) => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const isFaded = fadeOthers && !isHigh;
                    
                    let skillStyle = {};
                    if (activeStep === 2) {
                      const progress = (time - 1000) / 2000;
                      const deltaX = (AI_HUB_SCREEN.cx - skill.cx) * progress * 0.85;
                      const deltaY = (AI_HUB_SCREEN.cy - skill.cy) * progress * 0.85;
                      skillStyle = {
                        transform: `translate(${deltaX}px, ${deltaY}px) scale(${1 - progress * 0.4})`,
                        opacity: 1 - progress,
                        transition: 'none'
                      };
                    } else {
                      skillStyle = {
                        animation: isIdle ? `float-capsule ${5 + idx * 0.65}s ease-in-out infinite alternate` : 'none',
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

                  {/* CENTER ZONE: Large Standing tech developer (Breathing) & Futuristic AI Holographic Hub */}
                  <g className="mascot-workplace-center">
                    
                    {/* Ambitious Standing Developer Mascot Silhouette */}
                    <g className="standing-developer-group character-breathing">
                      {/* Detailed Jeans & Legs */}
                      <path d="M 412 490 L 418 630 L 438 630 L 432 490 Z" fill="#1E293B" />
                      <path d="M 447 490 L 441 630 L 461 630 L 467 490 Z" fill="#1E293B" />
                      {/* Sneakers details */}
                      <rect x="410" y="630" width="30" height="12" rx="4" fill="#64748B" />
                      <rect x="439" y="630" width="30" height="12" rx="4" fill="#64748B" />

                      {/* Torso & Hoodie in pathforge violet theme */}
                      <path d="M 390 320 Q 440 288, 485 320 L 480 495 L 395 495 Z" fill="var(--color-violet-soft)" stroke="var(--color-violet)" strokeWidth="2.2" />
                      <path d="M 415 430 L 460 430 L 470 475 L 405 475 Z" fill="#FFFFFF" fillOpacity="0.6" stroke="var(--color-violet)" strokeWidth="1.2" />

                      {/* Arms typing on holographic projection */}
                      <g className="developer-arms-type character-typing-offset">
                        <path d="M 400 342 Q 430 362, 480 375" fill="none" stroke="var(--color-violet)" strokeWidth="12" strokeLinecap="round" />
                        <path d="M 475 342 Q 500 362, 520 375" fill="none" stroke="var(--color-violet)" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.8" />
                        <circle cx="480" cy="375" r="5.5" fill="#FDBA74" />
                        <circle cx="520" cy="375" r="5.5" fill="#FDBA74" />
                      </g>

                      {/* Head tilting focus right */}
                      <g className="developer-head character-head-movement">
                        <rect x="428" y="278" width="16" height="18" fill="#FDBA74" />
                        <circle cx="436" cy="258" r="22" fill="#FDBA74" />
                        {/* Specs */}
                        <rect x="444" y="248" width="12" height="9" rx="2" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
                        <line x1="440" y1="252" x2="444" y2="252" stroke="var(--color-ink)" strokeWidth="1.5" />
                        {/* Hair cutout */}
                        <path d="M 412 258 C 412 233, 460 233, 460 258 C 452 248, 420 248, 412 258 Z" fill="#1E293B" />
                        <circle cx="448" cy="253" r="1.8" fill="#1E293B" />
                      </g>
                    </g>

                    {/* PATHFORGE FUTURISTIC AI HOLOGRAPHIC HUB */}
                    <g 
                      className={`holographic-hub-console ${isHubHovered ? 'boosted' : ''}`}
                      onMouseEnter={() => isIdle && setActiveRoute({ type: 'hub' })}
                      onMouseLeave={() => isIdle && setActiveRoute(null)}
                      style={{ cursor: isIdle ? 'pointer' : 'default' }}
                    >
                      <circle cx={AI_HUB_SCREEN.cx} cy={AI_HUB_SCREEN.cy} r="65" fill="none" stroke="var(--color-primary-soft)" strokeWidth="6" strokeOpacity="0.3" className="holo-outer-glow" />
                      <circle cx={AI_HUB_SCREEN.cx} cy={AI_HUB_SCREEN.cy} r="50" fill="none" stroke="var(--color-violet-soft)" strokeWidth="2" strokeOpacity="0.4" className="holo-mid-glow" />
                      
                      {/* Floating screens */}
                      <polygon points="500,320 610,290 620,420 510,450" fill="rgba(37, 99, 235, 0.05)" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.8" className="holo-panel-1" />
                      <polygon points="480,350 560,335 570,430 490,445" fill="rgba(124, 58, 237, 0.04)" stroke="var(--color-violet)" strokeWidth="1.2" strokeOpacity="0.6" className="holo-panel-2" />
                      
                      {/* Dynamic matching indicators */}
                      <path d="M 505 385 Q 555 355, 605 385" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="4 2" className="holo-pulse-route" />
                      <circle cx="550" cy="370" r="15" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" className="holo-center-scanner" />
                      
                      {/* Sweeping laser scanner line */}
                      <line x1="495" y1="365" x2="615" y2="330" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.6" className="holo-laser-sweep" />
                      {/* Pulse arcs */}
                      <path d="M 535 340 A 30 30 0 0 1 565 340" fill="none" stroke="var(--color-violet)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" className="holo-wifi-arc" />
                      
                      {/* Core matching laser circle */}
                      <circle cx="550" cy="370" r="8" fill="url(#hud-core-grad)" className="holo-glowing-core" />
                      
                      <defs>
                        <linearGradient id="hud-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-primary)" />
                          <stop offset="100%" stopColor="var(--color-violet)" />
                        </linearGradient>
                      </defs>
                    </g>
                  </g>

                  {/* RIGHT ZONE: Custom Shaped Career Destination Modules (Constellation Staggered) */}
                  {CAREER_NODES.map((career, idx) => {
                    const isShow = isCareerHighlighted(career.id, idx);
                    const isHigh = isCareerHighlighted(career.id, idx) && (activeStep < 6 || isCareerHighlighted(career.id, idx));
                    const isFaded = fadeOthers && !isCareerHighlighted(career.id, idx);
                    const displayMatch = getDisplayMatchValue(career, idx);

                    return (
                      <g 
                        key={career.id}
                        className={`career-world-module ${career.theme} ${isIdle && isHigh && activeRoute?.id === career.id ? 'active' : ''} ${isFaded ? 'faded' : ''}`}
                        transform={`translate(${career.cx}, ${career.cy})`}
                        opacity={isShow ? 1 : 0}
                        style={{ 
                          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          pointerEvents: isIdle ? 'auto' : 'none'
                        }}
                        onMouseEnter={() => isIdle && setActiveRoute({ type: 'career', id: career.id })}
                        onMouseLeave={() => isIdle && setActiveRoute(null)}
                      >
                        <g style={{
                          animation: isIdle ? `float-career ${6.5 + idx * 0.75}s ease-in-out infinite alternate` : 'none'
                        }}>
                          {/* Unique shape silhouettes for destination modules */}
                          {career.id === 'ai-engineer' && (
                            // Custom Hexagon Shape
                            <polygon points="0,-45 42,-22.5 42,22.5 0,45 -42,22.5 -42,-22.5" className="world-bg-shape" />
                          )}
                          {career.id === 'data-scientist' && (
                            // Concentric Orbital Circle Shape
                            <circle cx="0" cy="0" r="45" className="world-bg-shape" />
                          )}
                          {career.id === 'cloud-engineer' && (
                            // Cloud Outline Silhouette
                            <path d="M -25,20 A 18,18 0 0,1 -15,-15 A 25,25 0 0,1 20,-15 A 18,18 0 0,1 25,20 Z" className="world-bg-shape" />
                          )}
                          {career.id === 'cybersecurity' && (
                            // Shield Silhouette Shape
                            <path d="M -35,-40 L 35,-40 C 35,0 0,35 0,35 C 0,35 -35,0 -35,-40 Z" className="world-bg-shape" />
                          )}

                          {/* Matching Score info */}
                          <g transform="translate(0, -14)">
                            <text x="0" y="0" textAnchor="middle" className="world-match-val">{displayMatch}%</text>
                            <text x="0" y="10" textAnchor="middle" className="world-match-lbl">Match</text>
                          </g>

                          {/* Role Title and Details */}
                          <g transform="translate(0, 18)">
                            <text x="0" y="0" textAnchor="middle" className="world-title-text">{career.title}</text>
                            <text x="0" y="10" textAnchor="middle" className="world-salary-text">{career.salary}</text>
                          </g>

                          {/* Sparkline track inside Data module */}
                          {career.id === 'data-scientist' && (
                            <path d="M -15,-2 C -5,-15 5,10 15,-10" fill="none" stroke="var(--color-emerald)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                          )}
                          
                          {/* Neural network lines inside AI module */}
                          {career.id === 'ai-engineer' && (
                            <g opacity="0.5">
                              <circle cx="-15" cy="-25" r="2" fill="var(--color-violet)" />
                              <circle cx="15" cy="-25" r="2" fill="var(--color-violet)" />
                              <line x1="-15" y1="-25" x2="15" y2="-25" stroke="var(--color-violet)" strokeWidth="0.8" />
                            </g>
                          )}

                          {/* Lock icon graphics inside Cybersecurity Shield */}
                          {career.id === 'cybersecurity' && (
                            <g transform="translate(-5, -30)" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" opacity="0.6">
                              <rect x="0" y="4" width="10" height="7" rx="1.5" />
                              <path d="M 2 4 L 2 2 A 3 3 0 0 1 8 2 L 8 4" />
                            </g>
                          )}
                        </g>
                      </g>
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
