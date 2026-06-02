import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '@/components/SEO';
import Link from 'next/link';

interface Option {
  id: string;
  label: string;
  description: string;
  price: number;
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  multiple: boolean;
  options: Option[];
}

const CATEGORIES: Category[] = [
  {
    id: 'type',
    title: 'Website Type',
    subtitle: 'What kind of site do you need?',
    multiple: false,
    options: [
      { id: 'brochure', label: 'Brochure / Landing Page', description: '1–3 pages, no CMS, no user accounts', price: 500 },
      { id: 'business', label: 'Small Business Site', description: '5–10 pages with contact form and basic SEO', price: 1500 },
      { id: 'portfolio', label: 'Portfolio Site', description: 'Showcase work with a blog or case studies', price: 1200 },
      { id: 'webapp', label: 'Web Application', description: 'User accounts, dashboards, and dynamic data', price: 4000 },
      { id: 'ecommerce', label: 'E-commerce Store', description: 'Product catalog, cart, and checkout flow', price: 5000 },
    ],
  },
  {
    id: 'pages',
    title: 'Number of Pages',
    subtitle: 'How many distinct pages does the site need?',
    multiple: false,
    options: [
      { id: '1-3', label: '1–3 Pages', description: 'Home, About, Contact', price: 0 },
      { id: '4-7', label: '4–7 Pages', description: 'Adds Services, Blog, FAQ', price: 400 },
      { id: '8-15', label: '8–15 Pages', description: 'Larger informational site', price: 900 },
      { id: '15+', label: '15+ Pages', description: 'Multi-section or large catalog', price: 1800 },
    ],
  },
  {
    id: 'design',
    title: 'Design Approach',
    subtitle: 'How should the visual design be handled?',
    multiple: false,
    options: [
      { id: 'template', label: 'Adapted Template', description: 'Start from a proven layout and customize it', price: 0 },
      { id: 'custom', label: 'Custom Design', description: 'Unique design built from scratch to your brand', price: 1200 },
      { id: 'figma', label: 'From Figma / Brand Guide', description: 'Pixel-perfect implementation of provided designs', price: 800 },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    subtitle: 'Select all that apply.',
    multiple: true,
    options: [
      { id: 'contact-form', label: 'Contact Form', description: 'Email submissions with spam protection', price: 150 },
      { id: 'cms', label: 'Content Management (CMS)', description: 'Edit pages and blog posts without a developer', price: 600 },
      { id: 'blog', label: 'Blog / News Section', description: 'Create and publish articles', price: 400 },
      { id: 'auth', label: 'User Accounts & Auth', description: 'Registration, login, and profile management', price: 800 },
      { id: 'payments', label: 'Payment Processing', description: 'Stripe integration for one-time or recurring payments', price: 1200 },
      { id: 'multilang', label: 'Multi-Language Support', description: 'Content in 2 or more languages', price: 700 },
      { id: 'search', label: 'Search Functionality', description: 'Full-text search across site content', price: 400 },
      { id: 'analytics', label: 'Analytics Dashboard', description: 'Custom internal metrics and reporting', price: 900 },
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting & Deployment',
    subtitle: 'Where will the site live?',
    multiple: false,
    options: [
      { id: 'free-tier', label: 'Free Tier (Vercel / Netlify)', description: 'Ideal for static and low-traffic sites — $0/month', price: 0 },
      { id: 'managed', label: 'Managed Cloud Hosting', description: 'Vercel Pro, Railway, Render — ~$20–50/month', price: 200 },
      { id: 'vps', label: 'VPS / Dedicated Server', description: 'Full control on AWS, DigitalOcean, etc.', price: 400 },
    ],
  },
  {
    id: 'timeline',
    title: 'Timeline',
    subtitle: 'How soon do you need it?',
    multiple: false,
    options: [
      { id: 'flexible', label: 'Flexible (6–10 weeks)', description: 'Standard pace with thorough review cycles', price: 0 },
      { id: 'normal', label: 'Normal (3–5 weeks)', description: 'Prioritized delivery with focused sprints', price: 300 },
      { id: 'rush', label: 'Rush (1–2 weeks)', description: 'Expedited development, all hands on deck', price: 800 },
    ],
  },
];

const ADDONS: Option[] = [
  { id: 'seo', label: 'SEO Setup', description: 'Meta tags, sitemap, structured data, Search Console integration', price: 400 },
  { id: 'a11y', label: 'Accessibility Audit', description: 'WCAG 2.1 AA compliance review and fixes', price: 350 },
  { id: 'perf', label: 'Performance Optimization', description: 'Core Web Vitals tuning, Lighthouse 90+ guarantee', price: 500 },
  { id: 'support', label: '3-Month Support Retainer', description: 'Bug fixes, minor updates, and priority email support', price: 600 },
  { id: 'migration', label: 'WordPress Migration', description: 'Content migration from an existing WordPress site', price: 700 },
];

function formatPrice(n: number) {
  return n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
}

const CalculatorPage: NextPage = () => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [addons, setAddons] = useState<string[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const toggle = (categoryId: string, optionId: string, multiple: boolean) => {
    setSelections((prev) => {
      const current = prev[categoryId] || [];
      if (multiple) {
        return {
          ...prev,
          [categoryId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [categoryId]: [optionId] };
    });
  };

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const { baseTotal, addonTotal, total, breakdown } = useMemo(() => {
    let baseTotal = 0;
    const breakdown: { label: string; price: number }[] = [];

    CATEGORIES.forEach((cat) => {
      const selected = selections[cat.id] || [];
      cat.options.forEach((opt) => {
        if (selected.includes(opt.id) && opt.price > 0) {
          baseTotal += opt.price;
          breakdown.push({ label: opt.label, price: opt.price });
        }
      });
    });

    let addonTotal = 0;
    ADDONS.forEach((addon) => {
      if (addons.includes(addon.id)) {
        addonTotal += addon.price;
        breakdown.push({ label: addon.label, price: addon.price });
      }
    });

    return { baseTotal, addonTotal, total: baseTotal + addonTotal, breakdown };
  }, [selections, addons]);

  const completedCategories = CATEGORIES.filter(
    (cat) => (selections[cat.id] || []).length > 0
  ).length;

  const progress = Math.round((completedCategories / CATEGORIES.length) * 100);

  return (
    <>
      <SEO
        title="Website Cost Calculator | Sam Li"
        description="Estimate the cost to build your website. Customize by site type, features, design, and timeline to get an instant project estimate."
        keywords={['website cost', 'web development pricing', 'build a website cost', 'website quote']}
        url="/calculator"
        canonical="https://samliweisen.dev/calculator"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                Cost Estimator
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                How Much Will My Website Cost?
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                Answer a few questions about your project and get an instant, itemized estimate. No email required.
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {completedCategories} of {CATEGORIES.length} sections answered
                </span>
                <span className="text-sm font-semibold text-gray-900">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gray-900 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] items-start">
            {/* Left: Questions */}
            <div className="space-y-10">
              {CATEGORIES.map((cat, catIdx) => (
                <motion.section
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.05, duration: 0.4 }}
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {cat.subtitle}
                      {cat.multiple && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                          Select all that apply
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {cat.options.map((opt) => {
                      const isSelected = (selections[cat.id] || []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggle(cat.id, opt.id, cat.multiple)}
                          className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                            isSelected
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                {opt.label}
                              </p>
                              <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                {opt.description}
                              </p>
                            </div>
                            <span className={`text-xs font-bold whitespace-nowrap pt-0.5 ${isSelected ? 'text-emerald-300' : 'text-gray-400'}`}>
                              {opt.price === 0 ? 'included' : `+${formatPrice(opt.price)}`}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="mt-2 flex justify-end">
                              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.section>
              ))}

              {/* Add-ons */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Optional Add-ons</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Enhance your project with these extras.{' '}
                    <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                      Select all that apply
                    </span>
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ADDONS.map((addon) => {
                    const isSelected = addons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                          isSelected
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                              {addon.label}
                            </p>
                            <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                              {addon.description}
                            </p>
                          </div>
                          <span className={`text-xs font-bold whitespace-nowrap pt-0.5 ${isSelected ? 'text-emerald-300' : 'text-gray-400'}`}>
                            +{formatPrice(addon.price)}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="mt-2 flex justify-end">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            {/* Right: Sticky estimate card */}
            <div className="lg:sticky lg:top-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden"
              >
                <div className="bg-gray-900 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    Estimated Project Cost
                  </p>
                  <motion.p
                    key={total}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-extrabold text-white"
                  >
                    {formatPrice(total)}
                  </motion.p>
                  {total === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Select options above to build your estimate
                    </p>
                  )}
                </div>

                <div className="px-6 py-5">
                  {total > 0 && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setShowBreakdown((v) => !v)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors w-full"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${showBreakdown ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        {showBreakdown ? 'Hide' : 'Show'} breakdown ({breakdown.length} items)
                      </button>

                      <AnimatePresence>
                        {showBreakdown && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden mt-3 space-y-2"
                          >
                            {breakdown.map((item, i) => (
                              <li key={i} className="flex justify-between text-sm">
                                <span className="text-gray-600 truncate pr-2">{item.label}</span>
                                <span className="font-semibold text-gray-900 whitespace-nowrap">{formatPrice(item.price)}</span>
                              </li>
                            ))}
                            <li className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2">
                              <span className="font-bold text-gray-900">Total</span>
                              <span className="font-bold text-gray-900">{formatPrice(total)}</span>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <div className="space-y-3">
                    <a
                      href="mailto:weisen.li@hotmail.com"
                      className="block w-full text-center px-5 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
                    >
                      Get a Free Quote
                    </a>
                    <Link href="/faq">
                      <span className="block w-full text-center px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm cursor-pointer">
                        Read the FAQ
                      </span>
                    </Link>
                  </div>

                  <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                    Estimates are approximate. Final pricing depends on exact requirements and a brief discovery call.
                  </p>
                </div>
              </motion.div>

              {/* Reference ranges */}
              <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Typical Ranges
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: 'Brochure site', range: '$500 – $1,500' },
                    { label: 'Business site', range: '$1,000 – $3,000' },
                    { label: 'Web application', range: '$3,000 – $8,000' },
                    { label: 'E-commerce', range: '$5,000+' },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between">
                      <span className="text-gray-600">{row.label}</span>
                      <span className="font-semibold text-gray-900">{row.range}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
