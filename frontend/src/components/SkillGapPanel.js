export default function SkillGapPanel({ result, targetRole }) {
  const matched = result.matchedSkills.length;
  const missing = result.missingSkills.length;
  const total = matched + missing || 1;
  const percent = Math.round((matched / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Skill Gap Analysis
        </h2>
        <p className="text-xs text-gray-500">
          Your progress toward <span className="font-medium">{targetRole}</span>
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-gray-700 mb-1">
          <span>Overall Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {matched} of {total} required skills
        </p>
      </div>

      {/* Matched & Missing */}
      <div className="mb-4 space-y-2">
        <p className="text-xs font-semibold text-green-700">Matched Skills ({matched})</p>
        <div className="flex flex-wrap gap-2">
          {result.matchedSkills.length === 0 && (
            <span className="text-xs text-gray-500">
              No matched skills yet. Start with the basics for this role.
            </span>
          )}
          {result.matchedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold text-orange-700">
          Skills to Develop ({missing})
        </p>
        <div className="flex flex-wrap gap-2">
          {result.missingSkills.length === 0 && (
            <span className="text-xs text-gray-500">
              You have all the core skills for this role 🎉
            </span>
          )}
          {result.missingSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs text-orange-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-800 mb-2">
          Suggested Learning Order
        </p>
        <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-700">
          {result.suggestedLearningOrder.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-xs font-semibold text-blue-800 mb-1">
          Recommendations
        </p>
        <p className="text-xs text-blue-800">{result.recommendations}</p>
      </div>
    </div>
  );
}
