export default function NewsPanel({ news }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Latest Tech News
        </h2>
        <p className="text-xs text-gray-500">
          Top stories from HackerNews
        </p>
      </div>

      {news.length === 0 ? (
        <p className="text-xs text-gray-500">No stories loaded.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {news.map((item) => (
            <div key={item.id} className="py-3">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={
                    item.url ||
                    `https://news.ycombinator.com/item?id=${item.id}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-700 hover:underline flex-1"
                >
                  {item.title}
                </a>
                <span className="text-xs text-gray-400 shrink-0">↗</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-gray-500">
                <span>{item.score} points</span>
                <span>by {item.by}</span>
                <span>
                  {new Date(item.time * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
