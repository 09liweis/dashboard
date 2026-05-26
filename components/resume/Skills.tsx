import { motion } from 'motion/react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      iconBg: "bg-blue-600",
      skills: [
        "React (daily driver)",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "CSS & Tailwind",
        "Performance optimization"
      ]
    },
    {
      title: "Backend",
      icon: "⚙️",
      iconBg: "bg-emerald-600",
      skills: [
        "Node.js & Express",
        "RESTful & GraphQL APIs",
        "Python when needed",
        "Authentication & security",
        "Database design",
        "Scaling & caching"
      ]
    },
    {
      title: "Databases",
      icon: "🗄️",
      iconBg: "bg-cyan-600",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Supabase",
        "Redis",
        "Query optimization",
        "Data modeling"
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      iconBg: "bg-amber-600",
      skills: [
        "Git & GitHub",
        "Docker",
        "AWS basics",
        "CI/CD pipelines",
        "Debugging & profiling",
        "VS Code poweruser"
      ]
    }
  ];


  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-left mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Expertise</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          What I Work With
        </h2>
        <div className="w-20 h-1 bg-slate-900 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {skillCategories.map((category, categoryIndex) => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="group"
          >
            <div className="relative bg-white border-2 border-slate-100 rounded-lg p-6 group-hover:border-slate-200 transition-all h-full">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className={`w-10 h-10 ${category.iconBg} rounded-md flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{category.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{category.skills.length} technologies</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                    className="flex items-start gap-2.5"
                  >
                    <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-slate-700 leading-relaxed">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Also comfortable with</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Testing & debugging", "Performance tuning", "Security",
              "API design", "Team collaboration", "Mentoring",
              "Problem-solving", "Learning new tools"
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.04 }}
                whileHover={{ scale: 1.02 }}
                className="px-3 py-1.5 bg-white rounded-md border border-slate-200 text-xs font-medium text-slate-600 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}