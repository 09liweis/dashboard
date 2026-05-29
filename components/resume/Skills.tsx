export default function Skills() {
  const skills = {
    frontend: [
      "React (what I use most)",
      "Vue.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Performance tuning",
    ],
    backend: [
      "Node.js & Express",
      "REST APIs",
      "Python (when the project calls for it)",
      "Auth systems",
      "Database work",
      "Scaling web apps",
    ],
    databases: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Redis for caching",
      "Query optimization",
      "Data modeling",
    ],
    devops: [
      "Git (daily)",
      "Docker",
      "AWS for deployment",
      "CI/CD setup",
      "Debugging production issues",
      "VS Code",
    ],
    also: [
      "Writing tests",
      "Code reviews",
      "Mentoring junior devs",
      "Learning new tech quickly",
      "Breaking down complex problems",
    ],
  };

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Technologies</h2>
        <p className="text-slate-600">The tools I reach for most often.</p>
      </div>

      <div className="space-y-4">
        {/* Frontend */}
        <div className="border-l-4 border-slate-900 pl-4">
          <h3 className="font-semibold text-slate-900 mb-2">Frontend</h3>
          <p className="text-slate-700">{skills.frontend.join(" • ")}</p>
        </div>

        {/* Backend */}
        <div className="border-l-4 border-slate-700 pl-4">
          <h3 className="font-semibold text-slate-900 mb-2">Backend</h3>
          <p className="text-slate-700">{skills.backend.join(" • ")}</p>
        </div>

        {/* Databases */}
        <div className="border-l-4 border-slate-600 pl-4">
          <h3 className="font-semibold text-slate-900 mb-2">
            Databases & Infrastructure
          </h3>
          <p className="text-slate-700">{skills.databases.join(" • ")}</p>
        </div>

        {/* DevOps */}
        <div className="border-l-4 border-slate-500 pl-4">
          <h3 className="font-semibold text-slate-900 mb-2">DevOps & Tools</h3>
          <p className="text-slate-700">{skills.devops.join(" • ")}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-2">Plus:</p>
        <p className="text-slate-700">{skills.also.join(" • ")}</p>
      </div>
    </section>
  );
}
