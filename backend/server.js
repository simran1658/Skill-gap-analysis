const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json()); // Parse JSON request bodies

// ---------- Constants (Mock Data) ----------

// Required skills for each supported role
const ROLE_SKILLS = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
};

// Mock roadmaps per role (no AI, hardcoded logic)
const ROLE_ROADMAPS = {
  "Backend Developer": [
    {
      phase: "Phase 1 (1–2 months)",
      focus: "Core Java, OOP, Git, basic SQL",
      topics: ["Java basics", "OOP concepts", "Git & GitHub", "Basic SQL"],
    },
    {
      phase: "Phase 2 (2 months)",
      focus: "Spring Boot, REST APIs, database CRUD",
      topics: [
        "Spring Boot fundamentals",
        "Building REST APIs",
        "Connecting to database",
      ],
    },
    {
      phase: "Phase 3 (1–2 months)",
      focus: "Deployment, projects, system design basics",
      topics: [
        "Deploy backend to cloud (Render/Heroku/etc.)",
        "Build 1–2 complete backend projects",
        "Learn basic system design concepts",
      ],
    },
  ],
  "Frontend Developer": [
    {
      phase: "Phase 1 (1–2 months)",
      focus: "HTML, CSS, basic JavaScript",
      topics: ["Semantic HTML", "Responsive CSS", "JavaScript fundamentals", "Git"],
    },
    {
      phase: "Phase 2 (2 months)",
      focus: "React and SPA concepts",
      topics: ["React components", "Hooks & state", "Routing", "API integration"],
    },
    {
      phase: "Phase 3 (1–2 months)",
      focus: "Advanced concepts and portfolio",
      topics: [
        "Performance & optimization basics",
        "Testing fundamentals",
        "2–3 portfolio projects",
      ],
    },
  ],
  "Data Analyst": [
    {
      phase: "Phase 1 (1–2 months)",
      focus: "Excel and SQL fundamentals",
      topics: [
        "Excel formulas & pivot tables",
        "SQL SELECT/WHERE/JOIN",
        "Understanding datasets",
      ],
    },
    {
      phase: "Phase 2 (2 months)",
      focus: "Python for data analysis and dashboards",
      topics: [
        "Python basics",
        "Pandas & data cleaning",
        "Matplotlib/Seaborn",
        "Basics of Power BI/Tableau",
      ],
    },
    {
      phase: "Phase 3 (1–2 months)",
      focus: "Statistics, projects, and storytelling",
      topics: [
        "Descriptive statistics",
        "End-to-end analysis projects",
        "Presenting insights",
        "Building a portfolio",
      ],
    },
  ],
};

// Fallback roadmap if role is unknown
const DEFAULT_ROADMAP = [
  {
    phase: "Phase 1 (1–2 months)",
    focus: "Fundamentals and tools",
    topics: ["Core concepts for your role", "Version control (Git)", "Basic scripting"],
  },
  {
    phase: "Phase 2 (2 months)",
    focus: "Role-specific skills",
    topics: ["Core technologies for the role", "1–2 small projects"],
  },
  {
    phase: "Phase 3 (1–2 months)",
    focus: "Advanced topics and portfolio",
    topics: ["Advanced concepts", "1 larger project", "Interview preparation"],
  },
];

// ---------- Routes ----------

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Career Path Backend is running" });
});

app.post("/api/skill-gap", (req, res) => {
  const { targetRole, currentSkills } = req.body;

  // Basic validation
  if (!targetRole || !Array.isArray(currentSkills)) {
    return res.status(400).json({
      error:
        "Invalid payload. 'targetRole' (string) and 'currentSkills' (array of strings) are required.",
    });
  }

  const requiredSkills = ROLE_SKILLS[targetRole];
  if (!requiredSkills) {
    return res.status(400).json({
      error:
        "Unsupported role. Supported roles: " +
        Object.keys(ROLE_SKILLS).join(", "),
    });
  }

  // Normalize input for case-insensitive matching
  const normalizedCurrent = currentSkills
    .filter(Boolean)
    .map((s) => s.trim().toLowerCase());

  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedCurrent.includes(skill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !normalizedCurrent.includes(skill.toLowerCase())
  );

  const allCovered = missingSkills.length === 0;

  const recommendations = allCovered
    ? "You already have all the core skills for this role. Focus on building 1–2 strong projects and learning basic system design."
    : `Start with the missing skills: ${missingSkills.join(
        ", "
      )}. Practice them using small tasks, then combine them into one or two end-to-end projects.`;

  // Simple learning order: learn missing skills first, then reinforce matched ones
  const suggestedLearningOrder = [...missingSkills, ...matchedSkills];

  return res.json({
    targetRole,
    matchedSkills,
    missingSkills,
    recommendations,
    suggestedLearningOrder,
  });
});

app.post("/api/roadmap", (req, res) => {
  const { targetRole } = req.body;

  if (!targetRole) {
    return res.status(400).json({ error: "'targetRole' is required." });
  }

  const roadmap = ROLE_ROADMAPS[targetRole] || DEFAULT_ROADMAP;

  return res.json({
    targetRole,
    roadmap,
  });
});

app.get("/api/news", async (req, res) => {
  try {
    // 1. Get list of top story IDs
    const topStoriesResponse = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const ids = topStoriesResponse.data || [];
    const topFiveIds = ids.slice(0, 5);

    // 2. Fetch details for each story
    const stories = await Promise.all(
      topFiveIds.map(async (id) => {
        const storyResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        const data = storyResponse.data;

        return {
          id: data.id,
          title: data.title,
          url: data.url,
          score: data.score,
          time: data.time,
          type: data.type,
          by: data.by,
        };
      })
    );

    return res.json(stories);
  } catch (error) {
    console.error("Error while fetching HackerNews stories:", error.message);
    return res.status(500).json({
      error: "Failed to fetch HackerNews stories.",
    });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
