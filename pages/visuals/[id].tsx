import type { GetStaticPaths,GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

const VisualDetail: NextPage = ({visual}:any) => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div>
      <main>
        <h1>{visual.title}</h1>
        <p>{visual.summary}</p>
      </main>

    </div>
  )
}

const DOUBAN_VISUAL_API = 'https://samliweisen.herokuapp.com/api/visuals/summary'

export const getStaticProps:GetServerSideProps = async ({params:{id}}:any) => {
  const res = await fetch(DOUBAN_VISUAL_API,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({douban_id:id})
  })
  const result = await res.json();
  // console.log(result);
  return {
    props:{
      visual:result
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      // Object variant:
      { params: { id: 'second-post' } },
    ],
    fallback: true,
  }
}

export default VisualDetail