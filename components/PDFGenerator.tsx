"use client";

import React, { useState } from "react";
import type { InvoiceData } from "@/lib/types";

interface PDFGeneratorProps {
  data: InvoiceData;
}

/**
 * PDFGenerator — Captures the invoice preview via html2canvas and saves as PDF with jspdf.
 * Dynamically imports libraries to keep bundle small.
 */
export default function PDFGenerator({ data }: PDFGeneratorProps) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      /* Dynamic imports — only loaded when user clicks download */
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const element = document.getElementById("invoice-preview");
      if (!element) {
        alert("Could not find the invoice preview. Please try again.");
        return;
      }

      /* Capture the invoice preview at 2× resolution for crisp output */
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgHeight > 297 ? "portrait" : "portrait",
        unit: "mm",
        format: "a4",
      });

      /* If the content is taller than one A4 page, scale to fit */
      const pageHeight = 297;
      if (imgHeight > pageHeight) {
        const scaledWidth = (imgWidth * pageHeight) / imgHeight;
        const xOffset = (210 - scaledWidth) / 2;
        pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, pageHeight);
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      /* Build filename from invoice number */
      const filename = data.invoiceNumber
        ? `${data.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "_")}.pdf`
        : "invoice.pdf";

      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Something went wrong generating the PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className="btn-primary inline-flex items-center gap-2 w-full justify-center sm:w-auto disabled:opacity-60 disabled:cursor-wait"
    >
      {generating ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating…
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}
