export default function RoadmapPanel({ roadmap }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Career Roadmap</h2>
        <p className="text-xs text-gray-500">
          Total duration: approximately 5–6 months
        </p>
      </div>

      <div className="space-y-4">
        {roadmap.map((phase, index) => (
          <div
            key={phase.phase}
            className="flex gap-3 items-start rounded-xl border border-gray-200 px-3 py-3"
          >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
              {index + 1}
            </div>

            
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  {phase.phase}
                </h3>
                
                <span className="text-[11px] text-gray-500">
                  {phase.focus}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {phase.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-gray-800"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
