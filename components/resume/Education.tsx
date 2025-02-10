import { motion } from 'motion/react';

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

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Bachelor of Computer Science</h3>
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <span>University of Toronto</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">2012 - 2016</span>
            </div>
          </div>
          <span className="text-2xl">🎓</span>
        </div>

        <ul className="space-y-2">
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3 text-gray-700"
          >
            <span className="text-blue-600 mt-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span>Major in Software Engineering with focus on web development and distributed systems</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3 text-gray-700"
          >
            <span className="text-blue-600 mt-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span>Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development</span>
          </motion.li>
        </ul>
      </motion.div>
    </motion.section>
  );
}