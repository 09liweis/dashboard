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
      <section>{knowledgeItem.nm}</section>
    )
  }
}

export default KnowledgeItem;