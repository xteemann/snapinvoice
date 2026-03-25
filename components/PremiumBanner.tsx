"use client";

import React from "react";

/**
 * PremiumBanner — Subtle upsell CTA for the premium tier.
 *
 * SETUP:
 * 1. Create a Stripe account at https://stripe.com
 * 2. Go to Payment Links and create a new link:
 *    - Product: "SnapInvoice Premium"
 *    - Price: $4.99/month (recurring)
 * 3. Copy the payment link URL
 * 4. Replace STRIPE_PAYMENT_LINK below
 */

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE";

export default function PremiumBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 p-6 text-white shadow-lg">
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">✨</span>
            <h3 className="text-lg font-bold">Go Premium</h3>
          </div>
          <p className="text-sm text-blue-100 max-w-md">
            No ads, 5 extra templates, save invoices to cloud, recurring invoices &amp;
            more — just <span className="font-semibold text-white">$4.99/mo</span>.
          </p>
        </div>
        <a
          href={STRIPE_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-blue-50 active:scale-[0.97]"
        >
          Upgrade Now
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
    </div>
  );
}
