// Mock Database representing standard careers from careers_dataset.json
// This file serves mock responses and contains no recommendation matching logic.

export const MOCK_CAREERS = {
  ai_engineer: {
    role: "AI Engineer",
    description: "Integrates artificial intelligence capabilities and large language models (LLMs) into applications to solve complex business problems, bridging the gap between raw ML research and production software.",
    salary_range: {
      min: "$115,000",
      max: "$200,000",
      average: "$155,000"
    },
    readiness: {
      score: 65,
      level: "Intermediate",
      label: "Vigorous Growth",
      description: "You possess core programming foundations and basic API integration skills, but need hands-on experience with LLM orchestration frameworks, vector databases, and agentic workflows to be fully job-ready."
    },
    matched_skills: ["Python", "REST APIs", "Git", "NLP"],
    missing_skills: ["OpenAI API", "PyTorch", "LLMs", "Prompt Engineering", "LangChain", "Vector Databases", "FastAPI", "Hugging Face"],
    gap_analysis: [
      {
        topic: "LLM Orchestration",
        gap: "Lacking experience building workflows using LangChain or LlamaIndex.",
        priority: "High",
        difficulty: "Intermediate",
        action: "Create small projects connecting LLMs with external tools (tool-calling)."
      },
      {
        topic: "Vector Databases & Search",
        gap: "No experience with semantic search indexing or retrieval architectures (RAG).",
        priority: "High",
        difficulty: "Intermediate",
        action: "Build a document Q&A project using ChromaDB or Pinecone."
      },
      {
        topic: "Deep Learning Foundations",
        gap: "Missing framework understanding for neural nets (PyTorch/TensorFlow).",
        priority: "Medium",
        difficulty: "Advanced",
        action: "Complete basic PyTorch tutorials on tensors, auto-grad, and layers."
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: API Mastery & Async Python",
        duration: "2-3 weeks",
        topics: ["REST APIs and HTTP protocols", "Asynchronous Python (asyncio, FastAPI)", "Pydantic data validation schema parsing"]
      },
      {
        phase: "Phase 2: Semantic Search & Embedding Indexing",
        duration: "3-4 weeks",
        topics: ["Text vectorization and embedding models (OpenAI, Hugging Face)", "Cosine similarity algorithms", "Vector database indices (Chroma, Pinecone, Milvus)"]
      },
      {
        phase: "Phase 3: Prompt Engineering & Agent Frameworks",
        duration: "4 weeks",
        topics: ["Zero-shot, few-shot, and Chain-of-Thought prompting patterns", "LangChain/LlamaIndex agents and tool integration", "State management in multi-agent configurations"]
      },
      {
        phase: "Phase 4: Agent Deployment & MLOps basics",
        duration: "3 weeks",
        topics: ["API backend scaling with Docker", "Monitoring LLM latencies and token usage", "Prompt version tracking and validation tests"]
      }
    ],
    projects: [
      {
        name: "RAG Enterprise Knowledge Base",
        description: "Create a vector search-enabled chatbot that ingests local PDF documents and answers complex questions using OpenAI and ChromaDB.",
        difficulty: "Intermediate",
        time_to_build: "15 hours",
        skills_gained: ["Vector Search", "LLMs", "LangChain", "Python"]
      },
      {
        name: "Autonomous Support AI Agent",
        description: "Develop an agent using LangChain that can invoke custom REST APIs to query order databases, process returns, and answer common customer FAQs.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["Prompt Engineering", "FastAPI", "API integrations", "Agents"]
      }
    ]
  },
  
  frontend_developer: {
    role: "Frontend Developer",
    description: "Creates the visual elements, responsive layouts, and interactive user interfaces of modern web applications, ensuring top-tier usability, performance, and accessibility.",
    salary_range: {
      min: "$80,000",
      max: "$145,000",
      average: "$110,000"
    },
    readiness: {
      score: 80,
      level: "Advanced Beginner",
      label: "Job-Ready Candidate",
      description: "You have an excellent grasp of core visual standards (HTML, CSS, JavaScript) and styling libraries, but need experience with modern production-ready frameworks (React, Next.js) and performance optimization techniques."
    },
    matched_skills: ["JavaScript", "HTML", "CSS", "Responsive Design", "Git"],
    missing_skills: ["TypeScript", "React", "Tailwind CSS", "Next.js", "Web Performance", "Redux", "Webpack", "UI Testing"],
    gap_analysis: [
      {
        topic: "Single Page Application (SPA) Frameworks",
        gap: "No experience with component-based rendering, hooks, state, or routing.",
        priority: "High",
        difficulty: "Intermediate",
        action: "Build multiple interactive React apps using Vite."
      },
      {
        topic: "Type Safety",
        gap: "Lacking TypeScript experience to prevent run-time errors in enterprise applications.",
        priority: "High",
        difficulty: "Intermediate",
        action: "Refactor a JavaScript project into TypeScript, defining strict Interfaces."
      },
      {
        topic: "Build Tools & Optimization",
        gap: "Unfamiliar with asset bundling, code-splitting, lazy-loading, and web vitals metrics.",
        priority: "Medium",
        difficulty: "Advanced",
        action: "Audit an application using Lighthouse and implement image compression/dynamic imports."
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: React Fundamentals & State",
        duration: "3 weeks",
        topics: ["JSX and Virtual DOM", "Hooks (useState, useEffect, useContext)", "Local and global state managers (Redux Toolkit or Zustand)"]
      },
      {
        phase: "Phase 2: Modern Frameworks & SSR",
        duration: "3 weeks",
        topics: ["Next.js App Router structures", "Server Component vs Client Component architectures", "SEO optimizations and static page pre-rendering"]
      },
      {
        phase: "Phase 3: Robust Type Systems",
        duration: "2 weeks",
        topics: ["TypeScript basics (types, interfaces, union types)", "Integrating TS with React hooks and prop types", "Handling strict compiler flags"]
      },
      {
        phase: "Phase 4: Optimization & Deployment",
        duration: "2 weeks",
        topics: ["Web Vitals audits", "Dynamic code-splitting and asset caching", "CI/CD configurations with Vercel or Netlify"]
      }
    ],
    projects: [
      {
        name: "Premium SaaS Analytics Landing Page",
        description: "Build an ultra-responsive, high-fidelity SaaS landing page featuring custom layouts, dashboard graphs, and responsive navigation menus.",
        difficulty: "Beginner",
        time_to_build: "8 hours",
        skills_gained: ["React", "CSS Grid", "Animations", "Responsive Design"]
      },
      {
        name: "Drag-and-Drop Task Board",
        description: "Develop a Kanban task manager utilizing drag-and-drop state libraries, subtask editing, and local storage database caching.",
        difficulty: "Intermediate",
        time_to_build: "18 hours",
        skills_gained: ["React State", "TypeScript", "Draggable APIs", "Local Storage"]
      }
    ]
  },

  data_scientist: {
    role: "Data Scientist",
    description: "Analyzes complex data systems to discover hidden trends, build predictive models, and guide executive decisions using advanced statistics, databases, and machine learning.",
    salary_range: {
      min: "$95,000",
      max: "$165,000",
      average: "$128,000"
    },
    readiness: {
      score: 50,
      level: "Developing",
      label: "Needs Foundation",
      description: "You understand Python and basic SQL querying, but require structured training in statistical modeling, visualization toolkits (Tableau), and machine learning packages."
    },
    matched_skills: ["Python", "SQL", "Git"],
    missing_skills: ["R", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "Tableau", "Statistics", "Machine Learning", "Data Visualization"],
    gap_analysis: [
      {
        topic: "Data Manipulation Libraries",
        gap: "Unfamiliar with vector arithmetic and dataframes for cleaning large datasets.",
        priority: "High",
        difficulty: "Beginner",
        action: "Complete data exercises using Pandas and NumPy libraries."
      },
      {
        topic: "Applied Machine Learning",
        gap: "No experience implementing regressions, decision trees, or clustering techniques.",
        priority: "High",
        difficulty: "Advanced",
        action: "Build models using Scikit-Learn on open-source Kaggle datasets."
      },
      {
        topic: "Business Dashboarding",
        gap: "Lacking skills to translate code figures into intuitive executive dashboards.",
        priority: "Medium",
        difficulty: "Intermediate",
        action: "Build interactive worksheets and storyboards in Tableau or PowerBI."
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: Scientific Computing & Visualization",
        duration: "3 weeks",
        topics: ["Pandas data cleaning and sorting APIs", "Vector matrices manipulation with NumPy", "Plotting data using Matplotlib and Seaborn libraries"]
      },
      {
        phase: "Phase 2: Applied Statistical Frameworks",
        duration: "3 weeks",
        topics: ["Probability theory and distributions", "Hypothesis testing (A/B testing, p-values)", "Linear and logistic regression algorithms"]
      },
      {
        phase: "Phase 3: Core Machine Learning Models",
        duration: "4 weeks",
        topics: ["Supervised models (Trees, SVMs, Random Forest)", "Unsupervised models (K-Means, PCA clustering)", "Evaluation metrics (F1-score, ROC-AUC, confusion matrices)"]
      },
      {
        phase: "Phase 4: Business Dashboarding & Storytelling",
        duration: "2 weeks",
        topics: ["Database aggregation scripts with SQL", "Designing executive dashboards in Tableau", "Structuring technical data reports for business managers"]
      }
    ],
    projects: [
      {
        name: "Customer Churn Predictor",
        description: "Build an end-to-end binary classifier using Scikit-Learn to forecast subscriber churn rates based on usage statistics.",
        difficulty: "Intermediate",
        time_to_build: "12 hours",
        skills_gained: ["Pandas", "Scikit-Learn", "Feature Engineering", "Data Cleaning"]
      },
      {
        name: "E-commerce Recommendation Engine",
        description: "Design a collaborative filtering system suggesting inventory items to buyers based on historical shopping cart relationships.",
        difficulty: "Advanced",
        time_to_build: "24 hours",
        skills_gained: ["Algorithms", "NumPy", "Statistics", "Machine Learning"]
      }
    ]
  }
};

// Alternative suggestions list
export const ALTERNATIVE_MATCHES = [
  {
    role: "Backend Developer",
    match_percentage: 75,
    description: "Builds and maintains server logics, high-throughput REST APIs, database schemas, and caching structures.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker"]
  },
  {
    role: "DevOps Engineer",
    match_percentage: 60,
    description: "Automates app releases, scales Kubernetes clusters, sets up CI/CD pipelines, and monitors cloud servers.",
    skills: ["Docker", "Kubernetes", "Terraform", "CI/CD", "AWS", "Prometheus"]
  },
  {
    role: "UI/UX Engineer",
    match_percentage: 55,
    description: "Bridges the gap between creative visual designs and high-fidelity code components, prioritizing animations and accessibility.",
    skills: ["Figma", "CSS", "TypeScript", "React", "User Research", "Wireframing"]
  }
];

// Mock API Call simulating network delay and returning a structured recommendation response
export const getMockRecommendations = (skills) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Standardize input skills for selection
      const skillsLower = skills.map(s => s.toLowerCase());
      
      // Determine match based on keyword checks to make the dashboard feel reactive
      let selectedKey = "ai_engineer"; // Default
      
      const hasFrontend = skillsLower.some(s => 
        ["react", "html", "css", "javascript", "typescript", "frontend", "vue", "tailwind", "design"].includes(s)
      );
      const hasDataScience = skillsLower.some(s => 
        ["data", "statistics", "pandas", "numpy", "r", "tableau", "analytics", "sql"].includes(s)
      );
      
      if (hasFrontend && !hasDataScience) {
        selectedKey = "frontend_developer";
      } else if (hasDataScience) {
        selectedKey = "data_scientist";
      }
      
      const baseMatch = MOCK_CAREERS[selectedKey];
      
      // Dynamic calculations matching user inputs to make the dashboard feel real
      const matched = [];
      const missing = [];
      
      const allSkills = [...baseMatch.matched_skills, ...baseMatch.missing_skills];
      
      allSkills.forEach(skill => {
        if (skillsLower.includes(skill.toLowerCase())) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }
      });
      
      // If we don't have enough matched, add the base match's default matched ones just to keep visuals rich
      if (matched.length === 0) {
        matched.push(...baseMatch.matched_skills);
      }
      
      // Calculate dynamic match percentage
      const totalSkillsCount = allSkills.length;
      const matchPercentage = Math.min(
        98,
        Math.max(
          35,
          Math.round((matched.length / totalSkillsCount) * 100) + 15 // Base bias for encouraging results
        )
      );
      
      // Construct final payload
      const response = {
        top_match: {
          ...baseMatch,
          match_percentage: matchPercentage,
          matched_skills: matched,
          missing_skills: missing.filter(s => !matched.includes(s)), // Ensure no overlap
          readiness: {
            ...baseMatch.readiness,
            score: Math.max(30, Math.round(matchPercentage * 0.9)) // Correlated readiness score
          }
        },
        alternative_matches: ALTERNATIVE_MATCHES.map(alt => {
          // Adjust alternative match percentage if it conflicts with the top match
          let score = alt.match_percentage;
          if (score >= matchPercentage) {
            score = Math.max(30, matchPercentage - 10);
          }
          return {
            ...alt,
            match_percentage: score
          };
        })
      };
      
      resolve(response);
    }, 1500); // 1.5 seconds simulated network latency
  });
};
