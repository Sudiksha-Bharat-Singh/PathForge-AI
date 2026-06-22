import React, { useState } from 'react';

const CAREER_NODES = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    cx: 240,
    cy: 190,
    theme: 'amber'
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    cx: 720,
    cy: 170,
    theme: 'violet'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    cx: 790,
    cy: 320,
    theme: 'emerald'
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    cx: 720,
    cy: 480,
    theme: 'violet'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    cx: 240,
    cy: 460,
    theme: 'primary'
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeRoute, setActiveRoute] = useState(null); // { type: 'career', id: string }
  const [parallax, setParallax] = useState({ tx: 0, ty: 0 });

  // Lightweight cursor parallax tracking (max translate ±4px)
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

  // Generates curved Bezier paths starting at core (480, 325) and ending 72px before world centers
  const getOrbitPath = (wx, wy) => {
    const dx = wx - 480;
    const dy = wy - 325;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const gap = 72; // r=58px world bubble + 14px gap
    const targetDist = dist - gap;
    const ratio = targetDist / dist;
    const px = 480 + dx * ratio;
    const py = 325 + dy * ratio;
    
    const ux = dx / dist;
    const uy = dy / dist;
    const perpX = -uy;
    const perpY = ux;
    
    // Smooth S-curve to look like part of a massive orbital trajectory
    const curveDirection = wx < 480 ? -1 : 1;
    const curveStrength = dist * 0.22 * curveDirection;
    
    const c1x = 480 + dx * 0.3 + perpX * curveStrength;
    const c1y = 325 + dy * 0.3 + perpY * curveStrength;
    const c2x = 480 + dx * 0.7 + perpX * (curveStrength * 0.65);
    const c2y = 325 + dy * 0.7 + perpY * (curveStrength * 0.65);
    
    return `M 480 325 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${px} ${py}`;
  };

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Copy & Actions */}
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

          {/* Right Column: Career Galaxy Canvas */}
          <div className="hero-illustration-wrapper" style={{ position: 'relative' }}>
            <div 
              className="hero-borderless-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <svg viewBox="0 0 1000 650" className="canvas-svg" width="100%" height="100%">
                
                <defs>
                  {/* Performance-tuned low stdDeviation glow filters */}
                  <filter id="aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="25" />
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

                {/* LAYER 1: BACKDROP - Faint Aurora & Constellations */}
                <g filter="url(#aurora-blur)" opacity="0.35">
                  <circle cx="480" cy="325" r="280" fill="#3B82F6" opacity="0.05" />
                  <circle cx="420" cy="240" r="200" fill="#8B5CF6" opacity="0.04" />
                  <circle cx="540" cy="380" r="220" fill="#06B6D4" opacity="0.04" />
                </g>

                {/* Celestial Constellation Pentagon Grid */}
                <g opacity="0.05" style={{ pointerEvents: 'none' }}>
                  <polygon 
                    points="240,190 720,170 790,320 720,480 240,460" 
                    fill="none" 
                    stroke="var(--color-primary-soft)" 
                    strokeWidth="1.2" 
                    strokeDasharray="4 6" 
                  />
                  <line x1="240" y1="190" x2="790" y2="320" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="240" y1="460" x2="720" y2="170" stroke="var(--color-primary-soft)" strokeWidth="1" strokeDasharray="3 5" />
                </g>

                {/* Twinkling ambient star sparkles */}
                <g className="space-dust" opacity="0.35" style={{ pointerEvents: 'none' }}>
                  <circle cx="150" cy="110" r="1.5" className="particle-sparkle" style={{ animationDelay: '0.4s' }} fill="#8B5CF6" />
                  <circle cx="880" cy="150" r="2" className="particle-sparkle" style={{ animationDelay: '1s' }} fill="#06B6D4" />
                  <circle cx="910" cy="480" r="1.2" className="particle-sparkle" style={{ animationDelay: '2s' }} fill="#3B82F6" />
                  <circle cx="120" cy="510" r="2" className="particle-sparkle" style={{ animationDelay: '0.6s' }} fill="#F59E0B" />
                  <circle cx="560" cy="90" r="1" className="particle-sparkle" style={{ animationDelay: '1.5s' }} fill="#3B82F6" />
                </g>

                {/* LAYER 2: MIDGROUND - Galaxy & Curved Orbit Paths (With Parallax translation) */}
                <g transform={`translate(${parallax.tx}, ${parallax.ty})`} style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  
                  {/* Conic Space Shells */}
                  <circle cx="480" cy="325" r="240" fill="none" stroke="url(#neon-stream-grad)" strokeWidth="1" strokeOpacity="0.06" />
                  <circle cx="480" cy="325" r="150" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.2" strokeDasharray="6 12" strokeOpacity="0.3" />

                  {/* Clockwise-spinning mesh grid */}
                  <g className="globe-mesh-spin-cw" transform="translate(480, 325)">
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" transform="rotate(-30)" />
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(139, 92, 246, 0.09)" strokeWidth="1" transform="rotate(0)" />
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" transform="rotate(30)" />
                  </g>
                  
                  {/* Counter-clockwise spinning mesh grid */}
                  <g className="globe-mesh-spin-ccw" transform="translate(480, 325)">
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" transform="rotate(-60)" />
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(139, 92, 246, 0.09)" strokeWidth="1" transform="rotate(45)" />
                    <ellipse cx="0" cy="0" rx="240" ry="85" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" transform="rotate(60)" />
                  </g>

                  {/* Glowing Orbit Paths & Opportunity Particles */}
                  {CAREER_NODES.map((career, idx) => {
                    const isHigh = activeRoute?.id === career.id;
                    const fadeThis = isFaded && !isHigh;
                    const pathD = getOrbitPath(career.cx, career.cy);

                    return (
                      <g key={`orbit-${career.id}`}>
                        {/* Glow underlay when active */}
                        {isHigh && (
                          <path 
                            d={pathD} 
                            fill="none" 
                            stroke={`var(--color-${career.theme}-soft)`} 
                            strokeWidth="5" 
                            strokeOpacity="0.25" 
                            filter={`url(#glow-${career.theme})`}
                          />
                        )}
                        
                        {/* Primary Orbit Line */}
                        <path 
                          d={pathD} 
                          fill="none" 
                          stroke={isHigh ? `var(--color-${career.theme})` : 'var(--border-color)'} 
                          strokeWidth={isHigh ? '2' : '1.2'} 
                          strokeOpacity={isHigh ? '0.95' : fadeThis ? '0.06' : '0.12'} 
                          style={{ transition: 'stroke-width 0.4s, stroke 0.4s, stroke-opacity 0.4s' }}
                        />

                        {/* Animated Opportunity Particle travelling core -> world */}
                        {!fadeThis && (
                          <circle r="3.5" fill={isHigh ? `var(--color-${career.theme})` : 'url(#neon-stream-grad)'} filter={`url(#glow-${career.theme})`}>
                            <animateMotion 
                              dur={`${4.5 + idx * 0.8}s`} 
                              repeatCount="indefinite" 
                              path={pathD} 
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {/* PATHFORGE Core - 60% Enlarge & Discovery Pulse */}
                  <g transform="translate(480, 325)">
                    {/* Concentric ripple rings */}
                    <circle cx="0" cy="0" r="40" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.5" strokeOpacity="0.35" className="core-pulse-ring-1" />
                    <circle cx="0" cy="0" r="65" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.2" strokeOpacity="0.22" className="core-pulse-ring-2" />
                    <circle cx="0" cy="0" r="90" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1" strokeOpacity="0.12" className="core-pulse-ring-3" />

                    {/* Outer Core Glass Sphere */}
                    <circle cx="0" cy="0" r="52" fill="rgba(15, 23, 42, 0.88)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" filter="url(#glow-violet)" />
                    
                    {/* Slow energy circles */}
                    <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="6 12" className="globe-mesh-spin-cw" />
                    <polygon points="0,-24 20.8,-12 20.8,12 0,24 -20.8,12 -20.8,-12" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="1.2" strokeOpacity="0.65" className="globe-mesh-spin-ccw" />
                    
                    {/* Core Brand Cross Symbol */}
                    <g className="core-logo">
                      <path 
                        d="M -12 -12 L 12 12 M -12 12 L 12 -12" 
                        fill="none" 
                        stroke="#FFFFFF" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
                      <polygon points="-8,0 0,-8 8,0 0,8" fill="var(--color-primary)" opacity="0.95" />
                      <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                    </g>
                  </g>

                </g>

                {/* LAYER 3: FOREGROUND - 5 Large Mini-World bubble destinations */}
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
                      <g style={{ animation: `float-career ${7 + idx * 0.9}s ease-in-out infinite alternate` }}>
                        
                        {/* Soft Glow Halo behind each world bubble */}
                        <circle cx="0" cy="0" r="68" fill={`var(--color-${career.theme}-soft)`} opacity={isHigh ? 0.22 : 0.04} filter={`url(#glow-${career.theme})`} style={{ transition: 'opacity 0.4s' }} />

                        {/* Main Glassmorphic bubble container */}
                        <circle cx="0" cy="0" r="58" className="world-bg-shape" fill="rgba(15, 23, 42, 0.82)" stroke={isHigh ? `var(--color-${career.theme})` : 'rgba(255, 255, 255, 0.15)'} strokeWidth={isHigh ? '2' : '1.2'} style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />
                        <circle cx="0" cy="0" r="54" fill="none" stroke={`var(--color-${career.theme}-soft)`} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.15" />

                        {/* Recognizable visual assets for each destination */}
                        
                        {/* CYBERSECURITY */}
                        {career.id === 'cybersecurity' && (
                          <g stroke="var(--color-amber)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M -30 -15 L 30 -15 M -30 15 L 30 15 M -15 -30 L -15 30 M 15 -30 L 15 30" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="0.8" />
                            <path d="M -16 -16 L 16 -16 C 16 -2, 0 20, 0 20 C 0 20, -16 -2, -16 -16 Z" strokeWidth="2.2" fill="rgba(245, 158, 11, 0.05)" />
                            <circle cx="0" cy="-3" r="3.5" strokeWidth="1.5" />
                            <path d="M 0 0.5 L 0 8 M -2.5 8 L 2.5 8" strokeWidth="1.5" />
                          </g>
                        )}

                        {/* AI ENGINEER */}
                        {career.id === 'ai-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-10" y="-10" width="20" height="20" rx="3" strokeWidth="2.2" fill="rgba(124, 58, 237, 0.1)" />
                            <circle cx="-25" cy="-20" r="3" fill="var(--color-violet)" />
                            <circle cx="25" cy="-20" r="3" fill="var(--color-violet)" />
                            <circle cx="-20" cy="20" r="3" fill="var(--color-violet)" />
                            <circle cx="20" cy="20" r="3" fill="var(--color-violet)" />
                            <line x1="-10" y1="-10" x2="-25" y2="-20" strokeWidth="1.2" />
                            <line x1="10" y1="-10" x2="25" y2="-20" strokeWidth="1.2" />
                            <line x1="-10" y1="10" x2="-20" y2="20" strokeWidth="1.2" />
                            <line x1="10" y1="10" x2="20" y2="20" strokeWidth="1.2" />
                            <path d="M -24 5 L -14 -3 L -8 -3" strokeWidth="1.2" strokeDasharray="2 2" />
                          </g>
                        )}

                        {/* DATA SCIENTIST */}
                        {career.id === 'data-scientist' && (
                          <g stroke="var(--color-emerald)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="-24" y="-20" width="48" height="40" rx="4" strokeWidth="1.5" fill="rgba(16, 185, 129, 0.05)" />
                            <rect x="-16" y="2" width="6" height="12" fill="var(--color-emerald)" fillOpacity="0.4" strokeWidth="0" />
                            <rect x="-6" y="-6" width="6" height="20" fill="var(--color-emerald)" fillOpacity="0.6" strokeWidth="0" />
                            <rect x="4" y="-12" width="6" height="26" fill="var(--color-emerald)" strokeWidth="0" />
                            <path d="M -20 10 C -10 -15, 0 -22, 16 -12" strokeWidth="2.2" />
                            <circle cx="16" cy="-12" r="2.5" fill="#FFFFFF" />
                          </g>
                        )}

                        {/* ML ENGINEER */}
                        {career.id === 'ml-engineer' && (
                          <g stroke="var(--color-violet)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="0" cy="0" r="25" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />
                            <circle cx="-20" cy="0" r="4.5" fill="var(--color-violet)" />
                            <circle cx="0" cy="-15" r="4.5" fill="var(--color-violet)" />
                            <circle cx="0" cy="15" r="4.5" fill="var(--color-violet)" />
                            <circle cx="20" cy="0" r="4.5" fill="var(--color-violet)" />
                            <line x1="-20" y1="0" x2="0" y2="-15" strokeWidth="1.5" />
                            <line x1="-20" y1="0" x2="0" y2="15" strokeWidth="1.5" />
                            <line x1="0" y1="-15" x2="20" y2="0" strokeWidth="1.5" />
                            <line x1="0" y1="15" x2="20" y2="0" strokeWidth="1.5" />
                          </g>
                        )}

                        {/* CLOUD ENGINEER */}
                        {career.id === 'cloud-engineer' && (
                          <g stroke="var(--color-primary)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M -18 -12 A 18 5 0 0 1 18 -12 L 18 -4 A 18 5 0 0 1 -18 -4 Z" fill="rgba(37, 99, 235, 0.1)" strokeWidth="1.5" />
                            <path d="M -18 -4 A 18 5 0 0 1 18 -4 L 18 4 A 18 5 0 0 1 -18 4 Z" fill="rgba(37, 99, 235, 0.1)" strokeWidth="1.5" />
                            <path d="M -18 4 A 18 5 0 0 1 18 4 L 18 12 A 18 5 0 0 1 -18 12 Z" fill="rgba(37, 99, 235, 0.1)" strokeWidth="1.5" />
                            <circle cx="-10" cy="-8" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-10" cy="0" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                            <circle cx="-10" cy="8" r="1.5" fill="var(--color-emerald)" strokeWidth="0" />
                          </g>
                        )}

                        {/* Minimalist interactive text tag under the bubble */}
                        <text 
                          x="0" 
                          y="80" 
                          textAnchor="middle" 
                          fontSize="11" 
                          fontWeight="700" 
                          fill="var(--color-ink)" 
                          opacity={isHigh ? 1 : 0.45} 
                          style={{ transition: 'opacity 0.3s', pointerEvents: 'none' }}
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
