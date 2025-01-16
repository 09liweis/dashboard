import { motion } from 'motion/react';

export default function Summary() {
  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Professional Summary</h2>
      <p className="text-gray-700 leading-relaxed">
        Passionate full-stack developer with <span className="font-semibold text-blue-600">10+ years</span> of experience 
        building scalable web applications using modern technologies. Expertise in 
        <span className="font-semibold text-purple-600"> JavaScript, React, Vue, Node.js, and cloud services</span>. 
        Proven track record of delivering high-quality solutions and mentoring team members. 
        Strong focus on clean code, performance optimization, and user experience.
      </p>
    </motion.section>
  );
}