
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchAPI } from '../helpers';

interface Visual {
  _id: string,
  title: string,
  douban_id: string,
  poster: string
}

const Visuals: NextPage = () => {
  const [visuals,setVisuals] = useState([]);

  useEffect(()=>{
    getVisuals();
  },[]);

  const getVisuals = async () => {
    const {visuals} = await fetchAPI({url:'/api/visuals',body:{}});
    setVisuals(visuals);
  }

  const visualsHTML = visuals.map((c:Visual)=>{
    return (
      <article key={c._id} className='w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-4'>
        <Image src={c.poster} alt={c.title} width={200} height={300} layout='responsive' />
      </article>
    )
  })

  return (
    <>
      <h2>Visuals</h2>
      <section className='flex flex-wrap'>
        {visualsHTML}
      </section>
    </>
  )
};

export default Visuals;
