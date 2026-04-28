import { Knowledge } from 'types';

interface RandomKnowledgeCardProps {
  knowledge: Knowledge;
  isLoggedIn: boolean;
  onEdit: (knowledge: Knowledge) => void;
  onDelete: (id: string) => void;
  onNext: () => void;
}

export default function RandomKnowledgeCard({
  knowledge,
  isLoggedIn,
  onEdit,
  onDelete,
  onNext,
}: RandomKnowledgeCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{knowledge.title}</h2>
        {isLoggedIn && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(knowledge)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => knowledge._id && onDelete(knowledge._id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-6 whitespace-pre-wrap">{knowledge.definition}</p>

      {knowledge.categories && knowledge.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {knowledge.categories.map((category, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Next Knowledge →
      </button>
    </div>
  );
}
