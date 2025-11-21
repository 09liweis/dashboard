import { motion } from 'motion/react';
import Link from 'next/link';

export default function Home() {
  const skills = [
    { name: 'React', icon: '⚛️', level: 95 },
    { name: 'Vue.js', icon: '💚', level: 90 },
    { name: 'Next.js', icon: '▲', level: 92 },
    { name: 'Node.js', icon: '🟢', level: 92 },
    { name: 'TypeScript', icon: '📘', level: 88 },
    { name: 'MongoDB', icon: '🍃', level: 90 },
    { name: 'PostgreSQL', icon: '🐘', level: 88 },
    { name: 'Python', icon: '🐍', level: 85 }
  ];

  const stats = [
    { value: '10+', label: 'Years Experience', icon: '📅' },
    { value: '50+', label: 'Projects Completed', icon: '🚀' },
    { value: '15+', label: 'Technologies', icon: '⚡' },
    { value: '100%', label: 'Client Satisfaction', icon: '⭐' }
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Building responsive and scalable web applications using modern frameworks',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Full Stack Solutions',
      description: 'End-to-end development from database design to frontend implementation',
      icon: '🔧',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'API Development',
      description: 'RESTful APIs and microservices architecture with best practices',
      icon: '🔌',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed, scalability, and efficiency',
      icon: '⚡',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <span className="text-6xl">👨‍💻</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Sam Li
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium"
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Crafting exceptional digital experiences with modern technologies.
            Specialized in building scalable web applications that drive business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                View Projects
              </motion.button>
            </Link>
            <a href="mailto:weisen.li@hotmail.com">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
              >
                Get In Touch
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            What I Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 group-hover:border-gray-200 transition-all h-full">
                  <div className={`w-16 h-16 bg-linear-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            By The Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Core Technologies
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{skill.name}</div>
                    <div className="text-sm text-gray-500">{skill.level}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's collaborate and bring your ideas to life with cutting-edge technology
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:weisen.li@hotmail.com">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Start a Project
              </motion.button>
            </a>
            <a href="https://github.com/09liweis" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                View GitHub
              </motion.button>
            </a>
          </div>
        </motion.div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
      </section>
    </div>
  );
}
