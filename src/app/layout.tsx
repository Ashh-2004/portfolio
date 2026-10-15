import type { Metadata, Viewport } from "next";
import { Bowlby_One, Inter } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import { Toaster } from "sonner";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

const bowlbyOne = Bowlby_One({
  subsets: ["latin"],
  variable: "--font-lateral",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-aeonik-pro",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.seo.siteUrl),
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  keywords: [
    "M Ashish Ramana",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "FastAPI",
    "XGBoost",
    "RAG",
    "LangChain",
    "Bengaluru AI Developer",
  ],
  authors: [{ name: portfolio.profile.name, url: portfolio.seo.siteUrl }],
  creator: portfolio.profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolio.seo.siteUrl,
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    siteName: `${portfolio.profile.name} Portfolio`,
    images: [
      {
        url: portfolio.seo.ogImage,
        width: 1200,
        height: 630,
        alt: portfolio.profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    images: [portfolio.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.profile.name,
    jobTitle: portfolio.profile.title,
    url: portfolio.seo.siteUrl,
    sameAs: [
      portfolio.socials.github,
      portfolio.socials.linkedin,
      portfolio.socials.twitter,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "India",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Bangalore Institute of Technology",
      },
      {
        "@type": "EducationalOrganization",
        name: "St. Joseph's University",
      },
    ],
    knowsAbout: portfolio.heroStack,
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bowlbyOne.variable} ${inter.variable} scroll-smooth font-sans`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-paper-white text-carbon min-h-screen selection:bg-electric-blue selection:text-carbon"
      >
        <script
          id="schema-org-graph"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #000000",
              borderRadius: "20px",
              boxShadow: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
