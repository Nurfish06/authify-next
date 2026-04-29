"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function ClientSignOut({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.5rem 0.75rem",
          borderRadius: "0.6rem",
          border: "none",
          background: "transparent",
          color: "#ef4444",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <LogOut size={15} />
        Sign out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "0 auto",
      }}
    >
      Sign Out <LogOut size={16} />
    </button>
  );
}
