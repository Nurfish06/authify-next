import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientSignOut } from "@/components/client-sign-out";
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Mail,
  Shield,
  Calendar,
  KeyRound,
} from "lucide-react";

function SidebarLink({
  icon,
  label,
  active = false,
  href = "#",
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="sidebar-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
        padding: "0.6rem 0.75rem",
        borderRadius: "0.6rem",
        fontSize: "0.875rem",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--primary)" : "var(--foreground)",
        background: active ? "rgba(59, 130, 246, 0.1)" : "transparent",
        textDecoration: "none",
        transition: "all 0.15s ease",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div style={{ color: "#64748b", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.15rem" }}>{label}</p>
        <p style={{ fontSize: "0.95rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const joinedDate = new Date(session.user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>

      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          background: "var(--glass-bg)",
          borderRight: "1px solid var(--glass-border)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1rem",
          gap: "0.5rem",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "0.5rem 0.75rem", marginBottom: "1rem" }}>
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              background: "linear-gradient(to right, var(--primary), #8b5cf6)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Authify
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <SidebarLink icon={<LayoutDashboard size={16} />} label="Dashboard" href="/dashboard" />
          <SidebarLink icon={<FolderKanban size={16} />} label="Projects" href="/dashboard" />
          <SidebarLink icon={<User size={16} />} label="Account" active href="/dashboard/account" />
        </nav>

        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0 0.25rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {(session.user.name || session.user.email).charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session.user.name || "User"}
              </p>
              <p style={{ fontSize: "0.7rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session.user.email}
              </p>
            </div>
          </div>
          <ClientSignOut compact />
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", minWidth: 0 }}>
        <div style={{ maxWidth: "640px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>Account</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Manage your profile and security settings.
          </p>

          {/* Avatar + name */}
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "var(--shadow-glass)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.75rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {(session.user.name || session.user.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{session.user.name || "—"}</h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem" }}>{session.user.email}</p>
            </div>
          </div>

          {/* Profile info */}
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "var(--shadow-glass)",
              marginBottom: "1.5rem",
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Profile</h3>
            <InfoRow icon={<User size={16} />}     label="Full name"  value={session.user.name || "—"} />
            <InfoRow icon={<Mail size={16} />}      label="Email"      value={session.user.email} />
            <InfoRow icon={<Calendar size={16} />}  label="Joined"     value={joinedDate} />
            <InfoRow
              icon={<Shield size={16} />}
              label="Email verified"
              value={session.user.emailVerified ? "Verified ✓" : "Not verified"}
            />
          </div>

          {/* Security */}
          <div
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "var(--shadow-glass)",
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Security</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <KeyRound size={16} style={{ color: "#64748b" }} />
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500 }}>Password</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>Change your account password</p>
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "1px solid var(--input-border)",
                  borderRadius: "0.6rem",
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--foreground)",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .sidebar-link:hover {
          background: rgba(59, 130, 246, 0.08) !important;
          color: var(--primary) !important;
        }
        @media (max-width: 640px) {
          aside { display: none; }
        }
      `}</style>
    </div>
  );
}
