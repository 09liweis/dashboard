import { useState } from 'react';

const TEXT_STYLE = 'font-bold capitalize';

function KnowledgeItem({ knowledgeItem }) {
  const [expand, setExpand] = useState(false);
  if (knowledgeItem.items?.length) {
    const items = knowledgeItem.items.map((k) => {
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
      <section className={`mb-2 ${TEXT_STYLE}`}>
        <h4 className="cursor-pointer" onClick={() => setExpand(!expand)}>
          {knowledgeItem.nm} {expand ? '-' : '+'}
        </h4>
        <div className={`pl-2 ${expand ? 'block' : 'hidden'}`}>{items}</div>
      </section>
    );
  } else {
    return (
      <section className="mb-2">
        {knowledgeItem.url ? (
          <a
            className={TEXT_STYLE}
            href={knowledgeItem.url}
            rel="noreferrer"
            target="_blank"
          >
            {knowledgeItem.nm}
          </a>
        ) : (
          <p className={TEXT_STYLE}>{knowledgeItem.nm}</p>
        )}
        {knowledgeItem.what && <p>What: {knowledgeItem.what}</p>}
        {knowledgeItem.how ? (
          Array.isArray(knowledgeItem.how) ? (
            knowledgeItem.how.map((how) => <div key={how}>{how}</div>)
          ) : (
            <p>How: {knowledgeItem.how}</p>
          )
        ) : (
          ''
        )}
        {knowledgeItem.why && <p>Why: {knowledgeItem.why}</p>}
        {knowledgeItem.pros && <p>Pros: {knowledgeItem.pros}</p>}
      </section>
    );
  }
}

export default KnowledgeItem;
