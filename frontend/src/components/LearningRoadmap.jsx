import React, { useState } from 'react';

export default function LearningRoadmap({ recommendation }) {
  const [expandedPhase, setExpandedPhase] = useState(1); // Default expand phase 2 (indexing at 1)

  if (!recommendation) return null;

  const { roadmap, role } = recommendation;

  const togglePhase = (idx) => {
    setExpandedPhase(expandedPhase === idx ? null : idx);
  };

  return (
    <div className="roadmap-section-card animate-slide-up">
      <div style={{ marginBottom: '28px' }}>
        <span className="section-badge" style={{ backgroundColor: 'var(--color-violet-soft)', color: 'var(--color-violet)' }}>
          Curriculum Engine
        </span>
        <h2 style={{ fontSize: '1.45rem', marginTop: '6px', fontWeight: 700 }}>Structured Learning Roadmap</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
          Step-by-step learning progression designed to help you master missing toolsets for {role}.
        </p>
      </div>

      <div className="roadmap-timeline-vertical">
        <div className="roadmap-timeline-spine"></div>

        {roadmap.map((phase, idx) => {
          const phaseNum = idx + 1;
          const isExpanded = expandedPhase === phaseNum;
          
          let wrapperClass = "roadmap-phase-wrapper";
          if (phase.status === "Completed") wrapperClass += " completed";
          else if (phase.status === "In Progress") wrapperClass += " in-progress";
          if (isExpanded) wrapperClass += " expanded";

          return (
            <div key={idx} className={wrapperClass}>
              <div 
                className="roadmap-phase-header"
                onClick={() => togglePhase(phaseNum)}
              >
                <div className="roadmap-phase-left">
                  <div className="roadmap-phase-bullet">
                    {phase.status === "Completed" && (
                      <span style={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                  <div className="roadmap-phase-info">
                    <span className="roadmap-phase-num mono">PHASE {phaseNum}</span>
                    <h3 className="roadmap-phase-name">{phase.phase.replace(/^Phase \d+:\s*/, "")}</h3>
                  </div>
                </div>

                <div className="roadmap-phase-right">
                  <span className="roadmap-phase-duration mono">{phase.duration}</span>
                  
                  {/* Status Indicator */}
                  <span className={`roadmap-phase-status ${phase.status.toLowerCase().replace(" ", "-")}`}>
                    {phase.status}
                  </span>

                  {/* Progress Bar */}
                  <div className="roadmap-phase-progress-bar">
                    <div 
                      className="roadmap-phase-progress-fill" 
                      style={{ 
                        width: `${phase.progress}%`,
                        backgroundColor: phase.status === "Completed" ? "var(--color-emerald)" : "var(--color-primary)"
                      }}
                    ></div>
                  </div>

                  <span className="roadmap-phase-chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="roadmap-phase-content">
                  {/* Learning Objectives */}
                  <div className="roadmap-goals-list">
                    <div className="roadmap-content-lbl">LEARNING OBJECTIVES</div>
                    {phase.learning_goals.map((goal, i) => (
                      <div key={i} className="roadmap-goal-item">
                        <span className="roadmap-goal-icon">✓</span>
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>

                  {/* Core Milestones */}
                  <div className="roadmap-goals-list">
                    <div className="roadmap-content-lbl">PRACTICAL MILESTONES</div>
                    {phase.milestones.map((milestone, i) => (
                      <div key={i} className="roadmap-goal-item">
                        <span className="roadmap-goal-icon" style={{ color: 'var(--color-violet)' }}>➔</span>
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>

                  {/* Topic Badges */}
                  <div>
                    <div className="roadmap-content-lbl">CORE TECHNOLOGIES & CONCEPTS</div>
                    <div className="roadmap-topics-container">
                      {phase.topics.map((topic, i) => (
                        <span key={i} className="roadmap-topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
