
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import CodingknowledgeJSON from '../json/coding.json';
import KnowledgeItem from '../components/KnowledgeItem';
import { Knowledge } from 'types';

const KnowledgesPage: NextPage = () => {
  const emptyKnowledges: Array<Knowledge> = [];
  const [knowledges, setKnowledges] = useState(emptyKnowledges);
  useEffect(() => {
    setKnowledges(CodingknowledgeJSON);
  }, [])
  const knowledgesHTML = knowledges.map((k) => <KnowledgeItem key={k.nm} knowledgeItem={k} />);
  return (
    <>
      {knowledgesHTML}
    </>
  )
};

export default KnowledgesPage;
