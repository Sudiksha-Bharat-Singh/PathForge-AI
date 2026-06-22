import React, { useState } from 'react';

const CAREER_NODES = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    match: 96,
    salary: '₹12L–40L',
    growth: '+18%',
    demand: 'Surging',
    cx: 780,
    cy: 200,
    theme: 'violet'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    match: 88,
    salary: '₹10L–30L',
    growth: '+12%',
    demand: 'Strong Demand',
    cx: 220,
    cy: 240,
    theme: 'emerald'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    match: 85,
    salary: '₹10L–28L',
    growth: '+14%',
    demand: 'Growing',
    cx: 740,
    cy: 480,
    theme: 'primary'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    match: 78,
    salary: '₹9L–27L',
    growth: '+13%',
    demand: 'High Demand',
    cx: 260,
    cy: 460,
    theme: 'amber'
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    match: 92,
    salary: '₹8L–22L',
    growth: '+10%',
    demand: 'Stable Demand',
    cx: 500,
    cy: 120,
    theme: 'violet'
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeRoute, setActiveRoute] = useState(null); // For active hover item
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

          {/* Right Column: Global Career Discovery Globe Centerpiece */}
          <div className="hero-illustration-wrapper" style={{ position: 'relative' }}>
            
            {/* Minimal Tooltip Overlay */}
            {activeRoute && activeRoute.type === 'career' && (
              <div 
                className="career-tooltip-overlay"
                style={{
                  position: 'absolute',
                  left: `${CAREER_NODES.find(c => c.id === activeRoute.id).cx}px`,
                  top: `${CAREER_NODES.find(c => c.id === activeRoute.id).cy - 105}px`,
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  zIndex: 100
                }}
              >
                <div className="tooltip-content-box">
                  <div className="tooltip-header">
                    <h4>{CAREER_NODES.find(c => c.id === activeRoute.id).title}</h4>
                    <span className="tooltip-match-badge">{getDisplayMatchValue(CAREER_NODES.find(c => c.id === activeRoute.id))}%</span>
                  </div>
                  <div className="tooltip-body">
                    <div><span>Growth:</span> <strong>{CAREER_NODES.find(c => c.id === activeRoute.id).growth}</strong></div>
                    <div><span>Demand:</span> <strong>{CAREER_NODES.find(c => c.id === activeRoute.id).demand}</strong></div>
                    <div><span>Est. Salary:</span> <strong>{CAREER_NODES.find(c => c.id === activeRoute.id).salary}</strong></div>
                  </div>
                </div>
              </div>
            )}

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
                  
                  <linearGradient id="globe-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.08)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.15)" />
                  </linearGradient>
                  
                  <linearGradient id="neon-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>

                {/* LAYER 1: BACKGROUND (Z = -50px) - Dotted grid pattern */}
                <g className="canvas-bg-layer" opacity="0.08">
                  <pattern id="grid-pattern-globe" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="var(--color-primary)" />
                  </pattern>
                  <rect width="1000" height="650" fill="url(#grid-pattern-globe)" />
                </g>

                {/* LAYER 2: MIDGROUND (Z = 0px) - Orbit Rings and Moving Particles */}
                <g className="canvas-routes-layer">
                  
                  {/* Glowing Orbit Rings (Apple Vision Pro/Stripe perspective) */}
                  <g className="orbital-rings-group">
                    {/* Ring 1 */}
                    <ellipse cx="500" cy="325" rx="350" ry="120" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" strokeOpacity="0.25" transform="rotate(-15 500 325)" className="orbital-path-1" />
                    {/* Ring 2 */}
                    <ellipse cx="500" cy="325" rx="420" ry="155" fill="none" stroke="var(--color-violet)" strokeWidth="1.2" strokeOpacity="0.2" transform="rotate(20 500 325)" className="orbital-path-2" />
                    {/* Ring 3 */}
                    <ellipse cx="500" cy="325" rx="280" ry="90" fill="none" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.18" transform="rotate(-5 500 325)" className="orbital-path-3" />
                  </g>

                  {/* Flowing Opportunity Particles along orbits */}
                  <g className="orbit-particles-flow">
                    <ellipse cx="500" cy="325" rx="350" ry="120" fill="none" stroke="url(#neon-stream-grad)" strokeWidth="2.5" strokeOpacity="0.7" strokeDasharray="15 150" transform="rotate(-15 500 325)" filter="url(#glow-primary)" className="glowing-flow-stream-1" />
                    <ellipse cx="500" cy="325" rx="420" ry="155" fill="none" stroke="url(#neon-stream-grad)" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="25 180" transform="rotate(20 500 325)" filter="url(#glow-violet)" className="glowing-flow-stream-2" />
                    <ellipse cx="500" cy="325" rx="280" ry="90" fill="none" stroke="#06B6D4" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="8 120" transform="rotate(-5 500 325)" className="glowing-flow-stream-3" />
                  </g>



                </g>

                {/* LAYER 3: FOREGROUND (Z = 30px) - Holographic Globe, 5 Career Icons, Core Brand symbol */}
                <g className="canvas-elements-layer">
                  
                  {/* The Holographic Globe floating shell */}
                  <g className="holographic-globe-mesh" transform="translate(500, 325)">
                    
                    {/* Globe transparent background fill */}
                    <circle cx="0" cy="0" r="170" fill="url(#globe-glow-grad)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                    
                    {/* Grid Latitude Lines */}
                    <ellipse cx="0" cy="0" rx="170" ry="45" fill="none" stroke="rgba(96, 165, 250, 0.18)" strokeWidth="1.2" />
                    <ellipse cx="0" cy="0" rx="170" ry="95" fill="none" stroke="rgba(96, 165, 250, 0.18)" strokeWidth="1.2" />
                    <ellipse cx="0" cy="0" rx="170" ry="135" fill="none" stroke="rgba(96, 165, 250, 0.18)" strokeWidth="1.2" />
                    
                    {/* Rotating Longitude Grid Lines */}
                    <g className="globe-mesh-spin">
                      <ellipse cx="0" cy="0" rx="45" ry="170" fill="none" stroke="rgba(139, 92, 246, 0.22)" strokeWidth="1.2" />
                      <ellipse cx="0" cy="0" rx="95" ry="170" fill="none" stroke="rgba(139, 92, 246, 0.22)" strokeWidth="1.2" />
                      <ellipse cx="0" cy="0" rx="135" ry="170" fill="none" stroke="rgba(139, 92, 246, 0.22)" strokeWidth="1.2" />
                      <line x1="0" y1="-170" x2="0" y2="170" stroke="rgba(139, 92, 246, 0.22)" strokeWidth="1.2" />
                      <line x1="-170" y1="0" x2="170" y2="0" stroke="rgba(139, 92, 246, 0.22)" strokeWidth="1.2" />
                    </g>
                    
                    {/* Outer glowing shell border */}
                    <circle cx="0" cy="0" r="170" fill="none" stroke="var(--color-primary-soft)" strokeWidth="2.5" strokeOpacity="0.45" filter="url(#glow-primary)" />
                    
                    {/* Dead Center glowing PathForge Guidance symbol */}
                    <g className="globe-center-brand-logo">
                      <circle cx="0" cy="0" r="38" fill="rgba(15, 23, 42, 0.85)" stroke="var(--border-color)" strokeWidth="1" />
                      {/* Interlocking geometric design representing career paths crossing */}
                      <path 
                        d="M -12 -12 L 12 12 M -12 12 L 12 -12" 
                        fill="none" 
                        stroke="url(#neon-stream-grad)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        filter="url(#glow-violet)"
                        className="pathforge-brand-diamond"
                      />
                      <polygon points="-8,0 0,-8 8,0 0,8" fill="var(--color-primary)" opacity="0.8" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                    </g>

                  </g>

                  {/* Five Floating Career Icons (SaaS minimal style bubbles) */}
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
                        {/* Organic individual float paths */}
                        <g style={{ animation: `float-career ${6 + idx * 0.75}s ease-in-out infinite alternate` }}>
                          
                          {/* Circular glassmorphic bubble */}
                          <circle cx="0" cy="0" r="32" className="world-bg-shape" fill="#FFFFFF" stroke="var(--border-color)" strokeWidth="1.2" />
                          <circle cx="0" cy="0" r="28" fill="none" stroke={`var(--color-${career.theme}-soft)`} strokeWidth="1" strokeDasharray="3 2" />

                          {/* Minimalist Visual Icons */}
                          {career.id === 'ai-engineer' && (
                            <g stroke="var(--color-violet)" strokeWidth="1.8" fill="none" strokeLinecap="round">
                              {/* Neural Network Nodes */}
                              <circle cx="-10" cy="-6" r="2" fill="var(--color-violet)" />
                              <circle cx="10" cy="-6" r="2" fill="var(--color-violet)" />
                              <circle cx="0" cy="10" r="2" fill="var(--color-violet)" />
                              <circle cx="0" cy="-12" r="1.5" />
                              <line x1="-10" y1="-6" x2="0" y2="10" />
                              <line x1="10" y1="-6" x2="0" y2="10" />
                              <line x1="-10" y1="-6" x2="10" y2="-6" />
                              <line x1="0" y1="-12" x2="0" y2="10" />
                            </g>
                          )}

                          {/* Data Scientist (analytics chart icon) */}
                          {career.id === 'data-scientist' && (
                            <g stroke="var(--color-emerald)" strokeWidth="1.8" fill="none" strokeLinecap="round">
                              {/* Bar Chart peaks and trend curve */}
                              <line x1="-12" y1="12" x2="12" y2="12" strokeWidth="1.2" />
                              <rect x="-10" y="-3" width="4" height="15" fill="var(--color-emerald)" fillOpacity="0.4" strokeWidth="0" />
                              <rect x="-2" y="-10" width="4" height="22" fill="var(--color-emerald)" fillOpacity="0.6" strokeWidth="0" />
                              <rect x="6" y="-6" width="4" height="18" fill="var(--color-emerald)" strokeWidth="0" />
                              <path d="M -14 0 Q -5 -12, 12 -12" strokeWidth="1.8" />
                            </g>
                          )}

                          {/* Cloud Engineer (cloud infrastructure icon) */}
                          {career.id === 'cloud-engineer' && (
                            <g stroke="var(--color-primary)" strokeWidth="1.8" fill="none" strokeLinecap="round">
                              {/* Cloud server nodes */}
                              <path d="M -18 6 A 8 8 0 0 1 -10 -6 A 11 11 0 0 1 8 -9 A 8 8 0 0 1 18 6 Z" />
                              <line x1="-8" y1="0" x2="8" y2="0" strokeWidth="1.2" />
                              <line x1="-8" y1="4" x2="8" y2="4" strokeWidth="1.2" />
                            </g>
                          )}

                          {/* Cybersecurity Analyst (shield icon) */}
                          {career.id === 'cybersecurity' && (
                            <g stroke="var(--color-amber)" strokeWidth="1.8" fill="none" strokeLinecap="round">
                              {/* Shield icon */}
                              <path d="M -12 -12 L 12 -12 C 12 -1, 0 14, 0 14 C 0 14, -12 -1, -12 -12 Z" />
                              <circle cx="0" cy="-2" r="2.5" fill="var(--color-amber)" />
                            </g>
                          )}

                          {/* Software Developer (code brackets icon) */}
                          {career.id === 'software-developer' && (
                            <g stroke="var(--color-violet)" strokeWidth="1.8" fill="none" strokeLinecap="round">
                              {/* Code brackets */}
                              <path d="M -8 -8 L -14 0 L -8 8" />
                              <path d="M 8 -8 L 14 0 L 8 8" />
                              <line x1="3" y1="-10" x2="-3" y2="10" />
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
