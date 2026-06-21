import React, { useState } from 'react';
import CareerBlueprint from './CareerBlueprint';
import SkillGap from './SkillGap';
import LearningRoadmap from './LearningRoadmap';
import ProjectRecommendations from './ProjectRecommendations';
import AlternativeMatches from './AlternativeMatches';
import FinalCta from './FinalCta';

export default function DashboardWorkspace({ recommendations, activeMatch, onSelectAlternative, onReset }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'blueprint', 'gap', 'roadmap', 'projects'
  const [downloading, setDownloading] = useState(false);

  if (!activeMatch) return null;

  // Compile all matches list
  const allMatchesList = [recommendations.top_match, ...recommendations.alternative_matches];

  const handleDownload = () => {
    setDownloading(true);
    const summary = `
PATHFORGE AI - CAREER INTEL REPORT
----------------------------------
Target Career: ${activeMatch.role}
Match Percentage: ${activeMatch.match_percentage}%
Readiness Score: ${activeMatch.readiness.score}/100
Salary Range: ${activeMatch.salary_range.min} - ${activeMatch.salary_range.max}
Growth Score: ${activeMatch.career_growth}/100
Demand Score: ${activeMatch.industry_demand}/100
Hiring Trend: ${activeMatch.hiring_trend}
----------------------------------
    `;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeMatch.role.toLowerCase().replace(/\\s+/g, "_")}_career_path.txt`;
    link.click();
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <div className="workspace-container">
      {/* Sidebar Navigation */}
      <aside className="workspace-sidebar">
        <div className="sidebar-nav-list">
          <button 
            className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'blueprint' ? 'active' : ''}`}
            onClick={() => setActiveTab('blueprint')}
          >
            <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Career Blueprint
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'gap' ? 'active' : ''}`}
            onClick={() => setActiveTab('gap')}
          >
            <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            Skill Analysis
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Learning Roadmap
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <svg className="sidebar-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            Projects
          </button>
        </div>

        {/* Sidebar Footer Widget: Career Readiness Score */}
        <div className="sidebar-footer-widget">
          <div className="sidebar-widget-label">Career Readiness</div>
          <div className="sidebar-widget-value">{activeMatch.readiness.score}%</div>
          <div className="sidebar-widget-progress">
            <div 
              className="sidebar-widget-progress-fill" 
              style={{ width: `${activeMatch.readiness.score}%` }}
            ></div>
          </div>
          <div className="sidebar-widget-level">{activeMatch.readiness.level}</div>
        </div>
      </aside>

      {/* Main Workspace Workspace Dashboard */}
      <main className="workspace-main-panel">
        
        {/* Dynamic header summary block */}
        <div className="dashboard-header-band animate-slide-up">
          <div className="header-meta-summary">
            <span className="header-role-label">Recommended Career</span>
            <h1 className="header-role-title">{activeMatch.role}</h1>
            <p className="header-role-desc">{activeMatch.description}</p>
          </div>

          <div className="header-metrics-panel">
            <div className="header-metric-box">
              <span className="header-metric-lbl">Match Score</span>
              <span className="header-metric-val" style={{ color: 'var(--color-primary)' }}>{activeMatch.match_percentage}%</span>
              <span className="header-metric-sub">Excellent Fit</span>
            </div>
            
            <div className="header-metric-box">
              <span className="header-metric-lbl">Readiness Score</span>
              <span className="header-metric-val" style={{ color: 'var(--color-violet)' }}>{activeMatch.readiness.score}/100</span>
              <span className="header-metric-sub">{activeMatch.readiness.label}</span>
            </div>

            <div className="header-metric-box">
              <span className="header-metric-lbl">Avg Salary</span>
              <span className="header-metric-val" style={{ color: 'var(--color-emerald)' }}>{activeMatch.salary_range.average}</span>
              <span className="header-metric-sub">Range: {activeMatch.salary_range.min}-{activeMatch.salary_range.max}</span>
            </div>

            <button 
              className="btn-primary" 
              onClick={handleDownload}
              style={{ padding: '8px 16px', fontSize: '0.85rem', alignSelf: 'center' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {downloading ? 'Downloading...' : 'Export PDF'}
            </button>
          </div>
        </div>

        {/* Workspace Tab views */}
        {activeTab === 'overview' && (
          <div className="animate-fade">
            {/* KPI grid panel */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Salary Outlook</span>
                  <svg className="kpi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="kpi-val">{activeMatch.salary_range.average}</div>
                <div className="kpi-subtext">Estimated starting median salary</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Hiring Trend</span>
                  <svg className="kpi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </div>
                <div className="kpi-val" style={{ color: 'var(--color-emerald)' }}>{activeMatch.hiring_trend}</div>
                <div className="kpi-subtext">Active postings growth index</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Growth Score</span>
                  <svg className="kpi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="kpi-val">{activeMatch.career_growth}/100</div>
                <div className="kpi-subtext">Long-term role mobility indexing</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-title">Demand Level</span>
                  <svg className="kpi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="kpi-val">{activeMatch.industry_demand}/100</div>
                <div className="kpi-subtext">Market supply/demand coefficient</div>
              </div>
            </div>

            {/* Career Intelligence Summary (Dials) */}
            <div className="intelligence-summary-card">
              <h3 className="intelligence-summary-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                Career Intelligence Telemetry
              </h3>
              <div className="intelligence-metrics-grid">
                
                {/* Dial 1: Match Score */}
                <div className="intelligence-metric-cell">
                  <span className="intelligence-cell-lbl">Match Score</span>
                  <div className="intelligence-dial-container">
                    <svg className="intelligence-dial-svg" width="80" height="80">
                      <circle className="intelligence-dial-bg" cx="40" cy="40" r="34"></circle>
                      <circle 
                        className="intelligence-dial-fill blue" 
                        cx="40" 
                        cy="40" 
                        r="34"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * activeMatch.match_percentage) / 100}
                      ></circle>
                    </svg>
                    <span className="intelligence-dial-text">{activeMatch.match_percentage}%</span>
                  </div>
                  <div className="intelligence-cell-desc">Competency alignment</div>
                </div>

                {/* Dial 2: Job Readiness */}
                <div className="intelligence-metric-cell">
                  <span className="intelligence-cell-lbl">Job Readiness</span>
                  <div className="intelligence-dial-container">
                    <svg className="intelligence-dial-svg" width="80" height="80">
                      <circle className="intelligence-dial-bg" cx="40" cy="40" r="34"></circle>
                      <circle 
                        className="intelligence-dial-fill violet" 
                        cx="40" 
                        cy="40" 
                        r="34"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * activeMatch.readiness.score) / 100}
                      ></circle>
                    </svg>
                    <span className="intelligence-dial-text">{activeMatch.readiness.score}%</span>
                  </div>
                  <div className="intelligence-cell-desc">{activeMatch.readiness.level}</div>
                </div>

                {/* Dial 3: Growth Potential */}
                <div className="intelligence-metric-cell">
                  <span className="intelligence-cell-lbl">Growth Potential</span>
                  <div className="intelligence-dial-container">
                    <svg className="intelligence-dial-svg" width="80" height="80">
                      <circle className="intelligence-dial-bg" cx="40" cy="40" r="34"></circle>
                      <circle 
                        className="intelligence-dial-fill emerald" 
                        cx="40" 
                        cy="40" 
                        r="34"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * activeMatch.career_growth) / 100}
                      ></circle>
                    </svg>
                    <span className="intelligence-dial-text">{activeMatch.career_growth}%</span>
                  </div>
                  <div className="intelligence-cell-desc">Salary mobility index</div>
                </div>

                {/* Dial 4: Industry Demand */}
                <div className="intelligence-metric-cell">
                  <span className="intelligence-cell-lbl">Market Demand</span>
                  <div className="intelligence-dial-container">
                    <svg className="intelligence-dial-svg" width="80" height="80">
                      <circle className="intelligence-dial-bg" cx="40" cy="40" r="34"></circle>
                      <circle 
                        className="intelligence-dial-fill blue" 
                        cx="40" 
                        cy="40" 
                        r="34"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * activeMatch.industry_demand) / 100}
                      ></circle>
                    </svg>
                    <span className="intelligence-dial-text">{activeMatch.industry_demand}%</span>
                  </div>
                  <div className="intelligence-cell-desc">Role posting coefficient</div>
                </div>

              </div>
            </div>

            {/* Quick overview panels */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '30px', marginBottom: '32px' }} className="projects-layout-grid">
              <div className="kpi-card" style={{ display: 'block', minHeight: 'auto' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', fontWeight: 600 }}>Learning Path Progress</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {activeMatch.roadmap.slice(0, 3).map((phase, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.78rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 500 }}>{phase.phase}</span>
                        <span className="mono" style={{ marginLeft: 'auto' }}>{phase.progress}%</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${phase.progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '999px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="kpi-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'auto' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', fontWeight: 600 }}>Top Gap Analysis Gaps</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                    You have {activeMatch.missing_skills.length} missing competencies needed to lock in candidate qualifications.
                  </p>
                </div>
                <button 
                  className="btn-secondary" 
                  onClick={() => setActiveTab('gap')}
                  style={{ width: '100%', fontSize: '0.82rem', padding: '10px' }}
                >
                  View Gap Analysis Matrix
                </button>
              </div>
            </div>

            {/* Alternative selector matches list */}
            <AlternativeMatches 
              alternatives={allMatchesList} 
              onSelectAlternative={onSelectAlternative}
              currentRole={activeMatch.role}
            />

            {/* Final CTA Reset */}
            <FinalCta onReset={onReset} />
          </div>
        )}

        {activeTab === 'blueprint' && (
          <div className="animate-fade">
            <CareerBlueprint recommendation={activeMatch} />
          </div>
        )}

        {activeTab === 'gap' && (
          <div className="animate-fade">
            <SkillGap recommendation={activeMatch} />
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-fade">
            <LearningRoadmap recommendation={activeMatch} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-fade">
            <ProjectRecommendations recommendation={activeMatch} />
          </div>
        )}

      </main>
    </div>
  );
}
