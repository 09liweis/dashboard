import { motion } from 'motion/react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duties: string[];
  icon?: string;
}

export default function Experience() {
  const EXPERIENCES: ExperienceItem[] = [
    {
      title: "Senior Application Development Specialist",
      company: "OLG",
      period: "2022 - Present",
      icon: "🎮",
      duties: [
        "Led the modernization of MRIS internal web portal from jQuery to React.js, improving performance and maintainability",
        "Developed automation tools with Python to streamline HTML/JSON file generation from business content",
        "Led team in creating reusable HTML components with Tailwind CSS for lottery ticket design system",
        "Conducted code reviews and provided mentorship to ensure code quality and best practices"
      ]
    },
    {
      title: "Front End Developer",
      company: "Real Master Inc",
      period: "2018 - 2022",
      icon: "🏢",
      duties: [
        "Built scalable solutions with Vue.js, React.js, and React Native for web and mobile applications",
        "Implemented RESTful APIs and database interactions using Node.js",
        "Integrated third-party services including Mapbox and OAuth authentication",
        "Optimized Elasticsearch implementation for efficient searching of millions of records"
      ]
    }
  ];

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-gray-200">
        Professional Experience
      </h2>
      
      <div className="space-y-12">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:to-purple-600"
          >
            <motion.div 
              className="absolute -left-3 top-0 w-6 h-6 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.2 }}
            >
              <span className="text-sm">{exp.icon}</span>
            </motion.div>

            <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>{exp.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.duties.map((duty, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.4 + (idx * 0.1) }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-blue-600 mt-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{duty}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}