"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  History,
  KeyRound,
  LayoutDashboard,
  Receipt,
  Send,
  Settings,
} from "lucide-react";

const COLLAPSE_KEY = "arez.sidebar.collapsed";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match?: (pathname: string) => boolean;
};

export default function Sidebar() {
  const pathname = usePathname() ?? "/";
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(COLLAPSE_KEY);
      if (raw === "1") setCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  const nav: NavItem[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" aria-hidden="true" />,
      match: (p) => p === "/dashboard",
    },
    {
      href: "/send",
      label: "Send Payment",
      icon: <Send className="h-5 w-5" aria-hidden="true" />,
      match: (p) => p === "/send",
    },
    {
      href: "/payroll",
      label: "Payroll Batch",
      icon: <GitBranch className="h-5 w-5" aria-hidden="true" />,
      match: (p) => p === "/payroll",
    },
    {
      href: "/invoices",
      label: "Invoices",
      icon: <Receipt className="h-5 w-5" aria-hidden="true" />,
    },
    {
      href: "/history",
      label: "History",
      icon: <History className="h-5 w-5" aria-hidden="true" />,
    },
    {
      href: "/keys",
      label: "Viewing Keys",
      icon: <KeyRound className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  const footer: NavItem[] = [
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.match) return item.match(pathname);
    return pathname === item.href;
  };

  const setCollapsedPersisted = (next: boolean) => {
    setCollapsed(next);
    try {
      window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  return (
    <aside
      className={[
        "h-screen shrink-0 border-r border-outline-variant/30 bg-surface-lowest",
        "flex flex-col py-6 px-3",
        collapsed ? "w-16" : "w-64",
      ].join(" ")}
      aria-label="Sidebar"
    >
      <div className={["mb-6 flex items-center", collapsed ? "justify-center" : "justify-between px-2"].join(" ")}>
        {!collapsed ? (
          <div>
            <div className="text-2xl font-black tracking-tighter text-primary">Arez</div>
            <div className="text-xs tracking-[0.16em] uppercase font-bold text-on-surface-variant/60 mt-1">
              Privacy-First Payroll
            </div>
          </div>
        ) : (
          <div className="text-lg font-black tracking-tighter text-primary" aria-label="Arez">
            
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsedPersisted(!collapsed)}
          className={[
            "h-10 w-10 inline-flex items-center justify-center rounded-lg",
            "text-outline hover:text-primary-container hover:bg-surface-low",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          ].join(" ")}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" aria-hidden="true" /> : <ChevronLeft className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Primary">
        {nav.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                "text-sm tracking-wide uppercase font-bold",
                "transition-colors duration-200",
                active
                  ? "text-primary-container bg-surface-low border-r-2 border-primary-container"
                  : "text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-low",
                collapsed ? "justify-center" : "",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 pt-6 border-t border-outline-variant/10">
        <div className="space-y-1">
          {footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                "text-sm tracking-wide uppercase font-bold",
                "text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-low transition-colors duration-200",
                collapsed ? "justify-center" : "",
              ].join(" ")}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {!collapsed && (
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4SQTsyqJSYjEVLMYilBxUOBjzQ2XSY4iV_OH-qqm11MxNBs1b2mpSnd0lnkcDh-4sPtHWlRZ6e5G7jqU8QAN2yKxHV3DAuB5TBGePRzyU-JlC-3j54s1Sz9o_5HaqjXJQGb--MXf8rwCLmCVvN1IsPcQO5XOW2SfArFE1gVAyqSOxGmI5ePcBfPKbY0pbF_b7BTuZgem3AGvlN8wl1Brx_xJCyMKs_PteeNvkRDxkB5M7lz8ADu10Kf_cQtULAMvy9eHrBsaFutE"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-primary tracking-wider truncate">SECURE_NODE_01</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter truncate">
                Identity Shielded
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
