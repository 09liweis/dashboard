import type { NextPage, GetStaticProps } from 'next';
import Home from "@/components/screens/Home";
import SEO from '@/components/SEO';
import { getPersonSchema, getWebsiteSchema, getProfessionalServiceSchema } from '../config/seo';
import { BLOG_POSTS } from '../data/blogs';
import { BlogType } from '../types';

interface HomePageProps {
  latestBlogs: BlogType[];
}

const HomePage: NextPage<HomePageProps> = ({ latestBlogs }) => {
  const jsonLd = [
    getPersonSchema(),
    getWebsiteSchema(),
    getProfessionalServiceSchema(),
  ];

  return (
    <>
      <SEO
        title="Sam Li - Full Stack Developer | React, Vue.js, Node.js Expert"
        description="Full Stack Developer with 10+ years of experience building scalable web applications. Specialized in React, Vue.js, Node.js, TypeScript, and modern web technologies. Based in Toronto, Canada."
        keywords={[
          'portfolio',
          'Toronto developer',
          'Canada developer',
          'hire developer',
          'web development services',
        ]}
        url="/"
        jsonLd={jsonLd}
        canonical="https://samliweisen.dev"
      />
      <Home latestBlogs={latestBlogs} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestBlogs = sorted.slice(0, 3);

  return {
    props: {
      latestBlogs,
    },
    revalidate: 60,
  };
};

export default HomePage;
