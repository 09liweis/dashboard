
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchAPI } from '../helpers';
import styles from '../styles/Home.module.css';

interface Comment {
  _id: string,
  name: string,
  content: string
}

const Comments: NextPage = () => {
  const [comments,setComments] = useState([]);

  useEffect(()=>{
    getComments();
  },[]);

  const getComments = async () => {
    const {comments} = await fetchAPI({url:'/api/comments',body:{}});
    setComments(comments);
  }

  const commentsHTML = comments.map((c:Comment)=>{
    return (
      <article key={c._id} >
        <h4>{c.name}</h4>
        <p>{c.content}</p>
      </article>
    )
  })

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {commentsHTML}
    </div>
  )
};

export default Comments;
