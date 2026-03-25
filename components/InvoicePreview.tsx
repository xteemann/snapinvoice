"use client";

import React from "react";
import {
  InvoiceData,
  computeTotals,
  formatCurrency,
} from "@/lib/types";

interface InvoicePreviewProps {
  data: InvoiceData;
}

/**
 * InvoicePreview — Live, professional invoice that updates as the user types.
 * This element is also the capture target for PDF generation.
 */
export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const { subtotal, taxAmount, total } = computeTotals(data);
  const cur = data.currency;

  return (
    <div
      id="invoice-preview"
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* ===== Header Band ===== */}
      <div className="bg-brand-600 px-8 py-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {data.logoUrl && (
              <img
                src={data.logoUrl}
                alt="Logo"
                className="h-14 w-14 rounded-lg object-contain bg-white/20 p-1"
              />
            )}
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {data.senderName || "Your Business"}
              </h2>
              {data.senderAddress && (
                <p className="text-sm text-blue-100 mt-0.5">{data.senderAddress}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold tracking-tight">INVOICE</p>
            <p className="text-sm text-blue-200 mt-1">{data.invoiceNumber || "INV-000000"}</p>
          </div>
        </div>
      </div>

      {/* ===== Meta Row ===== */}
      <div className="grid grid-cols-2 gap-6 px-8 py-5 border-b border-gray-100 bg-gray-50/50">
        {/* Bill To */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
            Bill To
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {data.clientName || "Client Name"}
          </p>
          {data.clientAddress && (
            <p className="text-xs text-gray-500 mt-0.5">{data.clientAddress}</p>
          )}
          {data.clientEmail && (
            <p className="text-xs text-gray-500">{data.clientEmail}</p>
          )}
        </div>
        {/* Dates */}
        <div className="text-right space-y-1 text-sm">
          <div>
            <span className="text-gray-400 text-xs">Date: </span>
            <span className="font-medium text-gray-700">{data.invoiceDate || "—"}</span>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Due: </span>
            <span className="font-medium text-gray-700">{data.dueDate || "—"}</span>
          </div>
          {data.senderEmail && (
            <div>
              <span className="text-gray-400 text-xs">From: </span>
              <span className="font-medium text-gray-700">{data.senderEmail}</span>
            </div>
          )}
        </div>
      </div>

      {/* ===== Line Items Table ===== */}
      <div className="px-8 py-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left text-xs uppercase tracking-wider text-gray-400">
              <th className="pb-2 font-semibold">Description</th>
              <th className="pb-2 font-semibold text-right w-20">Qty</th>
              <th className="pb-2 font-semibold text-right w-24">Rate</th>
              <th className="pb-2 font-semibold text-right w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr
                key={item.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
              >
                <td className="py-2.5 pr-4 text-gray-700">
                  {item.description || (
                    <span className="text-gray-300 italic">Item description</span>
                  )}
                </td>
                <td className="py-2.5 text-right text-gray-600">{item.quantity}</td>
                <td className="py-2.5 text-right text-gray-600">
                  {formatCurrency(item.rate, cur)}
                </td>
                <td className="py-2.5 text-right font-medium text-gray-800">
                  {formatCurrency(item.quantity * item.rate, cur)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Totals ===== */}
      <div className="px-8 pb-6">
        <div className="flex justify-end">
          <div className="w-64 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal, cur)}</span>
            </div>
            {data.taxRate > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Tax ({data.taxRate}%)</span>
                <span>{formatCurrency(taxAmount, cur)}</span>
              </div>
            )}
            {data.discount > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Discount</span>
                <span>-{formatCurrency(data.discount, cur)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-gray-900 border-t-2 border-brand-600 pt-2 mt-2">
              <span>Total</span>
              <span>{formatCurrency(total, cur)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Notes & Terms ===== */}
      {(data.notes || data.terms) && (
        <div className="px-8 pb-6 space-y-3">
          {data.notes && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
                Notes
              </p>
              <p className="text-xs text-gray-600 whitespace-pre-line">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">
                Terms & Conditions
              </p>
              <p className="text-xs text-gray-500 whitespace-pre-line">{data.terms}</p>
            </div>
          )}
        </div>
      )}

      {/* ===== Footer ===== */}
      <div className="bg-gray-50 border-t border-gray-100 px-8 py-3 text-center">
        <p className="text-[10px] text-gray-400">
          Generated with SnapInvoice — Free Invoice Generator
        </p>
      </div>
    </div>
  );
}
