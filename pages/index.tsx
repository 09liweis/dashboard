import type { NextPage } from 'next';
import Home from "@/components/screens/Home";
import SEO from '@/components/SEO';
import { getPersonSchema, getWebsiteSchema, getProfessionalServiceSchema } from '../config/seo';

const HomePage: NextPage = () => {
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
      <Home />
    </>
  );
}

export default HomePage;
