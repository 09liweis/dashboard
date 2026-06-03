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
    <section className="mb-16">
      <div className="text-center mb-12">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 via-cyan-600 to-teal-600 text-transparent bg-clip-text">
              Education
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Academic foundation in computer science and software engineering
          </p>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-cyan-200 to-teal-200 transform md:-translate-x-1/2" />

        {educationData.map((education, eduIndex) => {
          const isHovered = hoveredIndex === eduIndex;
          const isEven = eduIndex % 2 === 0;

          return (
            <article
              key={education.school}
              className={`relative mb-8 md:mb-12 ${
                isEven ? 'md:pr-[50%]' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-8 transform -translate-x-1/2 z-10">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${education.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                  <span className="text-xl">{education.icon}</span>
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                <div
                  onMouseEnter={() => setHoveredIndex(eduIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
                >
                  {/* Gradient accent border */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${education.gradient}`} />

                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {education.degree}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="font-semibold text-gray-800">{education.school}</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm">{education.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        {education.details.map((detail, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
                          >
                            <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br ${education.gradient}`} />
                            <span className="flex-1">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animated bottom border */}
                  <div
                    style={{ height: isHovered ? '4px' : '0px', transition: 'height 0.2s' }}
                    className={`w-full bg-gradient-to-r ${education.gradient}`}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Certificates & Skills Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Strong Foundation</h4>
            <p className="text-sm text-gray-600">Computer Science Degree</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <span className="text-xl">💻</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Practical Skills</h4>
            <p className="text-sm text-gray-600">Industry-Focused Training</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <span className="text-xl">🚀</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Continuous Learning</h4>
            <p className="text-sm text-gray-600">Always Growing</p>
          </div>
        </div>
      </div>
    </section>
  );
}