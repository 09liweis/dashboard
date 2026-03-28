import { motion } from 'motion/react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
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
      color: "from-green-500 to-emerald-500",
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
      color: "from-purple-500 to-pink-500",
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
      color: "from-orange-500 to-red-500",
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
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          What I Work With
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.15 }}
            className="group relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-500">{category.skills.length} technologies</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-white/20 to-transparent rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-linear-to-tr from-white/10 to-transparent rounded-full blur-lg"></div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Additional Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Also comfortable with</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Testing & debugging", "Performance tuning", "Security",
              "API design", "Team collaboration", "Mentoring",
              "Problem-solving", "Learning new tools"
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1 bg-white rounded-lg border border-gray-300 text-sm text-gray-600 transition-all cursor-default"
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