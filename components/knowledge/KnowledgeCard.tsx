import { Knowledge } from 'types';

interface KnowledgeCardProps {
  knowledge: Knowledge;
  isLoggedIn: boolean;
  onEdit?: (knowledge: Knowledge) => void;
  onDelete?: (id: string) => void;
  onClick?: (knowledge: Knowledge) => void;
}

export default function KnowledgeCard({ knowledge, isLoggedIn, onEdit, onDelete, onClick }: KnowledgeCardProps) {
  return (
    <div 
      onClick={() => onClick?.(knowledge)}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{knowledge.title}</h3>
        {isLoggedIn && (
          <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
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
        )}
      </div>
      
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
