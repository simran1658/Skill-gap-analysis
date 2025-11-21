# 🚀 Skill Gap Analysis – Smart Career Path Recommendation System

Skill Gap Analysis is a full-stack platform that analyzes a user's current skills, compares them with the required skills for a chosen career role, and generates a personalized learning roadmap.
The system uses mock data, smart comparison logic, and clear recommendations to guide students and professionals toward career readiness.

---
## 📘 Project Overview

* Many learners struggle to understand:

* What skills they already have

* What skills they are missing

* What they should learn next

* How to follow a structured roadmap

### Skill Gap Analysis solves this problem by:

* 📊 Comparing current skills vs required skills

* 🧠 Identifying skill gaps

* 🎯 Recommending missing skills

* 🛣 Providing a 3-phase learning roadmap

* ⚡ Giving personalized learning order

* 📰 Fetching latest tech news for awareness

This makes learning structured, goal-oriented, and industry-ready.

--- 
 ## 🎯 Key Features

* ✔ Skill Gap Analyzer (Smart comparison)
* ✔ Roadmap Generator (3-Phase learning plan)
* ✔ Latest Tech News from HackerNews
* ✔ Mock data — no database required
* ✔ Fast backend built with Express
* ✔ Modern UI using React + Vite + TailwindCSS
* ✔ Simple, scalable, and easy to deploy

--- 
## 🧩 Tech Stack
### 🌐 Frontend

* React
* Vite
* TailwindCSS

### 🔧 Backend

* Node.js
* Express.js
* Axios

### 🗂 Database

None (Mock static data only)

---
## 🛠 How to Run the Project
### ▶️ Run the Frontend
cd frontend
npm install
npm run dev


Runs at:
👉 http://localhost:5173/

### ▶️ Run the Backend
cd backend
npm install
node server.js


Runs at:
👉 http://localhost:5000/

--- 
##🔌 API Endpoints
### ✅ Health Check

### GET /
Returns:

{ "message": "Career Path Backend is running" }

### 🧠 Skill Gap Analysis

### POST /api/skill-gap

### Sample Request

{
  "targetRole": "Frontend Developer",
  "currentSkills": ["HTML", "CSS"]
}


### Response Includes

* matchedSkills
* missingSkills
* recommendations
* suggestedLearningOrder

### 🛣 Roadmap Generator

### POST /api/roadmap

### Sample Request

{
  "targetRole": "Backend Developer"
}


### Response

3-phase learning roadmap

### 📰 Tech News API

### GET /api/news
Fetches top 5 stories from HackerNews.

---
## 🧭 Assumptions

* No database used (only mock data)
* APIs are synchronous and deterministic
* Frontend and backend run separately
* CORS enabled
* Ideal for learning, academic, or prototype use
