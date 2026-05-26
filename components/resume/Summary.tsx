import { motion } from 'motion/react';

export default function Summary() {
  const highlights = [
    {
      icon: '💼',
      label: 'Experience',
      value: '10+ Years',
      gradient: 'from-slate-700 to-slate-900'
    },
    {
      icon: '🚀',
      label: 'Specialization',
      value: 'Full Stack',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: '⚡',
      label: 'Focus',
      value: 'Performance',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: '🎯',
      label: 'Approach',
      value: 'Results-Driven',
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

  const expertiseAreas = [
    { tech: 'JavaScript & TypeScript', color: 'bg-amber-50 text-amber-900 border-amber-200' },
    { tech: 'React & Vue.js', color: 'bg-blue-50 text-blue-900 border-blue-200' },
    { tech: 'Node.js', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
    { tech: 'Cloud Technologies', color: 'bg-cyan-50 text-cyan-900 border-cyan-200' },
    { tech: 'Database Systems', color: 'bg-teal-50 text-teal-900 border-teal-200' },
    { tech: 'System Architecture', color: 'bg-orange-50 text-orange-900 border-orange-200' },
  ];

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-left mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">About</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Professional Summary
        </h2>
        <div className="w-20 h-1 bg-slate-900 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.15 } }}
            className="group"
          >
            <div className="relative bg-white rounded-lg border-2 border-gray-100 p-5 sm:p-6 group-hover:border-gray-200 group-hover:shadow-sm transition-all h-full">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{item.label}</div>
              <div className="text-lg font-bold text-slate-900">{item.value}</div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600"></div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-5">
                  I&apos;ve spent the last decade building web applications that actually work. Not just the shiny frontend stuff, but the whole stack—databases, APIs, deployment, the works. I focus on writing code that other developers can understand six months later.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-200">
                    <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      I&apos;ve led teams through technical migrations (jQuery to React, monoliths to microservices) and actually shipped them. I enjoy mentoring junior developers and doing code reviews that help people grow.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-200">
                    <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      My approach is pragmatic: use the right tool for the job, optimize when it matters, and keep things simple when possible. I&apos;ve dealt with everything from small startup MVPs to systems handling millions of records.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-200">
                    <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Currently working with React, Vue, Node.js, and various databases. I pick up new technologies quickly and I&apos;m comfortable jumping into unfamiliar codebases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-300">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Core Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area, index) => (
                  <motion.span
                    key={area.tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.04 }}
                    whileHover={{ scale: 1.03 }}
                    className={`px-3 py-1.5 rounded-md border text-xs font-semibold ${area.color} cursor-default transition-transform`}
                  >
                    {area.tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}