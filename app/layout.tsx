import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sam Li - Full Stack Developer",
    title: "Sam Li - Full Stack Developer",
    description:
      "Full Stack Developer with 10+ years of experience in React, Vue.js, Node.js, and modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@samliweisen",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CopyPrevention />
        <main className="p-2">
          <Header />
          <section className="bg-card mt-2 p-2 rounded-sm">{children}</section>
          <Comments />
          <Footer />
          <Analytics />
        </main>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZM985DLTVZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
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

function CopyPrevention() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('copy', function() {
            alert('You are trying to copy my stuff');
          });
        `,
      }}
    />
  );
}
