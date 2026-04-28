import KnowledgeCard from './KnowledgeCard';
import { Knowledge } from 'types';

interface KnowledgeListProps {
  knowledges: Knowledge[];
  isLoggedIn: boolean;
  onEdit: (knowledge: Knowledge) => void;
  onDelete: (id: string) => void;
  onClick: (knowledge: Knowledge) => void;
}

export default function KnowledgeList({
  knowledges,
  isLoggedIn,
  onEdit,
  onDelete,
  onClick,
}: KnowledgeListProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Knowledges</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {knowledges.map((knowledge) => (
          <KnowledgeCard
            key={knowledge._id}
            knowledge={knowledge}
            isLoggedIn={isLoggedIn}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={onClick}
          />
        ))}
      </div>
    </>
  );
}
