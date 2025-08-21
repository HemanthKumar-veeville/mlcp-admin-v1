import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourwebsite.com"),
  title: {
    default: "Your Company - Welcome to Excellence",
    template: "%s | Your Company",
  },
  description:
    "Discover excellence with our innovative solutions. We provide top-tier services and products designed to elevate your business to new heights.",
  keywords: [
    "business solutions",
    "innovation",
    "excellence",
    "professional services",
    "technology",
  ],
  authors: [{ name: "Your Company Team" }],
  creator: "Your Company",
  publisher: "Your Company",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    siteName: "Your Company",
    title: "Your Company - Welcome to Excellence",
    description:
      "Discover excellence with our innovative solutions. We provide top-tier services and products designed to elevate your business to new heights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Company - Excellence in Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Company - Welcome to Excellence",
    description: "Discover excellence with our innovative solutions.",
    images: ["/og-image.jpg"],
    creator: "@yourcompany",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://yourwebsite.com",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Your Company",
              url: "https://yourwebsite.com",
              logo: "https://yourwebsite.com/logo.png",
              description:
                "Discover excellence with our innovative solutions. We provide top-tier services and products designed to elevate your business to new heights.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Business Street",
                addressLocality: "Business City",
                addressRegion: "BC",
                postalCode: "12345",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://twitter.com/yourcompany",
                "https://linkedin.com/company/yourcompany",
                "https://facebook.com/yourcompany",
              ],
            }),
          }}
        />
      </head>
      <body className={montserrat.className}>
        <ReduxProvider>
          <div className="bg-[#fdfaf6] w-full h-screen max-w-[400px] max-h-screen mx-auto">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
