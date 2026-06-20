import React, { useState } from 'react';
import './LearningRoadmap.css';

export default function LearningRoadmap({ recommendation }) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  if (!recommendation) return null;

  const { roadmap } = recommendation;

  return (
    <section className="roadmap-section" id="learning-roadmap">
      <div className="section-header">
        <div className="badge mono">SECTION 06: ROADMAP EXPLORER</div>
        <h2 className="section-title">What should I learn next?</h2>
        <p className="section-subtitle">
          Follow a structured curriculum pathway divided into phases to bridge your skills gaps.
        </p>
      </div>

      <div className="roadmap-layout">
        {/* Left Side: Vertical Phase Stepper Selector */}
        <div className="roadmap-stepper card">
          <h3 className="stepper-title mono">CURRICULUM PHASES</h3>
          
          <div className="stepper-list">
            {roadmap.map((step, idx) => {
              const isActive = idx === activePhaseIndex;
              const stepTitleClean = step.phase.replace(/^Phase \d+:\s*/, "");
              return (
                <button
                  key={idx}
                  className={`step-selector-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActivePhaseIndex(idx)}
                >
                  <div className="step-num-badge mono">PHASE 0{idx + 1}</div>
                  <div className="step-btn-info">
                    <span className="step-btn-title">{stepTitleClean}</span>
                    <span className="step-btn-duration mono">{step.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Phase Details Board */}
        <div className="roadmap-details card">
          <div className="details-header">
            <span className="phase-num mono text-purple">PHASE 0{activePhaseIndex + 1} DETAILED PATH</span>
            <h3 className="phase-title">{roadmap[activePhaseIndex].phase}</h3>
            <span className="phase-duration-pill mono">{roadmap[activePhaseIndex].duration}</span>
          </div>

          <div className="details-content-grid">
            {/* Target Topics */}
            <div className="details-block">
              <span className="details-block-lbl mono">TARGET CORE CONCEPTS</span>
              <div className="topics-pills-list">
                {roadmap[activePhaseIndex].topics.map((topic, i) => (
                  <span key={i} className="topic-pill mono">{topic}</span>
                ))}
              </div>
            </div>

            {/* Milestones if present */}
            {roadmap[activePhaseIndex].milestones && (
              <div className="details-block">
                <span className="details-block-lbl mono">PRACTICAL MILESTONES</span>
                <ul className="details-items-list">
                  {roadmap[activePhaseIndex].milestones.map((milestone, i) => (
                    <li key={i} className="details-item">
                      <span className="bullet-indicator">&rarr;</span>
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learning Goals if present */}
            {roadmap[activePhaseIndex].learning_goals && (
              <div className="details-block">
                <span className="details-block-lbl mono">LEARNING OUTCOMES</span>
                <ul className="details-items-list">
                  {roadmap[activePhaseIndex].learning_goals.map((goal, i) => (
                    <li key={i} className="details-item">
                      <span className="bullet-indicator check-bullet">&#10003;</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
