import React, { useState } from 'react';
import './DashboardPage.css';

export default function DashboardPage({ recommendations, onReset }) {
  // Let user switch the active career detail in the dashboard view
  const [activeCareer, setActiveCareer] = useState(recommendations.top_match);
  const [expandedPhase, setExpandedPhase] = useState(0);

  // If the user clicks on an alternative match, let's load it.
  // If we have a full mock profile for it, merge it. If not, generate a mock outline.
  const handleSelectCareer = (career) => {
    // In our mock database, we have full configurations for AI Engineer, Frontend Developer, and Data Scientist.
    // Let's check if the selected career matches those roles and load the rich details.
    const key = career.role.toLowerCase().replace(' ', '_');
    
    // Import from mockData dynamically or match if available
    const allCareers = {
      ai_engineer: {
        role: "AI Engineer",
        description: "Integrates artificial intelligence capabilities and large language models (LLMs) into applications to solve complex business problems, bridging the gap between raw ML research and production software.",
        salary_range: { min: "$115,000", max: "$200,000", average: "$155,000" },
        readiness: { score: 65, level: "Intermediate", label: "Vigorous Growth", description: "You possess core programming foundations and basic API integration skills, but need hands-on experience with LLM orchestration frameworks, vector databases, and agentic workflows to be fully job-ready." },
        matched_skills: career.matched_skills || ["Python", "REST APIs"],
        missing_skills: career.missing_skills || ["LLMs", "LangChain", "Vector Databases", "OpenAI API"],
        gap_analysis: [
          { topic: "LLM Orchestration", gap: "Lacking experience building workflows using LangChain or LlamaIndex.", priority: "High", difficulty: "Intermediate", action: "Create small projects connecting LLMs with external tools (tool-calling)." },
          { topic: "Vector Databases & Search", gap: "No experience with semantic search indexing or retrieval architectures (RAG).", priority: "High", difficulty: "Intermediate", action: "Build a document Q&A project using ChromaDB or Pinecone." }
        ],
        roadmap: [
          { phase: "Phase 1: API Mastery & Async Python", duration: "2-3 weeks", topics: ["REST APIs and HTTP protocols", "Asynchronous Python (asyncio, FastAPI)", "Pydantic data validation schema parsing"] },
          { phase: "Phase 2: Semantic Search & Embedding Indexing", duration: "3-4 weeks", topics: ["Text vectorization and embedding models (OpenAI, Hugging Face)", "Cosine similarity algorithms", "Vector database indices (Chroma, Pinecone, Milvus)"] },
          { phase: "Phase 3: Prompt Engineering & Agent Frameworks", duration: "4 weeks", topics: ["Zero-shot, few-shot, and Chain-of-Thought prompting patterns", "LangChain/LlamaIndex agents and tool integration", "State management in multi-agent configurations"] }
        ],
        projects: [
          { name: "RAG Enterprise Knowledge Base", description: "Create a vector search-enabled chatbot that ingests local PDF documents and answers complex questions using OpenAI and ChromaDB.", difficulty: "Intermediate", time_to_build: "15 hours", skills_gained: ["Vector Search", "LLMs", "LangChain", "Python"] },
          { name: "Autonomous Support AI Agent", description: "Develop an agent using LangChain that can invoke custom REST APIs to query order databases, process returns, and answer common customer FAQs.", difficulty: "Advanced", time_to_build: "28 hours", skills_gained: ["Prompt Engineering", "FastAPI", "API integrations", "Agents"] }
        ]
      },
      frontend_developer: {
        role: "Frontend Developer",
        description: "Creates the visual elements, responsive layouts, and interactive user interfaces of modern web applications, ensuring top-tier usability, performance, and accessibility.",
        salary_range: { min: "$80,000", max: "$145,000", average: "$110,000" },
        readiness: { score: 80, level: "Advanced Beginner", label: "Job-Ready Candidate", description: "You have an excellent grasp of core visual standards (HTML, CSS, JavaScript) and styling libraries, but need experience with modern production-ready frameworks (React, Next.js) and performance optimization techniques." },
        matched_skills: career.matched_skills || ["JavaScript", "HTML", "CSS"],
        missing_skills: career.missing_skills || ["TypeScript", "React", "Next.js", "Web Performance"],
        gap_analysis: [
          { topic: "Single Page Application (SPA) Frameworks", gap: "No experience with component-based rendering, hooks, state, or routing.", priority: "High", difficulty: "Intermediate", action: "Build multiple interactive React apps using Vite." },
          { topic: "Type Safety", gap: "Lacking TypeScript experience to prevent run-time errors in enterprise applications.", priority: "High", difficulty: "Intermediate", action: "Refactor a JavaScript project into TypeScript, defining strict Interfaces." }
        ],
        roadmap: [
          { phase: "Phase 1: React Fundamentals & State", duration: "3 weeks", topics: ["JSX and Virtual DOM", "Hooks (useState, useEffect, useContext)", "Local and global state managers (Redux Toolkit or Zustand)"] },
          { phase: "Phase 2: Modern Frameworks & SSR", duration: "3 weeks", topics: ["Next.js App Router structures", "Server Component vs Client Component architectures", "SEO optimizations and static page pre-rendering"] }
        ],
        projects: [
          { name: "Premium SaaS Analytics Landing Page", description: "Build an ultra-responsive, high-fidelity SaaS landing page featuring custom layouts, dashboard graphs, and responsive navigation menus.", difficulty: "Beginner", time_to_build: "8 hours", skills_gained: ["React", "CSS Grid", "Animations", "Responsive Design"] },
          { name: "Drag-and-Drop Task Board", description: "Develop a Kanban task manager utilizing drag-and-drop state libraries, subtask editing, and local storage database caching.", difficulty: "Intermediate", time_to_build: "18 hours", skills_gained: ["React State", "TypeScript", "Draggable APIs", "Local Storage"] }
        ]
      },
      data_scientist: {
        role: "Data Scientist",
        description: "Analyzes complex data systems to discover hidden trends, build predictive models, and guide executive decisions using advanced statistics, databases, and machine learning.",
        salary_range: { min: "$95,000", max: "$165,000", average: "$128,000" },
        readiness: { score: 50, level: "Developing", label: "Needs Foundation", description: "You understand Python and basic SQL querying, but require structured training in statistical modeling, visualization toolkits (Tableau), and machine learning packages." },
        matched_skills: career.matched_skills || ["Python", "SQL"],
        missing_skills: career.missing_skills || ["Pandas", "Scikit-Learn", "Machine Learning", "Statistics"],
        gap_analysis: [
          { topic: "Data Manipulation Libraries", gap: "Unfamiliar with vector arithmetic and dataframes for cleaning large datasets.", priority: "High", difficulty: "Beginner", action: "Complete data exercises using Pandas and NumPy libraries." },
          { topic: "Applied Machine Learning", gap: "No experience implementing regressions, decision trees, or clustering techniques.", priority: "High", difficulty: "Advanced", action: "Build models using Scikit-Learn on open-source Kaggle datasets." }
        ],
        roadmap: [
          { phase: "Phase 1: Scientific Computing & Visualization", duration: "3 weeks", topics: ["Pandas data cleaning and sorting APIs", "Vector matrices manipulation with NumPy", "Plotting data using Matplotlib and Seaborn libraries"] },
          { phase: "Phase 2: Applied Statistical Frameworks", duration: "3 weeks", topics: ["Probability theory and distributions", "Hypothesis testing (A/B testing, p-values)", "Linear and logistic regression algorithms"] }
        ],
        projects: [
          { name: "Customer Churn Predictor", description: "Build an end-to-end binary classifier using Scikit-Learn to forecast subscriber churn rates based on usage statistics.", difficulty: "Intermediate", time_to_build: "12 hours", skills_gained: ["Pandas", "Scikit-Learn", "Feature Engineering", "Data Cleaning"] },
          { name: "E-commerce Recommendation Engine", description: "Design a collaborative filtering system suggesting inventory items to buyers based on historical shopping cart relationships.", difficulty: "Advanced", time_to_build: "24 hours", skills_gained: ["Algorithms", "NumPy", "Statistics", "Machine Learning"] }
        ]
      }
    };

    // If the selected role matches one of our detailed mock careers, load it.
    // Otherwise, structure a customized mock object using its properties.
    const selected = allCareers[key];
    if (selected) {
      setActiveCareer({
        ...selected,
        match_percentage: career.match_percentage || 65,
        matched_skills: career.matched_skills || selected.matched_skills,
        missing_skills: career.missing_skills || selected.missing_skills
      });
    } else {
      // Fallback fallback mock structure
      setActiveCareer({
        role: career.role,
        description: career.description || "Maintains core logic pipelines, database integrations, backend servers, and release architectures.",
        salary_range: { min: "$90,000", max: "$160,000", average: "$120,000" },
        readiness: { score: 55, level: "Intermediate", label: "Growing", description: "You show potential in programming. Focus on database schemas, server routing systems, and microservices configuration to be fully optimized for this role." },
        matched_skills: career.skills ? career.skills.slice(0, 3) : ["SQL", "Git"],
        missing_skills: career.skills ? career.skills.slice(3) : ["Node.js", "Docker", "PostgreSQL", "Redis"],
        gap_analysis: [
          { topic: "Server-side Infrastructures", gap: "Lacking experience designing server routers or caching models.", priority: "High", difficulty: "Intermediate", action: "Build custom APIs using Express or FastAPI." },
          { topic: "Database Integrations", gap: "No query normalizations or structure indexes.", priority: "Medium", difficulty: "Intermediate", action: "Incorporate PostgreSQL and configure indexed columns." }
        ],
        roadmap: [
          { phase: "Phase 1: Basic Routing and API development", duration: "3 weeks", topics: ["REST parameters and JSON schemas", "HTTP status metrics", "Writing authentication controls"] },
          { phase: "Phase 2: Database schemas and SQL operations", duration: "3 weeks", topics: ["Designing relational constraints", "Constructing SQL indexes", "ORM schemas"] }
        ],
        projects: [
          { name: "Collaborative Real-time Chat API", description: "Build a socket communication backend supporting room configurations, user accounts, and archived message logs.", difficulty: "Intermediate", time_to_build: "20 hours", skills_gained: ["WebSockets", "Node.js", "MongoDB", "Express"] }
        ],
        match_percentage: career.match_percentage
      });
    }
    
    // Reset roadmap accordion to first step
    setExpandedPhase(0);
  };

  // Convert salary average string to numerical ratio for visualization slider
  const getSalaryPosition = (salaryRange) => {
    if (!salaryRange) return 50;
    const avgNum = parseInt(salaryRange.average.replace(/[^0-9]/g, ''));
    // Scale $50k to $250k
    return Math.min(100, Math.max(0, ((avgNum - 50000) / 200000) * 100));
  };

  return (
    <div className="dashboard-page container animate-slide-up">
      {/* Dashboard Top Header Banner */}
      <div className="dashboard-header-panel">
        <div className="header-meta">
          <span className="profile-badge">Target Career Insight</span>
          <h2>Your Custom Career Vector</h2>
          <p>Analyzing matching roles based on your uploaded credentials. Review skill gaps, customized course phases, and projects below.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={onReset}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Re-evaluate Skills
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Roadmap
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column - Core Metrics & Overviews */}
        <div className="dashboard-left-column">
          {/* Main Hero Career Match Card */}
          <div className="card match-hero-card">
            <div className="match-card-header">
              <div className="gauge-outer">
                <svg className="radial-svg" viewBox="0 0 36 36">
                  <path
                    className="radial-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="radial-progress"
                    strokeDasharray={`${activeCareer.match_percentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="gauge-text">
                  <span className="gauge-number">{activeCareer.match_percentage}%</span>
                  <span className="gauge-label">Match</span>
                </div>
              </div>
              <div className="career-meta-details">
                <span className="top-indicator">Best Match Matchmaker</span>
                <h3>{activeCareer.role}</h3>
                <p className="career-desc-paragraph">{activeCareer.description}</p>
              </div>
            </div>

            {/* Premium Salary Range Slider */}
            <div className="salary-slider-container">
              <div className="salary-labels">
                <span className="salary-title">Salary Range Outlook</span>
                <span className="salary-average">Avg: <strong style={{color: 'var(--text-primary)'}}>{activeCareer.salary_range?.average}</strong></span>
              </div>
              <div className="salary-slider-track">
                <div 
                  className="salary-slider-fill"
                  style={{
                    left: `${getSalaryPosition(activeCareer.salary_range) - 15}%`,
                    width: '30%'
                  }}
                ></div>
                <div 
                  className="salary-slider-marker"
                  style={{ left: `${getSalaryPosition(activeCareer.salary_range)}%` }}
                >
                  <span className="marker-bubble">{activeCareer.salary_range?.average}</span>
                </div>
              </div>
              <div className="salary-axis">
                <span>{activeCareer.salary_range?.min}</span>
                <span>{activeCareer.salary_range?.max}</span>
              </div>
            </div>
          </div>

          {/* NEW SECTION: Career Readiness Level Card */}
          <div className="card readiness-card">
            <div className="readiness-header">
              <div className="readiness-score-box">
                <span className="readiness-score">{activeCareer.readiness?.score}</span>
                <span className="readiness-score-max">/100</span>
              </div>
              <div className="readiness-meta">
                <h4>Career Readiness Level</h4>
                <div className="readiness-badge-row">
                  <span className="readiness-badge">{activeCareer.readiness?.level}</span>
                  <span className="growth-badge">{activeCareer.readiness?.label}</span>
                </div>
              </div>
            </div>
            <p className="readiness-text">{activeCareer.readiness?.description}</p>
            
            {/* Readiness progress bar */}
            <div className="readiness-bar-container">
              <div className="readiness-bar-track">
                <div 
                  className="readiness-bar-fill"
                  style={{ width: `${activeCareer.readiness?.score}%` }}
                ></div>
              </div>
              <div className="readiness-bar-labels">
                <span>Novice</span>
                <span>Job-Ready</span>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Grid */}
          <div className="card skills-overlap-card">
            <h4>Skills Gap Overview</h4>
            <p className="section-explain">Visual checklist highlighting your existing capabilities vs missing skills required to unlock this career.</p>
            
            <div className="skills-splits">
              <div className="split-column matched-column">
                <h5 className="split-title">
                  <span className="dot green"></span>
                  Matched Skills ({activeCareer.matched_skills.length})
                </h5>
                <div className="dashboard-tags-wrapper">
                  {activeCareer.matched_skills.map((skill, idx) => (
                    <span className="dash-skill-tag matched" key={idx}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="split-column missing-column">
                <h5 className="split-title">
                  <span className="dot violet"></span>
                  Missing Skills ({activeCareer.missing_skills.length})
                </h5>
                <div className="dashboard-tags-wrapper">
                  {activeCareer.missing_skills.map((skill, idx) => (
                    <span className="dash-skill-tag missing" key={idx}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Matches Panel Selector */}
          <div className="card alternatives-panel">
            <h4>Alternative Matches</h4>
            <p className="section-explain">Explore other potential roles that closely match your inputted skillsets. Click to view dashboards.</p>
            <div className="alternatives-list">
              {recommendations.alternative_matches.map((alt, idx) => {
                const isActive = activeCareer.role.toLowerCase() === alt.role.toLowerCase();
                return (
                  <button 
                    type="button" 
                    key={idx}
                    className={`alt-career-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectCareer(alt)}
                  >
                    <div className="alt-info">
                      <strong className="alt-title">{alt.role}</strong>
                      <span className="alt-desc">{alt.description.substring(0, 52)}...</span>
                    </div>
                    <div className="alt-badge">
                      <span>{alt.match_percentage}% Match</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Deep Gap Analysis & Roadmaps */}
        <div className="dashboard-right-column">
          {/* Skill Gap Analysis Component */}
          {activeCareer.gap_analysis && (
            <div className="card gap-analysis-card">
              <h4>Skill Gap Analysis</h4>
              <p className="section-explain">Prioritized review of specific topic gaps and actionable targets to bridge them efficiently.</p>
              
              <div className="gap-table">
                {activeCareer.gap_analysis.map((gap, idx) => (
                  <div className="gap-row" key={idx}>
                    <div className="gap-row-header">
                      <div className="gap-topic-info">
                        <h5>{gap.topic}</h5>
                        <span className={`priority-badge ${gap.priority.toLowerCase()}`}>
                          {gap.priority} Priority
                        </span>
                      </div>
                      <span className={`difficulty-badge ${gap.difficulty.toLowerCase()}`}>
                        {gap.difficulty}
                      </span>
                    </div>
                    <p className="gap-description">{gap.gap}</p>
                    <div className="gap-action-box">
                      <span className="action-label">Action Target:</span>
                      <p className="action-text">{gap.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Learning Roadmap Timeline */}
          <div className="card roadmap-card">
            <h4>Learning Roadmap</h4>
            <p className="section-explain">Chronological structured study syllabus designed to acquire your missing skills. Click phases to expand curriculum details.</p>
            
            <div className="timeline-steps">
              {activeCareer.roadmap.map((step, idx) => {
                const isExpanded = expandedPhase === idx;
                return (
                  <div className={`timeline-phase ${isExpanded ? 'expanded' : ''}`} key={idx}>
                    <div className="timeline-phase-trigger" onClick={() => setExpandedPhase(isExpanded ? -1 : idx)}>
                      <div className="timeline-dot-connector">
                        <span className="phase-number-bullet">{idx + 1}</span>
                      </div>
                      <div className="phase-header-info">
                        <h5>{step.phase}</h5>
                        <span className="phase-duration">{step.duration}</span>
                      </div>
                      <div className="phase-toggle-icon">
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
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="timeline-phase-content animate-fade">
                        <ul className="phase-topic-list">
                          {step.topics.map((topic, topIdx) => (
                            <li key={topIdx}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="list-check-bullet">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Sandbox Projects */}
          <div className="card projects-card">
            <h4>Recommended Sandbox Projects</h4>
            <p className="section-explain">Hands-on applications designed to validate your acquired knowledge and highlight on your resume.</p>
            
            <div className="projects-list-grid">
              {activeCareer.projects.map((proj, idx) => (
                <div className="project-item-card" key={idx}>
                  <div className="project-card-head">
                    <span className={`difficulty-badge ${proj.difficulty.toLowerCase()}`}>
                      {proj.difficulty}
                    </span>
                    <span className="time-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {proj.time_to_build}
                    </span>
                  </div>
                  <h5>{proj.name}</h5>
                  <p>{proj.description}</p>
                  
                  <div className="project-skills-footer">
                    <span className="footer-title">Skills gained:</span>
                    <div className="project-tags-row">
                      {proj.skills_gained.map((tag, tagIdx) => (
                        <span className="project-pill-tag" key={tagIdx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
