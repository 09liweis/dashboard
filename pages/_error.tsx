import type { AppProps } from 'next/app';
import Image from 'next/image';

export default function ErrorPage({ Component }: AppProps) {
  return (
    <section className="text-center">
      <h1 className="text-xl font-bold font-mono">Are you lost?</h1>
      <Image src="/images/404.svg" width={400} height={400} alt={'404'} />
    </section>
  );
}
