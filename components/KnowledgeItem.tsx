import { useState } from 'react';
import { Knowledge } from 'types';

interface KnowledgeItemProps {
  knowledgeItem: Knowledge
}

function KnowledgeItem({ knowledgeItem }: KnowledgeItemProps) {
  const [expand, setExpand] = useState(false);

  const {items,nm} = knowledgeItem;
  const itemsLength = items?.length;
  
  if (itemsLength) {
    const knowledgeItems = items.map((k) => {
      if (typeof k == 'string') {
        return (
          <section className="mb-2" key={k}>
            {k}
          </section>
        );
      } else if (typeof k == 'object') {
        return <KnowledgeItem knowledgeItem={k} key={k.nm} />;
      }
    });
    return (
      <section className={`mb-2 knowledge-item`}>
        <h4 className="cursor-pointer" onClick={() => setExpand(!expand)}>
          {nm} ({itemsLength}) {expand ? '-' : '+'}
        </h4>
        <div className={`pl-1 ${expand ? 'block' : 'hidden'}`}>{knowledgeItems}</div>
      </section>
    );
  } else {
    return (
      <section className="mb-2 text-slate-800 text-sm border-b-2 pb-1">
        {knowledgeItem.url ? (
          <a
            className={`knowledge-item`}
            href={knowledgeItem.url}
            rel="noreferrer"
            target="_blank"
          >
            {knowledgeItem.nm}
          </a>
        ) : (
          <p className={`knowledge-item`}>{knowledgeItem.nm}</p>
        )}
        {knowledgeItem.what && (
          <p>
            <span className="text-red-600">What:</span> {knowledgeItem.what}
          </p>
        )}
        {knowledgeItem.how ? (
          Array.isArray(knowledgeItem.how) ? (
            knowledgeItem.how.map((how) => <div key={how}>{how}</div>)
          ) : (
            <p>
              <span className="text-blue-600">How:</span> {knowledgeItem.how}
            </p>
          )
        ) : (
          ''
        )}
        {knowledgeItem.why && (
          <p>
            <span className="text-sky-600">Why:</span> {knowledgeItem.why}
          </p>
        )}
        {knowledgeItem.pros && (
          <p>
            <span className="text-yellow-600">Pros:</span> {knowledgeItem.pros}
          </p>
        )}
      </section>
    );
  }
}

export default KnowledgeItem;
