"use client";

import React, { useState, useEffect } from "react";
import { InvoiceData, createDefaultInvoice } from "@/lib/types";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import PDFGenerator from "@/components/PDFGenerator";
import AdSlot from "@/components/AdSlot";
import PremiumBanner from "@/components/PremiumBanner";
import Link from "next/link";

const STORAGE_KEY = "snapinvoice_data";

export default function Home() {
  const [data, setData] = useState<InvoiceData>(createDefaultInvoice);
  const [hydrated, setHydrated] = useState(false);

  /* Load saved data from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...createDefaultInvoice(), ...parsed });
      }
    } catch {
      /* ignore corrupted data */
    }
    setHydrated(true);
  }, []);

  /* Auto-save to localStorage on every change */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* localStorage full or unavailable */
    }
  }, [data, hydrated]);

  const handleReset = () => {
    if (confirm("Start a new invoice? This will clear your current data.")) {
      const fresh = createDefaultInvoice();
      setData(fresh);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          <nav className="flex items-center gap-4">
            <Link
              href="/templates"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Templates
            </Link>
            <button onClick={handleReset} className="btn-secondary text-xs py-1.5 px-3">
              New Invoice
            </button>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-10 sm:py-14 text-center px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight max-w-3xl mx-auto">
          Create Professional Invoices in Seconds —{" "}
          <span className="text-brand-600">100% Free</span>
        </h1>
        <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
          No signup, no watermarks, no limits. Fill in your details, preview
          live, and download a beautiful PDF instantly.
        </p>
      </section>

      {/* ===== TOP AD BANNER ===== */}
      <AdSlot size="banner" className="py-4" />

      {/* ===== MAIN APP ===== */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <InvoiceForm data={data} onChange={setData} />
            </div>
            {/* Premium upsell below form */}
            <PremiumBanner />
          </div>

          {/* Right: Preview + actions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Live Preview
              </h2>
              <PDFGenerator data={data} />
            </div>

            {/* Invoice preview */}
            <InvoicePreview data={data} />

            {/* Sidebar ad below preview */}
            <AdSlot size="rectangle" className="pt-4" />
          </div>
        </div>
      </main>

      {/* ===== BOTTOM AD ===== */}
      <AdSlot size="banner" className="py-6" />

      {/* ===== SEO CONTENT ===== */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Free Invoice Generator — No Signup Required
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SnapInvoice is the fastest way to create professional invoices
              online. Whether you&apos;re a freelancer, contractor, or small business
              owner, our free invoice maker helps you bill your clients in
              seconds. No account needed — just fill in your details and
              download a clean PDF.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Create an Invoice Online
            </h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 leading-relaxed">
              <li>
                <strong>Enter your business information</strong> — name, address,
                email, and optionally upload your logo.
              </li>
              <li>
                <strong>Add your client&apos;s details</strong> — who you&apos;re billing
                and their contact info.
              </li>
              <li>
                <strong>Add line items</strong> — describe each service or
                product, set the quantity and rate.
              </li>
              <li>
                <strong>Set tax &amp; discounts</strong> — apply a tax percentage
                and optional flat discount.
              </li>
              <li>
                <strong>Download your PDF</strong> — one click generates a
                high-quality invoice ready to send.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Freelancers Love SnapInvoice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  desc: "Create invoices in under 60 seconds. No bloated forms or confusing dashboards.",
                },
                {
                  icon: "🎨",
                  title: "Professional Design",
                  desc: "Clean, modern templates that make your business look polished and trustworthy.",
                },
                {
                  icon: "🔒",
                  title: "100% Private",
                  desc: "Everything runs in your browser. We never see or store your data.",
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Invoice Templates for Every Business
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Choose from multiple invoice templates designed for different
              industries. Our Classic, Modern, and Minimal templates are free
              forever. Need more options? Upgrade to{" "}
              <Link href="/templates" className="text-brand-600 font-medium hover:underline">
                SnapInvoice Premium
              </Link>{" "}
              for Bold, Corporate, Creative, Dark, and Elegant styles — plus
              the ability to save invoices and create recurring billing.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
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
                <span className="font-bold text-gray-900">
                  Snap<span className="text-brand-600">Invoice</span>
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Free professional invoices for freelancers and small businesses.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-brand-600 transition-colors">
                    Invoice Generator
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-brand-600 transition-colors">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Affiliate / recommended tools
                ============================================================
                AFFILIATE LINKS — Replace # with your affiliate URLs.
                Sign up for affiliate programs at:
                - QuickBooks: https://quickbooks.intuit.com/partners/
                - FreshBooks: https://www.freshbooks.com/affiliate-program
                - Wave: https://www.waveapps.com/affiliates
                ============================================================ */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Recommended Tools
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600 transition-colors"
                  >
                    QuickBooks — Accounting Software
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600 transition-colors"
                  >
                    FreshBooks — Invoicing &amp; Time Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600 transition-colors"
                  >
                    Wave — Free Accounting
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} SnapInvoice. All rights reserved. Made with ❤️ for
            freelancers everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
