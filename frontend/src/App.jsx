import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillAssessment from './components/SkillAssessment';
import AnalysisLoader from './components/AnalysisLoader';
import CareerBlueprint from './components/CareerBlueprint';
import SkillGap from './components/SkillGap';
import LearningRoadmap from './components/LearningRoadmap';
import ProjectRecommendations from './components/ProjectRecommendations';
import AlternativeMatches from './components/AlternativeMatches';
import FinalCta from './components/FinalCta';
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
      setTimeout(() => {
        document.getElementById('career-blueprint')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (error) {
      setCurrentScreen('error');
    }
  };

  const handleAlternativeSelect = (career) => {
    setActiveMatch(career);
    // Smooth scroll back to blueprint to view updated career details
    document.getElementById('career-blueprint')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setUserSkills([]);
    setRecommendations(null);
    setActiveMatch(null);
    setError(null);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compile unified list of all matches for alternatives selection panel
  const allMatchesList = React.useMemo(() => {
    if (!recommendations) return [];
    return [recommendations.top_match, ...recommendations.alternative_matches];
  }, [recommendations]);

  return (
    <>
      <Navbar onReset={handleReset} showReset={currentScreen === 'blueprint'} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Step 1: Hero Section */}
        {currentScreen === 'landing' && (
          <Hero onStartAssessment={scrollToAssessment} />
        )}

        {/* Step 2: Skill Assessment Input */}
        {currentScreen === 'landing' && (
          <SkillAssessment onSubmit={handleAssessmentSubmit} />
        )}

        {/* Step 3: Analysis Transition Loader */}
        {currentScreen === 'scanning' && (
          <AnalysisLoader onComplete={handleScanComplete} />
        )}

        {/* Blueprint view screens */}
        {currentScreen === 'blueprint' && activeMatch && (
          <div className="animate-fade">
            {/* Step 4: Career Blueprint Trajectory */}
            <CareerBlueprint recommendation={activeMatch} />

            {/* Step 5: Skill Gap Matrix */}
            <SkillGap recommendation={activeMatch} />

            {/* Step 6: Learning Roadmap Curriculum */}
            <LearningRoadmap recommendation={activeMatch} />

            {/* Step 7: Practical Project Recommendations */}
            <ProjectRecommendations recommendation={activeMatch} />

            {/* Step 8: Alternative Paths Direct Selection */}
            <AlternativeMatches 
              alternatives={allMatchesList} 
              onSelectAlternative={handleAlternativeSelect}
              currentRole={activeMatch.role}
            />

            {/* Step 9: Reset & Final CTA */}
            <FinalCta onReset={handleReset} />
          </div>
        )}

        {/* Error Screen Layout */}
        {currentScreen === 'error' && (
          <div className="container animate-fade" style={{ display: 'flex', justifyContent: 'center', padding: '100px 24px' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-page)', borderRadius: 'var(--radius-sharp)', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sharp)', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #FEE2E2' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '18px' }}>!</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px', color: 'var(--color-ink)' }}>Intelligence Pipeline Error</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                {error || "An unexpected error occurred during processing. Please review your active skills set and try again."}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="cta-reset-btn" onClick={handleReset} style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
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
