
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import CodingknowledgeJSON from '../json/coding.json';
import KnowledgeItem from '../components/KnowledgeItem';

interface Knowledge {
  nm: string,
  items?: Array<Knowledge> | Array<string>,
  pros?: string | Array<string>,
  what?: string,
  how?: string | Array<string>,
  why?: string
}

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
