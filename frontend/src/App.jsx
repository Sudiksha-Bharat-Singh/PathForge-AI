import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AssessmentPage from './components/AssessmentPage';
import AnalysisPage from './components/AnalysisPage';
import DashboardPage from './components/DashboardPage';
import { fetchRecommendations } from './api';

function App() {
  const [screen, setScreen] = useState('landing');
  const [userSkills, setUserSkills] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const handleStartAssessment = () => {
    setScreen('assessment');
  };

  const handleAssessmentSubmit = (skills) => {
    setUserSkills(skills);
    setError(null);
    setIsApiLoading(true);
    setScreen('analysis');
    
    // Fire off real API recommendation call immediately
    fetchRecommendations(skills)
      .then((response) => {
        setRecommendations(response);
        setIsApiLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Could not connect to the PathForge AI server.');
        setIsApiLoading(false);
        setScreen('error');
      });
  };

  const handleAnalysisComplete = () => {
    // If API loaded successfully, navigate to dashboard
    if (recommendations && !isApiLoading) {
      setScreen('dashboard');
    } else if (error) {
      // If error already triggered
      setScreen('error');
    } else {
      // If screen timer finished but backend is still loading, wait on loading screen.
      // Once API finishes, the promise then handler will handle routing.
      // To give a smooth UX, we let the loading screen remain active until isApiLoading is false.
    }
  };

  const handleReset = () => {
    setScreen('landing');
    setUserSkills([]);
    setRecommendations(null);
    setError(null);
    setIsApiLoading(false);
  };

  return (
    <>
      <Navbar currentScreen={screen} onReset={handleReset} />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {screen === 'landing' && (
          <LandingPage onStartAssessment={handleStartAssessment} />
        )}
        
        {screen === 'assessment' && (
          <AssessmentPage 
            onSubmit={handleAssessmentSubmit} 
            initialSkills={userSkills} 
          />
        )}
        
        {screen === 'analysis' && (
          <AnalysisPage onComplete={handleAnalysisComplete} />
        )}
        
        {screen === 'dashboard' && recommendations && (
          <DashboardPage 
            recommendations={recommendations} 
            onReset={handleReset} 
          />
        )}

        {screen === 'error' && (
          <div className="container animate-fade" style={{ display: 'flex', justifyContent: 'center', padding: '60px 24px 100px' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: '#ffffff', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--status-error-bg)', color: 'var(--status-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Engine Connectivity Issue</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6', textAlign: 'center' }}>
                {error || "Could not complete the skills assessment. Ensure that the Python FastAPI API server is actively running on port 8000."}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => handleAssessmentSubmit(userSkills)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  Retry Analysis
                </button>
                <button className="btn btn-secondary" onClick={() => setScreen('assessment')}>
                  Edit Skills
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{
        padding: '30px 24px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-secondary)',
        fontFamily: 'var(--font-body)'
      }}>
        <div className="container">
          <p>© {new Date().getFullYear()} PathForge AI. All rights reserved. Powered by Advanced Occupational Intelligence.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
