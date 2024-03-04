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

interface Feed {
  title: string;
  aid: string;
  pic: string;
  dynamic_id: number;
  type: string;//"PIC_POST"|"VIDEO"
  item: {
    title: string,
    description: string,
    pictures: []
  }

}

const VideosPage: NextPage = () => {
  const emptyVideos: Array<Feed> = [];
  const [videos, setVideos] = useState(emptyVideos);

  const fetchVideos = async () => {
    const { dynamics } = await fetchAPI({
      method: 'GET',
      url: VIDEO_LIST_API,
      body: {},
    });
    setVideos(dynamics || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const videosHTML = videos.map((v) => (
    <article
      key={v.aid}
      className="relative p-1 flex justify-between sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <section className='p-1 shadow-lg bg-white/[30%] rounded-lg'>
        {v.pic &&
          (
            <Image
              src={v.pic}
              className="rounded"
              alt={v.title}
              width={500}
              height={300}
            />
          )
        }
      </section>
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
