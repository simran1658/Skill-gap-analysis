import { useState } from "react";

export default function CareerForm({ onAnalyze, loading, errorMsg }) {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const skills = currentSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onAnalyze(targetRole || "Backend Developer", skills);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Let&apos;s Get Started
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tell us about your target role and current skills
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Target Role
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Backend Developer, Data Analyst, Frontend Developer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Try: Backend Developer, Frontend Developer, or Data Analyst
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Current Skills (comma-separated)
          </label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="e.g., JavaScript, React, HTML, CSS, Git"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Enter the skills you currently have, separated by commas
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-900 disabled:opacity-70"
          >
            {loading ? "Analyzing..." : "Analyze My Career Path"}
          </button>
          {errorMsg && (
            <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
          )}
        </div>
      </form>
    </div>
  );
}
