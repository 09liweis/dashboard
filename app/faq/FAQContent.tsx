"use client";

import { useState, useRef, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-slate-700 transition-colors">
          {item.question}
        </span>
        <span
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${height}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pb-5 text-base text-gray-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQContent({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              FAQ
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
              Everything you need to know before we start working together —
              pricing, timelines, communication, and what happens after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {faqs.map((faq) => (
              <FAQAccordion key={faq.question} item={faq} />
            ))}
          </div>
        </div>
      </section>

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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
