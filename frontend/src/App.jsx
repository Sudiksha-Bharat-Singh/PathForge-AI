import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillUniverse from './components/SkillUniverse';
import IntelligenceCore from './components/IntelligenceCore';
import CareerBlueprint from './components/CareerBlueprint';
import SkillGapTree from './components/SkillGapTree';
import RoadmapExplorer from './components/RoadmapExplorer';
import ProjectShowcase from './components/ProjectShowcase';
import FinalCta from './components/FinalCta';
import { fetchRecommendations } from './api';

function App() {
  const [userSkills, setUserSkills] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanFinished, setScanFinished] = useState(false);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'scanning', 'blueprint', 'error'

  const handleStartOS = () => {
    document.getElementById('skill-universe')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddSkill = (skill) => {
    // Avoid duplicates
    if (!userSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      setUserSkills([...userSkills, skill]);
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setUserSkills(userSkills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSynthesize = () => {
    if (userSkills.length < 3) return;
    
    setError(null);
    setIsScanning(true);
    setScanFinished(false);
    setRecommendations(null);
    setCurrentScreen('scanning');

    // Smooth scroll to scanning core
    setTimeout(() => {
      document.getElementById('intelligence-core-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Call live Python recommender server
    fetchRecommendations(userSkills)
      .then((response) => {
        setRecommendations(response);
      })
      .catch((err) => {
        setError(err.message || 'Could not connect to the PathForge AI server.');
        setIsScanning(false);
        setScanFinished(false);
        setCurrentScreen('error');
      });
  };

  const handleScanComplete = () => {
    setScanFinished(true);
    if (recommendations) {
      setCurrentScreen('blueprint');
      setTimeout(() => {
        document.getElementById('career-blueprint')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // If recommendations load after the visual scanner completes, transition
  React.useEffect(() => {
    if (scanFinished && recommendations) {
      setCurrentScreen('blueprint');
      setTimeout(() => {
        document.getElementById('career-blueprint')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [scanFinished, recommendations]);

  const handleReset = () => {
    setUserSkills([]);
    setRecommendations(null);
    setIsScanning(false);
    setScanFinished(false);
    setError(null);
    setCurrentScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Navbar displays page breadcrumbs quietly */}
      <Navbar currentScreen={currentScreen} onReset={handleReset} />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Section 1: Immersive Hero */}
        <div id="hero-section">
          <HeroSection onStart={handleStartOS} />
        </div>

        {/* Section 2: Skill Universe (Q&A: What skills do I have?) */}
        <SkillUniverse 
          selectedSkills={userSkills}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onAnalyze={handleSynthesize}
        />

        {/* Section 3: Career Intelligence Engine (Scanner) */}
        <div id="intelligence-core-anchor">
          <IntelligenceCore 
            activeSkills={userSkills}
            isScanning={isScanning}
            onScanComplete={handleScanComplete}
          />
        </div>

        {/* Blueprint Views (Unlock dynamically after scan succeeds) */}
        {currentScreen === 'blueprint' && recommendations && (
          <>
            {/* Section 4: Career Blueprint (Q&A: What career fits me?) */}
            <CareerBlueprint career={recommendations.top_match} />

            {/* Section 5: Skill Gap Tree (Q&A: What am I missing?) */}
            <SkillGapTree career={recommendations.top_match} />

            {/* Section 6: Learning Roadmap (Q&A: What should I learn next?) */}
            <RoadmapExplorer roadmap={recommendations.top_match.roadmap} />

            {/* Section 7: Project Showcase (Q&A: What should I build?) */}
            <ProjectShowcase projects={recommendations.top_match.projects} />

            {/* Section 8: Convergence CTA */}
            <FinalCta onReset={handleReset} />
          </>
        )}

        {/* System Error Banner */}
        {currentScreen === 'error' && (
          <div className="container animate-fade" style={{ display: 'flex', justifyContent: 'center', padding: '100px 24px' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: '#ffffff', boxShadow: 'none', borderRadius: 'var(--radius-sharp)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--status-error-bg)', color: 'var(--status-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '18px' }}>!</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '12px', color: 'var(--color-ink)' }}>Ecosystem Link Failure</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', marginBottom: '24px', lineHeight: '1.6', textAlign: 'center' }}>
                {error || "Could not complete the skills assessment. Ensure that the Python FastAPI API server is actively running on port 8000."}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary btn-sharp" onClick={handleSynthesize}>
                  Retry Analysis
                </button>
                <button className="btn btn-secondary btn-sharp" onClick={() => {
                  setCurrentScreen('landing');
                  setTimeout(() => {
                    document.getElementById('skill-universe')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>
                  Edit Skills
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
