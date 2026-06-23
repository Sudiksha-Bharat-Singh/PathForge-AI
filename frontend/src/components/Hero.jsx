import React, { useState } from 'react';

const CAREER_NODES = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    cx: 500,
    cy: 110,
    theme: 'violet',
    curveX: 0,
    controlY: 180
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    cx: 245,
    cy: 255,
    theme: 'amber',
    curveX: -30,
    controlY: 260
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    cx: 230,
    cy: 435,
    theme: 'primary',
    curveX: -20,
    controlY: 420
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    cx: 755,
    cy: 255,
    theme: 'violet',
    curveX: 30,
    controlY: 260
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    cx: 770,
    cy: 435,
    theme: 'emerald',
    curveX: 20,
    controlY: 420
  }
];

export default function Hero({ onStartAssessment }) {
  const [activeRoute, setActiveRoute] = useState(null);
  const [parallax, setParallax] = useState({ tx: 0, ty: 0 });

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

  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
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

          {/* Right Column: Reference Rebuilt Illustration */}
          <div className="hero-illustration-wrapper" style={{ position: 'relative' }}>
            <div 
              className="hero-borderless-canvas"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <svg viewBox="100 60 800 460" className="canvas-svg" width="100%" height="100%">
                
                <defs>
                  {/* Backdrop blur filters */}
                  <filter id="aurora-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="35" />
                  </filter>
                  <filter id="glow-blur-light" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                  
                  <linearGradient id="neon-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>

                  <linearGradient id="brain-left" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  
                  <linearGradient id="brain-right" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>

                  <linearGradient id="metal-base" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </linearGradient>

                  <linearGradient id="glass-card" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.55)" />
                  </linearGradient>

                  <linearGradient id="glass-chip" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                    <stop offset="100%" stopColor="rgba(248, 250, 252, 0.8)" />
                  </linearGradient>

                  <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.04" />
                  </filter>
                  <filter id="pedestal-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#0F172A" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* LAYER 1: BACKDROP - Aurora Glow */}
                <g filter="url(#aurora-blur)" opacity="0.3" style={{ pointerEvents: 'none' }}>
                  <circle cx="520" cy="310" r="180" fill="#3B82F6" opacity="0.08" />
                  <circle cx="480" cy="220" r="140" fill="#8B5CF6" opacity="0.06" />
                  <circle cx="560" cy="380" r="160" fill="#06B6D4" opacity="0.06" />
                </g>                
                {/* LAYER 3: PLATFORM & BRAIN CORE (Independent scaling and X=500 centerpiece placement) */}
                {/* 3D Platform/Pedestal (Scaled by 1.35 around its center 520, 390 and placed at X=500, Y=390) */}
                <g transform="translate(500, 390) scale(1.35) translate(-520, -390)">
                  <g filter="url(#pedestal-shadow)" className="float-pedestal" style={{ transition: 'transform 0.4s ease' }}>
                    {/* Metallic rim height */}
                    <path d="M 400 390 A 120 38 0 0 0 640 390 L 640 405 A 120 38 0 0 1 400 405 Z" fill="url(#metal-base)" />
                    <ellipse cx="520" cy="390" rx="120" ry="38" fill="url(#glass-grad)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2.5" />
                    
                    {/* Concentric Glowing rings */}
                    <ellipse cx="520" cy="390" rx="100" ry="32" fill="none" stroke="url(#energy-core-gradient)" strokeWidth="3" strokeOpacity="0.8" />
                    <ellipse cx="520" cy="390" rx="80" ry="25" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                    <ellipse cx="520" cy="390" rx="55" ry="17" fill="none" stroke="rgba(15, 23, 42, 0.05)" strokeWidth="1.2" />
                    
                    {/* Circular Core Base Pulse */}
                    <ellipse cx="520" cy="390" rx="70" ry="22" fill="none" stroke="var(--color-violet)" strokeWidth="1.2" strokeOpacity="0.3" className="core-pulse-ring-1" />
                    <ellipse cx="520" cy="390" rx="90" ry="28" fill="none" stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.15" className="core-pulse-ring-2" />
                  </g>
                </g>

                {/* Vertical Holographic Projection Rays (Scaled by 1.35, matching platform) */}
                <g transform="translate(500, 390) scale(1.35) translate(-520, -390)">
                  <g opacity="0.3" style={{ pointerEvents: 'none' }}>
                    <line x1="470" y1="380" x2="470" y2="310" stroke="url(#neon-stream-grad)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
                    <line x1="490" y1="385" x2="490" y2="315" stroke="url(#neon-stream-grad)" strokeWidth="0.8" opacity="0.6" />
                    <line x1="510" y1="385" x2="510" y2="315" stroke="url(#neon-stream-grad)" strokeWidth="0.8" opacity="0.6" />
                    <line x1="530" y1="385" x2="530" y2="315" stroke="url(#neon-stream-grad)" strokeWidth="0.8" opacity="0.6" />
                    <line x1="550" y1="380" x2="550" y2="310" stroke="url(#neon-stream-grad)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
                  </g>
                </g>

                {/* Holographic AI Brain (Scaled by 1.42 around its center 520, 275 and placed at X=500, Y=275) */}
                <g transform="translate(500, 275) scale(1.42) translate(-520, -275)">
                  <g className="float-brain" style={{ transition: 'transform 0.4s ease' }}>
                    {/* Left Hemisphere (Blue gradient) */}
                    <path 
                      d="M 520 230 C 500 230, 480 235, 470 245 C 460 255, 455 270, 455 285 C 455 305, 470 320, 490 325 C 505 328, 520 320, 520 310 Z" 
                      fill="url(#brain-left)" 
                      opacity="0.85" 
                    />
                    {/* Brain internal paths and wrinkles left */}
                    <path d="M 480 255 Q 500 262, 516 260" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
                    <path d="M 465 275 Q 490 282, 516 278" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
                    <path d="M 470 295 Q 495 298, 516 295" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
                    <path d="M 490 313 Q 505 310, 516 308" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />

                    {/* Right Hemisphere (Violet gradient) */}
                    <path 
                      d="M 520 230 C 540 230, 560 235, 570 245 C 580 255, 585 270, 585 285 C 585 305, 570 320, 550 325 C 535 328, 520 320, 520 310 Z" 
                      fill="url(#brain-right)" 
                      opacity="0.85" 
                    />
                    {/* Brain internal paths and wrinkles right */}
                    <path d="M 560 255 Q 540 262, 524 260" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
                    <path d="M 575 275 Q 550 282, 524 278" stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
                    <path d="M 570 295 Q 545 298, 524 295" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
                    <path d="M 550 313 Q 535 310, 524 308" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />

                    {/* Neural connecting node circles (Sparkle synapses) */}
                    <g opacity="0.9">
                      <circle cx="490" cy="245" r="2.5" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                      <circle cx="550" cy="245" r="2.5" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                      <circle cx="465" cy="285" r="3.2" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                      <circle cx="575" cy="285" r="3.2" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                      <circle cx="510" cy="315" r="2.5" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                      <circle cx="530" cy="315" r="2.5" fill="#FFFFFF" filter="url(#glow-blur-light)" />
                    </g>

                    {/* Intense Synaptic Core Glow from reference image */}
                    <circle cx="520" cy="275" r="10" fill="#FFFFFF" filter="url(#glow-blur-light)" opacity="0.95" />
                    <circle cx="520" cy="275" r="4.5" fill="#FFFFFF" />
                  </g>
                </g>

                {/* LAYER 4: CONNECTION PATHS (Fiber-optic Multi-strands from reference image) */}
                <g opacity="0.75" style={{ pointerEvents: 'none' }}>
                  {/* Software Engineer vertical connection */}
                  <line x1="500" y1="135" x2="500" y2="211" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="497" y1="135" x2="497" y2="211" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="2 4" opacity="0.5" />
                  <line x1="503" y1="135" x2="503" y2="211" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="2 4" opacity="0.5" />

                  {/* Cybersecurity Analyst curved connection */}
                  <path d="M 270 255 Q 340 250, 408 275" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="4 4" opacity="0.75" />
                  <path d="M 269 253 Q 340 247, 408 272" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M 271 257 Q 340 253, 408 278" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />

                  {/* Cloud Engineer curved connection */}
                  <path d="M 255 435 Q 340 415, 430 340" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="4 4" opacity="0.75" />
                  <path d="M 254 433 Q 340 412, 430 337" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M 256 437 Q 340 418, 430 343" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />

                  {/* AI Engineer curved connection */}
                  <path d="M 730 255 Q 660 250, 592 275" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="4 4" opacity="0.75" />
                  <path d="M 731 253 Q 660 247, 592 272" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M 729 257 Q 660 253, 592 278" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />

                  {/* Data Scientist curved connection */}
                  <path d="M 745 435 Q 660 415, 570 340" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeDasharray="4 4" opacity="0.75" />
                  <path d="M 746 433 Q 660 412, 570 337" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M 744 437 Q 660 418, 570 343" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
                </g>

                {/* LAYER 5: FLOATING CAREER NODES & BADGES */}
                {CAREER_NODES.map((career, idx) => {
                  const isHigh = activeRoute === career.id;
                  const fadeThis = isFaded && !isHigh;

                  return (
                    <g 
                      key={career.id}
                      className={`career-world-module float-node-${idx} ${isHigh ? 'active' : ''} ${fadeThis ? 'faded' : ''}`}
                      style={{
                        cursor: 'pointer',
                        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={() => setActiveRoute(career.id)}
                      onMouseLeave={() => setActiveRoute(null)}
                    >
                      {/* Node circle backdrop glow */}
                      <circle cx={career.cx} cy={career.cy} r="52" fill={`var(--color-${career.theme}-soft)`} opacity={isHigh ? 0.35 : 0.05} filter="url(#glow-blur-light)" />

                      {/* Node glassmorphic circle bubble (r=40) */}
                      <circle 
                        cx={career.cx} 
                        cy={career.cy} 
                        r="40" 
                        fill="url(#glass-card)" 
                        stroke={isHigh ? `var(--color-${career.theme})` : 'rgba(15, 23, 42, 0.09)'} 
                        strokeWidth={isHigh ? '2' : '1.2'} 
                        filter="url(#card-shadow)"
                        style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} 
                      />

                      {/* Soft inner highlight border */}
                      <circle 
                        cx={career.cx} 
                        cy={career.cy} 
                        r="39" 
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.65)" 
                        strokeWidth="1" 
                        style={{ pointerEvents: 'none' }}
                      />

                      {/* Icons inside nodes (rel to career.cx, career.cy, scaled by 1.6) */}
                      <g transform={`translate(${career.cx}, ${career.cy}) scale(1.6)`}>
                        {career.id === 'cybersecurity' && (
                          <g>
                            <path d="M -9 -8 C -9 -8, 0 -13, 0 -13 C 0 -13, 9 -8, 9 -8 C 9 0, 9 7, 0 13 C -9 7, -9 0, -9 -8 Z" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="0" cy="-2" r="3" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
                            <path d="M 0 1 L 0 5" stroke="var(--color-amber)" strokeWidth="1.2" />
                          </g>
                        )}

                        {career.id === 'ui-ux' && (
                          <g>
                            <circle cx="-3" cy="-3" r="5" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" />
                            <circle cx="3" cy="3" r="5" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" />
                          </g>
                        )}

                        {career.id === 'software-engineer' && (
                          <g>
                            <path d="M -8 -6 L -13 0 L -8 6" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M 8 -6 L 13 0 L 8 6" stroke="var(--color-violet)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M 3 -8 L -3 8" stroke="var(--color-violet)" strokeWidth="1.2" strokeLinecap="round" />
                          </g>
                        )}

                        {career.id === 'cloud-engineer' && (
                          <g fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M -11 0 A 7 5 0 0 1 11 0 A 7 5 0 0 1 -11 0 Z" fill="rgba(37,99,235,0.05)" />
                            <circle cx="-5" cy="0" r="1.5" fill="var(--color-primary)" strokeWidth="0" />
                            <circle cx="0" cy="0" r="1.5" fill="var(--color-primary)" strokeWidth="0" />
                            <circle cx="5" cy="0" r="1.5" fill="var(--color-primary)" strokeWidth="0" />
                          </g>
                        )}

                        {career.id === 'ai-engineer' && (
                          <g>
                            <path d="M 0 -11 L 3 -3 L 11 0 L 3 3 L 0 11 L -3 3 L -11 0 L -3 -3 Z" fill="rgba(124,58,237,0.05)" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        )}

                        {career.id === 'data-scientist' && (
                          <g stroke="var(--color-emerald)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="-9" y1="6" x2="9" y2="6" strokeWidth="1.2" />
                            <rect x="-7" y="-2" width="3" height="8" fill="var(--color-emerald)" strokeWidth="0" />
                            <rect x="-2" y="-5" width="3" height="11" fill="var(--color-emerald)" strokeWidth="0" />
                            <rect x="3" y="-8" width="3" height="14" fill="var(--color-emerald)" strokeWidth="0" />
                          </g>
                        )}
                      </g>

                      {/* Text Label Underneath Node */}
                      <text 
                        x={career.cx} 
                        y={career.cy + 60} 
                        textAnchor="middle" 
                        fontSize="15" 
                        fontWeight="600" 
                        fill="#0F172A" 
                        style={{ pointerEvents: 'none' }}
                      >
                        {career.title}
                      </text>
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
