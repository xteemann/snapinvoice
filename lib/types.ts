/** Core data types for SnapInvoice */

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  /* Sender / your business */
  senderName: string;
  senderAddress: string;
  senderEmail: string;
  senderPhone: string;
  logoUrl: string | null;

  /* Client */
  clientName: string;
  clientAddress: string;
  clientEmail: string;

  /* Invoice meta */
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  /* Line items */
  items: LineItem[];

  /* Financials */
  taxRate: number; // percentage, e.g. 10 = 10%
  discount: number; // flat amount in selected currency

  /* Currency */
  currency: Currency;

  /* Notes */
  notes: string;
  terms: string;

  /* Template */
  template: TemplateName;
}

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "CA$",
  AUD: "A$",
};

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD (CA$)" },
  { value: "AUD", label: "AUD (A$)" },
];

export type TemplateName =
  | "classic"
  | "modern"
  | "minimal"
  | "bold"
  | "corporate"
  | "creative"
  | "dark"
  | "elegant";

export const FREE_TEMPLATES: TemplateName[] = ["classic", "modern", "minimal"];
export const PREMIUM_TEMPLATES: TemplateName[] = [
  "bold",
  "corporate",
  "creative",
  "dark",
  "elegant",
];

/** Helper to generate a fresh invoice with sensible defaults */
export function createDefaultInvoice(): InvoiceData {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 30);

  return {
    senderName: "",
    senderAddress: "",
    senderEmail: "",
    senderPhone: "",
    logoUrl: null,
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    invoiceDate: today.toISOString().split("T")[0],
    dueDate: due.toISOString().split("T")[0],
    items: [
      { id: crypto.randomUUID?.() ?? "1", description: "", quantity: 1, rate: 0 },
    ],
    taxRate: 0,
    discount: 0,
    currency: "USD",
    notes: "",
    terms: "Payment is due within 30 days of the invoice date.",
    template: "classic",
  };
}

/** Compute subtotal, tax, discount, and total */
export function computeTotals(data: InvoiceData) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const taxAmount = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmount - data.discount;
  return { subtotal, taxAmount, total: Math.max(total, 0) };
}

/** Format a number as currency */
export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
