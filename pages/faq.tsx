import type { NextPage } from 'next';
import { useState } from 'react';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema } from '../config/seo';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What kinds of websites do you build?',
    answer:
      'I build everything from simple brochure sites and landing pages to full-stack web applications. Most of my client work involves migrating slow, expensive WordPress or Wix sites to modern static frameworks like Next.js, Astro, or SvelteKit — which dramatically cuts hosting costs and improves performance. I also build SaaS platforms, booking systems, property management tools, and e-commerce solutions from scratch.',
  },
  {
    question: 'How much does it cost to build a website?',
    answer:
      'It depends on the scope. A clean, fast brochure or portfolio site typically starts around $500–$1,500. A small business site with a contact form, gallery, and a few pages is usually $1,000–$3,000. A full-stack web application with user accounts, payments, and a database starts at $3,000 and scales with complexity. I always scope the project before quoting so there are no surprises. Hosting on platforms like Vercel or Netlify can be $0/month for many sites.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'A straightforward brochure site can be live in 1–2 weeks. A multi-page business site with custom design and integrations typically takes 2–4 weeks. More complex applications with custom back-ends, payment processing, or dashboards generally take 4–8 weeks. I work in focused sprints and keep you updated throughout, so you always know where things stand.',
  },
  {
    question: 'How do we communicate during the project?',
    answer:
      'I keep things simple. We start with a short call or message exchange to nail down the requirements. During the project I send updates by email or your preferred messaging app (WeChat, WhatsApp, Slack — whatever works for you). You will always be able to preview work-in-progress on a live staging URL before anything goes public. I am responsive during business hours and aim to reply within a few hours.',
  },
  {
    question: 'Will I be able to update the site myself after it is done?',
    answer:
      'Yes. For content-heavy sites I set up a headless CMS or a simple admin dashboard so you can edit text, images, and blog posts without touching code. For smaller sites, I document exactly how to make common updates and am happy to make small changes for you at no extra charge in the first month after launch.',
  },
  {
    question: 'Do you handle hosting and domain setup?',
    answer:
      'I handle the full deployment — pointing your domain, setting up SSL, and configuring hosting on Vercel, Netlify, or a cloud provider. Most of the sites I build run on free or near-free tiers (Vercel, Netlify, Cloudinary, Supabase free tier), so ongoing hosting costs are minimal. I will walk you through what to expect and help you keep annual costs low.',
  },
  {
    question: 'Can you migrate my existing WordPress site?',
    answer:
      'Yes, WordPress-to-modern-stack migrations are a specialty of mine. I audit your current site, preserve all your content and SEO rankings with proper 301 redirects, rebuild the design in a modern framework, and eliminate the plugin bloat and security vulnerabilities that come with WordPress. Clients typically see hosting costs drop by 80–90% and page load times improve by 60–80% after a migration.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. After launch I monitor the site for errors and am available for updates, new features, or bug fixes. For clients who need regular changes I offer a simple monthly retainer. For everyone else, I charge an hourly rate for any post-launch work. Either way, you will never be left without support.',
  },
];

const FAQAccordion = ({ item, index }: { item: FAQItem; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">
          {item.question}
        </span>
        <span
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="overflow-hidden">
          <p className="pb-5 text-base text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage: NextPage = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const jsonLd = [getBreadcrumbSchema(breadcrumbs), faqSchema];

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions | Sam Li"
        description="Answers to common questions about working with Sam Li: website costs, build timelines, communication style, hosting, WordPress migrations, and ongoing support."
        keywords={[
          'faq',
          'website cost',
          'how much does a website cost',
          'web development pricing',
          'hire web developer',
          'WordPress migration',
          'website support',
        ]}
        url="/faq"
        jsonLd={jsonLd}
        canonical="https://samliweisen.dev/faq"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                FAQ
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                Everything you need to know before we start working together — pricing, timelines, communication, and what happens after launch.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((faq, index) => (
                <FAQAccordion key={faq.question} item={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Send me a message and I will get back to you within a few hours.
              </p>
              <a
                href="mailto:weisen.li@hotmail.com"
                className="inline-flex items-center gap-2 px-7 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQPage;
