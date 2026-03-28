import { motion } from 'motion/react';

export default function Summary() {
  const highlights = [
    {
      icon: '💼',
      label: 'Experience',
      value: '10+ Years',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚀',
      label: 'Specialization',
      value: 'Full Stack',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '⚡',
      label: 'Focus',
      value: 'Performance',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '🎯',
      label: 'Approach',
      value: 'Results-Driven',
      gradient: 'from-yellow-500 to-orange-500'
    },
  ];

  const expertiseAreas = [
    { tech: 'JavaScript & TypeScript', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { tech: 'React & Vue.js', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { tech: 'Node.js', color: 'bg-green-100 text-green-800 border-green-300' },
    { tech: 'Cloud Technologies', color: 'bg-sky-100 text-sky-800 border-sky-300' },
    { tech: 'Database Systems', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { tech: 'System Architecture', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  ];

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Professional Summary
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:border-transparent group-hover:shadow-2xl transition-all text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="text-lg font-bold text-gray-900">{item.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                <span className="font-bold text-gray-900">Results-driven full-stack developer</span> with proven expertise in crafting robust, scalable web applications and leading high-impact development projects. Specialized in architecting solutions that optimize performance, enhance user engagement, and drive business efficiency through innovative technical approaches.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Technical Leadership:</span> Demonstrated success in implementing best practices, mentoring team members, and driving adoption of modern development methodologies.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Code Excellence:</span> Known for delivering clean, maintainable code and innovative solutions to complex technical challenges while consistently meeting project deadlines.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Continuous Learning:</span> Passionate about staying current with emerging technologies and applying cutting-edge solutions to real-world problems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Core Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area, index) => (
                <motion.span
                  key={area.tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium ${area.color} cursor-default transition-all`}
                >
                  {area.tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl"></div>
      </motion.div>
    </motion.section>
  );
}