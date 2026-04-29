import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Logged-in users go straight to the dashboard
  if (session) redirect("/dashboard");

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "4rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, #3b82f620, transparent 40%), radial-gradient(circle at bottom right, #8b5cf620, transparent 40%)",
      }}
    >
      <div style={{ maxWidth: "40rem", width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "1rem",
            background: "linear-gradient(to right, var(--primary), #8b5cf6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Authify Next
        </h1>

        <div
          style={{
            background: "var(--glass-bg)",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--shadow-glass)",
          }}
        >
          <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "1.1rem" }}>
            The secure and elegant way to manage authentication in Next.js
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link
              href="/login"
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              style={{
                background: "transparent",
                border: "1px solid var(--primary)",
                color: "var(--primary)",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
