import { useState } from "react";
import Header from "./components/Header";
import CareerForm from "./components/CareerForm";
import FeatureOverview from "./components/FeatureOverview";
import SkillGapPanel from "./components/SkillGapPanel";
import RoadmapPanel from "./components/RoadmapPanel";
import NewsPanel from "./components/NewsPanel";

import { getSkillGap, getRoadmap, getNews } from "./api/backend";

function App() {
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [news, setNews] = useState([]);
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeCareer = async (role, skills) => {
    setLoading(true);
    setError("");
    setTargetRole(role);

    try {
      const sg = await getSkillGap(role, skills);
      setSkillGap(sg);

      const rm = await getRoadmap(role);
      setRoadmap(rm.roadmap);

      const nw = await getNews();
      setNews(nw);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSkillGap(null);
      setRoadmap(null);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const hasResults = skillGap && roadmap;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Header />

        <CareerForm onAnalyze={analyzeCareer} loading={loading} errorMsg={error} />

        {!hasResults && <FeatureOverview />}
        
        {hasResults && (
          <>
            <div className="grid lg:grid-cols-[2fr,1fr] gap-6 mt-4">
              <SkillGapPanel result={skillGap} targetRole={targetRole} />
              <RoadmapPanel roadmap={roadmap} />
            </div>

            <NewsPanel news={news} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
