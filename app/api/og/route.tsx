import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Dynamic OG image for social sharing.
 * Visit /api/og to see the generated image.
 * This appears when someone shares your link on Twitter, Facebook, LinkedIn, etc.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Invoice icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.2)",
            marginBottom: "30px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          SnapInvoice
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.85)",
            marginTop: "16px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Create Professional Invoices in Seconds — 100% Free
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {["No Signup", "Free PDF", "Beautiful Templates"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "99px",
                padding: "8px 20px",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
