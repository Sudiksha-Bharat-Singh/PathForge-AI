import React, { useState } from 'react';

const CAREER_NODES = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    cx: 260,
    cy: 160,
    theme: 'amber'
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    cx: 740,
    cy: 160,
    theme: 'violet'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    cx: 750,
    cy: 325,
    theme: 'emerald'
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    cx: 740,
    cy: 490,
    theme: 'violet'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    cx: 260,
    cy: 490,
    theme: 'primary'
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career', id: string }
  const [parallax, setParallax] = useState({ tx: 0, ty: 0 });

  // Soft cursor parallax (translates galaxy centerpiece by max ±4px)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setParallax({
      tx: (x / (rect.width / 2)) * 4,
      ty: (y / (rect.height / 2)) * 4
    });
  };

  const handleMouseLeave = () => {
    setParallax({ tx: 0, ty: 0 });
  };

  const isFaded = activeRoute !== null;

  // Curves Bezier paths from Core center (500, 325) to endpoint 86px before destination center (r=72px island + 14px gap)
  const getOrbitPath = (wx, wy) => {
    const dx = wx - 500;
    const dy = wy - 325;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const gap = 86; // 72px island radius + 14px gap
    const targetDist = dist - gap;
    const ratio = targetDist / dist;
    const px = 500 + dx * ratio;
    const py = 325 + dy * ratio;
    
    const ux = dx / dist;
    const uy = dy / dist;
    const perpX = -uy;
    const perpY = ux;
    
    // Curves based on left vs right side
    const curveDirection = wx < 500 ? -1 : 1;
    const curveStrength = dist * 0.22 * curveDirection;
    
    const c1x = 500 + dx * 0.3 + perpX * curveStrength;
    const c1y = 325 + dy * 0.3 + perpY * curveStrength;
    const c2x = 500 + dx * 0.7 + perpX * (curveStrength * 0.65);
    const c2y = 325 + dy * 0.7 + perpY * (curveStrength * 0.65);
    
    return `M 500 325 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${px} ${py}`;
  };

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Heading Copy */}
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

          {/* Right Column: Career Universe Canvas */}
          <div className="hero-illustration-wrapper" style={{ position: 'relative' }}>
            <div 
              className="hero-borderless-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <svg viewBox="0 0 1000 650" className="canvas-svg" width="100%" height="100%">
                
                <defs>
                  {/* Performance-tuned low stdDeviation blur filters for light theme backdrop */}
                  <filter id="aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="25" />
                  </filter>
                  <filter id="glow-blur-light" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                  <filter id="glow-violet" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-primary" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
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
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>

                  <linearGradient id="island-depth-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(241, 245, 249, 0.95)" />
                    <stop offset="100%" stopColor="rgba(203, 213, 225, 0.95)" />
                  </linearGradient>
                </defs>

                {/* LAYER 1: BACKDROP - Aurora Glow */}
                <g filter="url(#aurora-blur)" opacity="0.32" style={{ pointerEvents: 'none' }}>
                  <circle cx="500" cy="325" r="280" fill="#3B82F6" opacity="0.05" />
                  <circle cx="430" cy="240" r="200" fill="#8B5CF6" opacity="0.04" />
                  <circle cx="570" cy="410" r="220" fill="#06B6D4" opacity="0.04" />
                </g>

                {/* Constellation grid lines (faint network structure) */}
                <g opacity="0.05" style={{ pointerEvents: 'none' }}>
                  <polygon 
                    points="260,160 740,160 750,325 740,490 260,490" 
                    fill="none" 
                    stroke="var(--color-primary-soft)" 
                    strokeWidth="1.2" 
                    strokeDasharray="4 6" 
                  />
                  <line x1="260" y1="160" x2="750" y2="325" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="260" y1="490" x2="740" y2="160" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
                </g>

                {/* Space opportunity dust particles */}
                <g className="space-dust" opacity="0.32" style={{ pointerEvents: 'none' }}>
                  <circle cx="160" cy="110" r="1.5" className="particle-sparkle" style={{ animationDelay: '0.4s' }} fill="#8B5CF6" />
                  <circle cx="890" cy="140" r="2" className="particle-sparkle" style={{ animationDelay: '1s' }} fill="#06B6D4" />
                  <circle cx="920" cy="470" r="1.2" className="particle-sparkle" style={{ animationDelay: '2s' }} fill="#3B82F6" />
                  <circle cx="110" cy="520" r="2" className="particle-sparkle" style={{ animationDelay: '0.6s' }} fill="#F59E0B" />
                  <circle cx="580" cy="80" r="1" className="particle-sparkle" style={{ animationDelay: '1.5s' }} fill="#3B82F6" />
                </g>

                {/* LAYER 2: MIDGROUND - Centerpiece Globe & Curved Streams (With Parallax translation) */}
                <g transform={`translate(${parallax.tx}, ${parallax.ty})`} style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  
                  {/* Orbit Space Shells */}
                  <circle cx="500" cy="325" r="280" fill="none" stroke="url(#neon-stream-grad)" strokeWidth="1" strokeOpacity="0.06" />
                  <circle cx="500" cy="325" r="170" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.2" strokeDasharray="6 12" strokeOpacity="0.2" />

                  {/* Dual-spin meshes (CW & CCW) representing the career intelligence pathways */}
                  <g className="globe-mesh-spin-cw" transform="translate(500, 325)">
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" transform="rotate(-30)" />
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(139, 92, 246, 0.09)" strokeWidth="1" transform="rotate(0)" />
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" transform="rotate(30)" />
                  </g>
                  
                  <g className="globe-mesh-spin-ccw" transform="translate(500, 325)">
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" transform="rotate(-60)" />
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(139, 92, 246, 0.09)" strokeWidth="1" transform="rotate(45)" />
                    <ellipse cx="0" cy="0" rx="280" ry="95" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" transform="rotate(60)" />
                  </g>

                  {/* Curved Discovery Streams & Recommendation Particles */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = activeRoute?.id === career.id;
                    const fadeThis = isFaded && !isHigh;
                    const pathD = getOrbitPath(career.cx, career.cy);

                    return (
                      <g key={`stream-${career.id}`}>
                        {/* Curved glow overlay on hover */}
                        {isHigh && (
                          <path 
                            d={pathD} 
                            fill="none" 
                            stroke={`var(--color-${career.theme}-soft)`} 
                            strokeWidth="5" 
                            strokeOpacity="0.3" 
                            filter={`url(#glow-${career.theme})`}
                          />
                        )}
                        
                        {/* Primary curved discovery stream line */}
                        <path 
                          d={pathD} 
                          fill="none" 
                          stroke={isHigh ? `var(--color-${career.theme})` : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2.2' : '1.2'} 
                          strokeOpacity={isHigh ? '0.95' : fadeThis ? '0.05' : '0.12'} 
                          style={{ transition: 'stroke-width 0.4s, stroke 0.4s, stroke-opacity 0.4s' }}
                        />

                        {/* Recommendation Burst Particles (Delay offsets for continuous flow) */}
                        {!fadeThis && (
                          <>
                            <circle r="3.5" fill={isHigh ? `var(--color-${career.theme})` : 'url(#neon-stream-grad)'} filter={`url(#glow-${career.theme})`}>
                              <animateMotion 
                                dur={`${4 + idx * 0.7}s`} 
                                repeatCount="indefinite" 
                                path={pathD} 
                                begin="0s"
                              />
                            </circle>
                            <circle r="2.5" fill={isHigh ? `var(--color-${career.theme})` : 'url(#neon-stream-grad)'} opacity="0.6" filter={`url(#glow-${career.theme})`}>
                              <animateMotion 
                                dur={`${4 + idx * 0.7}s`} 
                                repeatCount="indefinite" 
                                path={pathD} 
                                begin="2s"
                              />
                            </circle>
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* PATHFORGE AI Core - Brain Centerpiece (70% Visual focus) */}
                  <g transform="translate(500, 325)">
                    {/* Discovery pulse waves */}
                    <circle cx="0" cy="0" r="50" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.8" strokeOpacity="0.4" className="core-pulse-ring-1" />
                    <circle cx="0" cy="0" r="80" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.2" strokeOpacity="0.25" className="core-pulse-ring-2" />
                    <circle cx="0" cy="0" r="110" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1" strokeOpacity="0.12" className="core-pulse-ring-3" />

                    {/* Glass Core Hub Sphere */}
                    <circle cx="0" cy="0" r="75" fill="rgba(255, 255, 255, 0.95)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2.5" filter="url(#glow-blur-light)" />
                    <circle cx="0" cy="0" r="75" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.5" />
                    
                    {/* Rotating Dashed Energy Ring */}
                    <circle cx="0" cy="0" r="58" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.2" strokeDasharray="6 12" className="globe-mesh-spin-cw" />
                    
                    {/* Secondary counter-rotating hex ring */}
                    <polygon points="0,-48 41.5,-24 41.5,24 0,48 -41.5,24 -41.5,-24" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1" strokeOpacity="0.35" className="globe-mesh-spin-ccw" />
                    
                    {/* Floating brand shards / energy fragments */}
                    <path d="M 100 -30 L 105 -25 L 100 -20 L 95 -25 Z" fill="rgba(139, 92, 246, 0.35)" filter="url(#glow-violet)" className="globe-mesh-spin-cw" />
                    <path d="M -100 30 L -95 35 L -100 40 L -105 35 Z" fill="rgba(6, 182, 212, 0.35)" filter="url(#glow-primary)" className="globe-mesh-spin-ccw" />

                    {/* AI Brain Synaptic Pulse Network */}
                    <g className="brain-pulse-network" strokeWidth="1.2">
                      {/* Synaptic nodes */}
                      <circle cx="-32" cy="-25" r="4.5" fill="var(--color-violet)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="32" cy="-25" r="4.5" fill="var(--color-primary)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="-38" cy="28" r="4.5" fill="var(--color-emerald)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="38" cy="28" r="4.5" fill="var(--color-violet)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="0" cy="-45" r="4.5" fill="var(--color-primary)" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="0" cy="45" r="4.5" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.5" />
                      
                      {/* Synaptic channel links */}
                      <line x1="0" y1="0" x2="-32" y2="-25" stroke="rgba(124, 58, 237, 0.4)" />
                      <line x1="0" y1="0" x2="32" y2="-25" stroke="rgba(37, 99, 235, 0.4)" />
                      <line x1="0" y1="0" x2="-38" y2="28" stroke="rgba(16, 185, 129, 0.4)" />
                      <line x1="0" y1="0" x2="38" y2="28" stroke="rgba(124, 58, 237, 0.4)" />
                      <line x1="0" y1="0" x2="0" y2="-45" stroke="rgba(37, 99, 235, 0.4)" />
                      <line x1="0" y1="0" x2="0" y2="45" stroke="rgba(245, 158, 11, 0.4)" />
                      
                      {/* Central Glowing Core Brain Node */}
                      <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="url(#energy-core-gradient)" strokeWidth="2.5" filter="url(#glow-violet)" />
                      
                      {/* Subtle center logo geometry */}
                      <path 
                        d="M -7 -7 L 7 7 M -7 7 L 7 -7" 
                        fill="none" 
                        stroke="var(--color-violet)" 
                        strokeWidth="2.2" 
                        strokeLinecap="round" 
                      />
                    </g>
                  </g>

                </g>

                {/* LAYER 3: FOREGROUND - 5 Large Floating Destination Islands (r=72px) */}
                {CAREER_NODES.map((career, idx) => {
                  const isHigh = activeRoute?.id === career.id;
                  const fadeThis = isFaded && !isHigh;

                  return (
                    <g 
                      key={career.id}
                      transform={`translate(${career.cx}, ${career.cy})`}
                      className={`career-world-module ${career.theme} ${isHigh ? 'active' : ''} ${fadeThis ? 'faded' : ''}`}
                      style={{
                        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setActiveRoute({ type: 'career', id: career.id })}
                      onMouseLeave={() => setActiveRoute(null)}
                    >
                      {/* Floating ambient motion container */}
                      <g style={{ animation: `float-career ${8 + idx * 1}s ease-in-out infinite alternate` }}>
                        
                        {/* Soft Glow Halo behind each island */}
                        <circle cx="0" cy="0" r="82" fill={`var(--color-${career.theme}-soft)`} opacity={isHigh ? 0.38 : 0.05} filter="url(#glow-blur-light)" style={{ transition: 'opacity 0.4s' }} />

                        {/* 3D Isometric Base side depths */}
                        <path d="M -55 5 L 0 32 L 55 5 L 55 13 L 0 40 L -55 13 Z" fill="url(#island-depth-grad)" opacity="0.8" stroke="rgba(15, 23, 42, 0.05)" strokeWidth="0.8" />
                        
                        {/* 3D Isometric Base Top Platform (r=72px box overlay) */}
                        <path d="M 0 -22 L 55 5 L 0 32 L -55 5 Z" fill="rgba(255, 255, 255, 0.94)" stroke={isHigh ? `var(--color-${career.theme})` : 'rgba(15, 23, 42, 0.08)'} strokeWidth={isHigh ? '2' : '1.2'} style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />
                        <path d="M 0 -18 L 48 5 L 0 28 L -48 5 Z" fill="none" stroke={`var(--color-${career.theme}-soft)`} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

                        {/* Detailed mini destination environment vectors sitting on top of the platform */}
                        
                        {/* CYBERSECURITY FORTRESS */}
                        {career.id === 'cybersecurity' && (
                          <g stroke="var(--color-amber)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-18" y="-22" width="8" height="15" fill="rgba(245, 158, 11, 0.05)" strokeWidth="1.5" />
                            <rect x="10" y="-22" width="8" height="15" fill="rgba(245, 158, 11, 0.05)" strokeWidth="1.5" />
                            <rect x="-6" y="-30" width="12" height="20" fill="rgba(245, 158, 11, 0.08)" strokeWidth="1.8" />
                            
                            <path d="M -8 -15 L 8 -15 C 8 -5, 0 6, 0 6 C 0 6, -8 -5, -8 -15 Z" strokeWidth="2" fill="rgba(255, 255, 255, 0.9)" />
                            <circle cx="0" cy="-6" r="2" strokeWidth="1.2" />
                            <line x1="0" y1="-4" x2="0" y2="0" strokeWidth="1.2" />
                          </g>
                        )}

                        {/* AI ENGINEER DISTRICT */}
                        {career.id === 'ai-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-16" y="-25" width="10" height="22" fill="rgba(124, 58, 237, 0.05)" strokeWidth="1.5" />
                            <rect x="6" y="-28" width="10" height="25" fill="rgba(124, 58, 237, 0.05)" strokeWidth="1.5" />
                            <rect x="-4" y="-36" width="8" height="32" fill="rgba(124, 58, 237, 0.08)" strokeWidth="1.8" />
                            
                            <circle cx="0" cy="-22" r="3.5" fill="#FFFFFF" strokeWidth="2.2" />
                            <circle cx="-11" cy="-14" r="2" fill="var(--color-violet)" strokeWidth="0" />
                            <circle cx="11" cy="-17" r="2" fill="var(--color-violet)" strokeWidth="0" />
                            
                            <line x1="0" y1="-22" x2="-11" y2="-14" strokeWidth="1" />
                            <line x1="0" y1="-22" x2="11" y2="-17" strokeWidth="1" />
                            <line x1="0" y1="-22" x2="0" y2="-4" strokeWidth="1" />
                          </g>
                        )}

                        {/* DATA SCIENTIST LAB */}
                        {career.id === 'data-scientist' && (
                          <g stroke="var(--color-emerald)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-20" y="-24" width="40" height="20" rx="2" strokeWidth="1.2" fill="rgba(16, 185, 129, 0.05)" />
                            <rect x="-14" y="-12" width="6" height="15" fill="var(--color-emerald)" fillOpacity="0.4" strokeWidth="0.8" />
                            <rect x="-4" y="-20" width="6" height="23" fill="var(--color-emerald)" fillOpacity="0.6" strokeWidth="0.8" />
                            <rect x="6" y="-16" width="6" height="19" fill="var(--color-emerald)" strokeWidth="0.8" />
                            <path d="M -18 -4 C -8 -20, 0 -24, 14 -18" strokeWidth="2" />
                            <circle cx="14" cy="-18" r="2.5" fill="#FFFFFF" />
                          </g>
                        )}

                        {/* SOFTWARE ENGINEER STUDIO */}
                        {career.id === 'software-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-22" y="-28" width="44" height="26" rx="3" strokeWidth="1.5" fill="rgba(139, 92, 246, 0.05)" />
                            
                            <line x1="-16" y1="-22" x2="-6" y2="-22" strokeWidth="1.8" />
                            <line x1="-16" y1="-17" x2="-2" y2="-17" strokeWidth="1.2" />
                            <line x1="-16" y1="-12" x2="-10" y2="-12" strokeWidth="1.2" />
                            <line x1="-16" y1="-7" x2="-4" y2="-7" strokeWidth="1.2" />
                            
                            <circle cx="12" cy="-12" r="4.5" strokeWidth="1.5" />
                            <path d="M 12 -16.5 L 12 -14 M 12 -7.5 L 12 -9.5 M 7.5 -12 L 9.5 -12 M 16.5 -12 L 14.5 -12" strokeWidth="1.2" />
                            <path d="M -22 -14 L -28 -14 L -28 -2 L -20 -2" strokeWidth="1.2" strokeDasharray="2 2" />
                          </g>
                        )}

                        {/* CLOUD ENGINEER ISLAND */}
                        {career.id === 'cloud-engineer' && (
                          <g stroke="var(--color-primary)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M -20 -15 C -20 -24, -10 -28, 0 -24 C 5 -28, 15 -24, 18 -15" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
                            
                            <path d="M -16 -22 A 16 4 0 0 1 16 -22 L 16 -16 A 16 4 0 0 1 -16 -16 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            <path d="M -16 -14 A 16 4 0 0 1 16 -14 L 16 -8 A 16 4 0 0 1 -16 -8 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            <path d="M -16 -6 A 16 4 0 0 1 16 -6 L 16 0 A 16 4 0 0 1 -16 0 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            
                            <circle cx="-10" cy="-19" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-10" cy="-11" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-10" cy="-3" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                          </g>
                        )}

                        {/* Hover-reveal text tag under the island platform */}
                        <text 
                          x="0" 
                          y="92" 
                          textAnchor="middle" 
                          fontSize="11.5" 
                          fontWeight="700" 
                          fill="var(--color-ink)" 
                          opacity={isHigh ? 1 : 0} 
                          style={{ transition: 'opacity 0.35s ease', pointerEvents: 'none' }}
                        >
                          {career.title}
                        </text>

                      </g>
                    </g>
                  );
                })}

              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
