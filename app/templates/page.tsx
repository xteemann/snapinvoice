"use client";

import React from "react";
import Link from "next/link";

/**
 * Template data — each template has a name, description, color scheme preview,
 * and whether it's free or premium.
 */
const TEMPLATES = [
  {
    name: "Classic",
    slug: "classic",
    description: "Traditional layout with clean lines. Perfect for any business.",
    gradient: "from-blue-500 to-blue-700",
    accent: "bg-blue-600",
    free: true,
  },
  {
    name: "Modern",
    slug: "modern",
    description: "Sleek, contemporary design with bold header. Great for tech & creative.",
    gradient: "from-indigo-500 to-purple-600",
    accent: "bg-indigo-600",
    free: true,
  },
  {
    name: "Minimal",
    slug: "minimal",
    description: "Clean whitespace-focused layout. Let your content speak for itself.",
    gradient: "from-gray-400 to-gray-600",
    accent: "bg-gray-500",
    free: true,
  },
  {
    name: "Bold",
    slug: "bold",
    description: "Strong typography and vibrant colors that make a statement.",
    gradient: "from-orange-500 to-red-600",
    accent: "bg-orange-600",
    free: false,
  },
  {
    name: "Corporate",
    slug: "corporate",
    description: "Professional and refined. Ideal for enterprise and B2B billing.",
    gradient: "from-slate-600 to-slate-800",
    accent: "bg-slate-700",
    free: false,
  },
  {
    name: "Creative",
    slug: "creative",
    description: "Unique layout with colorful accents for designers and artists.",
    gradient: "from-pink-500 to-violet-600",
    accent: "bg-pink-600",
    free: false,
  },
  {
    name: "Dark",
    slug: "dark",
    description: "Striking dark theme that stands out in any inbox.",
    gradient: "from-gray-800 to-gray-950",
    accent: "bg-gray-800",
    free: false,
  },
  {
    name: "Elegant",
    slug: "elegant",
    description: "Sophisticated serif typography with golden accents.",
    gradient: "from-amber-600 to-yellow-700",
    accent: "bg-amber-600",
    free: false,
  },
];

/**
 * STRIPE_PAYMENT_LINK — Replace with your Stripe Payment Link URL.
 * See README.md Section 4 for setup instructions.
 */
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ===== NAVIGATION ===== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Snap<span className="text-brand-600">Invoice</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
          >
            ← Back to Generator
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-12 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Invoice Templates
        </h1>
        <p className="mt-3 text-gray-500 text-lg max-w-lg mx-auto">
          Choose from 8 professionally designed templates. 3 free forever — upgrade for the full collection.
        </p>
      </section>

      {/* ===== TEMPLATE GRID ===== */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <div
              key={template.slug}
              className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Template preview */}
              <div
                className={`h-44 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}
              >
                {/* Fake invoice miniature */}
                <div className="bg-white/90 rounded-lg shadow-md w-28 h-36 p-2.5 text-left">
                  <div className={`h-1.5 w-12 ${template.accent} rounded-full mb-2`} />
                  <div className="space-y-1">
                    <div className="h-1 w-16 bg-gray-300 rounded-full" />
                    <div className="h-1 w-10 bg-gray-200 rounded-full" />
                  </div>
                  <div className="mt-3 space-y-0.5">
                    <div className="h-0.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-0.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className={`h-1.5 w-8 ${template.accent} rounded-full`} />
                  </div>
                </div>

                {/* Premium badge */}
                {!template.free && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-amber-700 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <span>✨</span> Premium
                  </div>
                )}

                {/* Free badge */}
                {template.free && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-green-700 px-2 py-0.5 rounded-full shadow-sm">
                    Free
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>

                <div className="mt-3">
                  {template.free ? (
                    <Link
                      href="/"
                      className="inline-block w-full text-center text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Use This Template
                    </Link>
                  ) : (
                    <a
                      href={STRIPE_PAYMENT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-lg transition-colors"
                    >
                      Unlock Premium — $4.99/mo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA section */}
        <div className="mt-12 text-center bg-gradient-to-r from-brand-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-3">
            Unlock All Templates + Premium Features
          </h2>
          <p className="text-blue-100 max-w-md mx-auto mb-6">
            Get 5 extra templates, remove all ads, save invoices to cloud, set up
            recurring invoices, and more.
          </p>
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
          >
            Get Premium — $4.99/mo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} SnapInvoice. All rights reserved.
      </footer>
    </div>
  );
}
