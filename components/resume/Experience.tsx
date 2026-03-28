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
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Work Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A decade of building and shipping quality software across various industries
        </p>
      </div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          const isCurrentRole = exp.period.includes("Present");

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${exp.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl">{exp.icon}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                          {isCurrentRole && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-3">
                          <span className="font-semibold text-gray-900">{exp.company}</span>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{exp.period}</span>
                          </div>
                        </div>

                        {exp.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Key Achievements
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.duties.map((duty, dutyIdx) => (
                          <motion.li
                            key={dutyIdx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                            transition={{ delay: dutyIdx * 0.05, duration: 0.3 }}
                            className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
                          >
                            <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-linear-to-br ${exp.gradient}`}></span>
                            <span>{duty}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${exp.gradient} rounded-l-2xl`}></div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-gray-700 font-medium">10+ years of professional experience</span>
        </div>
      </motion.div>
    </motion.section>
  );
}