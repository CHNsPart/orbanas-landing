import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbanas - Complete Business Solutions | Saudi Arabia",
  description: "Transform your Saudi business with 12 integrated divisions. From Aramco compliance to cloud migration - one partnership, infinite possibilities.",
  keywords: [
    "Orbanas",
    "Saudi Arabia Business Solutions",
    "Aramco Compliance",
    "Digital Transformation KSA",
    "IT Solutions Dammam",
    "Microsoft 365 Saudi",
    "ISO Certification Saudi"
  ],
  authors: [{ name: "Orbanas" }],
  creator: "Orbanas",
  publisher: "Orbanas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://orbanas.sa"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    title: "Orbanas - Complete Business Solutions | Saudi Arabia",
    description: "Transform your Saudi business with 12 integrated divisions. From Aramco compliance to cloud migration - one partnership, infinite possibilities.",
    url: "https://orbanas.sa",
    siteName: "Orbanas",
    locale: "en_US",
    alternateLocale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orbanas - Complete Business Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbanas - Complete Business Solutions | Saudi Arabia",
    description: "Transform your Saudi business with 12 integrated divisions. One partnership, infinite possibilities.",
    images: ["/twitter-image.jpg"],
  },
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#F28111" />
        <meta name="msapplication-TileColor" content="#F28111" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/orbanas-logo.svg" as="image" type="image/svg+xml" />
        

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <LanguageProvider defaultLanguage="en">
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Skip to main content
          </a>
          
          {/* Main content wrapper */}
          <div id="main-content" className="relative">
            {children}
          </div>
          
          {/* Loading indicator for better UX */}
          <div id="loading-indicator" className="hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </LanguageProvider>
        
        {/* Analytics script placeholder */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics or other analytics scripts */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // Analytics tracking code
                  console.log('Analytics loaded for Orbanas');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}