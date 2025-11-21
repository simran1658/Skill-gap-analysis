const features = [
  {
    title: "Skill Gap Analysis",
    description: "Identify which skills you need to develop",
  },
  {
    title: "Career Roadmap",
    description: "Get a structured path with learning phases",
  },
  {
    title: "Tech News",
    description: "Stay updated with latest industry trends",
  },
];

export default function FeatureOverview() {
  return (
    <div className="max-w-3xl mx-auto mb-10 grid gap-4 md:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-5"
        >
          <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
          <p className="text-xs text-gray-500 mt-2">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
