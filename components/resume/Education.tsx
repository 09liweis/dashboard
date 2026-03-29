import { motion } from 'motion/react';
import { useState } from 'react';

export interface Education {
  degree: string;
  school: string;
  period: string;
  details: string[];
  icon: string;
  gradient: string;
  bgGradient: string;
}

const educationData: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    school: "University of Toronto",
    period: "2009 - 2013",
    icon: "🎓",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    details: [
      "Major in Software Engineering with focus on web development and distributed systems",
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development",
      "Developed strong foundation in computer science fundamentals and software engineering principles"
    ]
  },
  {
    degree: "Graduate Certificate",
    school: "Humber College",
    period: "2016 - 2017",
    icon: "📚",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    details: [
      "Focus on practical programming skills and software development",
      "Specialized in web development and database management",
      "Completed industry-focused projects with real-world applications"
    ]
  }
];

export default function Education() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Education
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Academic foundation in computer science and software engineering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationData.map((education, eduIndex) => {
          const isHovered = hoveredIndex === eduIndex;

          return (
            <motion.article
              key={education.school}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: eduIndex * 0.15 }}
              onMouseEnter={() => setHoveredIndex(eduIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${education.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl overflow-hidden">
                <div className={`h-2 w-full bg-linear-to-r ${education.gradient}`}></div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${education.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{education.icon}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {education.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <span className="font-semibold text-gray-900">{education.school}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{education.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-4">
                    {education.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: eduIndex * 0.15 + index * 0.05 }}
                        className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
                      >
                        <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-linear-to-br ${education.gradient}`}></span>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? '4px' : '0px'
                  }}
                  className={`w-full bg-linear-to-r ${education.gradient}`}
                />
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-blue-900 font-semibold">Strong Foundation</p>
          <p className="text-blue-700 text-sm">Computer Science Degree</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border-2 border-emerald-200 p-4 text-center">
          <div className="text-3xl mb-2">💻</div>
          <p className="text-emerald-900 font-semibold">Practical Skills</p>
          <p className="text-emerald-700 text-sm">Industry-Focused Training</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200 p-4 text-center">
          <div className="text-3xl mb-2">🚀</div>
          <p className="text-amber-900 font-semibold">Continuous Learning</p>
          <p className="text-amber-700 text-sm">Always Growing</p>
        </div>
      </motion.div>
    </motion.section>
  );
}