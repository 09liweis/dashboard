import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VIDEO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Video {
  bvid: string;
  title: string;
  pic: string;
  meta: {
    cover: string;
  };
}

const VideosPage: NextPage = () => {
  const emptyVideos: Array<Video> = [];
  const [videos, setVideos] = useState(emptyVideos);

  const fetchVideos = async () => {
    const { allVideos } = await fetchAPI({
      method: 'GET',
      url: VIDEO_LIST_API,
      body: {},
    });
    setVideos(allVideos || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const videosHTML = videos.map((v) => (
    <article
      key={v.bvid}
      className="relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      {v.pic &&
        (
          <Image
            src={v.pic}
            className="w-full h-100 rounded h-56"
            alt={v.title}
            objectFit="cover"
            layout="fill"
          />
        )
        /*< img src={v.pic} className="w-full rounded-lg" alt={v.title} />*/
      }
    </article>
  ));

  return (
    <section>
      <h1 className="text-center font-bold text-2xl mb-2">In Construction</h1>
      <section className='flex flex-wrap'>
        {videosHTML}
      </section>
    </section>
  );
};

export default VideosPage;
