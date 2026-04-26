import { Knowledge } from 'types';

interface KnowledgeCardProps {
  knowledge: Knowledge;
  onEdit?: (knowledge: Knowledge) => void;
  onDelete?: (id: string) => void;
}

export default function KnowledgeCard({ knowledge, onEdit, onDelete }: KnowledgeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{knowledge.title}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(knowledge)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && knowledge && knowledge?._id && (
            <button
              onClick={() => onDelete(knowledge._id!)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{knowledge.definition}</p>
      
      {knowledge.categories && knowledge.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {knowledge.categories.map((category, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}