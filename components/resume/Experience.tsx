import { motion } from 'motion/react';
import { useState } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duties: string[];
  icon?: string;
  gradient: string;
  bgGradient: string;
  technologies?: string[];
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const EXPERIENCES: ExperienceItem[] = [
    {
      title: "Senior Application Development Specialist",
      company: "OLG",
      period: "2022 Nov - Present",
      icon: "🎮",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      technologies: ["React.js", "Python", "Tailwind CSS", "GitHub Actions"],
      duties: [
        "Led the modernization of MRIS internal web portal from jQuery to React.js, improving performance and maintainability",
        "Developed automation tools with Python to streamline HTML/JSON file generation from business content",
        "Led team in creating reusable HTML components with Tailwind CSS for lottery ticket design system",
        "Conducted code reviews and provided mentorship to ensure code quality and best practices",
        "Implemented CI/CD pipelines using GitHub Actions to automate testing and deployment processes",
        "Optimized database queries and implemented caching strategies, reducing load times by 40%"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Real Master Inc",
      period: "2018 Oct - 2022 Oct",
      icon: "🏢",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      technologies: ["Vue.js", "React.js", "Node.js", "MongoDB", "Docker", "Kubernetes"],
      duties: [
        "Built scalable solutions with Vue.js, React.js, and React Native for web and mobile applications",
        "Implemented RESTful APIs and database interactions using Node.js and MongoDB",
        "Integrated third-party services including Mapbox and OAuth authentication",
        "Optimized Elasticsearch implementation for efficient searching of millions of records",
        "Developed and maintained microservices architecture using Docker and Kubernetes",
        "Led migration from monolithic to microservices architecture, improving system scalability",
        "Implemented real-time features using WebSocket and Socket.io for live updates"
      ]
    },
    {
      title: "Front End Developer",
      company: "Canada Goose",
      period: "2018 May - 2018 Oct",
      icon: "💻",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "WordPress"],
      duties: [
        "Developed custom e-commerce solutions using MERN stack (MongoDB, Express.js, React, Node.js)",
        "Created responsive web applications with focus on mobile-first design principles",
        "Implemented payment processing integration with Stripe and PayPal APIs",
        "Built content management systems (CMS) for small businesses using WordPress and custom plugins",
        "Optimized website performance achieving 90+ scores on Google Lighthouse metrics"
      ]
    },
    {
      title: "Web Developer",
      company: "JMIR",
      period: "2017 - 2018 Apr",
      icon: "🚀",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      technologies: ["PHP", "MySQL", "JavaScript", "WordPress"],
      duties: [
        "Developed and maintained client websites using PHP, MySQL, and JavaScript",
        "Collaborated with design team to implement pixel-perfect UI/UX designs",
        "Created custom WordPress themes and plugins for client requirements",
        "Implemented responsive design principles and cross-browser compatibility",
        "Participated in daily stand-ups and sprint planning using Agile methodology"
      ]
    }
  ];

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 text-transparent bg-clip-text">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A decade of building and shipping quality software across various industries
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-cyan-200 to-teal-200 transform md:-translate-x-1/2" />

        {EXPERIENCES.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          const isCurrentRole = exp.period.includes("Present");
          const isEven = index % 2 === 0;

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative mb-8 md:mb-12 ${
                isEven ? 'md:pr-[50%]' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-0 md:left-1/2 top-8 transform -translate-x-1/2 z-10`}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}
                >
                  <span className="text-xl">{exp.icon}</span>
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  {/* Gradient accent border */}
                  <div className={`h-1 w-full bg-gradient-to-r ${exp.gradient}`} />

                  <div className="p-6">
                    {/* Header section */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {exp.title}
                            </h3>
                            {isCurrentRole && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-semibold rounded-full border border-green-200"
                              >
                                Current
                              </motion.span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-gray-800">{exp.company}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm">{exp.period}</span>
                          </div>
                        </div>

                        <motion.button
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Technologies */}
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                              className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expandable content */}
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200 mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${exp.gradient} flex items-center justify-center`}>
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {exp.duties.map((duty, dutyIdx) => (
                            <motion.li
                              key={dutyIdx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                              transition={{ delay: dutyIdx * 0.05, duration: 0.3 }}
                              className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
                            >
                              <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br ${exp.gradient}`} />
                              <span className="flex-1">{duty}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text mb-1">10+</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text mb-1">4</div>
          <div className="text-sm text-gray-600">Companies</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text mb-1">50+</div>
          <div className="text-sm text-gray-600">Projects Delivered</div>
        </div>
      </motion.div>
    </motion.section>
  );
}