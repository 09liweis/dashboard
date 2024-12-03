import { Knowledge } from 'types';
import { useState } from 'react';

interface KnowledgeCardProps {
  knowledge: Knowledge;
  depth?: number;
}

export default function KnowledgeCard({ knowledge, depth = 0 }: KnowledgeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = Array.isArray(knowledge.items) && knowledge.items.length > 0;
  const itemCount = hasChildren ? knowledge.items.length : 0;

  const renderContent = () => {
    if (typeof knowledge.items === 'string') {
      return <p className="text-gray-600 mt-2">{knowledge.items}</p>;
    }

    if (Array.isArray(knowledge.items)) {
      return (
        <div className={`mt-4 space-y-4 ${isExpanded ? 'block' : 'hidden'}`}>
          {knowledge.items.map((item, index) => (
            typeof item === 'string' ? (
              <p key={index} className="text-gray-600 pl-4 border-l-2 border-gray-200">
                {item}
              </p>
            ) : (
              <KnowledgeCard key={item.nm} knowledge={item} depth={depth + 1} />
            )
          ))}
        </div>
      );
    }

    return null;
  };

  const renderDetails = () => {
    const details = [];
    
    if (knowledge.what) {
      details.push(
        <div key="what" className="mt-2">
          <span className="text-blue-600 font-semibold">What: </span>
          <span className="text-gray-700">{knowledge.what}</span>
        </div>
      );
    }

    if (knowledge.how) {
      details.push(
        <div key="how" className="mt-2">
          <span className="text-green-600 font-semibold">How: </span>
          <span className="text-gray-700">
            {Array.isArray(knowledge.how) ? (
              <ul className="list-disc list-inside">
                {knowledge.how.map((item, index) => (
                  <li key={index} className="ml-4">{item}</li>
                ))}
              </ul>
            ) : (
              knowledge.how
            )}
          </span>
        </div>
      );
    }

    if (knowledge.why) {
      details.push(
        <div key="why" className="mt-2">
          <span className="text-purple-600 font-semibold">Why: </span>
          <span className="text-gray-700">{knowledge.why}</span>
        </div>
      );
    }

    if (knowledge.pros) {
      details.push(
        <div key="pros" className="mt-2">
          <span className="text-amber-600 font-semibold">Pros: </span>
          <span className="text-gray-700">
            {Array.isArray(knowledge.pros) ? (
              <ul className="list-disc list-inside">
                {knowledge.pros.map((pro, index) => (
                  <li key={index} className="ml-4">{pro}</li>
                ))}
              </ul>
            ) : (
              knowledge.pros
            )}
          </span>
        </div>
      );
    }

    return details.length > 0 && <div className="mt-2">{details}</div>;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 
      ${depth > 0 ? 'ml-4' : ''} 
      hover:border-blue-500 transition-all`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasChildren && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {knowledge.url ? (
            <a
              href={knowledge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {knowledge.nm}
            </a>
          ) : (
            <h3 className="font-medium text-gray-900">{knowledge.nm}</h3>
          )}
          {itemCount > 0 && (
            <span className="text-sm text-gray-500">({itemCount})</span>
          )}
        </div>
      </div>
      {renderDetails()}
      {renderContent()}
    </div>
  );
}