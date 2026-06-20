// Type definitions for PathForge AI recommendation models

export interface SkillGapAnalysis {
  topic: string;
  gap: string;
  priority: 'High' | 'Medium' | 'Low';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  action: string;
}

export interface LearningRoadmap {
  phase: string;
  duration: string;
  topics: string[];
  milestones?: string[];
  learning_goals?: string[];
}

export interface ProjectRecommendation {
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time_to_build: string;
  skills_gained: string[];
}

export interface CareerRecommendation {
  role: string;
  description: string;
  match_percentage: number;
  salary_range: {
    min: string;
    max: string;
    average: string;
  };
  readiness: {
    score: number;
    level: string;
    label: string;
    description: string;
  };
  matched_skills: string[];
  missing_skills: string[];
  gap_analysis: SkillGapAnalysis[];
  roadmap: LearningRoadmap[];
  projects: ProjectRecommendation[];
}

export interface MatchAnalysis {
  top_match: CareerRecommendation;
  alternative_matches: CareerRecommendation[];
}
