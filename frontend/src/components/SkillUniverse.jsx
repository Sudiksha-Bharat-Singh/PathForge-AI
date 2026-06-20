import React, { useState } from 'react';
import './SkillUniverse.css';

const PRESET_SKILLS = [
  { name: "Python", category: "Core Languages" },
  { name: "JavaScript", category: "Core Languages" },
  { name: "SQL", category: "Core Languages" },
  { name: "TypeScript", category: "Core Languages" },
  { name: "React", category: "Frameworks & UI" },
  { name: "Next.js", category: "Frameworks & UI" },
  { name: "Node.js", category: "Backend & Systems" },
  { name: "Express", category: "Backend & Systems" },
  { name: "FastAPI", category: "Backend & Systems" },
  { name: "Docker", category: "DevOps & Cloud" },
  { name: "Kubernetes", category: "DevOps & Cloud" },
  { name: "AWS", category: "DevOps & Cloud" },
  { name: "Git", category: "DevOps & Cloud" },
  { name: "Linux", category: "Backend & Systems" },
  { name: "Machine Learning", category: "AI & Data Science" },
  { name: "Deep Learning", category: "AI & Data Science" },
  { name: "PyTorch", category: "AI & Data Science" },
  { name: "TensorFlow", category: "AI & Data Science" },
  { name: "NLP", category: "AI & Data Science" },
  { name: "LLMs", category: "AI & Data Science" },
  { name: "Vector Databases", category: "AI & Data Science" },
  { name: "Statistics", category: "AI & Data Science" },
  { name: "Figma", category: "Design" }
];

export default function SkillUniverse({ selectedSkills, onAddSkill, onRemoveSkill, onAnalyze }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const handleTogglePreset = (skill) => {
    const isSelected = selectedSkills.some(s => s.toLowerCase() === skill.toLowerCase());
    if (isSelected) {
      const idx = selectedSkills.findIndex(s => s.toLowerCase() === skill.toLowerCase());
      onRemoveSkill(idx);
    } else {
      onAddSkill(skill);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customSkill.trim();
    if (trimmed) {
      onAddSkill(trimmed);
      setCustomSkill("");
    }
  };

  const filteredPresets = PRESET_SKILLS.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="skill-universe" className="universe-os-section">
      <div className="container">
        {/* IA Q&A Header */}
        <div className="os-section-header">
          <span className="os-section-question">WHAT SKILLS DO I HAVE?</span>
          <h2 className="os-section-title">The Skill Universe</h2>
          <p className="os-section-explain">Select your active technical stack below or search to configure your skill profile.</p>
        </div>

        <div className="universe-grid-layout">
          {/* Left panel: Selected constellation profile */}
          <div className="universe-sidebar card">
            <h4>Your Stack Configuration</h4>
            <div className="active-tag-scroller">
              {selectedSkills.length === 0 ? (
                <div className="empty-universe-state">
                  <span className="empty-indicator">○</span>
                  <p>No skills selected. Click tags on the right or search to populate your ecosystem.</p>
                </div>
              ) : (
                <div className="active-constellation-tags">
                  {selectedSkills.map((skill, idx) => (
                    <span key={idx} className="mono-tag constellation-tag animate-fade">
                      {skill}
                      <button 
                        type="button" 
                        className="constellation-remove-btn" 
                        onClick={() => onRemoveSkill(idx)}
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Validation bar & CTAs */}
            <div className="sidebar-action-footer">
              <div className="validation-bar">
                <span className={`validation-dot ${selectedSkills.length >= 3 ? 'valid' : 'invalid'}`}></span>
                <span className="validation-text">
                  {selectedSkills.length >= 3 
                    ? "Ecosystem parameters validated." 
                    : `Requires at least ${3 - selectedSkills.length} more skill${3 - selectedSkills.length > 1 ? 's' : ''}.`
                  }
                </span>
              </div>
              <button 
                className={`btn btn-primary btn-sharp w-100 ${selectedSkills.length < 3 ? 'disabled' : ''}`}
                onClick={onAnalyze}
                disabled={selectedSkills.length < 3}
              >
                Synthesize Profile Path
              </button>
            </div>
          </div>

          {/* Right panel: Preset tags selection space */}
          <div className="universe-selection-area card">
            <div className="selection-filter-bar">
              <input 
                type="text" 
                placeholder="Search skills..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-mono"
              />
              
              <form onSubmit={handleAddCustom} className="custom-skill-form">
                <input 
                  type="text" 
                  placeholder="Or enter custom skill..." 
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  className="search-input-mono"
                />
                <button type="submit" className="btn btn-secondary btn-sharp font-mono btn-small-custom">Add</button>
              </form>
            </div>

            <div className="selection-chip-wrapper">
              {filteredPresets.map((skill, idx) => {
                const isSelected = selectedSkills.some(s => s.toLowerCase() === skill.name.toLowerCase());
                
                // Slow drift offset animations using pure CSS
                const animationDelay = `${(idx % 5) * 0.4}s`;

                return (
                  <button
                    key={idx}
                    type="button"
                    style={{ animationDelay }}
                    className={`os-skill-node-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleTogglePreset(skill.name)}
                  >
                    <span className="node-marker">{isSelected ? '●' : '○'}</span>
                    {skill.name}
                  </button>
                );
              })}
              {filteredPresets.length === 0 && (
                <div className="no-presets-state">
                  <p>No presets match your query. Type your custom skill above and hit 'Add'.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
