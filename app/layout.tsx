import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapInvoice — Free Invoice Generator | Create Professional Invoices Online",
  description:
    "Create and download professional invoices in seconds — 100% free, no signup required. The fastest online invoice maker for freelancers, small businesses, and contractors.",
  keywords: [
    "free invoice generator",
    "invoice maker",
    "create invoice online",
    "invoice template",
    "online invoice generator",
    "free invoice maker",
    "invoice creator",
    "professional invoice",
    "freelance invoice",
    "small business invoice",
    "printable invoice",
    "PDF invoice generator",
  ],
  authors: [{ name: "SnapInvoice" }],
  creator: "SnapInvoice",
  publisher: "SnapInvoice",
  robots: { index: true, follow: true },
  verification: { google: "OSpdm3T3OfYrTZbWpKV3IkOtRMpI5D0ZG6p2pzIUr34" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snapinvoice.com",
    siteName: "SnapInvoice",
    title: "SnapInvoice — Free Invoice Generator | No Signup Required",
    description:
      "Create professional invoices in seconds. Free, fast, and beautiful. Download as PDF instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapInvoice — Free Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapInvoice — Free Invoice Generator",
    description:
      "Create professional invoices in seconds. Free, fast, no signup. Download PDF instantly.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://snapinvoice.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ============================================================
            GOOGLE ADSENSE — Replace ca-pub-XXXXXXXXXXXXXXXX with your
            AdSense publisher ID after approval.
            1. Go to https://adsense.google.com
            2. Sign up / get approved
            3. Find your publisher ID (starts with ca-pub-)
            4. Uncomment the script below and paste your ID
            ============================================================ */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4388032126259103"
          crossOrigin="anonymous"
        />

        {/* ============================================================
            GOOGLE ANALYTICS — Replace G-XXXXXXXXXX with your GA4 ID.
            1. Go to https://analytics.google.com
            2. Create a new property for your domain
            3. Get the Measurement ID (starts with G-)
            4. Uncomment and replace below
            ============================================================ */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}

        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
