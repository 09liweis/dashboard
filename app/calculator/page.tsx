import Calculator from "./Calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Cost Calculator | Sam Li",
  description:
    "Estimate the cost to build your website. Customize by site type, features, design, and timeline to get an instant project estimate.",
  keywords: [
    "website cost",
    "web development pricing",
    "build a website cost",
    "website quote",
  ],
  alternates: {
    canonical: "https://samliweisen.dev/calculator",
  },
};

export default function CalculatorPage() {
  return <Calculator />;
}
