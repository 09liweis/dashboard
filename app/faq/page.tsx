import { FAQContent } from "./FAQContent";
import { getBreadcrumbSchema } from "../../config/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Sam Li",
  description:
    "Answers to common questions about working with Sam Li: website costs, build timelines, communication style, hosting, WordPress migrations, and ongoing support.",
  keywords: [
    "faq",
    "website cost",
    "how much does a website cost",
    "web development pricing",
    "hire web developer",
    "WordPress migration",
    "website support",
  ],
  alternates: {
    canonical: "https://samliweisen.dev/faq",
  },
};

export default function FAQPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ];

  const faqs = [
    {
      question: "What kinds of websites do you build?",
      answer:
        "I build everything from simple brochure sites and landing pages to full-stack web applications. Most of my client work involves migrating slow, expensive WordPress or Wix sites to modern static frameworks like Next.js, Astro, or SvelteKit — which dramatically cuts hosting costs and improves performance. I also build SaaS platforms, booking systems, property management tools, and e-commerce solutions from scratch.",
    },
    {
      question: "How much does it cost to build a website?",
      answer:
        "It depends on the scope. A clean, fast brochure or portfolio site typically starts around $500–$1,500. A small business site with a contact form, gallery, and a few pages is usually $1,000–$3,000. A full-stack web application with user accounts, payments, and a database starts at $3,000 and scales with complexity. I always scope the project before quoting so there are no surprises. Hosting on platforms like Vercel or Netlify can be $0/month for many sites.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "A straightforward brochure site can be live in 1–2 weeks. A multi-page business site with custom design and integrations typically takes 2–4 weeks. More complex applications with custom back-ends, payment processing, or dashboards generally take 4–8 weeks. I work in focused sprints and keep you updated throughout, so you always know where things stand.",
    },
    {
      question: "How do we communicate during the project?",
      answer:
        "I keep things simple. We start with a short call or message exchange to nail down the requirements. During the project I send updates by email or your preferred messaging app (WeChat, WhatsApp, Slack — whatever works for you). You will always be able to preview work-in-progress on a live staging URL before anything goes public. I am responsive during business hours and aim to reply within a few hours.",
    },
    {
      question: "Will I be able to update the site myself after it is done?",
      answer:
        "Yes. For content-heavy sites I set up a headless CMS or a simple admin dashboard so you can edit text, images, and blog posts without touching code. For smaller sites, I document exactly how to make common updates and am happy to make small changes for you at no extra charge in the first month after launch.",
    },
    {
      question: "Do you handle hosting and domain setup?",
      answer:
        "I handle the full deployment — pointing your domain, setting up SSL, and configuring hosting on Vercel, Netlify, or a cloud provider. Most of the sites I build run on free or near-free tiers (Vercel, Netlify, Cloudinary, Supabase free tier), so ongoing hosting costs are minimal. I will walk you through what to expect and help you keep annual costs low.",
    },
    {
      question: "Can you migrate my existing WordPress site?",
      answer:
        "Yes, WordPress-to-modern-stack migrations are a specialty of mine. I audit your current site, preserve all your content and SEO rankings with proper 301 redirects, rebuild the design in a modern framework, and eliminate the plugin bloat and security vulnerabilities that come with WordPress. Clients typically see hosting costs drop by 80–90% and page load times improve by 60–80% after a migration.",
    },
    {
      question: "Do you offer ongoing support after launch?",
      answer:
        "Yes. After launch I monitor the site for errors and am available for updates, new features, or bug fixes. For clients who need regular changes I offer a simple monthly retainer. For everyone else, I charge an hourly rate for any post-launch work. Either way, you will never be left without support.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const jsonLd = [getBreadcrumbSchema(breadcrumbs), faqSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <FAQContent faqs={faqs} />
    </>
  );
}
