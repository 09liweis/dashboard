interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duties: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Front End Developer",
      company: "OLG",
      period: "2022 - Present",
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
      duties: [
        "Built scalable solutions with Vue.js, React.js, and React Native for web and mobile applications",
        "Implemented RESTful APIs and database interactions using Node.js",
        "Integrated third-party services including Mapbox and OAuth authentication",
        "Optimized Elasticsearch implementation for efficient searching of millions of records"
      ]
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Professional Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-4 border-l-2 border-gray-200 hover:border-blue-500 transition-colors">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-gray-200 rounded-full"></div>
            <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-600 font-medium">{exp.company}</span>
              <span className="text-gray-500 text-sm">{exp.period}</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {exp.duties.map((duty, idx) => (
                <li key={idx} className="leading-relaxed">{duty}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}