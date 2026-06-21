import React, { useState, useMemo } from 'react';

const SKILL_CATEGORIES = {
  "Programming & Querying": [
    "Python", "SQL", "R", "JavaScript", "TypeScript", "HTML", "CSS"
  ],
  "AI & Machine Learning": [
    "Machine Learning", "Deep Learning", "LLMs", "Prompt Engineering", "NLP", 
    "OpenAI API", "Hugging Face", "PyTorch", "Git"
  ],
  "Data Science & Analytics": [
    "Pandas", "NumPy", "Tableau", "Statistics", "Data Visualization"
  ],
  "DevOps & Systems": [
    "Docker", "Kubernetes", "AWS", "FastAPI", "REST APIs", "Linux"
  ],
  "Cybersecurity": [
    "Network Security", "Penetration Testing", "Wireshark", "Cryptography", 
    "SIEM", "Incident Response", "Firewalls"
  ]
};

export default function SkillAssessment({ onSubmit }) {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const clearSelection = () => {
    setSelectedSkills([]);
  };

  // Filter skills based on search term
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return SKILL_CATEGORIES;
    
    const query = searchQuery.toLowerCase();
    const result = {};
    
    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
      const matchingSkills = skills.filter(skill => 
        skill.toLowerCase().includes(query)
      );
      if (matchingSkills.length > 0) {
        result[category] = matchingSkills;
      }
    });
    
    return result;
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSkills.length >= 3) {
      onSubmit(selectedSkills);
    }
  };

  return (
    <section className="assessment-section" id="skill-assessment">
      <div className="container">
        
        <div className="section-header">
          <span className="section-badge">ASSESSMENT ENGINES</span>
          <h2 className="section-title">What is your current stack?</h2>
          <p className="section-subtitle">
            Select the languages, frameworks, or libraries you have hands-on experience with. We require at least 3 skills to perform mapping diagnostics.
          </p>
        </div>

        {/* Controls */}
        <div className="assessment-controls">
          <div className="search-container">
            <svg className="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Search technologies (e.g. Python, Docker, PyTorch...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="assessment-meta-stats">
            <span className="selected-counter mono">
              {selectedSkills.length} SKILLS SELECTED
            </span>
            {selectedSkills.length > 0 && (
              <button className="btn-reset-tags mono" onClick={clearSelection}>
                Reset Selection
              </button>
            )}
          </div>
        </div>

        {/* Tag Categories */}
        <form onSubmit={handleSubmit}>
          <div className="categories-grid">
            {Object.entries(filteredCategories).map(([category, skills]) => (
              <div key={category} className="category-card">
                <h3 className="category-title mono">{category}</h3>
                <div className="tags-container">
                  {skills.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        className={`tag-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                        {isSelected && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {Object.keys(filteredCategories).length === 0 && (
              <div className="category-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-ink-subtle)' }}>
                No skills match "{searchQuery}"
              </div>
            )}
          </div>

          {/* Premium Onboarding Preview Empty State */}
          <div className={`onboarding-preview-block ${selectedSkills.length >= 3 ? 'filled' : ''}`}>
            {selectedSkills.length < 3 ? (
              <>
                <div className="onboarding-illustration">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h4 className="onboarding-title">Onboarding Pipeline Progress</h4>
                <p className="onboarding-desc">
                  Select at least <strong>{3 - selectedSkills.length} more skill{selectedSkills.length === 2 ? '' : 's'}</strong> to populate your target career blueprints and reveal recommended timelines.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px', opacity: 0.4 }}>
                  <div style={{ border: '1px dashed var(--color-ink-subtle)', borderRadius: '4px', padding: '6px 12px', fontSize: '0.75rem' }}>Skills Matched</div>
                  <div style={{ border: '1px dashed var(--color-ink-subtle)', borderRadius: '4px', padding: '6px 12px', fontSize: '0.75rem' }}>AI Diagnostics</div>
                  <div style={{ border: '1px dashed var(--color-ink-subtle)', borderRadius: '4px', padding: '6px 12px', fontSize: '0.75rem' }}>Blueprint Path</div>
                </div>
              </>
            ) : (
              <div className="animate-fade">
                <div style={{ color: 'var(--color-emerald)', marginBottom: '8px', fontSize: '1.25rem' }}>✓</div>
                <h4 className="onboarding-title" style={{ color: 'var(--color-ink)' }}>Diagnostics Ready</h4>
                <p className="onboarding-desc">
                  You have selected <strong>{selectedSkills.length} skills</strong>. We are ready to compile your personalized Career Operating System.
                </p>
                
                {/* Visual mock nodes path */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '24px' }}>
                  <div style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--color-primary)', backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 600 }}>
                    {selectedSkills.slice(0, 3).join(" + ")}
                  </div>
                  <span style={{ color: 'var(--color-primary)' }}>➔</span>
                  <div style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--color-violet)', backgroundColor: 'var(--color-violet-soft)', color: 'var(--color-violet)', fontSize: '0.78rem', fontWeight: 600 }}>
                    Career Command Center
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Bar */}
          <div className="submit-bar">
            <div className="status-box">
              <span className={`status-indicator ${selectedSkills.length >= 3 ? 'green' : 'amber'}`}></span>
              <span>
                {selectedSkills.length < 3 
                  ? `Select ${3 - selectedSkills.length} more skill${3 - selectedSkills.length === 1 ? '' : 's'} to activate` 
                  : 'Diagnostic pipeline unlocked'
                }
              </span>
            </div>
            
            <button 
              type="submit" 
              className="btn-submit-action"
              disabled={selectedSkills.length < 3}
            >
              Generate Command Center &rarr;
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
