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
    const response = await fetchAPI({
      method: 'POST',
      url: VIDEO_LIST_API,
      body: {},
    });
    setVideos(response);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const videosHTML = videos.map((v) => (
    <article
      key={v.bvid}
      className="relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between"
    >
      {v.pic && (
        <Image
          src={v.pic}
          className="w-full"
          alt={v.title}
          objectFit="cover"
          layout="fill"
        />
      )}
    </article>
  ));

  return <section>{videosHTML}</section>;
};

export default VideosPage;
