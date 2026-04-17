import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const skills = [
    { name: 'React', level: 95, category: 'Frontend', color: 'from-cyan-400 to-blue-500' },
    { name: 'Vue.js', level: 90, category: 'Frontend', color: 'from-emerald-400 to-teal-500' },
    { name: 'Next.js', level: 92, category: 'Framework', color: 'from-gray-700 to-gray-900' },
    { name: 'Node.js', level: 92, category: 'Backend', color: 'from-green-500 to-emerald-600' },
    { name: 'TypeScript', level: 88, category: 'Language', color: 'from-blue-500 to-blue-700' },
    { name: 'MongoDB', level: 90, category: 'Database', color: 'from-green-600 to-emerald-700' },
    { name: 'PostgreSQL', level: 88, category: 'Database', color: 'from-blue-600 to-sky-700' },
    { name: 'Python', level: 85, category: 'Language', color: 'from-yellow-500 to-blue-500' }
  ];

  const stats = [
    { value: '10+', label: 'Years Experience', gradient: 'from-blue-500 to-cyan-500', lightBg: 'from-blue-50 to-cyan-50' },
    { value: '50+', label: 'Projects Delivered', gradient: 'from-emerald-500 to-teal-500', lightBg: 'from-emerald-50 to-teal-50' },
    { value: '15+', label: 'Technologies', gradient: 'from-orange-500 to-red-500', lightBg: 'from-orange-50 to-red-50' },
    { value: '100%', label: 'Satisfaction', gradient: 'from-yellow-500 to-orange-500', lightBg: 'from-yellow-50 to-orange-50' }
  ];

  const services = [
    {
      title: 'Full Stack Development',
      description: 'End-to-end development of scalable web applications with modern frameworks and best practices.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'API Development',
      description: 'RESTful API design and implementation with secure authentication and comprehensive documentation.',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Database Architecture',
      description: 'Design and optimization of database schemas for performance, scalability, and data integrity.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: 'Performance Optimization',
      description: 'Code optimization, caching strategies, and performance tuning for faster load times.',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-blue-50"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          // style={{ opacity, scale }}
          className="relative max-w-7xl mx-auto px-4 py-10 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded shadow border border-gray-200 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text">
                Sam Li
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl text-gray-600 font-medium mb-4"
            >
              Full Stack Developer
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Building scalable, high-performance web applications with 10+ years of expertise in modern technologies.
              Transforming ideas into exceptional digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/resume">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <a href="mailto:weisen.li@hotmail.com">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-xl border-2 border-gray-200 hover:border-gray-900 transition-all"
                >
                  Let's Connect
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:border-transparent group-hover:shadow-2xl transition-all">
                  <div className="text-3xl md:text-5xl font-bold bg-linear-to-br from-gray-900 to-gray-600 text-transparent bg-clip-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What I Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive development solutions tailored to drive your business forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`}></div>
                <motion.div
                  className="relative bg-white rounded-3xl p-5 md:p-10 shadow-lg border border-gray-100 h-full transition-all group-hover:shadow-2xl group-hover:border-transparent"
                  whileHover={{ y: -8 }}
                >
                  <div className={`w-16 h-16 bg-linear-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mastery across the full technology stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-4 md:p-8 shadow border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl">{skill.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{skill.category}</p>
                  </div>
                  <motion.div
                    className="text-3xl font-bold bg-linear-to-br from-gray-900 to-gray-600 text-transparent bg-clip-text"
                    animate={{ scale: hoveredSkill === skill.name ? 1.1 : 1 }}
                  >
                    {skill.level}%
                  </motion.div>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                    className={`absolute top-0 left-0 h-full bg-linear-to-r ${skill.color} rounded-full shadow-md`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss how we can create exceptional digital experiences together.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:weisen.li@hotmail.com">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                Start a Project
              </motion.button>
            </a>
            <a href="https://github.com/09liweis" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gray-800 text-white rounded-xl font-bold text-lg border-2 border-gray-700 hover:border-gray-500 transition-all shadow-xl"
              >
                View GitHub
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
