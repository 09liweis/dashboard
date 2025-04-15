import type { NextPage } from 'next';
import { motion, useScroll, useSpring } from 'motion/react';
import Header from '../resume/Header';
import Summary from '../resume/Summary';
import Education from '../resume/Education';
import Skills from '../resume/Skills';
import Experience from '../resume/Experience';
import Projects from '../resume/Projects';
import ScrollReveal from '../ScrollReveal';

const Resume: NextPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />
      
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-xs z-40 mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <ul className="flex space-x-6 py-4 text-sm">
            {[
              { id: 'summary', label: 'Summary' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'education', label: 'Education' }
            ].map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <ScrollReveal>
          <Header />
        </ScrollReveal>
        
        <section id="summary">
          <ScrollReveal>
            <Summary />
          </ScrollReveal>
        </section>
        
        <section id="skills">
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
        </section>
        
        <section id="experience">
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
        </section>
        
        <section id="projects">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </section>
        
        <section id="education">
          <ScrollReveal>
            <Education />
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}

export default Resume;