import { motion } from 'motion/react';

export interface Education {
  degree: string;
  school: string;
  period: string;
  details: string[];
}

const educationData: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    school: "University of Toronto",
    period: "2009 - 2013",
    details: [
      "Major in Software Engineering with focus on web development and distributed systems",
      "Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development"
    ]
  },
  {
    degree: "Graduate Certificate",
    school: "Humber College",
    period: "2016 - 2017",
    details: [
      "Focus on practical programming skills and software development",
      "Specialized in web development and database management",
      "Completed industry-focused projects with real-world applications"
    ]
  }
];

export default function Education() {
  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-gray-200">
        Education
      </h2>

      <div className="space-y-6">
        {educationData.map((education, eduIndex) => (
          <motion.div
            key={education.school}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: eduIndex * 0.2 }}
            className="bg-linear-to-br from-white to-gray-50 p-6 rounded-xl shadow-xs border border-gray-100 hover:border-blue-500 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{education.degree}</h3>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span>{education.school}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">{education.period}</span>
                </div>
              </div>
              <span className="text-2xl">🎓</span>
            </div>

            <ul className="space-y-2">
              {education.details.map((detail, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (eduIndex * 0.2) + (index * 0.1) }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-blue-600 mt-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}