"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function PremiumPage() {
  const { user, isPremium } = useAuth();

  if (isPremium) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
          fontFamily: "'VT323', monospace",
          color: "#00ff00"
        }}>
          <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.2rem", color: "#ffd700" }}>
            &#9733; You are Premium!
          </h1>
          <p style={{ fontSize: "1.4rem", marginTop: "2rem" }}>
            Thank you for supporting Basic64 School!
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            You now have full access to all levels 0-6.
          </p>
          <br />
          <Link href="/syllabus" style={{
            padding: "0.75rem 1.5rem",
            border: "2px solid #ffd700",
            background: "#000",
            color: "#ffd700",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.7rem",
            textDecoration: "none",
            display: "inline-block"
          }}>
            &#9650; CONTINUE LEARNING
          </Link>
        </div>
      </div>
    );
  }

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = '/';
      alert('Please login first to upgrade.');
      return;
    }
    // Open Stripe checkout - replace with your real Stripe checkout session ID
    const res = await fetch('/api/stripe/checkout', { method: 'POST' });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "'VT323', monospace",
        color: "#00ff00"
      }}>
        <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1rem", color: "#ffd700", textAlign: "center" }}>
          &#9733; UPGRADE TO PREMIUM -- $25
        </h1>

        <div style={{ background: "#0a1a0a", border: "2px solid #00ff00", padding: "2rem", marginTop: "2rem" }}>
          <h2 style={{ color: "#ffd700" }}>What you get:</h2>
          <ul style={{ fontSize: "1.3rem", lineHeight: "1.8" }}>
            <li>&#9650;  All 42 lessons -- Levels 0 through 6</li>
            <li>&#9650;  Full track access (Games, Creative Coding, Systems & Tools)</li>
            <li>&#9650;  Progress tracking across all levels</li>
            <li>&#9650;  One-time payment, no recurring fees</li>
          </ul>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "2rem", color: "#ffd700", margin: "0 0 1rem" }}>
              $25 -- one-time
            </p>
            <button
              onClick={handleUpgrade}
              style={{
                padding: "1rem 2rem",
                border: "2px solid #ffd700",
                background: "#ffd700",
                color: "#000",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              &#9650; UPGRADE NOW
            </button>
          </div>
        </div>

        {user && (
          <p style={{ marginTop: "2rem", color: "#335533", textAlign: "center" }}>
            Logged in as {user.email}. The payment will be linked to this account.
          </p>
        )}
      </div>
    </div>
  );
}
