import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useContext } from 'react';
import AppContext from '../AppContext';
import { getTranslate } from '../helpers';

export default function ErrorPage({ Component }: AppProps) {
  const { lang } = useContext(AppContext);
  return (
    <section className="text-center">
      <h1 className="text-xl font-bold font-mono">
        {getTranslate(lang, 'lost')}
      </h1>
      <Image src="/images/404.svg" width={400} height={400} alt={'404'} />
    </section>
  );
}
