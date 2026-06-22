import React, { useState } from 'react';

const SKILLS = [
  { id: 'python', name: 'Python', fx: 40, fy: 170, w: 100 },
  { id: 'sql', name: 'SQL', fx: 60, fy: 270, w: 90 },
  { id: 'ml', name: 'Machine Learning', fx: 30, fy: 370, w: 150 },
  { id: 'react', name: 'React', fx: 70, fy: 470, w: 90 }
];

const CAREER_NODES = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    match: 96,
    salary: '₹12L–40L',
    growth: '+18%',
    demand: 'Surging',
    cx: 780,
    cy: 120,
    skills: ['python', 'ml'],
    theme: 'violet'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    match: 88,
    salary: '₹10L–30L',
    growth: '+12%',
    demand: 'Strong Demand',
    cx: 840,
    cy: 260,
    skills: ['python', 'sql', 'ml'],
    theme: 'emerald'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    match: 85,
    salary: '₹10L–28L',
    growth: '+14%',
    demand: 'Growing',
    cx: 780,
    cy: 400,
    skills: ['react'],
    theme: 'primary'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    match: 78,
    salary: '₹9L–27L',
    growth: '+13%',
    demand: 'High Demand',
    cx: 720,
    cy: 530,
    skills: ['sql'],
    theme: 'amber'
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career'|'skill', id: string }
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Parallax tilt tracking on mouse hover
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setTilt({
      rx: -(y / (rect.height / 2)) * 1.5,
      ry: (x / (rect.width / 2)) * 1.5
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const getDisplayMatchValue = (career) => {
    return career.match;
  };

  const isSkillHighlighted = (skillId) => {
    if (!activeRoute) return true;
    if (activeRoute.type === 'skill') return activeRoute.id === skillId;
    if (activeRoute.type === 'career') {
      const career = CAREER_NODES.find(c => c.id === activeRoute.id);
      return career ? career.skills.includes(skillId) : false;
    }
    return false;
  };

  const isBranchHigh = (careerId) => {
    if (!activeRoute) return true;
    if (activeRoute.type === 'career') return activeRoute.id === careerId;
    if (activeRoute.type === 'skill') {
      const career = CAREER_NODES.find(c => c.id === careerId);
      return career ? career.skills.includes(activeRoute.id) : false;
    }
    return false;
  };

  const isFaded = activeRoute !== null;

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

          {/* Right Column: Mascot Illustration Canvas */}
          <div className="hero-illustration-wrapper" style={{ position: 'relative' }}>
            
            <div 
              className="hero-borderless-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.rx === 0 ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 1000 650" className="canvas-svg" width="100%" height="100%">
                
                {/* Visual definitions for gradients and glow filters */}
                <defs>
                  <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-emerald" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  <linearGradient id="neon-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  
                  <linearGradient id="energy-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>

                {/* LAYER 1: BACKGROUND (Z = -50px) - Faint twinkling stars / dotted grid */}
                <g className="canvas-bg-layer" opacity="0.08">
                  <pattern id="grid-pattern-mascot" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="var(--color-primary)" />
                  </pattern>
                  <rect width="1000" height="650" fill="url(#grid-pattern-mascot)" />
                  
                  <g className="background-particles">
                    <circle cx="150" cy="180" r="1.5" className="particle-sparkle" style={{ animationDelay: '0.2s' }} />
                    <circle cx="280" cy="500" r="2" className="particle-sparkle" style={{ animationDelay: '1s' }} />
                    <circle cx="700" cy="140" r="1.5" className="particle-sparkle" style={{ animationDelay: '1.8s' }} />
                    <circle cx="820" cy="480" r="2.5" className="particle-sparkle" style={{ animationDelay: '0.6s' }} />
                    <circle cx="480" cy="80" r="1" className="particle-sparkle" style={{ animationDelay: '1.4s' }} />
                  </g>
                </g>

                {/* LAYER 2: MIDGROUND (Z = 0px) - Energy Streams, Compass, Core */}
                <g className="canvas-routes-layer">
                  
                  {/* Glowing PathForge Guidance Compass above Student Head */}
                  <g className="compass-visual-group" transform="translate(380, 110)">
                    {/* Guidance Diamond Symbol */}
                    <path 
                      d="M -10 -45 L 0 -58 L 10 -45 L 0 -32 Z" 
                      fill="url(#neon-stream-grad)" 
                      filter="url(#glow-violet)" 
                      className="pathforge-brand-diamond"
                    />
                    <circle cx="0" cy="-45" r="2.5" fill="#FFFFFF" />

                    {/* Outer Dial */}
                    <circle cx="0" cy="0" r="24" fill="rgba(248, 250, 252, 0.85)" stroke="var(--border-color)" strokeWidth="1.2" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Glowing Compass Needle */}
                    <g className="compass-needle-rotating">
                      <polygon points="0,-16 5,0 0,4 -5,0" fill="var(--color-primary)" />
                      <polygon points="0,16 5,0 0,4 -5,0" fill="var(--color-ink-subtle)" />
                      <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                    </g>
                  </g>

                  {/* Energy Core at Student Hand */}
                  <g className="pathforge-energy-core" transform="translate(460, 350)">
                    <circle cx="0" cy="0" r="18" fill="url(#energy-core-gradient)" opacity="0.2" className="core-pulse-outer" />
                    <circle cx="0" cy="0" r="10" fill="url(#energy-core-gradient)" opacity="0.6" className="core-pulse-inner" />
                    <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                  </g>

                  {/* Branching Neon Energy Streams (Metaphor Career Tree) */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = isBranchHigh(career.id);
                    const fadeThis = isFaded && !isHigh;
                    
                    let pathData = '';
                    if (career.id === 'ai-engineer') {
                      pathData = 'M 460 350 C 530 350, 680 120, 780 120';
                    } else if (career.id === 'data-scientist') {
                      pathData = 'M 460 350 C 550 350, 720 260, 840 260';
                    } else if (career.id === 'cloud-engineer') {
                      pathData = 'M 460 350 C 530 350, 680 400, 780 400';
                    } else if (career.id === 'cybersecurity') {
                      pathData = 'M 460 350 C 510 350, 640 530, 720 530';
                    }

                    return (
                      <g key={`branch-${career.id}`}>
                        {/* Glow underlay */}
                        <path 
                          d={pathData} 
                          fill="none" 
                          stroke={isHigh ? `var(--color-${career.theme}-soft)` : 'transparent'} 
                          strokeWidth="8"
                          strokeOpacity="0.3"
                          className="path-bg"
                        />
                        {/* Main Neon Path */}
                        <path 
                          d={pathData} 
                          fill="none" 
                          stroke={isHigh ? `var(--color-${career.theme})` : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2.5' : '1.2'}
                          strokeOpacity={fadeThis ? '0.15' : '0.8'}
                          filter={isHigh ? `url(#glow-${career.theme})` : 'none'}
                          className={`illustration-route energy-branch ${isHigh ? 'highlighted' : ''}`}
                        />
                      </g>
                    );
                  })}

                </g>

                {/* LAYER 3: FOREGROUND (Z = 30px) - Character, Skill Chips, Career Worlds */}
                <g className="canvas-elements-layer">
                  
                  {/* LEFT ZONE: 4 Clean Skill Chips */}
                  {SKILLS.map((skill, idx) => {
                    const isHigh = isSkillHighlighted(skill.id);
                    const fadeThis = isFaded && !isHigh;
                    
                    return (
                      <foreignObject 
                        key={skill.id} 
                        x={skill.fx} 
                        y={skill.fy} 
                        width={skill.w} 
                        height="40"
                        className="foreign-container"
                        style={{
                          animation: `float-capsule ${5 + idx * 0.65}s ease-in-out infinite alternate`,
                          opacity: fadeThis ? 0.25 : 1,
                          transition: 'opacity 0.4s ease'
                        }}
                      >
                        <div 
                          className={`hero-skill-capsule ${isHigh ? 'active' : ''}`}
                          onMouseEnter={() => setActiveRoute({ type: 'skill', id: skill.id })}
                          onMouseLeave={() => setActiveRoute(null)}
                        >
                          <span className="skill-dot"></span>
                          {skill.name}
                        </div>
                      </foreignObject>
                    );
                  })}

                  {/* CENTER ZONE: Realistic Curious Student Mascot Illustration (Breathing) */}
                  <g className="student-character-group character-breathing">
                    {/* Shadow under feet */}
                    <ellipse cx="380" cy="612" rx="60" ry="8" fill="var(--color-ink)" fillOpacity="0.06" />

                    {/* Legs & jeans */}
                    <path d="M 362 455 Q 365 520, 360 595 L 378 595 Q 382 520, 376 455 Z" fill="#334155" stroke="#1E293B" strokeWidth="0.5" />
                    <path d="M 384 455 Q 388 520, 394 595 L 412 595 Q 406 520, 398 455 Z" fill="#334155" stroke="#1E293B" strokeWidth="0.5" />

                    {/* Sneakers */}
                    <path d="M 360 595 L 348 598 C 342 600 342 608 350 608 L 378 608 L 378 595 Z" fill="#F8FAFC" />
                    <path d="M 352 608 L 378 608 L 375 604 L 356 604 Z" fill="var(--color-primary)" />
                    
                    <path d="M 394 595 L 394 608 L 422 608 C 430 608 430 600 424 598 L 412 595 Z" fill="#F8FAFC" />
                    <path d="M 394 608 L 422 608 L 416 604 L 397 604 Z" fill="var(--color-primary)" />

                    {/* Torso & Hoodie */}
                    <path d="M 345 270 Q 380 255, 415 270 L 406 460 Q 380 470, 354 460 Z" fill="url(#neon-stream-grad)" />
                    <path d="M 362 385 L 398 385 Q 408 385, 404 420 L 398 425 L 362 425 L 356 420 Q 352 385, 362 385 Z" fill="#6D28D9" fillOpacity="0.4" />
                    <line x1="375" y1="270" x2="375" y2="310" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="385" y1="270" x2="387" y2="305" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Thinking Arm (Hand on chin) */}
                    <path d="M 348 275 C 310 305, 305 340, 318 362 C 328 378, 348 340, 368 220" fill="none" stroke="#7C3AED" strokeWidth="14" strokeLinecap="round" />
                    <circle cx="368" cy="216" r="7" fill="#FDBA74" />

                    {/* Gesturing Arm (Extended forward towards hand Energy Core) */}
                    <path d="M 412 275 Q 435 290, 442 322 Q 448 350, 460 350" fill="none" stroke="#7C3AED" strokeWidth="14" strokeLinecap="round" />
                    <circle cx="460" cy="350" r="7" fill="#FDBA74" />

                    {/* Neck */}
                    <rect x="373" y="215" width="14" height="20" fill="#FDBA74" />

                    {/* Head - Curious & Ambitious facial features */}
                    <g className="character-head-movement">
                      <path d="M 365 160 C 365 140, 395 140, 395 165 C 395 185, 388 210, 374 210 C 365 210, 360 190, 365 160 Z" fill="#FDBA74" />
                      <path d="M 365 158 C 360 142, 370 128, 388 128 C 400 128, 404 140, 396 160 C 390 150, 376 150, 365 158 Z" fill="#1E1B4B" />
                      <path d="M 390 132 C 398 132, 402 142, 399 150 C 396 145, 392 140, 390 132 Z" fill="#1E1B4B" />
                      <path d="M 378 168 Q 384 163, 389 167" fill="none" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
                      <ellipse cx="383" cy="176" rx="2" ry="1.5" fill="#1E1B4B" />
                      <circle cx="384" cy="175" r="0.6" fill="#FFFFFF" />
                      <path d="M 378 194 Q 385 198, 388 191" fill="none" stroke="#1E1B4B" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  </g>

                  {/* RIGHT ZONE: 4 Floating Career Worlds (Visually Rich, Label-Free) */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = isBranchHigh(career.id);
                    const fadeThis = isFaded && !isHigh;
                    const displayMatch = getDisplayMatchValue(career);

                    return (
                      <g 
                        key={career.id}
                        className={`career-world-module ${career.theme} ${isHigh ? 'active' : ''} ${fadeThis ? 'faded' : ''}`}
                        transform={`translate(${career.cx}, ${career.cy})`}
                        style={{ 
                          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => setActiveRoute({ type: 'career', id: career.id })}
                        onMouseLeave={() => setActiveRoute(null)}
                      >
                        <g style={{ animation: `float-career ${6.5 + idx * 0.75}s ease-in-out infinite alternate` }}>
                          
                          {/* Inner glowing sphere / destination world bubble */}
                          <circle cx="0" cy="0" r="50" className="world-bg-shape" fill="#FFFFFF" stroke="var(--border-color)" strokeWidth="1.5" />
                          <circle cx="0" cy="0" r="46" fill="none" stroke={`var(--color-${career.theme}-soft)`} strokeWidth="1" strokeDasharray="4 2" />

                          {/* 1. AI ENGINEER WORLD */}
                          {career.id === 'ai-engineer' && (
                            <g>
                              {/* Robotic arm, neural net links, futuristic dome */}
                              <path d="M -30 20 A 35 35 0 0 1 30 20 Z" fill="rgba(124, 58, 237, 0.03)" stroke="var(--color-violet)" strokeWidth="0.8" opacity="0.4" />
                              <path d="M -35 25 L -20 5 L 0 12 L 22 -8" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" />
                              <circle cx="22" cy="-8" r="2.5" fill="var(--color-violet)" />
                              <circle cx="-15" cy="-25" r="3.5" fill="var(--color-violet)" />
                              <circle cx="15" cy="-20" r="2.5" fill="var(--color-violet)" />
                              <line x1="-15" y1="-25" x2="15" y2="-20" stroke="var(--color-violet)" strokeWidth="0.8" />
                              {/* Silhouette */}
                              <path d="M 0 35 C 0 25, 10 20, 15 25 L 15 35 Z" fill="#1E293B" opacity="0.35" />
                              <circle cx="10" cy="20" r="4.5" fill="#1E293B" opacity="0.35" />
                            </g>
                          )}

                          {/* 2. DATA SCIENTIST WORLD */}
                          {career.id === 'data-scientist' && (
                            <g>
                              {/* Dashboard grid lines & analytics curves */}
                              <rect x="-24" y="-24" width="48" height="30" rx="3" fill="none" stroke="var(--color-emerald)" strokeWidth="0.8" opacity="0.4" />
                              <rect x="-18" y="-12" width="6" height="12" fill="var(--color-emerald)" fillOpacity="0.4" />
                              <rect x="-8" y="-18" width="6" height="18" fill="var(--color-emerald)" fillOpacity="0.6" />
                              <rect x="2" y="-15" width="6" height="15" fill="var(--color-emerald)" />
                              <path d="M -22 10 Q -5 -5, 5 8 T 24 -12" fill="none" stroke="var(--color-emerald)" strokeWidth="1.8" strokeLinecap="round" />
                              {/* Silhouette */}
                              <path d="M -15 35 C -15 26, -5 22, 0 26 L 0 35 Z" fill="#1E293B" opacity="0.35" />
                              <circle cx="-7" cy="21" r="4.5" fill="#1E293B" opacity="0.35" />
                            </g>
                          )}

                          {/* 3. CLOUD ENGINEER WORLD */}
                          {career.id === 'cloud-engineer' && (
                            <g>
                              {/* Cloud stack infrastructure & databases */}
                              <path d="M -30 8 A 12 12 0 0 1 -18 -8 A 16 16 0 0 1 12 -12 A 12 12 0 0 1 28 8 Z" fill="rgba(37, 99, 235, 0.03)" stroke="var(--color-primary)" strokeWidth="1" />
                              <rect x="-16" y="-4" width="32" height="6" rx="1.5" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
                              <circle cx="10" cy="-1" r="1.5" fill="var(--color-emerald)" />
                              <rect x="-16" y="6" width="32" height="6" rx="1.5" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
                              <circle cx="10" cy="9" r="1.5" fill="var(--color-emerald)" />
                              {/* Silhouette */}
                              <path d="M -5 36 C -5 27, 5 23, 10 27 L 10 36 Z" fill="#1E293B" opacity="0.35" />
                              <circle cx="2" cy="22" r="4.5" fill="#1E293B" opacity="0.35" />
                            </g>
                          )}

                          {/* 4. CYBERSECURITY WORLD */}
                          {career.id === 'cybersecurity' && (
                            <g>
                              {/* Digital fortress shield and keyhole */}
                              <path d="M -24 -20 L 24 -20 C 24 -2, 0 26, 0 26 C 0 26, -24 -2, -24 -20 Z" fill="rgba(245, 158, 11, 0.04)" stroke="var(--color-amber)" strokeWidth="1.5" />
                              <path d="M -12 -10 L 12 -10 C 12 0, 0 14, 0 14 C 0 14, -12 0, -12 -10 Z" fill="none" stroke="var(--color-amber)" strokeWidth="1" />
                              <circle cx="0" cy="-2" r="3.5" fill="var(--color-amber)" />
                              {/* Silhouette */}
                              <path d="M -8 24 C -8 18, 0 15, 4 18 L 4 24 Z" fill="#1E293B" opacity="0.35" />
                              <circle cx="-2" cy="14" r="3.5" fill="#1E293B" opacity="0.35" />
                            </g>
                          )}

                          {/* Hidden Match score indicator (grows on hover / count up in tooltip) */}
                          <circle cx="0" cy="40" r="11" fill="rgba(255, 255, 255, 0.95)" stroke="var(--border-color)" strokeWidth="0.8" />
                          <text x="0" y="43" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-ink)">{displayMatch}%</text>

                        </g>
                      </g>
                    );
                  })}

                  {/* LAYER 4: RESPONSIVE INTERACTIVE TOOLTIPS (Inner SVG rendering for perfect scale) */}
                  {activeRoute && activeRoute.type === 'career' && (() => {
                    const career = CAREER_NODES.find(c => c.id === activeRoute.id);
                    return (
                      <foreignObject 
                        x={career.cx - 95} 
                        y={career.cy - 125} 
                        width="190" 
                        height="115"
                        style={{ pointerEvents: 'none', overflow: 'visible' }}
                        className="career-tooltip-overlay"
                      >
                        <div className="tooltip-content-box" style={{ margin: 0 }}>
                          <div className="tooltip-header">
                            <h4>{career.title}</h4>
                            <span className="tooltip-match-badge">{getDisplayMatchValue(career)}%</span>
                          </div>
                          <div className="tooltip-body">
                            <div><span>Growth:</span> <strong>{career.growth}</strong></div>
                            <div><span>Demand:</span> <strong>{career.demand}</strong></div>
                            <div><span>Est. Salary:</span> <strong>{career.salary}</strong></div>
                          </div>
                        </div>
                      </foreignObject>
                    );
                  })()}

                </g>

              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
