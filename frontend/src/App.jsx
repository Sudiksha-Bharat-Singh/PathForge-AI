import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillAssessment from './components/SkillAssessment';
import AnalysisLoader from './components/AnalysisLoader';
import DashboardWorkspace from './components/DashboardWorkspace';
import { getRecommendations } from './services/recommendationService';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'scanning', 'blueprint', 'error'
  const [userSkills, setUserSkills] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [activeMatch, setActiveMatch] = useState(null);
  const [error, setError] = useState(null);

  const scrollToAssessment = () => {
    document.getElementById('skill-assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAssessmentSubmit = (skills) => {
    setUserSkills(skills);
    setError(null);
    setCurrentScreen('scanning');
    
    // Trigger recommendation service
    getRecommendations(skills)
      .then((data) => {
        setRecommendations(data);
        setActiveMatch(data.top_match);
      })
      .catch((err) => {
        setError(err.message || "Failed to analyze competencies.");
        setCurrentScreen('error');
      });
  };

  const handleScanComplete = () => {
    if (recommendations) {
      setCurrentScreen('blueprint');
    } else if (error) {
      setCurrentScreen('error');
    }
  };

  const handleAlternativeSelect = (career) => {
    setActiveMatch(career);
  };

  const handleReset = () => {
    setUserSkills([]);
    setRecommendations(null);
    setActiveMatch(null);
    setError(null);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar 
        onReset={handleReset} 
        isAppMode={currentScreen === 'blueprint'} 
        onStartAssessment={scrollToAssessment}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Step 1 & 2: Landing page state */}
        {currentScreen === 'landing' && (
          <div className="animate-fade">
            <Hero onStartAssessment={scrollToAssessment} />
            <SkillAssessment onSubmit={handleAssessmentSubmit} />
          </div>
        )}

        {/* Step 3: Analysis Transition Loader */}
        {currentScreen === 'scanning' && (
          <AnalysisLoader onComplete={handleScanComplete} />
        )}

        {/* Step 4: The Career Intelligence Workspace Dashboard */}
        {currentScreen === 'blueprint' && activeMatch && (
          <DashboardWorkspace 
            recommendations={recommendations}
            activeMatch={activeMatch}
            onSelectAlternative={handleAlternativeSelect}
            onReset={handleReset}
          />
        )}

        {/* Error Screen Layout */}
        {currentScreen === 'error' && (
          <div className="container animate-fade" style={{ display: 'flex', justifyContent: 'center', padding: '100px 24px' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #FEE2E2' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '18px' }}>!</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px', color: 'var(--color-ink)' }}>Intelligence Pipeline Error</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                {error || "An unexpected error occurred during processing. Please review your active skills set and try again."}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={handleReset} style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                  Return to Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
