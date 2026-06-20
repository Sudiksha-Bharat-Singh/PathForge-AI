import React, { useState } from 'react';
import './RoadmapExplorer.css';

export default function RoadmapExplorer({ roadmap }) {
  const [expandedIdx, setExpandedIdx] = useState(0);

  if (!roadmap || roadmap.length === 0) return null;

  const toggleExpand = (idx) => {
    setExpandedIdx(expandedIdx === idx ? -1 : idx);
  };

  return (
    <section id="roadmap-explorer" className="explorer-os-section">
      <div className="container">
        {/* IA Q&A Header */}
        <div className="os-section-header">
          <span className="os-section-question">WHAT SHOULD I LEARN NEXT?</span>
          <h2 className="os-section-title">The Learning Pathway</h2>
          <p className="os-section-explain">Chronological structured syllabus designed to systematically acquire your missing competencies.</p>
        </div>

        <div className="explorer-timeline-grid card">
          {/* Vertical progress filament line */}
          <div className="explorer-timeline-filament">
            <div className="filament-explorer-fill"></div>
          </div>

          <div className="explorer-timeline-nodes">
            {roadmap.map((step, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <div key={idx} className={`explorer-phase-node ${isExpanded ? 'active' : ''}`}>
                  {/* Waypoint bullet indicator */}
                  <div className="explorer-waypoint-bullet" onClick={() => toggleExpand(idx)}>
                    <span className="waypoint-inner-num">{idx + 1}</span>
                  </div>

                  {/* Accordion phase card */}
                  <div className="explorer-phase-card">
                    <div className="phase-card-header" onClick={() => toggleExpand(idx)}>
                      <div className="phase-card-meta">
                        <span className="mono-label phase-duration-tag">{step.duration}</span>
                        <h5>{step.phase}</h5>
                      </div>
                      <span className="phase-toggle-icon">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'var(--transition-fast)'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="phase-card-body animate-fade">
                        <p className="curriculum-title-mono">Syllabus Curriculum Targets:</p>
                        <ul className="curriculum-topics-list">
                          {step.topics.map((topic, topIdx) => (
                            <li key={topIdx} className="curriculum-topic-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="topic-bullet-check">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="topic-text-mono">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
