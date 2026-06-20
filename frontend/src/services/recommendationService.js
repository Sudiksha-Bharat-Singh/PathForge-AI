// Client-side career recommendation service with automatic live backend integration and offline mock computation fallback.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CAREER_PROFILES = [
  {
    role: "Data Scientist",
    description: "Analyzes complex data systems to discover insights, build predictive models, and guide business decisions using statistics and machine learning.",
    skills: ["Python", "SQL", "R", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "Tableau", "Statistics", "Machine Learning", "Data Visualization"],
    salary_range: { min: "$95,000", max: "$165,000", average: "$128,000" },
    roadmap: [
      { phase: "Phase 1: Programming & SQL", duration: "3 weeks", topics: ["Python", "R", "SQL Queries", "Database Design"], milestones: ["Build database schemas", "Write complex Joins"], learning_goals: ["Understand data storage principles", "Write analytical queries"] },
      { phase: "Phase 2: Data Wrangling & Analysis", duration: "4 weeks", topics: ["Pandas", "NumPy", "Data Cleaning", "Exploratory Analysis"], milestones: ["Clean messy CSV datasets", "Generate descriptive statistics"], learning_goals: ["Perform ETL operations in Python", "Identify outliers and missing data patterns"] },
      { phase: "Phase 3: Applied Statistics & Visualization", duration: "3 weeks", topics: ["Statistics", "Matplotlib", "Seaborn", "Tableau", "A/B Testing"], milestones: ["Design a synthetic A/B test", "Build a dynamic Tableau dashboard"], learning_goals: ["Apply statistical testing methodologies", "Present data stories visually"] },
      { phase: "Phase 4: Classical Machine Learning", duration: "5 weeks", topics: ["Scikit-Learn", "Regression", "Classification", "Clustering", "Model Evaluation"], milestones: ["Train cross-validated classifiers", "Optimize hyperparameters"], learning_goals: ["Evaluate models with Precision, Recall, and AUC", "Apply supervised and unsupervised models"] },
      { phase: "Phase 5: Production & Deep Learning", duration: "4 weeks", topics: ["Deep Learning", "FastAPI model serving", "Git", "Model Monitoring"], milestones: ["Expose models via REST endpoints", "Train basic neural networks"], learning_goals: ["Deploy predictive systems into production", "Understand deep learning lifecycles"] }
    ],
    projects: [
      {
        name: "Customer Churn Predictor",
        description: "Build an end-to-end classification model using Scikit-Learn to predict customer churn based on subscription usage patterns and demographics.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Pandas", "Scikit-Learn", "Data Wrangling", "Classifiers"]
      },
      {
        name: "E-commerce Recommendation Engine",
        description: "Design a collaborative filtering and content-based recommendation system for a retail website.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["Algorithms", "Machine Learning", "Python", "Tableau"]
      }
    ]
  },
  {
    role: "AI Engineer",
    description: "Integrates artificial intelligence capabilities and large language models (LLMs) into applications to solve complex business problems.",
    skills: ["Python", "OpenAI API", "PyTorch", "NLP", "LLMs", "Prompt Engineering", "LangChain", "Vector Databases", "Git", "REST APIs", "FastAPI", "Hugging Face"],
    salary_range: { min: "$115,000", max: "$200,000", average: "$155,000" },
    roadmap: [
      { phase: "Phase 1: API Development & Foundations", duration: "3 weeks", topics: ["Python", "Git", "FastAPI", "REST APIs", "Asynchronous Coding"], milestones: ["Create a secure FastAPI endpoint", "Manage repository version control"], learning_goals: ["Build asynchronous endpoints in Python", "Write clean RESTful schemas"] },
      { phase: "Phase 2: NLP & Embeddings", duration: "3 weeks", topics: ["NLP", "Hugging Face", "Text Vectorization", "Cosine Similarity"], milestones: ["Compute semantic text similarity", "Fine-tune a Hugging Face tokenizer"], learning_goals: ["Understand mathematical text representations", "Leverage open-source model embeddings"] },
      { phase: "Phase 3: LLM Orchestration & Prompting", duration: "4 weeks", topics: ["LLMs", "OpenAI API", "Prompt Engineering", "System Design"], milestones: ["Design multi-shot prompting chains", "Configure context windows"], learning_goals: ["Master advanced prompting guidelines", "Manage context length and inference cost"] },
      { phase: "Phase 4: Retrieval-Augmented Generation", duration: "4 weeks", topics: ["Vector Databases", "LangChain", "ChromaDB", "Pinecone", "RAG Pipelines"], milestones: ["Ingest PDFs into ChromaDB", "Create a hybrid search retriever"], learning_goals: ["Assemble a complete RAG system", "Optimize search indexes and chunking"] },
      { phase: "Phase 5: Autonomous Agents & Scaling", duration: "5 weeks", topics: ["AI Agents", "Tool Calling", "PyTorch", "Scale & Cache Management"], milestones: ["Create an agent with web search access", "Optimize latency with cache stores"], learning_goals: ["Architect multi-agent logic chains", "Deploy and scale agents in production"] }
    ],
    projects: [
      {
        name: "RAG-based Enterprise Knowledge Base",
        description: "Create a vector search-enabled system that ingests internal PDFs and answers queries using OpenAI and Pinecone.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Vector Search", "LLMs", "LangChain", "Python"]
      },
      {
        name: "Autonomous Customer Support AI Agent",
        description: "Develop an agent using LangChain that can invoke custom APIs to lookup orders, process returns, and answer FAQs.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["AI Agents", "Tool Calling", "FastAPI", "OpenAI API"]
      }
    ]
  },
  {
    role: "Backend Developer",
    description: "Architects high-performance server-side systems, manages databases, and designs robust APIs to support complex digital platforms.",
    skills: ["Node.js", "Express", "Django", "FastAPI", "Postgres", "SQL", "MongoDB", "Redis", "REST APIs", "Docker", "Git", "AWS"],
    salary_range: { min: "$85,000", max: "$150,000", average: "$115,000" },
    roadmap: [
      { phase: "Phase 1: API Foundations", duration: "3 weeks", topics: ["Node.js", "Express", "FastAPI", "Git", "REST APIs"], milestones: ["Develop CRUD API endpoints", "Manage package dependencies"], learning_goals: ["Understand request-response lifecycle", "Build secure API routing structures"] },
      { phase: "Phase 2: Relational & Document Databases", duration: "4 weeks", topics: ["SQL", "Postgres", "MongoDB", "ORM/ODM concepts"], milestones: ["Design structured database schemas", "Write complex queries"], learning_goals: ["Normalize database schema formats", "Handle database connections and connection pools"] },
      { phase: "Phase 3: Caching & Performance Optimization", duration: "3 weeks", topics: ["Redis", "Query Tuning", "Asynchronous Tasks"], milestones: ["Implement Redis query caching", "Optimize database indexing"], learning_goals: ["Analyze database query plans", "Cache frequently accessed static data"] },
      { phase: "Phase 4: Containerization & Versioning", duration: "4 weeks", topics: ["Docker", "Django", "Multi-stage builds"], milestones: ["Containerize a backend workspace", "Write Docker compose setups"], learning_goals: ["Deploy consistent environments locally", "Manage environments using Docker"] },
      { phase: "Phase 5: Cloud Deployment & Architecture", duration: "5 weeks", topics: ["AWS", "Microservices", "CI/CD Pipelines", "System Monitoring"], milestones: ["Deploy service to AWS ECS", "Build an automated deploy action"], learning_goals: ["Configure secure virtual networks (VPC)", "Examine server metrics and health checks"] }
    ],
    projects: [
      {
        name: "Real-time Messaging Service API",
        description: "Create a highly scaleable backend api for messaging supporting database persistence and low-latency cache buffers.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Node.js", "Express", "MongoDB", "Redis"]
      },
      {
        name: "Distributed Task Processing Queue",
        description: "Build an asynchronous worker engine to process heavy analytical tasks offloaded from core API nodes.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["FastAPI", "Docker", "Postgres", "AWS"]
      }
    ]
  },
  {
    role: "Cybersecurity Analyst",
    description: "Secures networks and applications by performing threat intelligence, incident response, vulnerability assessment, and cryptography integration.",
    skills: ["Linux", "Network Security", "Penetration Testing", "Wireshark", "Cryptography", "Python", "SIEM", "Incident Response", "Firewalls", "Threat Intelligence"],
    salary_range: { min: "$80,000", max: "$145,000", average: "$110,000" },
    roadmap: [
      { phase: "Phase 1: Linux Administration & Scripting", duration: "3 weeks", topics: ["Linux", "Python bash scripts", "Command-line tools"], milestones: ["Automate log parsing with Python", "Configure cron schedules"], learning_goals: ["Master standard shell scripting", "Understand system permission rules"] },
      { phase: "Phase 2: Network Infrastructure Security", duration: "4 weeks", topics: ["Network Security", "Wireshark", "Firewalls", "TCP/IP"], milestones: ["Inspect network packet transfers", "Configure stateful firewall rules"], learning_goals: ["Analyze network vulnerabilities", "Trace protocol handshake errors"] },
      { phase: "Phase 3: Cryptography & Authentication", duration: "3 weeks", topics: ["Cryptography", "SSL/TLS keys", "OAuth Security"], milestones: ["Set up local SSL certification", "Configure hashed data encryption"], learning_goals: ["Apply sym/asym cryptographic tools", "Secure endpoint validation routes"] },
      { phase: "Phase 4: Vulnerability & Penetration Testing", duration: "5 weeks", topics: ["Penetration Testing", "Metasploit", "OWASP Top 10", "Vulnerability scans"], milestones: ["Perform web application pentest", "Remediate code injection leaks"], learning_goals: ["Recognize and patch software vulnerabilities", "Conduct secure system auditing"] },
      { phase: "Phase 5: Threat Intelligence & Incident Response", duration: "4 weeks", topics: ["SIEM", "Threat Intelligence", "Incident Response", "Incident logs"], milestones: ["Set up automated alert rules", "Analyze mock forensic disk images"], learning_goals: ["Construct monitoring dashboards", "Execute secure containment strategies"] }
    ],
    projects: [
      {
        name: "Automated Packet Analyzer & Alert System",
        description: "Build a tool that captures network packets using Wireshark protocols, parses them with Python, and triggers alert flags.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Wireshark", "Network Security", "Python", "Linux"]
      },
      {
        name: "Vulnerability Scanning & Patching Suite",
        description: "Develop a scanner that sweeps host systems for OWASP exploits, generates logs, and automatically scripts security patches.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["Penetration Testing", "Cryptography", "Firewalls", "SIEM"]
      }
    ]
  },
  {
    role: "Frontend Developer",
    description: "Creates stunning, interactive, and high-performance user interfaces using modern web frameworks, design systems, and responsive architectures.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Tailwind", "Git", "Web Performance", "REST APIs"],
    salary_range: { min: "$75,000", max: "$135,000", average: "$105,000" },
    roadmap: [
      { phase: "Phase 1: Standard Modern UI Markup", duration: "3 weeks", topics: ["HTML", "CSS", "JavaScript", "Git", "CSS Grid"], milestones: ["Build fully responsive page mockups", "Write interactive page selectors"], learning_goals: ["Organize semantic document trees", "Write responsive fluid stylesheets"] },
      { phase: "Phase 2: Component Frameworks", duration: "4 weeks", topics: ["React", "TypeScript", "State Managers", "Hooks"], milestones: ["Rebuild widgets with React components", "Integrate strict type safety"], learning_goals: ["Analyze state lifecycle mechanisms", "Write clean reusable components"] },
      { phase: "Phase 3: Server Side Rendering & Routing", duration: "4 weeks", topics: ["Next.js", "Vue", "Dynamic Routing", "Server Components"], milestones: ["Construct multi-page Next.js portals", "Establish nested route trees"], learning_goals: ["Compare static vs dynamic rendering", "Assemble fast client navigation paths"] },
      { phase: "Phase 4: Typography & Styling Architecture", duration: "3 weeks", topics: ["Tailwind", "CSS Transitions", "Animations", "Design systems"], milestones: ["Form custom UI design themes", "Add fluid navigation animations"], learning_goals: ["Implement scalable typography frameworks", "Create dynamic micro-interaction sequences"] },
      { phase: "Phase 5: Web Performance & Security", duration: "4 weeks", topics: ["Web Performance", "Lighthouse audits", "REST APIs connectivity", "Lazy Loading"], milestones: ["Optimize image assets & load speeds", "Implement stateful caching rules"], learning_goals: ["Achieve 95+ score on Lighthouse metrics", "Secure frontend client request channels"] }
    ],
    projects: [
      {
        name: "Interactive Data Visualization Board",
        description: "Create a web app displaying telemetry widgets with rich animations, transitions, and dynamic dark mode toggles.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["React", "CSS", "JavaScript", "REST APIs"]
      },
      {
        name: "High-Performance Content Dashboard",
        description: "Develop a type-safe Next.js platform optimizing page speeds via component pre-fetching and lazy-loaded items.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["TypeScript", "Next.js", "Tailwind", "Web Performance"]
      }
    ]
  }
];

function calculateReadiness(matchPercentage, matchedCount, missingCount) {
  const score = Math.min(98, Math.max(30, Math.round(matchPercentage * 0.95)));
  let level = "Novice";
  let label = "Needs Foundation";
  let description = `Initial steps. You have matched ${matchedCount} skills. We recommend starting with Phase 1 of the learning roadmap to establish baseline credentials.`;
  
  if (score >= 75) {
    level = "Job-Ready Candidate";
    label = "Highly Qualified";
    description = `Excellent skill overlay! You have matched ${matchedCount} key skills. To seal employment, focus on polishing the remaining ${missingCount} tools.`;
  } else if (score >= 50) {
    level = "Intermediate";
    label = "Vigorous Growth";
    description = `Solid foundation! You possess ${matchedCount} core skills. Acquiring the remaining ${missingCount} missing competencies will build a robust portfolio.`;
  }
  return { score, level, label, description };
}

function generateGapAnalysis(missingSkills) {
  const gaps = [];
  const topicRules = [
    {
      keys: ["openai", "langchain", "llm", "prompt", "vector", "chroma", "pinecone", "nlp"],
      topic: "LLM Orchestration & Semantic Search",
      priority: "High",
      difficulty: "Intermediate",
      action: "Complete tutorials on LangChain/LlamaIndex and connect LLMs with vector stores (RAG)."
    },
    {
      keys: ["pytorch", "tensorflow", "keras", "deep learning", "neural"],
      topic: "Deep Learning Frameworks",
      priority: "Medium",
      difficulty: "Advanced",
      action: "Build neural networks using PyTorch, mastering tensors, backpropagation, and CNNs."
    },
    {
      keys: ["pandas", "numpy", "scikit-learn", "sklearn", "matplotlib", "seaborn", "statistics", "machine learning"],
      topic: "Data Manipulation & Classical ML",
      priority: "High",
      difficulty: "Intermediate",
      action: "Solve wrangling tasks in Pandas and build classifiers using Scikit-Learn."
    },
    {
      keys: ["react", "next.js", "javascript", "typescript", "html", "css", "vue", "tailwind"],
      topic: "SPA Frameworks & Type Safety",
      priority: "High",
      difficulty: "Intermediate",
      action: "Build dynamic, type-safe interactive frontend interfaces using React + TypeScript."
    },
    {
      keys: ["docker", "kubernetes", "aws", "gcp", "azure", "terraform", "ci/cd", "jenkins"],
      topic: "DevOps & Cloud Deployments",
      priority: "Medium",
      difficulty: "Advanced",
      action: "Containerize API servers using Docker and orchestrate with Kubernetes."
    },
    {
      keys: ["node.js", "express", "django", "fastapi", "postgres", "sql", "mongodb", "redis"],
      topic: "API Development & Databases",
      priority: "High",
      difficulty: "Intermediate",
      action: "Create backend routers with ORM connections and implement Redis query caches."
    }
  ];
  
  const matchedRules = new Set();
  for (const skill of missingSkills) {
    const skillLower = skill.toLowerCase();
    let ruleMatched = false;
    for (const rule of topicRules) {
      if (rule.keys.some(k => skillLower.includes(k))) {
        if (!matchedRules.has(rule.topic)) {
          gaps.push({
            topic: rule.topic,
            gap: `Missing core execution skills in ${rule.topic} frameworks (e.g. ${skill}).`,
            priority: rule.priority,
            difficulty: rule.difficulty,
            action: rule.action
          });
          matchedRules.add(rule.topic);
        }
        ruleMatched = true;
        break;
      }
    }
    if (!ruleMatched && gaps.length < 3) {
      const topicName = `${skill} Competency`;
      if (!matchedRules.has(topicName)) {
        gaps.push({
          topic: topicName,
          gap: `Lacking production-grade exposure using ${skill} in active environments.`,
          priority: "Medium",
          difficulty: "Intermediate",
          action: `Read official documentation for ${skill} and build standard quickstart projects.`
        });
        matchedRules.add(topicName);
      }
    }
  }
  
  if (gaps.length === 0) {
    gaps.push({
      topic: "Advanced Specializations",
      gap: "Standard baseline matches. No major priority gaps identified.",
      priority: "Low",
      difficulty: "Intermediate",
      action: "Continue tracking emerging tools in our occupational directories."
    });
  }
  return gaps.slice(0, 3);
}

// Client-side computation logic
function computeRecommendationsLocally(userSkills) {
  const userSkillsLower = new Set(userSkills.map(s => s.toLowerCase()));
  
  const matches = CAREER_PROFILES.map(profile => {
    const matched_skills = profile.skills.filter(s => userSkillsLower.has(s.toLowerCase()));
    const missing_skills = profile.skills.filter(s => !userSkillsLower.has(s.toLowerCase()));
    
    // Core similarity percentage logic
    let rawPercentage = profile.skills.length > 0 
      ? (matched_skills.length / profile.skills.length) * 100 
      : 0;
      
    // Apply positive bias if there are matches
    let match_percentage = Math.min(98, Math.max(5, Math.round(rawPercentage)));
    if (matched_skills.length > 0 && match_percentage < 15) {
      match_percentage = 15; // floor at 15% if at least one skill matched
    }
    
    const readiness = calculateReadiness(match_percentage, matched_skills.length, missing_skills.length);
    const gap_analysis = generateGapAnalysis(missing_skills);
    
    return {
      role: profile.role,
      description: profile.description,
      match_percentage,
      salary_range: profile.salary_range,
      readiness,
      matched_skills,
      missing_skills,
      gap_analysis,
      roadmap: profile.roadmap,
      projects: profile.projects
    };
  });
  
  // Sort descending by match percentage, then matched skill count
  matches.sort((a, b) => {
    if (b.match_percentage !== a.match_percentage) {
      return b.match_percentage - a.match_percentage;
    }
    return b.matched_skills.length - a.matched_skills.length;
  });
  
  return {
    top_match: matches[0],
    alternative_matches: matches.slice(1)
  };
}

/**
 * Main exposed API for retrieving career recommendations.
 * Fetches from the live backend Python service, or falls back to robust local computations if backend is unreachable.
 * @param {string[]} skills 
 * @returns {Promise<{top_match: object, alternative_matches: object[]}>}
 */
export async function getRecommendations(skills) {
  // Enforce validation constraints
  if (!skills || skills.length === 0) {
    throw new Error("Skills list cannot be empty");
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    console.warn(`Backend responded with status ${response.status}. Falling back to high-fidelity local recommendations.`);
  } catch (error) {
    console.warn("FastAPI backend is offline or unreachable. Resolving matching logic via client-side service layer.");
  }
  
  // High fidelity client fallback
  return computeRecommendationsLocally(skills);
}
