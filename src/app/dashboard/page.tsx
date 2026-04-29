import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientSignOut } from "@/components/client-sign-out";
import {
  LayoutDashboard,
  FolderKanban,
  User,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  CircleDashed,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

// ── Mock data ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "1",
    name: "Authify Next",
    description: "Next.js authentication boilerplate with better-auth and Prisma.",
    status: "active",
    members: 3,
    lastUpdated: "2 hours ago",
    progress: 72,
    url: "#",
  },
  {
    id: "2",
    name: "Dashboard UI Kit",
    description: "Reusable component library for internal dashboards.",
    status: "review",
    members: 5,
    lastUpdated: "1 day ago",
    progress: 90,
    url: "#",
  },
  {
    id: "3",
    name: "API Gateway",
    description: "Centralised API gateway with rate limiting and auth middleware.",
    status: "completed",
    members: 2,
    lastUpdated: "3 days ago",
    progress: 100,
    url: "#",
  },
  {
    id: "4",
    name: "Mobile App",
    description: "React Native companion app for the web platform.",
    status: "paused",
    members: 4,
    lastUpdated: "1 week ago",
    progress: 38,
    url: "#",
  },
  {
    id: "5",
    name: "Analytics Engine",
    description: "Real-time event tracking and reporting pipeline.",
    status: "active",
    members: 3,
    lastUpdated: "5 hours ago",
    progress: 55,
    url: "#",
  },
  {
    id: "6",
    name: "Docs Site",
    description: "Public documentation built with Next.js and MDX.",
    status: "active",
    members: 2,
    lastUpdated: "30 minutes ago",
    progress: 81,
    url: "#",
  },
];

const STATUS_CONFIG = {
  active:    { label: "Active",    color: "#22c55e", bg: "rgba(34,197,94,0.1)",   icon: Activity },
  review:    { label: "In Review", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  icon: Clock },
  completed: { label: "Completed", color: "#3b82f6", bg: "rgba(59,130,246,0.1)",  icon: CheckCircle2 },
  paused:    { label: "Paused",    color: "#94a3b8", bg: "rgba(148,163,184,0.1)", icon: CircleDashed },
  error:     { label: "Error",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   icon: AlertCircle },
} as const;

type Status = keyof typeof STATUS_CONFIG;

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "var(--shadow-glass)",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <span style={{ fontSize: "2rem", fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{sub}</span>
    </div>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div
      style={{
        height: "6px",
        borderRadius: "999px",
        background: "var(--input-border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          borderRadius: "999px",
          background: color,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const cfg = STATUS_CONFIG[project.status as Status] ?? STATUS_CONFIG.active;
  const Icon = cfg.icon;

  return (
    <div
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "var(--shadow-glass)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      className="project-card"
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5 }}>
            {project.description}
          </p>
        </div>
        <a
          href={project.url}
          aria-label={`Open ${project.name}`}
          style={{ color: "#64748b", flexShrink: 0, marginTop: "2px" }}
        >
          <ExternalLink size={15} />
        </a>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b" }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: cfg.color }}>{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} color={cfg.color} />
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Status badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: cfg.color,
            background: cfg.bg,
            padding: "0.25rem 0.65rem",
            borderRadius: "999px",
          }}
        >
          <Icon size={12} />
          {cfg.label}
        </span>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", color: "#94a3b8" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Users size={12} /> {project.members}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Clock size={12} /> {project.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const active    = PROJECTS.filter((p) => p.status === "active").length;
  const completed = PROJECTS.filter((p) => p.status === "completed").length;
  const avgProgress = Math.round(PROJECTS.reduce((s, p) => s + p.progress, 0) / PROJECTS.length);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>

      {/* ── Sidebar ── */}
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
        {/* Logo */}
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

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <SidebarLink icon={<LayoutDashboard size={16} />} label="Dashboard" active />
          <SidebarLink icon={<FolderKanban size={16} />} label="Projects" />
          <SidebarLink icon={<User size={16} />} label="Account" href="/dashboard/account" />
        </nav>

        {/* User */}
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

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Good to see you, {session.user.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Here's what's happening across your projects.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <StatCard label="Total Projects" value={PROJECTS.length} sub="across all workspaces" color="var(--foreground)" />
          <StatCard label="Active"          value={active}          sub="currently in progress"  color="#22c55e" />
          <StatCard label="Completed"       value={completed}       sub="shipped this cycle"      color="#3b82f6" />
          <StatCard label="Avg Progress"    value={`${avgProgress}%`} sub="across all projects"  color="#8b5cf6" />
        </div>

        {/* Section header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Projects</h2>
          <button
            style={{
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "0.6rem",
              padding: "0.5rem 1rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <TrendingUp size={14} /> New Project
          </button>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <style>{`
        .project-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.12);
        }
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

// ── Sidebar link helper ───────────────────────────────────────────────────────
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
