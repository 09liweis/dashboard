import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CodingknowledgeJSON from '../json/coding.json';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';
import SearchBar from '../components/knowledge/SearchBar';
import { Knowledge } from 'types';

const KnowledgesPage: NextPage = () => {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKnowledges, setFilteredKnowledges] = useState<Knowledge[]>([]);

  useEffect(() => {
    setKnowledges(CodingknowledgeJSON);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredKnowledges(knowledges);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filterKnowledge = (items: Knowledge[]): Knowledge[] => {
      return items.filter(item => {
        const matchesName = item.nm.toLowerCase().includes(searchTermLower);
        const matchesWhat = item.what?.toLowerCase().includes(searchTermLower);
        const matchesHow = typeof item.how === 'string' && item.how.toLowerCase().includes(searchTermLower);
        
        let hasMatchingChildren = false;
        if (Array.isArray(item.items)) {
          const filteredItems = filterKnowledge(
            item.items.filter((i): i is Knowledge => typeof i === 'object')
          );
          hasMatchingChildren = filteredItems.length > 0;
          if (hasMatchingChildren) {
            item.items = filteredItems;
          }
        }

        return matchesName || matchesWhat || matchesHow || hasMatchingChildren;
      });
    };

    setFilteredKnowledges(filterKnowledge(knowledges));
  }, [searchTerm, knowledges]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Knowledge Base
      </h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="space-y-4">
        {filteredKnowledges.map((knowledge) => (
          <KnowledgeCard key={knowledge.nm} knowledge={knowledge} />
        ))}
      </div>
    </div>
  );
};

export default KnowledgesPage;