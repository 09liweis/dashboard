import type { NextPage } from 'next';
import Header from '../resume/Header';
import Summary from '../resume/Summary';
import Education from '../resume/Education';
import Skills from '../resume/Skills';
import Experience from '../resume/Experience';
import Projects from '../resume/Projects';

const Resume: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Header />
      <Summary />
      <Skills />
      <Experience />
      <Projects />
      <Education />
    </div>
  );
}

export default Resume;