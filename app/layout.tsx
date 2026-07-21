import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sam Li - Full Stack Developer",
    template: "%s | Sam Li",
  },
  description:
    "Full Stack Developer with 10+ years of experience building scalable web applications with React, Vue.js, Node.js, and modern technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Vue.js Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Software Engineer",
    "samliweisen",
    "samli",
  ],
  authors: [{ name: "Sam Li" }],
  creator: "Sam Li",
  metadataBase: new URL("https://samliweisen.dev"),
  applicationName: "Sam Li - Full Stack Developer",
  referrer: "strict-origin-when-cross-origin",
  colorScheme: "light dark",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sam Li - Full Stack Developer",
    title: "Sam Li - Full Stack Developer",
    description:
      "Full Stack Developer with 10+ years of experience in React, Vue.js, Node.js, and modern web technologies.",
    url: "https://samliweisen.dev",
  },
  twitter: {
    card: "summary",
    creator: "@samliweisen",
    title: "Sam Li - Full Stack Developer",
    description:
      "Full Stack Developer with 10+ years of experience in React, Vue.js, Node.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ─── Preconnect to External Services ──────────────────────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://embed.tawk.to" />
        <link rel="preconnect" href="https://samliweisen.onrender.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ─── Theme and Format Detection ─────────────────────────── */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* ─── Additional Meta Tags ────────────────────────────────── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sam Li" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        <main className="p-2">
          <Header />
          <section className="bg-card mt-2 p-2 rounded-sm">{children}</section>
          <Footer />
          <AnalyticsWrapper />
        </main>
        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZM985DLTVZ"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZM985DLTVZ');
            `,
          }}
        />
        {/* Tawk.to Live Chat */}
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a063292e57a6a1c342a416c/1jok3b35r';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
