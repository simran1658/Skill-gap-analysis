// src/api/backend.js
const API_BASE = "http://localhost:5000";

export async function getSkillGap(targetRole, currentSkills) {
  const res = await fetch(`${API_BASE}/api/skill-gap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetRole, currentSkills }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Skill gap API error");
  return data;
}

export async function getRoadmap(targetRole) {
  const res = await fetch(`${API_BASE}/api/roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetRole }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Roadmap API error");
  return data;
}

export async function getNews() {
  const res = await fetch(`${API_BASE}/api/news`);
  const data = await res.json();
  return data;
}
