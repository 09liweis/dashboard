export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3/Sass", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Python", "FastAPI", "Java", "RESTful APIs"]
    },
    {
      title: "Database",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
    },
    {
      title: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Jira", "VS Code"]
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map(category => (
          <div key={category.title} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}