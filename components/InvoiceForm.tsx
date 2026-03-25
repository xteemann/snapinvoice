"use client";

import React, { useRef } from "react";
import {
  InvoiceData,
  LineItem,
  CURRENCY_OPTIONS,
  Currency,
} from "@/lib/types";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  /* ---- helpers ---- */
  const set = (patch: Partial<InvoiceData>) => onChange({ ...data, ...patch });

  const setItem = (id: string, patch: Partial<LineItem>) => {
    set({
      items: data.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const addItem = () => {
    set({
      items: [
        ...data.items,
        {
          id: crypto.randomUUID?.() ?? String(Date.now()),
          description: "",
          quantity: 1,
          rate: 0,
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (data.items.length === 1) return;
    set({ items: data.items.filter((item) => item.id !== id) });
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set({ logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  /* ---- section wrapper ---- */
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ========== YOUR BUSINESS INFO ========== */}
      <Section title="Your Business">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="label-text">Business / Your Name</label>
            <input
              className="input-field"
              placeholder="Acme Corp"
              value={data.senderName}
              onChange={(e) => set({ senderName: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Address</label>
            <input
              className="input-field"
              placeholder="123 Main St, City, State 12345"
              value={data.senderAddress}
              onChange={(e) => set({ senderAddress: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@company.com"
              value={data.senderEmail}
              onChange={(e) => set({ senderEmail: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Phone</label>
            <input
              className="input-field"
              placeholder="(555) 123-4567"
              value={data.senderPhone}
              onChange={(e) => set({ senderPhone: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Logo</label>
            <div className="flex items-center gap-3">
              {data.logoUrl && (
                <img
                  src={data.logoUrl}
                  alt="Logo"
                  className="h-10 w-10 rounded object-contain border border-gray-200"
                />
              )}
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                {data.logoUrl ? "Change Logo" : "Upload Logo"}
              </button>
              {data.logoUrl && (
                <button
                  type="button"
                  onClick={() => set({ logoUrl: null })}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogo}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ========== CLIENT INFO ========== */}
      <Section title="Bill To">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="label-text">Client Name</label>
            <input
              className="input-field"
              placeholder="Client Company Inc."
              value={data.clientName}
              onChange={(e) => set({ clientName: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Client Address</label>
            <input
              className="input-field"
              placeholder="456 Oak Ave, Town, State 67890"
              value={data.clientAddress}
              onChange={(e) => set({ clientAddress: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-text">Client Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="client@example.com"
              value={data.clientEmail}
              onChange={(e) => set({ clientEmail: e.target.value })}
            />
          </div>
        </div>
      </Section>

      {/* ========== INVOICE DETAILS ========== */}
      <Section title="Invoice Details">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="label-text">Invoice #</label>
            <input
              className="input-field"
              value={data.invoiceNumber}
              onChange={(e) => set({ invoiceNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Invoice Date</label>
            <input
              type="date"
              className="input-field"
              value={data.invoiceDate}
              onChange={(e) => set({ invoiceDate: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Due Date</label>
            <input
              type="date"
              className="input-field"
              value={data.dueDate}
              onChange={(e) => set({ dueDate: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Currency</label>
            <select
              className="input-field"
              value={data.currency}
              onChange={(e) => set({ currency: e.target.value as Currency })}
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* ========== LINE ITEMS ========== */}
      <Section title="Line Items">
        <div className="space-y-2">
          {/* Header row (desktop only) */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1" />
          </div>

          {data.items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-gray-50 rounded-lg p-2"
            >
              <div className="sm:col-span-5">
                <input
                  className="input-field text-sm"
                  placeholder="Service description"
                  value={item.description}
                  onChange={(e) =>
                    setItem(item.id, { description: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  min={0}
                  step={1}
                  className="input-field text-sm text-right"
                  placeholder="Qty"
                  value={item.quantity || ""}
                  onChange={(e) =>
                    setItem(item.id, {
                      quantity: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  className="input-field text-sm text-right"
                  placeholder="0.00"
                  value={item.rate || ""}
                  onChange={(e) =>
                    setItem(item.id, {
                      rate: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2 text-right text-sm font-medium text-gray-700 px-1">
                {(item.quantity * item.rate).toFixed(2)}
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={data.items.length === 1}
                  className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Line Item
        </button>
      </Section>

      {/* ========== TAX & DISCOUNT ========== */}
      <Section title="Tax & Discount">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Tax Rate (%)</label>
            <input
              type="number"
              min={0}
              step={0.1}
              className="input-field"
              placeholder="0"
              value={data.taxRate || ""}
              onChange={(e) =>
                set({ taxRate: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div>
            <label className="label-text">Discount (flat)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="input-field"
              placeholder="0.00"
              value={data.discount || ""}
              onChange={(e) =>
                set({ discount: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </div>
      </Section>

      {/* ========== NOTES & TERMS ========== */}
      <Section title="Notes & Terms">
        <div className="space-y-3">
          <div>
            <label className="label-text">Notes</label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Thank you for your business!"
              value={data.notes}
              onChange={(e) => set({ notes: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Terms & Conditions</label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Payment is due within 30 days..."
              value={data.terms}
              onChange={(e) => set({ terms: e.target.value })}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
