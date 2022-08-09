import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

const VisualDetail: NextPage = ({visual}:any) => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{id}</h1>
      </main>

    </div>
  )
}

export default VisualDetail