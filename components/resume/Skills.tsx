import { motion } from 'motion/react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3/Sass", "Tailwind CSS"]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: ["Node.js", "Express", "Python", "FastAPI", "Java", "Laravel", "RESTful APIs"]
    },
    {
      title: "Database",
      icon: "🗄️",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      skills: ["Git", "Github Action", "Docker", "AWS", "CI/CD", "Jira", "VS Code"]
    }
  ];

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map(category => (
          <motion.article
            key={category.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-500 hover:shadow-md transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}