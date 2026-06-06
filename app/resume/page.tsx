import Resume from "@/components/screens/Resume";
import { getPersonSchema, getBreadcrumbSchema } from "../../config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume & Experience - Sam Li | Senior Full Stack Developer",
  description:
    "Professional resume and work experience of Sam Li. 10+ years of expertise in React, Vue.js, Node.js, TypeScript, MongoDB, PostgreSQL, and cloud technologies. Currently Senior Application Development Specialist at OLG.",
  keywords: [
    "resume",
    "cv",
    "work experience",
    "professional experience",
    "skills",
    "senior developer",
    "OLG developer",
  ],
  alternates: {
    canonical: "https://samliweisen.dev/resume",
  },
  openGraph: {
    type: "profile",
  },
};

export default function ResumePage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Resume", url: "/resume" },
  ];

  const jsonLd = [getPersonSchema(), getBreadcrumbSchema(breadcrumbs)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Resume />
    </>
  );
}
