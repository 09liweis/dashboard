import type { NextPage } from 'next';
import Resume from "@/components/screens/Resume";
import SEO from '@/components/SEO';
import { getPersonSchema, getBreadcrumbSchema } from '../config/seo';

const ResumePage: NextPage = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resume', url: '/resume' },
  ];

  const jsonLd = [
    getPersonSchema(),
    getBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <SEO
        title="Resume & Experience - Sam Li | Senior Full Stack Developer"
        description="Professional resume and work experience of Sam Li. 10+ years of expertise in React, Vue.js, Node.js, TypeScript, MongoDB, PostgreSQL, and cloud technologies. Currently Senior Application Development Specialist at OLG."
        keywords={[
          'resume',
          'cv',
          'work experience',
          'professional experience',
          'skills',
          'senior developer',
          'OLG developer',
        ]}
        url="/resume"
        type="profile"
        jsonLd={jsonLd}
        canonical="https://samliweisen.dev/resume"
      />
      <Resume />
    </>
  );
}

export default ResumePage;
