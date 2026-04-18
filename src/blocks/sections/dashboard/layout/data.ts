export const dashboardContentCardClass =
  "w-full min-w-0 rounded-xl border border-ternary/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]";

export type NavLeaf = {
  href: string;
  label: string;
  icon: string;
};

export type NavBranch = {
  label: string;
  icon: string;
  children: NavLeaf[];
};

export type NavEntry = NavLeaf | NavBranch;

export function isBranch(entry: NavEntry): entry is NavBranch {
  return "children" in entry;
}

export const dashboardNav: NavEntry[] = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  {
    label: "Home",
    icon: "Home",
    children: [
      { href: "/admin/home/hero", label: "Hero", icon: "Sparkles" },
      { href: "/admin/home/company", label: "Company", icon: "Building2" },
      { href: "/admin/home/portfolio", label: "Portfolio", icon: "FolderKanban" },
      { href: "/admin/home/skills", label: "Skills", icon: "BadgeCheck" },
    ],
  },
];
