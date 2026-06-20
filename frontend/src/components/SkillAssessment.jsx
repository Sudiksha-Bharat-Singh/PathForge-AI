import React, { useState, useMemo } from 'react';
import './SkillAssessment.css';

const SKILL_CATEGORIES = {
  "Programming & Querying": [
    "Python", "SQL", "R", "JavaScript", "TypeScript", "Excel", "HTML", "CSS"
  ],
  "AI & Machine Learning": [
    "Machine Learning", "Deep Learning", "LLMs", "Prompt Engineering", "NLP", 
    "OpenAI API", "Hugging Face", "PyTorch", "TensorFlow", "Scikit-Learn"
  ],
  "Data Science & Analytics": [
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau", "PowerBI", 
    "Statistics", "Data Visualization", "Data Cleaning"
  ],
  "DevOps & Systems": [
    "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform", 
    "CI/CD", "Git", "GitOps", "Linux"
  ],
  "Cybersecurity": [
    "Network Security", "Penetration Testing", "Wireshark", "Cryptography", 
    "SIEM", "Incident Response", "Firewalls", "Threat Intelligence"
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      <div className="section-header">
        <div className="badge mono">SECTION 02: ASSESSMENT</div>
        <h2 className="section-title">What skills do you already have?</h2>
        <p className="section-subtitle">
          Select the technologies, frameworks, and methods you have worked with. Select at least 3 skills to analyze.
        </p>
      </div>

      <div className="assessment-controls">
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="Search skills..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery("")}>&times;</button>
          )}
        </div>
        
        <div className="assessment-meta">
          <span className="selection-counter mono">
            {selectedSkills.length} SKILL{selectedSkills.length !== 1 ? 'S' : ''} SELECTED
          </span>
          {selectedSkills.length > 0 && (
            <button className="clear-all-btn mono" onClick={clearSelection}>Reset Selection</button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="assessment-form">
        <div className="categories-grid">
          {Object.entries(filteredCategories).map(([category, skills]) => (
            <div key={category} className="category-card">
              <h3 className="category-title mono">{category}</h3>
              <div className="skills-tags-container">
                {skills.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      className={`skill-tag ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      {isSelected && <span className="tag-check">&#10003;</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          {Object.keys(filteredCategories).length === 0 && (
            <div className="no-results mono">
              No matching skills found for "{searchQuery}"
            </div>
          )}
        </div>

        <div className="submit-bar">
          {selectedSkills.length < 3 ? (
            <div className="warning-box mono">
              <span className="warning-icon">&#9888;</span>
              Select {3 - selectedSkills.length} more skill{3 - selectedSkills.length !== 1 ? 's' : ''} to activate career intelligence mapping
            </div>
          ) : (
            <div className="success-box mono">
              <span className="success-icon">&#10003;</span>
              Ready to forge path
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn-submit-assessment"
            disabled={selectedSkills.length < 3}
          >
            Compute Career Trajectory &rarr;
          </button>
        </div>
      </form>
    </section>
  );
}
