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
        Results-driven full-stack developer with <span className="font-semibold text-blue-600">10+ years</span> of 
        experience crafting robust web applications and leading high-impact development projects. Expertise in 
        <span className="font-semibold text-purple-600"> JavaScript, TypeScript, React, Vue.js, Node.js,</span> and 
        <span className="font-semibold text-green-600"> cloud technologies</span>. Demonstrated success in 
        architecting scalable solutions, optimizing application performance, and implementing best practices that 
        drive efficiency and user engagement. Passionate about mentoring team members and staying current with 
        emerging technologies. Known for delivering clean, maintainable code and innovative solutions to complex 
        technical challenges while consistently meeting project deadlines.
      </p>
    </motion.section>
  );
}