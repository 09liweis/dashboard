import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Vue.js', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 92, category: 'Framework' },
    { name: 'Node.js', level: 92, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'MongoDB', level: 90, category: 'Database' },
    { name: 'PostgreSQL', level: 88, category: 'Database' },
    { name: 'Python', level: 85, category: 'Language' }
  ];

  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '15+', label: 'Technologies Mastered' },
    { value: '100%', label: 'Client Satisfaction' }
  ];

  const services = [
    {
      title: 'Full Stack Development',
      description: 'End-to-end development of scalable web applications with modern frameworks and best practices.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'API Development',
      description: 'RESTful API design and implementation with secure authentication and comprehensive documentation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Database Architecture',
      description: 'Design and optimization of database schemas for performance, scalability, and data integrity.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: 'Performance Optimization',
      description: 'Code optimization, caching strategies, and performance tuning for faster load times.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6"
              >
                Full Stack Developer
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight"
              >
                Sam Li
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 mb-8 leading-relaxed"
              >
                Building scalable web applications with modern technologies. 
                Specialized in creating robust, high-performance solutions that drive business value.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold shadow-lg hover:bg-slate-800 transition-all"
                    data-testid="view-projects-btn"
                  >
                    View Projects
                  </motion.button>
                </Link>
                <a href="mailto:weisen.li@hotmail.com">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold shadow-lg border-2 border-slate-200 hover:border-slate-900 transition-all"
                    data-testid="contact-btn"
                  >
                    Get In Touch
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Professional Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-slate-100 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-3xl flex items-center justify-center">
                  <span className="text-9xl">👨‍💻</span>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold">10+</div>
                    <div className="text-xs font-medium">Years</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Services & Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
                data-testid={`service-${index}`}
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proficient in modern web technologies and frameworks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-slate-200"
                data-testid={`skill-${index}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{skill.name}</h3>
                    <p className="text-sm text-slate-500">{skill.category}</p>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{skill.level}%</div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="bg-slate-900 h-2.5 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your vision to life 
            with cutting-edge technology and proven expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:weisen.li@hotmail.com">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                data-testid="cta-contact-btn"
              >
                Start a Conversation
              </motion.button>
            </a>
            <a href="https://github.com/09liweis" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold border-2 border-slate-700 hover:border-slate-600 transition-all"
                data-testid="github-btn"
              >
                View GitHub Profile
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
