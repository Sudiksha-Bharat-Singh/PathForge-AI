import React, { useState } from 'react';

const CAREER_NODES = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    cx: 260,
    cy: 180,
    theme: 'amber',
    curveX: -40,
    curveY: 30
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    cx: 740,
    cy: 180,
    theme: 'violet',
    curveX: 40,
    curveY: -30
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    cx: 760,
    cy: 325,
    theme: 'emerald',
    curveX: 20,
    curveY: 40
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    cx: 740,
    cy: 470,
    theme: 'violet',
    curveX: 30,
    curveY: 20
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    cx: 260,
    cy: 470,
    theme: 'primary',
    curveX: -30,
    curveY: -20
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

  // Curves Bezier paths from Core center (500, 325) to endpoint 69px before destination center (r=55px world + 14px gap)
  const getOrbitPath = (node) => {
    const dx = node.cx - 500;
    const dy = node.cy - 325;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const gap = 69; // 55px world radius + 14px gap
    const targetDist = dist - gap;
    const ratio = targetDist / dist;
    const px = 500 + dx * ratio;
    const py = 325 + dy * ratio;
    
    // Custom Bezier curve control points using unique node offsets
    const c1x = 500 + dx * 0.35 + node.curveX;
    const c1y = 325 + dy * 0.35 + node.curveY;
    const c2x = 500 + dx * 0.65 - node.curveX * 0.5;
    const c2y = 325 + dy * 0.65 - node.curveY * 0.5;
    
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
                </defs>

                {/* LAYER 1: BACKDROP - Aurora Glow */}
                <g filter="url(#aurora-blur)" opacity="0.32" style={{ pointerEvents: 'none' }}>
                  <circle cx="500" cy="325" r="260" fill="#3B82F6" opacity="0.05" />
                  <circle cx="430" cy="240" r="180" fill="#8B5CF6" opacity="0.04" />
                  <circle cx="570" cy="410" r="200" fill="#06B6D4" opacity="0.04" />
                </g>

                {/* Constellation grid lines (faint network structure) */}
                <g opacity="0.05" style={{ pointerEvents: 'none' }}>
                  <polygon 
                    points="260,180 740,180 760,325 740,470 260,470" 
                    fill="none" 
                    stroke="var(--color-primary-soft)" 
                    strokeWidth="1.2" 
                    strokeDasharray="4 6" 
                  />
                  <line x1="260" y1="180" x2="760" y2="325" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="260" y1="470" x2="740" y2="180" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
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
                  
                  {/* Static Career Intelligence Globe Shell (r=260px) */}
                  <circle cx="500" cy="325" r="260" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(15, 23, 42, 0.06)" strokeWidth="1.2" />
                  <circle cx="500" cy="325" r="260" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.5" />
                  
                  {/* Subtle neural network paths and static arcs inside the globe */}
                  <g opacity="0.12" style={{ pointerEvents: 'none' }}>
                    <ellipse cx="500" cy="325" rx="260" ry="85" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.8" transform="rotate(-30 500 325)" />
                    <ellipse cx="500" cy="325" rx="260" ry="85" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.8" transform="rotate(30 500 325)" />
                    <line x1="240" y1="325" x2="760" y2="325" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="0.8" strokeDasharray="4 4" />
                    <line x1="500" y1="65" x2="500" y2="585" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="0.8" strokeDasharray="4 4" />
                    <path d="M 320 220 Q 500 280, 680 220" fill="none" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" />
                    <path d="M 320 430 Q 500 370, 680 430" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />
                  </g>

                  {/* Concentric shell overlay */}
                  <circle cx="500" cy="325" r="160" fill="none" stroke="rgba(15, 23, 42, 0.06)" strokeWidth="1" strokeDasharray="6 12" strokeOpacity="0.2" />

                  {/* Curved Discovery Streams & Recommendation Particles */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = activeRoute?.id === career.id;
                    const fadeThis = isFaded && !isHigh;
                    const pathD = getOrbitPath(career);

                    return (
                      <g key={`stream-${career.id}`}>
                        {/* Curved glow overlay on hover */}
                        {isHigh && (
                          <path 
                            d={pathD} 
                            fill="none" 
                            stroke={`var(--color-${career.theme}-soft)`} 
                            strokeWidth="4.5" 
                            strokeOpacity="0.3" 
                            filter={`url(#glow-${career.theme})`}
                          />
                        )}
                        
                        {/* Thinner curved discovery stream line (1.5px) */}
                        <path 
                          d={pathD} 
                          fill="none" 
                          stroke={isHigh ? `var(--color-${career.theme})` : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2' : '1.5'} 
                          strokeOpacity={isHigh ? '0.95' : fadeThis ? '0.07' : '0.15'} 
                          style={{ transition: 'stroke-width 0.4s, stroke 0.4s, stroke-opacity 0.4s' }}
                        />

                        {/* Recommendation Burst Particles (Most Animated) */}
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

                  {/* PATHFORGE AI Core - Brain Centerpiece (r=60px, Heart of centerpiece) */}
                  <g transform="translate(500, 325)">
                    {/* Discovery pulse waves */}
                    <circle cx="0" cy="0" r="45" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.8" strokeOpacity="0.4" className="core-pulse-ring-1" />
                    <circle cx="0" cy="0" r="68" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.2" strokeOpacity="0.25" className="core-pulse-ring-2" />
                    <circle cx="0" cy="0" r="90" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1" strokeOpacity="0.12" className="core-pulse-ring-3" />

                    {/* Glass Core Hub Sphere */}
                    <circle cx="0" cy="0" r="60" fill="rgba(255, 255, 255, 0.95)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2.5" filter="url(#glow-blur-light)" />
                    <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.5" />
                    
                    {/* Rotating Dashed Energy Ring */}
                    <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.2" strokeDasharray="5 10" className="globe-mesh-spin-cw" />
                    
                    {/* Secondary counter-rotating hex ring */}
                    <polygon points="0,-36 31.2,-18 31.2,18 0,36 -31.2,18 -31.2,-18" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1" strokeOpacity="0.35" className="globe-mesh-spin-ccw" />
                    
                    {/* Floating brand shards / energy fragments */}
                    <path d="M 80 -25 L 85 -20 L 80 -15 L 75 -20 Z" fill="rgba(139, 92, 246, 0.35)" filter="url(#glow-violet)" className="globe-mesh-spin-cw" />
                    <path d="M -80 25 L -75 30 L -80 35 L -85 30 Z" fill="rgba(6, 182, 212, 0.35)" filter="url(#glow-primary)" className="globe-mesh-spin-ccw" />

                    {/* AI Brain Synaptic Pulse Network */}
                    <g className="brain-pulse-network" strokeWidth="1.2">
                      {/* Synaptic nodes */}
                      <circle cx="-25" cy="-20" r="4" fill="var(--color-violet)" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="25" cy="-20" r="4" fill="var(--color-primary)" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="-30" cy="22" r="4" fill="var(--color-emerald)" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="30" cy="22" r="4" fill="var(--color-violet)" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="0" cy="-35" r="4" fill="var(--color-primary)" stroke="#FFFFFF" strokeWidth="1.2" />
                      <circle cx="0" cy="35" r="4" fill="var(--color-amber)" stroke="#FFFFFF" strokeWidth="1.2" />
                      
                      {/* Synaptic channel links */}
                      <line x1="0" y1="0" x2="-25" y2="-20" stroke="rgba(124, 58, 237, 0.35)" />
                      <line x1="0" y1="0" x2="25" y2="-20" stroke="rgba(37, 99, 235, 0.35)" />
                      <line x1="0" y1="0" x2="-30" y2="22" stroke="rgba(16, 185, 129, 0.35)" />
                      <line x1="0" y1="0" x2="30" y2="22" stroke="rgba(124, 58, 237, 0.35)" />
                      <line x1="0" y1="0" x2="0" y2="-35" stroke="rgba(37, 99, 235, 0.35)" />
                      <line x1="0" y1="0" x2="0" y2="35" stroke="rgba(245, 158, 11, 0.35)" />
                      
                      {/* Central Glowing Core Brain Node */}
                      <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="url(#energy-core-gradient)" strokeWidth="2.2" filter="url(#glow-violet)" />
                      
                      {/* Center logo geometry */}
                      <path 
                        d="M -5 -5 L 5 5 M -5 5 L 5 -5" 
                        fill="none" 
                        stroke="var(--color-violet)" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                      />
                    </g>
                  </g>

                </g>

                {/* LAYER 3: FOREGROUND - 5 Floating Destination Worlds (r=55px, Less Animated floating) */}
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
                      <g style={{ animation: `float-career ${8 + idx * 1.2}s ease-in-out infinite alternate` }}>
                        
                        {/* Soft Glow Halo behind each world bubble */}
                        <circle cx="0" cy="0" r="75" fill={`var(--color-${career.theme}-soft)`} opacity={isHigh ? 0.35 : 0.05} filter="url(#glow-blur-light)" style={{ transition: 'opacity 0.4s' }} />

                        {/* Glassmorphic circle bubble container (r=55px) */}
                        <circle cx="0" cy="0" r="55" className="world-bg-shape" fill="rgba(255, 255, 255, 0.94)" stroke={isHigh ? `var(--color-${career.theme})` : 'rgba(15, 23, 42, 0.08)'} strokeWidth={isHigh ? '2' : '1.2'} style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />
                        <circle cx="0" cy="0" r="51" fill="none" stroke={`var(--color-${career.theme}-soft)`} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />

                        {/* Recognizable visual assets for each destination */}
                        
                        {/* CYBERSECURITY */}
                        {career.id === 'cybersecurity' && (
                          <g stroke="var(--color-amber)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <path d="M -18 -8 L 18 -8 M -18 8 L 18 8 M -8 -18 L -8 18 M 8 -18 L 8 18" stroke="rgba(245, 158, 11, 0.12)" strokeWidth="0.8" />
                            <path d="M -13 -13 L 13 -13 C 13 -3, 0 14, 0 14 C 0 14, -13 -3, -13 -13 Z" strokeWidth="1.8" fill="rgba(255, 255, 255, 0.9)" />
                            <circle cx="0" cy="-3" r="3.2" strokeWidth="1.5" />
                            <path d="M 0 -0.2 L 0 5 M -1.8 5 L 1.8 5" strokeWidth="1.2" />
                          </g>
                        )}

                        {/* AI ENGINEER */}
                        {career.id === 'ai-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <rect x="-10" y="-10" width="20" height="20" rx="3.5" strokeWidth="1.8" fill="rgba(124, 58, 237, 0.06)" />
                            <circle cx="-19" cy="-15" r="3" fill="var(--color-violet)" />
                            <circle cx="19" cy="-15" r="3" fill="var(--color-violet)" />
                            <circle cx="-16" cy="16" r="3" fill="var(--color-violet)" />
                            <circle cx="16" cy="16" r="3" fill="var(--color-violet)" />
                            <line x1="-10" y1="-10" x2="-19" y2="-15" />
                            <line x1="10" y1="-10" x2="19" y2="-15" />
                            <line x1="-10" y1="10" x2="-16" y2="16" />
                            <line x1="10" y1="10" x2="18" y2="16" />
                          </g>
                        )}

                        {/* DATA SCIENTIST */}
                        {career.id === 'data-scientist' && (
                          <g stroke="var(--color-emerald)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <rect x="-18" y="-15" width="36" height="30" rx="3" strokeWidth="1.2" fill="rgba(16, 185, 129, 0.05)" />
                            <rect x="-12" y="1" width="4" height="10" fill="var(--color-emerald)" fillOpacity="0.4" strokeWidth="0" />
                            <rect x="-4" y="-5" width="4" height="16" fill="var(--color-emerald)" fillOpacity="0.6" strokeWidth="0" />
                            <rect x="4" y="-10" width="4" height="21" fill="var(--color-emerald)" strokeWidth="0" />
                            <path d="M -15 4 C -7 -12, 0 -15, 12 -10" strokeWidth="1.8" />
                            <circle cx="12" cy="-10" r="2" fill="#FFFFFF" />
                          </g>
                        )}

                        {/* SOFTWARE ENGINEER */}
                        {career.id === 'software-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <rect x="-18" y="-16" width="36" height="28" rx="3" strokeWidth="1.5" fill="rgba(139, 92, 246, 0.05)" />
                            <line x1="-13" y1="-11" x2="-5" y2="-11" strokeWidth="1.6" />
                            <line x1="-13" y1="-7" x2="-2" y2="-7" strokeWidth="1" />
                            <line x1="-13" y1="-3" x2="-8" y2="-3" strokeWidth="1" />
                            <line x1="-13" y1="1" x2="-4" y2="1" strokeWidth="1" />
                            <circle cx="10" cy="3" r="3" strokeWidth="1.2" />
                            <path d="M 10 9 L 10 5 M 8 7 L 10 4 L 12 7" strokeWidth="1" />
                          </g>
                        )}

                        {/* CLOUD ENGINEER */}
                        {career.id === 'cloud-engineer' && (
                          <g stroke="var(--color-primary)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                            <path d="M -16 -6 C -16 -14, -8 -17, 0 -14 C 4 -17, 12 -14, 15 -6" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="2 2" />
                            <path d="M -13 -10 A 13 3 0 0 1 13 -10 L 13 -5 A 13 3 0 0 1 -13 -5 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            <path d="M -13 -3 A 13 3 0 0 1 13 -3 L 13 2 A 13 3 0 0 1 -13 2 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            <path d="M -13 4 A 13 3 0 0 1 13 4 L 13 9 A 13 3 0 0 1 -13 9 Z" fill="rgba(37, 99, 235, 0.05)" strokeWidth="1.5" />
                            <circle cx="-8" cy="-8.5" r="1" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-8" cy="-1.5" r="1" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-8" cy="5.5" r="1" fill="var(--color-emerald)" strokeWidth="0" />
                          </g>
                        )}

                        {/* Interactive text label (0.35 default opacity, fades in on hover) */}
                        <text 
                          x="0" 
                          y="84" 
                          textAnchor="middle" 
                          fontSize="11.5" 
                          fontWeight="700" 
                          fill="var(--color-ink)" 
                          opacity={isHigh ? 1 : 0.35} 
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
