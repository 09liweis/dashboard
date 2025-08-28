import { motion } from 'motion/react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 95 },
        { name: "Vue.js", level: 90 },
        { name: "Next.js", level: 92 },
        { name: "Nuxt.js", level: 88 },
        { name: "SvelteKit", level: 85 },
        { name: "TypeScript", level: 88 },
        { name: "HTML5", level: 95 },
        { name: "CSS3/Sass", level: 92 },
        { name: "Tailwind CSS", level: 90 }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "Express", level: 88 },
        { name: "Python", level: 85 },
        { name: "FastAPI", level: 82 },
        { name: "Java", level: 75 },
        { name: "Laravel", level: 70 },
        { name: "RESTful APIs", level: 95 },
        { name: "Supabase", level: 85 }
      ]
    },
    {
      title: "Database & Storage",
      icon: "🗄️",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "Redis", level: 80 }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git", level: 95 },
        { name: "GitHub Actions", level: 85 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "CI/CD", level: 82 },
        { name: "Jira", level: 88 },
        { name: "VS Code", level: 95 }
      ]
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Technical Expertise
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency levels across different domains
        </p>
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
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.05 }}
                    className="group/skill"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 group-hover/skill:text-gray-900 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Skill Progress Bar */}
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                        className={`absolute top-0 left-0 h-full bg-linear-to-r ${getSkillColor(skill.level)} rounded-full shadow-sm`}
                      />
                      
                      {/* Shimmer effect */}
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 1,
                          duration: 1,
                          ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 h-full w-1/3 bg-white/30 transform skew-x-12"
                      />
                    </div>
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
        <div className="bg-linear-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Agile/Scrum", "Test-Driven Development", "Code Review", 
              "Performance Optimization", "Security Best Practices", "API Design",
              "Microservices", "System Architecture", "Team Leadership"
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all cursor-default"
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