# 🧾 SnapInvoice — Free Invoice Generator

> Create professional invoices in seconds. No signup, no watermarks, no limits.

SnapInvoice is a **passive-income web app** that makes money through Google AdSense ads, premium subscriptions via Stripe, and affiliate links to accounting software — all while providing genuine value to freelancers and small businesses.

---

## 💰 How This Makes Money

| Revenue Stream | Monthly Estimate | How |
|---|---|---|
| Google AdSense | $90–$450/mo | SEO traffic from "free invoice generator" (100K+ monthly searches) |
| Premium Tier ($4.99/mo) | $100–$500/mo | No ads, extra templates, save invoices |
| Affiliate Links | $50–$200/mo | QuickBooks, FreshBooks, Wave referrals |
| **Total (Month 6+)** | **$240–$1,150/mo** | Grows as SEO traffic builds |

---

## 🚀 Section 1: Launch in Under 30 Minutes

You don't need to know how to code. Just follow these steps exactly.

### Step 1: Create a GitHub Account

1. Go to **[github.com](https://github.com)**
2. Click **"Sign up"** in the top right
3. Enter your email, create a password, choose a username
4. Verify your email address

### Step 2: Create a New Repository

1. Once logged in, click the **"+"** button in the top-right corner
2. Click **"New repository"**
3. Name it: `snapinvoice`
4. Set it to **Public**
5. Do NOT check "Add a README" (we already have one)
6. Click **"Create repository"**

### Step 3: Upload All Files

**Option A — GitHub Web Upload (easiest, no coding):**

1. On your new repo page, you'll see "uploading an existing file"
2. Click that link
3. Drag and drop the ENTIRE `snapinvoice` folder contents into the browser
   - You need to maintain the folder structure. Upload in batches if needed:
   - First: all root files (package.json, next.config.js, tsconfig.json, etc.)
   - Then create folders via "Add file" > "Create new file" and type `app/layout.tsx` etc.
4. Click **"Commit changes"**

**Option B — Git command line (faster if you have git installed):**

```bash
cd snapinvoice
git init
git add .
git commit -m "Initial commit - SnapInvoice"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/snapinvoice.git
git push -u origin main
```

### Step 4: Deploy on Vercel (Free)

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. You'll land on the dashboard. Click **"Add New..."** → **"Project"**
5. Find your `snapinvoice` repository and click **"Import"**
6. Vercel auto-detects it's a Next.js project — **don't change any settings**
7. Click **"Deploy"**
8. Wait 1-2 minutes... ✅ **Your site is live!**
9. Vercel gives you a URL like `snapinvoice-abc123.vercel.app` — that's your live site

**🎉 Congratulations! Your invoice generator is live on the internet.**

---

## 🌐 Section 2: Connect a Custom Domain ($10-12/year)

A custom domain (like `snapinvoice.com`) looks more professional and helps with SEO.

### Step 1: Buy a Domain

1. Go to **[namecheap.com](https://namecheap.com)**
2. Search for a domain name. Suggestions:
   - `snapinvoice.com`
   - `snapinvoice.io`
   - `freeinvoicegen.com`
   - `invoicesnap.com`
3. Add to cart and purchase (usually $10-12/year for `.com`)
4. Create a Namecheap account if needed

### Step 2: Connect Domain to Vercel

1. Go to your **Vercel dashboard** → click on your project
2. Go to **Settings** → **Domains**
3. Type your domain name (e.g., `snapinvoice.com`) and click **Add**
4. Vercel will show you DNS records to configure

### Step 3: Update DNS at Namecheap

1. Log into **Namecheap** → **Domain List** → click **Manage** next to your domain
2. Go to **Advanced DNS** tab
3. Delete any existing records
4. Add these records (Vercel will tell you the exact values):

| Type | Host | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

5. Save changes
6. Wait 5-30 minutes for DNS to propagate
7. Go back to Vercel — it should show a green checkmark ✅
8. Vercel automatically sets up HTTPS (free SSL certificate)

**Update these files after connecting your domain:**
- `app/layout.tsx` — change `https://snapinvoice.com` to your domain in metadata
- `app/sitemap.ts` — change the `baseUrl`
- `app/robots.ts` — change the sitemap URL

---

## 💵 Section 3: Set Up Google AdSense (Free Money from Traffic)

AdSense shows ads on your site and pays you per impression/click. At 1,000-5,000 daily visitors, you can earn $3-15/day.

### Step 1: Apply for AdSense

1. Go to **[adsense.google.com](https://adsense.google.com)**
2. Click **"Get started"**
3. Enter your website URL
4. Connect your Google account
5. Fill out your payment information (address, etc.)
6. Submit for review

### Step 2: Wait for Approval

- Takes **1-3 days** typically (can take up to 2 weeks for brand new sites)
- Your site needs some traffic first — submit to Google Search Console first (Section 5)
- **Tip:** Having quality content and a professional design helps approval. Your site already looks great!

### Step 3: Get Your Publisher ID

1. Once approved, go to your AdSense dashboard
2. Click **Account** → **Account information**
3. Find your **Publisher ID** — it looks like `ca-pub-1234567890123456`

### Step 4: Activate Ads on Your Site

1. Open `app/layout.tsx`
2. Find the commented-out AdSense script (search for `GOOGLE ADSENSE`)
3. Uncomment it and replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID:

```jsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID_HERE"
  crossOrigin="anonymous"
/>
```

4. Open `components/AdSlot.tsx`
5. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
6. Replace `0000000000` with your ad unit IDs (create these in AdSense → Ads → By ad unit)
7. Commit and push — Vercel auto-deploys

**That's it! Ads will now show on your site and earn you money.**

---

## 💳 Section 4: Set Up Stripe Payments

Stripe handles premium subscriptions. When someone pays $4.99/mo, the money goes directly to your bank account.

### Step 1: Create a Stripe Account

1. Go to **[stripe.com](https://stripe.com)**
2. Click **"Start now"**
3. Create your account
4. Complete identity verification
5. Add your bank account for payouts

### Step 2: Create a Payment Link

1. In the Stripe dashboard, go to **Payment Links** (left sidebar)
2. Click **"+ New"**
3. Click **"+ Add new product"**
4. Product name: `SnapInvoice Premium`
5. Price: `$4.99` — select **Recurring** → **Monthly**
6. Click **"Create link"**
7. Copy the link URL (looks like `https://buy.stripe.com/abc123xyz`)

### Step 3: Add the Link to Your Site

1. Open `components/PremiumBanner.tsx`
2. Replace `https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE` with your real link
3. Open `app/templates/page.tsx`
4. Replace the same placeholder URL there too
5. Commit and push

**Now when anyone clicks "Upgrade" or "Unlock Premium", they go to your Stripe checkout page. Money deposits to your bank account automatically.**

---

## 🔍 Section 5: SEO Setup (One-Time, 15 min)

This is how people find your site on Google. **Do this immediately after launch.**

### Google Search Console

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**
2. Click **"Add property"**
3. Choose **"URL prefix"** and enter your full URL (e.g., `https://snapinvoice.com`)
4. Verify ownership:
   - If using Vercel with a custom domain, choose **DNS verification**
   - Add the TXT record Namecheap (Advanced DNS)
5. Once verified, go to **Sitemaps** in the left sidebar
6. Enter `sitemap.xml` and click **Submit**
7. Go to **URL Inspection**, paste your homepage URL, click **"Request Indexing"**

### Bing Webmaster Tools

1. Go to **[bing.com/webmasters](https://www.bing.com/webmasters)**
2. Sign in and add your site
3. You can import from Google Search Console directly
4. Submit your sitemap here too

### Google Business Profile (Optional but Helpful)

1. Go to **[business.google.com](https://business.google.com)**
2. Create a listing for "SnapInvoice"
3. Category: "Software company" or "Internet company"
4. This helps with local search visibility

---

## 📊 Section 6: Monetization Breakdown

### Realistic Revenue Timeline

**Month 1 (just launched):**
- Traffic: 50-200 visitors/day (from Reddit posts, social sharing)
- AdSense: $1-5/day → **$30-150/mo**
- Premium subs: 0-5 → **$0-25/mo**
- **Total: $30-175/mo**

**Month 3 (SEO starting to kick in):**
- Traffic: 500-1,500 visitors/day
- AdSense: $5-15/day → **$150-450/mo**
- Premium subs: 5-20 → **$25-100/mo**
- Affiliates: **$25-75/mo**
- **Total: $200-625/mo**

**Month 6 (established SEO):**
- Traffic: 1,000-5,000 visitors/day
- AdSense: $10-30/day → **$300-900/mo**
- Premium subs: 20-80 → **$100-400/mo**
- Affiliates: **$50-200/mo**
- **Total: $450-1,500/mo**

### Revenue Math

- **AdSense RPM** (revenue per 1,000 pageviews): $3-8 for finance/invoicing niche
- **At 3,000 daily visitors** (very achievable for "free invoice generator"):
  - ~90,000 monthly pageviews × $5 RPM = **$450/mo from ads alone**
- **Premium conversion**: Even 1% of visitors = 900/mo × 1% = 9 new subscribers
  - At $4.99/mo, subscribers compound: Month 6 could be 40+ active subscribers = **$200/mo**

---

## 🎯 Section 7: First 3 Things After Launch

### 1. Submit to Google Search Console + Request Indexing

(See Section 5 above — do this within the first hour of launching)

### 2. Post on Reddit

Write authentic, helpful posts. **Don't be spammy.** Something like:

> **Title:** "I built a free invoice generator — no signup, no watermarks, just make your invoice and download the PDF"
>
> **Body:** "Hey everyone! I made a simple tool for creating professional invoices. It's 100% free — no account needed, no ads on the invoice itself. Just fill in your details and download a PDF. Built it because I was tired of tools that require signups just to make a simple invoice. Hope it's useful! [link]"

Post in these subreddits (space them out over a few days):
- **r/freelance** (300K+ members)
- **r/smallbusiness** (700K+ members)
- **r/Entrepreneur** (2M+ members)
- **r/SideProject** (100K+ members)
- **r/webdev** (1M+ members) — angle: "I built this free tool"
- **r/InternetIsBeautiful** (17M+ members) — if your post gets traction here, expect huge traffic

### 3. Set Up Social Media Presence

**Twitter/X:**
1. Create an account: `@SnapInvoice` (or similar)
2. Bio: "Free invoice generator for freelancers & small businesses. No signup needed. 🧾"
3. Pin a tweet with a link to your site
4. Post 1 tip/day about invoicing, freelancing, or getting paid:
   - "5 things every freelance invoice should include"
   - "How to politely follow up on late payments"
   - "Invoice numbering best practices"
   - Always include a subtle link: "Create your next invoice free → [link]"

**Product Hunt:**
1. Go to **[producthunt.com](https://producthunt.com)**
2. Submit SnapInvoice as a new product
3. Best to launch on a Tuesday or Wednesday
4. A good Product Hunt launch can bring 1,000+ visitors in a day

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| jsPDF + html2canvas | Client-side PDF generation |
| Vercel | Free hosting with auto-deploy |
| Stripe | Premium subscription payments |

---

## 📁 Project Structure

```
snapinvoice/
├── app/
│   ├── api/og/route.tsx      # Dynamic OG image for social sharing
│   ├── templates/page.tsx     # Template gallery page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with SEO + AdSense
│   ├── page.tsx               # Main app — invoice generator
│   ├── robots.ts              # robots.txt for SEO
│   └── sitemap.ts             # Auto-generated sitemap
├── components/
│   ├── AdSlot.tsx             # Reusable ad placement
│   ├── InvoiceForm.tsx        # Invoice input form
│   ├── InvoicePreview.tsx     # Live invoice preview
│   ├── PDFGenerator.tsx       # PDF download button
│   └── PremiumBanner.tsx      # Premium upsell CTA
├── lib/
│   └── types.ts               # TypeScript types + helpers
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md                  # This file — deployment guide
```

---

## ❓ FAQ

**Q: Do I need to know how to code?**
A: No! Just follow the deployment steps above. Everything is pre-built and ready to go.

**Q: How much does it cost to run?**
A: $0-12/year. Vercel hosting is free. The only cost is a custom domain (~$10-12/year, optional).

**Q: How long until I make money?**
A: AdSense revenue starts within days of getting approved. SEO traffic builds over 1-3 months. Realistic to hit $200+/mo within 3 months.

**Q: Can I customize the design?**
A: Yes! Edit the Tailwind classes in any component. Colors are in `tailwind.config.ts` under `brand`.

**Q: Is user data stored anywhere?**
A: No. Everything stays in the user's browser via localStorage. Zero server-side data storage. This is a privacy selling point!

---

## 📝 License

MIT — do whatever you want with it. Build your passive income! 💪
