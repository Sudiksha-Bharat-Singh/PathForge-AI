import React, { useState } from 'react';
import './AssessmentPage.css';

const SUGGESTED_CATEGORIES = [
  {
    name: "Languages & Web Core",
    skills: ["Python", "JavaScript", "SQL", "TypeScript", "HTML", "CSS", "C++", "Java"]
  },
  {
    name: "Frameworks & Toolkits",
    skills: ["React", "PyTorch", "Pandas", "NumPy", "Node.js", "Express", "Next.js", "Django", "FastAPI"]
  },
  {
    name: "Cloud & Infrastructure",
    skills: ["Docker", "Kubernetes", "AWS", "Git", "CI/CD", "Terraform", "PostgreSQL", "MongoDB"]
  },
  {
    name: "Specialties & Methods",
    skills: ["Machine Learning", "Statistics", "Prompt Engineering", "NLP", "LLMs", "Vector Databases", "Figma", "Agile"]
  }
];

export default function AssessmentPage({ onSubmit, initialSkills = [] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [inputValue, setInputValue] = useState("");
  const [showValidationWarning, setShowValidationWarning] = useState(false);

  const handleAddSkill = (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    
    // Avoid duplicates (case-insensitive check)
    const exists = skills.some(s => s.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      if (newSkills.length >= 3) {
        setShowValidationWarning(false);
      }
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    const newSkills = skills.filter((_, idx) => idx !== indexToRemove);
    setSkills(newSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skills.length < 3) {
      setShowValidationWarning(true);
      return;
    }
    onSubmit(skills);
  };

  return (
    <div className="assessment-page container animate-slide-up">
      <div className="assessment-card card">
        <div className="assessment-header">
          <span className="step-count">Step 1 of 2</span>
          <h2>Map your skills inventory</h2>
          <p>Select or type the skills you currently possess. Our AI engine requires at least 3 skills to analyze career paths and map matching courses.</p>
        </div>

        <form onSubmit={handleSubmit} className="assessment-form">
          {/* Skill Tag Input Panel */}
          <div className="input-panel">
            <label htmlFor="skill-input" className="panel-label">Your Active Skills</label>
            <div className="skills-input-container">
              <div className="tags-wrapper">
                {skills.map((skill, idx) => (
                  <span className="skill-tag animate-fade" key={idx}>
                    {skill}
                    <button 
                      type="button" 
                      className="remove-tag-btn" 
                      onClick={() => handleRemoveSkill(idx)}
                      aria-label={`Remove ${skill}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                ))}
                <input
                  id="skill-input"
                  type="text"
                  placeholder={skills.length === 0 ? "Type a skill (e.g. React) and press Enter" : "Add more skills..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="tag-text-input"
                  autoComplete="off"
                />
              </div>
              {inputValue.trim() && (
                <button 
                  type="button" 
                  className="btn btn-accent quick-add-submit"
                  onClick={() => handleAddSkill(inputValue)}
                >
                  Add
                </button>
              )}
            </div>
          </div>

          {/* Validation Warning Alert */}
          {showValidationWarning && (
            <div className="validation-alert animate-fade">
              <div className="alert-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="alert-content">
                <strong>Minimum Skills Requirement</strong>
                <p>Please add at least {3 - skills.length} more skill{3 - skills.length > 1 ? 's' : ''} (Currently: {skills.length}/3) to launch the analysis.</p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="assessment-footer">
            <div className="skills-badge-counter">
              <span className={`count-pill ${skills.length >= 3 ? 'ready' : ''}`}>
                {skills.length} Skill{skills.length !== 1 ? 's' : ''} Selected
              </span>
              {skills.length < 3 && <span className="helper-hint">Add 3+ skills to proceed</span>}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary submit-analysis-btn ${skills.length < 3 ? 'disabled' : ''}`}
            >
              Analyze Career Paths
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </form>

        {/* Suggestion Groups */}
        <div className="suggestions-section">
          <h3>Quick-Add Popular Skills</h3>
          <div className="suggestions-categories">
            {SUGGESTED_CATEGORIES.map((category, catIdx) => (
              <div className="suggestion-category-group" key={catIdx}>
                <h4>{category.name}</h4>
                <div className="suggestion-pill-grid">
                  {category.skills.map((skill, skIdx) => {
                    const isSelected = skills.some(s => s.toLowerCase() === skill.toLowerCase());
                    return (
                      <button
                        type="button"
                        key={skIdx}
                        className={`suggestion-pill ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (isSelected) {
                            const idx = skills.findIndex(s => s.toLowerCase() === skill.toLowerCase());
                            handleRemoveSkill(idx);
                          } else {
                            handleAddSkill(skill);
                          }
                        }}
                      >
                        {isSelected && (
                          <svg className="check-svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
