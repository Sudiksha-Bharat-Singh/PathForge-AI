import os
import re
import json
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List

# Import our core recommendation logic
from recommend import load_dataset, clean_skills, get_recommendations

app = FastAPI(
    title="PathForge AI Recommendation API",
    description="Live FastAPI server executing TF-IDF skills matching and career path forging",
    version="2.0.0"
)

# Enable CORS for the React local development environment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL (e.g. http://localhost:5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SkillsRequest(BaseModel):
    skills: List[str] = Field(..., example=["Python", "SQL", "Git"])

# Helper function to dynamically calculate career readiness level metrics
def calculate_readiness(match_percentage: int, matched_count: int, missing_count: int):
    # readiness score is correlated to match percentage with positive bias
    score = min(98, max(30, int(match_percentage * 0.95)))
    
    if score >= 75:
        level = "Job-Ready Candidate"
        label = "Highly Qualified"
        desc = f"Excellent skill overlay! You have matched {matched_count} key skills. To seal employment, focus on polishing the remaining {missing_count} tools."
    elif score >= 50:
        level = "Intermediate"
        label = "Vigorous Growth"
        desc = f"Solid foundation! You possess {matched_count} core skills. Acquiring the remaining {missing_count} missing competencies will build a robust portfolio."
    else:
        level = "Novice"
        label = "Needs Foundation"
        desc = f"Initial steps. You have matched {matched_count} skills. We recommend starting with Phase 1 of the learning roadmap to establish baseline credentials."
        
    return {
        "score": score,
        "level": level,
        "label": label,
        "description": desc
    }

# Helper function to generate prioritized skill gap analysis list
def generate_gap_analysis(missing_skills: List[str]):
    gaps = []
    
    # Topic rule mappings
    topic_rules = [
        {
            "keys": ["openai", "langchain", "llm", "prompt", "vector", "chroma", "pinecone", "nlp"],
            "topic": "LLM Orchestration & Semantic Search",
            "priority": "High",
            "difficulty": "Intermediate",
            "action": "Complete tutorials on LangChain/LlamaIndex and connect LLMs with vector stores (RAG)."
        },
        {
            "keys": ["pytorch", "tensorflow", "keras", "deep learning", "neural"],
            "topic": "Deep Learning Frameworks",
            "priority": "Medium",
            "difficulty": "Advanced",
            "action": "Build neural networks using PyTorch, mastering tensors, backpropagation, and CNNs."
        },
        {
            "keys": ["pandas", "numpy", "scikit-learn", "sklearn", "matplotlib", "seaborn", "statistics", "machine learning"],
            "topic": "Data Manipulation & Classical ML",
            "priority": "High",
            "difficulty": "Intermediate",
            "action": "Solve wrangling tasks in Pandas and build classifiers using Scikit-Learn."
        },
        {
            "keys": ["react", "next.js", "javascript", "typescript", "html", "css", "vue", "tailwind"],
            "topic": "SPA Frameworks & Type Safety",
            "priority": "High",
            "difficulty": "Intermediate",
            "action": "Build dynamic, type-safe interactive frontend interfaces using React + TypeScript."
        },
        {
            "keys": ["docker", "kubernetes", "aws", "gcp", "azure", "terraform", "ci/cd", "jenkins"],
            "topic": "DevOps & Cloud Deployments",
            "priority": "Medium",
            "difficulty": "Advanced",
            "action": "Containerize API servers using Docker and orchestrate with Kubernetes."
        },
        {
            "keys": ["node.js", "express", "django", "fastapi", "postgres", "sql", "mongodb", "redis"],
            "topic": "API Development & Databases",
            "priority": "High",
            "difficulty": "Intermediate",
            "action": "Create backend routers with ORM connections and implement Redis query caches."
        }
    ]
    
    matched_rules = set()
    
    for skill in missing_skills:
        skill_lower = skill.lower()
        rule_matched = False
        
        # Check against mapped rule triggers
        for rule in topic_rules:
            if any(k in skill_lower for k in rule["keys"]):
                # Avoid adding the same category topic multiple times
                if rule["topic"] not in matched_rules:
                    gaps.append({
                        "topic": rule["topic"],
                        "gap": f"Missing core execution skills in {rule['topic']} frameworks (e.g. {skill}).",
                        "priority": rule["priority"],
                        "difficulty": rule["difficulty"],
                        "action": rule["action"]
                    })
                    matched_rules.add(rule["topic"])
                rule_matched = True
                break
                
        # Fallback dynamic gap item
        if not rule_matched and len(gaps) < 3:
            topic_name = f"{skill} Competency"
            if topic_name not in matched_rules:
                gaps.append({
                    "topic": topic_name,
                    "gap": f"Lacking production-grade exposure using {skill} in active environments.",
                    "priority": "Medium",
                    "difficulty": "Intermediate",
                    "action": f"Read official documentation for {skill} and build standard quickstart projects."
                })
                matched_rules.add(topic_name)
                
    # Ensure we return at least one placeholder if gaps list is empty
    if not gaps:
        gaps.append({
            "topic": "Advanced Specializations",
            "gap": "Standard baseline matches. No major priority gaps identified.",
            "priority": "Low",
            "difficulty": "Intermediate",
            "action": "Continue tracking emerging tools in our occupational directories."
        })
        
    return gaps[:3] # Return top 3 priorities

# Helper function to parse raw text roadmaps to visual frontend objects
def parse_roadmap(roadmap_list: List[str]):
    parsed = []
    for idx, step_str in enumerate(roadmap_list):
        # Match pattern: Phase Title (Topic 1, Topic 2, ...)
        match = re.search(r'(.*?)\s*\((.*?)\)', step_str)
        if match:
            phase_title = match.group(1).strip()
            topics_str = match.group(2)
            topics = [t.strip() for t in topics_str.split(',') if t.strip()]
        else:
            phase_title = step_str.strip()
            topics = [step_str.strip()]
            
        duration = f"{2 + idx} weeks" if idx < 3 else "3-4 weeks"
        parsed.append({
            "phase": f"Phase {idx + 1}: {phase_title}",
            "duration": duration,
            "topics": topics
        })
    return parsed

# Helper function to enrich recommended projects
def format_projects(projects_list: List[dict], career_role: str):
    formatted = []
    for proj in projects_list:
        difficulty = proj.get("difficulty", "Intermediate")
        
        # Estimate build times
        time_map = {
            "Beginner": "8 hours",
            "Intermediate": "16 hours",
            "Advanced": "28 hours"
        }
        time_to_build = time_map.get(difficulty, "15 hours")
        
        # Dynamically assign target skills gained based on project characteristics
        proj_name = proj.get("name", "").lower()
        if "rag" in proj_name or "ai" in proj_name or "llm" in proj_name:
            skills_gained = ["Vector Search", "LLMs", "LangChain", "Python"]
        elif "react" in proj_name or "landing" in proj_name or "dashboard" in proj_name:
            skills_gained = ["React", "CSS Grid", "Animations", "Responsive Design"]
        elif "churn" in proj_name or "predict" in proj_name:
            skills_gained = ["Pandas", "Scikit-Learn", "Data Wrangling", "Classifiers"]
        elif "api" in proj_name or "backend" in proj_name or "chat" in proj_name:
            skills_gained = ["REST APIs", "Node.js", "Express", "Databases"]
        elif "pipeline" in proj_name or "monitoring" in proj_name or "infrastructure" in proj_name:
            skills_gained = ["Docker", "GitOps", "Linux", "CI/CD"]
        else:
            skills_gained = ["Git", "Algorithms", "Problem Solving"]
            
        formatted.append({
            "name": proj.get("name", "Custom Application Lab"),
            "description": proj.get("description", "A practical sandbox builder designed to apply target skillsets."),
            "difficulty": difficulty,
            "time_to_build": time_to_build,
            "skills_gained": skills_gained
        })
    return formatted

# Format a complete career match record returning it to frontend expectations
def normalize_career(career: dict):
    matched_skills = career.get("matched_skills", [])
    missing_skills = career.get("missing_skills", [])
    match_percentage = career.get("match_percentage", 0)
    
    return {
        "role": career.get("role", "Unknown Role"),
        "description": career.get("description", ""),
        "match_percentage": match_percentage,
        "salary_range": career.get("salary_range", {"min": "$70k", "max": "$120k", "average": "$90k"}),
        "readiness": calculate_readiness(match_percentage, len(matched_skills), len(missing_skills)),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "gap_analysis": generate_gap_analysis(missing_skills),
        "roadmap": parse_roadmap(career.get("roadmap", [])),
        "projects": format_projects(career.get("projects", []), career.get("role", ""))
    }

@app.post("/api/recommend")
async def recommend_careers(payload: SkillsRequest):
    try:
        # 1. Clean input skills list
        user_skills = payload.skills
        if not user_skills:
            raise HTTPException(status_code=400, detail="Skills list cannot be empty")
            
        # 2. Load dataset
        careers = load_dataset()
        
        # 3. Fetch matches from TF-IDF engine
        top_recommendations = get_recommendations(user_skills, careers)
        
        if not top_recommendations:
            raise HTTPException(status_code=500, detail="Failed to compute recommendations")
            
        # 4. Normalize top match and alternative lists
        top_match = normalize_career(top_recommendations[0])
        alternative_matches = [normalize_career(c) for c in top_recommendations[1:]]
        
        return {
            "top_match": top_match,
            "alternative_matches": alternative_matches
        }
        
    except FileNotFoundError as fnf:
        raise HTTPException(status_code=500, detail=f"Database file issue: {str(fnf)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation error: {str(e)}")

if __name__ == "__main__":
    # Standard fallback running uvicorn programmatically if executed directly
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
