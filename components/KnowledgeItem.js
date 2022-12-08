import { useState } from "react";

function KnowledgeItem({knowledgeItem}) {
  const [expand, setExpand] = useState(false);
  if (knowledgeItem.items?.length) {
    const items = knowledgeItem.items.map((k)=>{
      if (typeof k == 'string') {
        return <section key={k}>{k}</section>
      } else if (typeof k == 'object') {
        return (
          <KnowledgeItem knowledgeItem={k} key={k.nm} />
        )
      }
    })
    return (
      <section>
        <h4 onClick={()=>setExpand(!expand)}>{knowledgeItem.nm}</h4>
        <div style={{paddingLeft: '25px',display: expand ? 'block' : 'none'}}>
          {items}
        </div>
      </section>
    )
  } else {
    return (
      <section className="mb-3">
        <p>{knowledgeItem.nm}</p>
        {knowledgeItem.what ? <p>What: {knowledgeItem.what}</p> :''}
        {knowledgeItem.how ? 
          Array.isArray(knowledgeItem.how) ? knowledgeItem.how.map(how => <div>{how}</div>)
          : <p>How: {knowledgeItem.how}</p>
        :''}
        {knowledgeItem.why ? <p>Why: {knowledgeItem.why}</p> :''}
        {knowledgeItem.pros ? <p>Pros: {knowledgeItem.pros}</p> :''}
      </section>
    )
  }
}

export default KnowledgeItem;