import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VIDEO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Picture {
  img_src: string
}

interface Feed {
  title: string;
  aid?: string;
  pic: string;
  dynamic_id: number;
  type: string;//"PIC_POST"|"VIDEO"
  item: {
    title: string,
    description: string,
    pictures: Picture[]
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
      key={v.dynamic_id}
      className="relative p-1 flex justify-between sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <section className='p-1 shadow-lg bg-white/[30%] rounded-lg transition duraion-500 hover:scale-110'>
        <Image
          src={v.pic || v.item.pictures[0].img_src}
          className="rounded-sm"
          alt={v.title}
          width={500}
          height={300}
        />
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
