// Client-side career recommendation service with automatic live backend integration and offline mock computation fallback.

const CAREER_PROFILES = [
  {
    role: "AI Engineer",
    description: "Integrates artificial intelligence capabilities and large language models (LLMs) into applications to solve complex business problems.",
    skills: ["Python", "OpenAI API", "PyTorch", "NLP", "LLMs", "Prompt Engineering", "LangChain", "Vector Databases", "Git", "REST APIs", "FastAPI", "Hugging Face"],
    salary_range: { min: "$115,000", max: "$200,000", average: "$155,000" },
    career_growth: 98,
    industry_demand: 96,
    hiring_trend: "Surging (+18% YoY)",
    evolution_path: [
      { role: "Current Skills", desc: "Python, SQL, foundational programming" },
      { role: "AI Engineer", desc: "Integrate APIs, LLMs, and prompt engineering" },
      { role: "Senior AI Engineer", desc: "Architect RAG pipelines, fine-tune models, scale servers" },
      { role: "AI Architect", desc: "Design custom model pipelines, lead tech integrations" },
      { role: "AI Research Lead", desc: "Formulate proprietary agents, publish foundational work" }
    ],
    roadmap: [
      { phase: "Phase 1: API Development & Foundations", duration: "3 weeks", progress: 100, status: "Completed", topics: ["Python", "Git", "FastAPI", "REST APIs", "Asynchronous Coding"], milestones: ["Create a secure FastAPI endpoint", "Manage repository version control"], learning_goals: ["Build asynchronous endpoints in Python", "Write clean RESTful schemas"] },
      { phase: "Phase 2: NLP & Embeddings", duration: "3 weeks", progress: 60, status: "In Progress", topics: ["NLP", "Hugging Face", "Text Vectorization", "Cosine Similarity"], milestones: ["Compute semantic text similarity", "Fine-tune a Hugging Face tokenizer"], learning_goals: ["Understand mathematical text representations", "Leverage open-source model embeddings"] },
      { phase: "Phase 3: LLM Orchestration & Prompting", duration: "4 weeks", progress: 20, status: "In Progress", topics: ["LLMs", "OpenAI API", "Prompt Engineering", "System Design"], milestones: ["Design multi-shot prompting chains", "Configure context windows"], learning_goals: ["Master advanced prompting guidelines", "Manage context length and inference cost"] },
      { phase: "Phase 4: Retrieval-Augmented Generation", duration: "4 weeks", progress: 0, status: "Locked", topics: ["Vector Databases", "LangChain", "ChromaDB", "Pinecone", "RAG Pipelines"], milestones: ["Ingest PDFs into ChromaDB", "Create a hybrid search retriever"], learning_goals: ["Assemble a complete RAG system", "Optimize search indexes and chunking"] },
      { phase: "Phase 5: Autonomous Agents & Scaling", duration: "5 weeks", progress: 0, status: "Locked", topics: ["AI Agents", "Tool Calling", "PyTorch", "Scale & Cache Management"], milestones: ["Create an agent with web search access", "Optimize latency with cache stores"], learning_goals: ["Architect multi-agent logic chains", "Deploy and scale agents in production"] }
    ],
    projects: [
      {
        name: "RAG-based Enterprise Knowledge Base",
        description: "Create a vector search-enabled system that ingests internal PDFs and answers queries using OpenAI and Pinecone.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Vector Search", "LLMs", "LangChain", "Python"],
        portfolio_impact: 94,
        impact_rating: "High Impact"
      },
      {
        name: "Autonomous Customer Support AI Agent",
        description: "Develop an agent using LangChain that can invoke custom APIs to lookup orders, process returns, and answer FAQs.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["AI Agents", "Tool Calling", "FastAPI", "OpenAI API"],
        portfolio_impact: 98,
        impact_rating: "Outstanding Asset"
      }
    ],
    skill_categories: {
      have: ["Python", "SQL", "Git"],
      missing: [
        { name: "LangChain", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Vector Databases", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "OpenAI API", priority: "High", difficulty: "Easy", time: "1 week" }
      ],
      optional: [
        { name: "FastAPI", priority: "Low", difficulty: "Intermediate", time: "2 weeks" },
        { name: "REST APIs", priority: "Low", difficulty: "Easy", time: "1 week" }
      ],
      future: [
        { name: "PyTorch", priority: "Medium", difficulty: "Hard", time: "4 weeks" },
        { name: "Hugging Face", priority: "Medium", difficulty: "Intermediate", time: "3 weeks" },
        { name: "AI Agents", priority: "High", difficulty: "Hard", time: "4 weeks" }
      ]
    }
  },
  {
    role: "Data Scientist",
    description: "Analyzes complex data systems to discover insights, build predictive models, and guide business decisions using statistics and machine learning.",
    skills: ["Python", "SQL", "R", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "Tableau", "Statistics", "Machine Learning", "Data Visualization"],
    salary_range: { min: "$95,000", max: "$165,000", average: "$128,000" },
    career_growth: 94,
    industry_demand: 92,
    hiring_trend: "Steady (+12% YoY)",
    evolution_path: [
      { role: "Current Skills", desc: "Python, SQL, statistics foundations" },
      { role: "Data Scientist", desc: "Analyze data pipelines, design predictive classifiers" },
      { role: "Senior Data Scientist", desc: "Refine ETL feature stores, guide validation models" },
      { role: "Lead AI Researcher", desc: "Formulate unique machine learning architectures" },
      { role: "Director of Analytics", desc: "Direct company-wide data telemetry and strategy" }
    ],
    roadmap: [
      { phase: "Phase 1: Programming & SQL", duration: "3 weeks", progress: 100, status: "Completed", topics: ["Python", "R", "SQL Queries", "Database Design"], milestones: ["Build database schemas", "Write complex Joins"], learning_goals: ["Understand data storage principles", "Write analytical queries"] },
      { phase: "Phase 2: Data Wrangling & Analysis", duration: "4 weeks", progress: 60, status: "In Progress", topics: ["Pandas", "NumPy", "Data Cleaning", "Exploratory Analysis"], milestones: ["Clean messy CSV datasets", "Generate descriptive statistics"], learning_goals: ["Perform ETL operations in Python", "Identify outliers and missing data patterns"] },
      { phase: "Phase 3: Applied Statistics & Visualization", duration: "3 weeks", progress: 10, status: "In Progress", topics: ["Statistics", "Matplotlib", "Seaborn", "Tableau", "A/B Testing"], milestones: ["Design a synthetic A/B test", "Build a dynamic Tableau dashboard"], learning_goals: ["Apply statistical testing methodologies", "Present data stories visually"] },
      { phase: "Phase 4: Classical Machine Learning", duration: "5 weeks", progress: 0, status: "Locked", topics: ["Scikit-Learn", "Regression", "Classification", "Clustering", "Model Evaluation"], milestones: ["Train cross-validated classifiers", "Optimize hyperparameters"], learning_goals: ["Evaluate models with Precision, Recall, and AUC", "Apply supervised and unsupervised models"] },
      { phase: "Phase 5: Production & Deep Learning", duration: "4 weeks", progress: 0, status: "Locked", topics: ["Deep Learning", "FastAPI model serving", "Git", "Model Monitoring"], milestones: ["Expose models via REST endpoints", "Train basic neural networks"], learning_goals: ["Deploy predictive systems into production", "Understand deep learning lifecycles"] }
    ],
    projects: [
      {
        name: "Customer Churn Predictor",
        description: "Build an end-to-end classification model using Scikit-Learn to predict customer churn based on subscription usage patterns and demographics.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Pandas", "Scikit-Learn", "Data Wrangling", "Classifiers"],
        portfolio_impact: 92,
        impact_rating: "High Impact"
      },
      {
        name: "E-commerce Recommendation Engine",
        description: "Design a collaborative filtering and content-based recommendation system for a retail website.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["Algorithms", "Machine Learning", "Python", "Tableau"],
        portfolio_impact: 96,
        impact_rating: "Critical Asset"
      }
    ],
    skill_categories: {
      have: ["Python", "SQL"],
      missing: [
        { name: "Pandas", priority: "High", difficulty: "Easy", time: "1 week" },
        { name: "Scikit-Learn", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Statistics", priority: "High", difficulty: "Intermediate", time: "2 weeks" }
      ],
      optional: [
        { name: "R", priority: "Low", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Tableau", priority: "Low", difficulty: "Easy", time: "1 week" }
      ],
      future: [
        { name: "Machine Learning", priority: "High", difficulty: "Advanced", time: "3 weeks" },
        { name: "Deep Learning", priority: "Medium", difficulty: "Hard", time: "4 weeks" },
        { name: "NumPy", priority: "Medium", difficulty: "Easy", time: "1 week" }
      ]
    }
  },
  {
    role: "Backend Developer",
    description: "Architects high-performance server-side systems, manages databases, and designs robust APIs to support complex digital platforms.",
    skills: ["Node.js", "Express", "Django", "FastAPI", "Postgres", "SQL", "MongoDB", "Redis", "REST APIs", "Docker", "Git", "AWS"],
    salary_range: { min: "$85,000", max: "$150,000", average: "$115,000" },
    career_growth: 90,
    industry_demand: 88,
    hiring_trend: "Moderate (+8% YoY)",
    evolution_path: [
      { role: "Current Skills", desc: "Basic SQL, Javascript coding" },
      { role: "Backend Developer", desc: "Build RESTful APIs, structure schema layers" },
      { role: "Senior Backend Developer", desc: "Orchestrate microservices, manage server cache layers" },
      { role: "Staff Systems Architect", desc: "Design highly available globally distributed servers" },
      { role: "VP of Infrastructure", desc: "Steer server scaling, security, and cloud budgets" }
    ],
    roadmap: [
      { phase: "Phase 1: API Foundations", duration: "3 weeks", progress: 100, status: "Completed", topics: ["Node.js", "Express", "FastAPI", "Git", "REST APIs"], milestones: ["Develop CRUD API endpoints", "Manage package dependencies"], learning_goals: ["Understand request-response lifecycle", "Build secure API routing structures"] },
      { phase: "Phase 2: Relational & Document Databases", duration: "4 weeks", progress: 70, status: "In Progress", topics: ["SQL", "Postgres", "MongoDB", "ORM/ODM concepts"], milestones: ["Design structured database schemas", "Write complex queries"], learning_goals: ["Normalize database schema formats", "Handle database connections and connection pools"] },
      { phase: "Phase 3: Caching & Performance Optimization", duration: "3 weeks", progress: 30, status: "In Progress", topics: ["Redis", "Query Tuning", "Asynchronous Tasks"], milestones: ["Implement Redis query caching", "Optimize database indexing"], learning_goals: ["Analyze database query plans", "Cache frequently accessed static data"] },
      { phase: "Phase 4: Containerization & Versioning", duration: "4 weeks", progress: 0, status: "Locked", topics: ["Docker", "Django", "Multi-stage builds"], milestones: ["Containerize a backend workspace", "Write Docker compose setups"], learning_goals: ["Deploy consistent environments locally", "Manage environments using Docker"] },
      { phase: "Phase 5: Cloud Deployment & Architecture", duration: "5 weeks", progress: 0, status: "Locked", topics: ["AWS", "Microservices", "CI/CD Pipelines", "System Monitoring"], milestones: ["Deploy service to AWS ECS", "Build an automated deploy action"], learning_goals: ["Configure secure virtual networks (VPC)", "Examine server metrics and health checks"] }
    ],
    projects: [
      {
        name: "Real-time Messaging Service API",
        description: "Create a highly scaleable backend api for messaging supporting database persistence and low-latency cache buffers.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Node.js", "Express", "MongoDB", "Redis"],
        portfolio_impact: 90,
        impact_rating: "High Impact"
      },
      {
        name: "Distributed Task Processing Queue",
        description: "Build an asynchronous worker engine to process heavy analytical tasks offloaded from core API nodes.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["FastAPI", "Docker", "Postgres", "AWS"],
        portfolio_impact: 95,
        impact_rating: "Critical Asset"
      }
    ],
    skill_categories: {
      have: ["SQL", "Git"],
      missing: [
        { name: "Node.js", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Postgres", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Express", priority: "High", difficulty: "Easy", time: "1 week" }
      ],
      optional: [
        { name: "MongoDB", priority: "Low", difficulty: "Easy", time: "1 week" },
        { name: "Django", priority: "Low", difficulty: "Intermediate", time: "2 weeks" }
      ],
      future: [
        { name: "Redis", priority: "Medium", difficulty: "Hard", time: "3 weeks" },
        { name: "Docker", priority: "Medium", difficulty: "Intermediate", time: "2 weeks" },
        { name: "AWS", priority: "High", difficulty: "Hard", time: "4 weeks" }
      ]
    }
  },
  {
    role: "Cybersecurity Analyst",
    description: "Secures networks and applications by performing threat intelligence, incident response, vulnerability assessment, and cryptography integration.",
    skills: ["Linux", "Network Security", "Penetration Testing", "Wireshark", "Cryptography", "Python", "SIEM", "Incident Response", "Firewalls", "Threat Intelligence"],
    salary_range: { min: "$80,000", max: "$145,000", average: "$110,000" },
    career_growth: 92,
    industry_demand: 94,
    hiring_trend: "Strong (+15% YoY)",
    evolution_path: [
      { role: "Current Skills", desc: "Linux commands, script automations" },
      { role: "Cybersecurity Analyst", desc: "Perform threat analyses, audit firewalls, respond to alerts" },
      { role: "Senior Security Engineer", desc: "Execute target penetration pipelines, design cryptographical networks" },
      { role: "Security Architect", desc: "Formulate compliance templates, direct enterprise audits" },
      { role: "CISO", desc: "Direct corporate information security policies and threat management divisions" }
    ],
    roadmap: [
      { phase: "Phase 1: Linux Administration & Scripting", duration: "3 weeks", progress: 100, status: "Completed", topics: ["Linux", "Python bash scripts", "Command-line tools"], milestones: ["Automate log parsing with Python", "Configure cron schedules"], learning_goals: ["Master standard shell scripting", "Understand system permission rules"] },
      { phase: "Phase 2: Network Infrastructure Security", duration: "4 weeks", progress: 50, status: "In Progress", topics: ["Network Security", "Wireshark", "Firewalls", "TCP/IP"], milestones: ["Inspect network packet transfers", "Configure stateful firewall rules"], learning_goals: ["Analyze network vulnerabilities", "Trace protocol handshake errors"] },
      { phase: "Phase 3: Cryptography & Authentication", duration: "3 weeks", progress: 10, status: "In Progress", topics: ["Cryptography", "SSL/TLS keys", "OAuth Security"], milestones: ["Set up local SSL certification", "Configure hashed data encryption"], learning_goals: ["Apply sym/asym cryptographic tools", "Secure endpoint validation routes"] },
      { phase: "Phase 4: Vulnerability & Penetration Testing", duration: "5 weeks", progress: 0, status: "Locked", topics: ["Penetration Testing", "Metasploit", "OWASP Top 10", "Vulnerability scans"], milestones: ["Perform web application pentest", "Remediate code injection leaks"], learning_goals: ["Recognize and patch software vulnerabilities", "Conduct secure system auditing"] },
      { phase: "Phase 5: Threat Intelligence & Incident Response", duration: "4 weeks", progress: 0, status: "Locked", topics: ["SIEM", "Threat Intelligence", "Incident Response", "Incident logs"], milestones: ["Set up automated alert rules", "Analyze mock forensic disk images"], learning_goals: ["Construct monitoring dashboards", "Execute secure containment strategies"] }
    ],
    projects: [
      {
        name: "Automated Packet Analyzer & Alert System",
        description: "Build a tool that captures network packets using Wireshark protocols, parses them with Python, and triggers alert flags.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["Wireshark", "Network Security", "Python", "Linux"],
        portfolio_impact: 89,
        impact_rating: "High Impact"
      },
      {
        name: "Vulnerability Scanning & Patching Suite",
        description: "Develop a scanner that sweeps host systems for OWASP exploits, generates logs, and automatically scripts security patches.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["Penetration Testing", "Cryptography", "Firewalls", "SIEM"],
        portfolio_impact: 97,
        impact_rating: "Critical Asset"
      }
    ],
    skill_categories: {
      have: ["Linux", "Python"],
      missing: [
        { name: "Network Security", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "Wireshark", priority: "High", difficulty: "Easy", time: "1 week" },
        { name: "Firewalls", priority: "High", difficulty: "Intermediate", time: "2 weeks" }
      ],
      optional: [
        { name: "Cryptography", priority: "Low", difficulty: "Hard", time: "3 weeks" },
        { name: "Threat Intelligence", priority: "Low", difficulty: "Intermediate", time: "2 weeks" }
      ],
      future: [
        { name: "Penetration Testing", priority: "High", difficulty: "Hard", time: "4 weeks" },
        { name: "SIEM", priority: "Medium", difficulty: "Intermediate", time: "3 weeks" },
        { name: "Incident Response", priority: "Medium", difficulty: "Intermediate", time: "2 weeks" }
      ]
    }
  },
  {
    role: "Frontend Developer",
    description: "Creates stunning, interactive, and high-performance user interfaces using modern web frameworks, design systems, and responsive architectures.",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Tailwind", "Git", "Web Performance", "REST APIs"],
    salary_range: { min: "$75,000", max: "$135,000", average: "$105,000" },
    career_growth: 86,
    industry_demand: 85,
    hiring_trend: "Moderate (+6% YoY)",
    evolution_path: [
      { role: "Current Skills", desc: "HTML, CSS, basic JavaScript styling" },
      { role: "Frontend Developer", desc: "Write responsive structures, establish React components" },
      { role: "Senior Frontend Engineer", desc: "Optimize page speed pathways, build style library tokens" },
      { role: "Principal UI Architect", desc: "Shape front-end architectures across all corporate systems" },
      { role: "VP of Product Design", desc: "Lead visual engineering, accessibility, and designer alignment" }
    ],
    roadmap: [
      { phase: "Phase 1: Standard Modern UI Markup", duration: "3 weeks", progress: 100, status: "Completed", topics: ["HTML", "CSS", "JavaScript", "Git", "CSS Grid"], milestones: ["Build fully responsive page mockups", "Write interactive page selectors"], learning_goals: ["Organize semantic document trees", "Write responsive fluid stylesheets"] },
      { phase: "Phase 2: Component Frameworks", duration: "4 weeks", progress: 80, status: "In Progress", topics: ["React", "TypeScript", "State Managers", "Hooks"], milestones: ["Rebuild widgets with React components", "Integrate strict type safety"], learning_goals: ["Analyze state lifecycle mechanisms", "Write clean reusable components"] },
      { phase: "Phase 3: Server Side Rendering & Routing", duration: "4 weeks", progress: 10, status: "In Progress", topics: ["Next.js", "Vue", "Dynamic Routing", "Server Components"], milestones: ["Construct multi-page Next.js portals", "Establish nested route trees"], learning_goals: ["Compare static vs dynamic rendering", "Assemble fast client navigation paths"] },
      { phase: "Phase 4: Typography & Styling Architecture", duration: "3 weeks", progress: 0, status: "Locked", topics: ["Tailwind", "CSS Transitions", "Animations", "Design systems"], milestones: ["Form custom UI design themes", "Add fluid navigation animations"], learning_goals: ["Implement scalable typography frameworks", "Create dynamic micro-interaction sequences"] },
      { phase: "Phase 5: Web Performance & Security", duration: "4 weeks", progress: 0, status: "Locked", topics: ["Web Performance", "Lighthouse audits", "REST APIs connectivity", "Lazy Loading"], milestones: ["Optimize image assets & load speeds", "Implement stateful caching rules"], learning_goals: ["Achieve 95+ score on Lighthouse metrics", "Secure frontend client request channels"] }
    ],
    projects: [
      {
        name: "Interactive Data Visualization Board",
        description: "Create a web app displaying telemetry widgets with rich animations, transitions, and dynamic dark mode toggles.",
        difficulty: "Intermediate",
        time_to_build: "16 hours",
        skills_gained: ["React", "CSS", "JavaScript", "REST APIs"],
        portfolio_impact: 91,
        impact_rating: "High Impact"
      },
      {
        name: "High-Performance Content Dashboard",
        description: "Develop a type-safe Next.js platform optimizing page speeds via component pre-fetching and lazy-loaded items.",
        difficulty: "Advanced",
        time_to_build: "28 hours",
        skills_gained: ["TypeScript", "Next.js", "Tailwind", "Web Performance"],
        portfolio_impact: 95,
        impact_rating: "Critical Asset"
      }
    ],
    skill_categories: {
      have: ["HTML", "CSS", "JavaScript", "Git"],
      missing: [
        { name: "TypeScript", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "React", priority: "High", difficulty: "Intermediate", time: "2 weeks" },
        { name: "REST APIs", priority: "High", difficulty: "Easy", time: "1 week" }
      ],
      optional: [
        { name: "Tailwind", priority: "Low", difficulty: "Easy", time: "1 week" },
        { name: "Vue", priority: "Low", difficulty: "Intermediate", time: "2 weeks" }
      ],
      future: [
        { name: "Next.js", priority: "High", difficulty: "Advanced", time: "3 weeks" },
        { name: "Web Performance", priority: "Medium", difficulty: "Intermediate", time: "2 weeks" }
      ]
    }
  }
];

// Helper to determine next career tiers dynamically based on target role (generates default fallback if not one of primary 5)
function generateDynamicEvolutionPath(role) {
  return [
    { role: "Current Skills", desc: "Assessed foundational engineering skills and databases" },
    { role: `${role}`, desc: `Core practitioner specializing in target ${role} operations` },
    { role: `Senior ${role}`, desc: "Lead developer managing architectures and team coordination" },
    { role: `Principal ${role} Architect`, desc: "Steers long-term technological visions and framework design" },
    { role: `VP of ${role} Operations`, desc: "Executive lead planning resource strategies and technological outcomes" }
  ];
}

// Helper to construct a dynamic, default roadmap if the dataset doesn't provide structured layout
function generateDynamicRoadmap(role, rawRoadmapStrings) {
  if (!rawRoadmapStrings || rawRoadmapStrings.length === 0) {
    return [
      { phase: "Phase 1: Foundations", duration: "3 weeks", progress: 100, status: "Completed", topics: ["Fundamentals", "Basic Syntax", "Environment Setups"], milestones: ["Initialize project repository", "Configure editor options"], learning_goals: ["Establish environment baselines"] },
      { phase: "Phase 2: Core Concepts", duration: "4 weeks", progress: 40, status: "In Progress", topics: ["Routing", "Data Modeling", "Core APIs"], milestones: ["Implement standard APIs", "Write schema validation rules"], learning_goals: ["Acquire core execution capabilities"] },
      { phase: "Phase 3: Advanced Workflows", duration: "3 weeks", progress: 0, status: "Locked", topics: ["Concurrency", "Caching", "Performance Tuning"], milestones: ["Optimize server loading speeds", "Secure sensitive secrets keys"], learning_goals: ["Handle advanced server scale problems"] },
      { phase: "Phase 4: Specialization", duration: "4 weeks", progress: 0, status: "Locked", topics: ["Machine Learning Models", "Analytics Integrations", "Security Controls"], milestones: ["Integrate specialized model files", "Deploy analytics dash monitors"], learning_goals: ["Master target specializations"] }
    ];
  }

  return rawRoadmapStrings.map((phaseStr, idx) => {
    const isFirst = idx === 0;
    const isSecond = idx === 1;
    let progress = 0;
    let status = "Locked";
    if (isFirst) {
      progress = 100;
      status = "Completed";
    } else if (isSecond) {
      progress = 50;
      status = "In Progress";
    }

    // Attempt to extract topics in bracket if present
    const match = phaseStr.match(/\(([^)]+)\)/);
    const topics = match ? match[1].split(",").map(s => s.trim()) : ["Core Competency", "Best Practices"];
    const name = phaseStr.split("(")[0].trim();

    return {
      phase: `Phase ${idx + 1}: ${name}`,
      duration: idx === 3 ? "5 weeks" : "3 weeks",
      progress,
      status,
      topics,
      milestones: [`Master key practices of ${name}`, "Complete hands-on assignments"],
      learning_goals: [`Gain functional confidence in ${name} operations`]
    };
  });
}

function calculateReadiness(matchPercentage, matchedCount, missingCount) {
  const score = Math.min(98, Math.max(30, Math.round(matchPercentage * 0.95)));
  let level = "Developing";
  let label = "Needs Foundation";
  let description = `Initial steps. You have matched ${matchedCount} skills. We recommend starting with Phase 2 of the learning roadmap to establish baseline credentials.`;
  
  if (score >= 75) {
    level = "Job-Ready Candidate";
    label = "Highly Qualified";
    description = `Excellent skill overlay! You have matched ${matchedCount} key skills. To seal employment, focus on polishing the remaining ${missingCount} tools.`;
  } else if (score >= 50) {
    level = "Developing";
    label = "Vigorous Growth";
    description = `Solid foundation! You possess ${matchedCount} core skills. Acquiring the remaining ${missingCount} missing competencies will build a robust portfolio.`;
  }
  return { score, level, label, description };
}

// Client-side computation logic
function computeRecommendationsLocally(userSkills) {
  const userSkillsLower = new Set(userSkills.map(s => s.toLowerCase()));
  
  // Try to use all profiles in CAREER_PROFILES
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
    
    return {
      role: profile.role,
      description: profile.description,
      match_percentage,
      salary_range: profile.salary_range,
      career_growth: profile.career_growth,
      industry_demand: profile.industry_demand,
      hiring_trend: profile.hiring_trend,
      evolution_path: profile.evolution_path,
      readiness,
      matched_skills,
      missing_skills,
      roadmap: profile.roadmap,
      projects: profile.projects,
      skill_categories: profile.skill_categories
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
 * Simulates a small latency to support beautiful UI loading state checks.
 * @param {string[]} skills 
 * @returns {Promise<{top_match: object, alternative_matches: object[]}>}
 */
export async function getRecommendations(skills) {
  if (!skills || skills.length === 0) {
    throw new Error("Skills list cannot be empty");
  }
  
  // Return with simulated delay of 800ms to allow skeleton screens to animate
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = computeRecommendationsLocally(skills);
      resolve(data);
    }, 900);
  });
}
