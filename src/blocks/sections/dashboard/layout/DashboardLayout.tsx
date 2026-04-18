"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import Icon from "@/blocks/elements/icon/Icon";
import Button from "@/blocks/elements/button/Button";
import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import { dashboardNav, isBranch } from "./data";

function getDisplayInitials(user: User | null): string {
  if (!user) return "A";
  const name = user.displayName?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  const email = user.email?.trim();
  if (email) return email.slice(0, 2).toUpperCase();
  return "A";
}

function getDisplayName(user: User | null): string {
  if (!user) return "Admin";
  return user.displayName?.trim() || user.email?.split("@")[0] || "Admin";
}

const MD_QUERY = "(min-width: 768px)";
const SIDEBAR_WIDTH_MS = 300;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMdUp, setIsMdUp] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  /** Desktop: "full" nav during width shrink; "icons" after transition. Must stay in sync with SIDEBAR_WIDTH_MS. */
  const [desktopNavMode, setDesktopNavMode] = useState<"full" | "icons">("full");
  const collapseNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [homeTreeOpen, setHomeTreeOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const syncBreakpoint = useCallback(() => {
    const up = window.matchMedia(MD_QUERY).matches;
    setIsMdUp(up);
    if (collapseNavTimerRef.current) {
      clearTimeout(collapseNavTimerRef.current);
      collapseNavTimerRef.current = null;
    }
    if (up) {
      setSidebarExpanded(true);
      setDesktopNavMode("full");
    } else {
      setSidebarExpanded(false);
      setDesktopNavMode("full");
    }
  }, []);

  useEffect(() => {
    syncBreakpoint();
    const mq = window.matchMedia(MD_QUERY);
    mq.addEventListener("change", syncBreakpoint);
    return () => mq.removeEventListener("change", syncBreakpoint);
  }, [syncBreakpoint]);

  useEffect(
    () => () => {
      if (collapseNavTimerRef.current) clearTimeout(collapseNavTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      const auth = getFirebaseAuth();
      unsub = onAuthStateChanged(auth, setUser);
    } catch {
      setUser(null);
    }
    return () => unsub?.();
  }, []);

  const initials = useMemo(() => getDisplayInitials(user), [user]);
  const displayName = useMemo(() => getDisplayName(user), [user]);

  const toggleSidebar = () => {
    setSidebarExpanded((wasExpanded) => {
      const willExpand = !wasExpanded;
      if (isMdUp) {
        if (willExpand) {
          if (collapseNavTimerRef.current) {
            clearTimeout(collapseNavTimerRef.current);
            collapseNavTimerRef.current = null;
          }
          setDesktopNavMode("full");
        } else {
          setDesktopNavMode("full");
          if (collapseNavTimerRef.current) clearTimeout(collapseNavTimerRef.current);
          collapseNavTimerRef.current = setTimeout(() => {
            setDesktopNavMode("icons");
            collapseNavTimerRef.current = null;
          }, SIDEBAR_WIDTH_MS);
        }
      }
      return willExpand;
    });
  };

  const flatIconLinks = useMemo(() => {
    const out: { href: string; label: string; icon: string }[] = [];
    for (const entry of dashboardNav) {
      if (isBranch(entry)) {
        for (const c of entry.children) out.push(c);
      } else {
        out.push(entry);
      }
    }
    return out;
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const showFullSidebarNav = !isMdUp || sidebarExpanded || desktopNavMode === "full";

  const sidebarInner = (
    <Container
      as="nav"
      className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-x-hidden text-secondary"
      aria-label="Admin navigation"
    >
      <Container
        className={cn(
          "relative z-10 flex h-14 shrink-0 items-center gap-2 overflow-visible border-b border-white/10 bg-ternary px-2 text-secondary",
          showFullSidebarNav ? "justify-between" : "justify-center",
        )}
      >
        {showFullSidebarNav ? (
          <Container as="span" className="truncate pl-2 font-semibold tracking-tight text-secondary">
            Admin
          </Container>
        ) : null}
        <Button
          type="button"
          size="sm"
          className={cn(
            "group shrink-0 !h-9 !min-h-9 !w-9 !min-w-9 !gap-0 !px-0 !py-0",
            "rounded-full border border-white/20 bg-black/10 text-secondary shadow-md ring-1 ring-black/15",
            "transition-all duration-300 ease-out hover:scale-[1.06] hover:border-white/30 hover:bg-black/18 hover:shadow-lg active:scale-95",
          )}
          onClick={toggleSidebar}
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          leftIcon="ChevronLeft"
          leftIconClassName={cn(
            "transition-transform duration-300 ease-out motion-reduce:transition-none",
            isMdUp && !sidebarExpanded && "rotate-180",
          )}
          iconSize={18}
        />
      </Container>

      <Container className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {showFullSidebarNav ? (
          <ul className="space-y-0.5 px-2 font-sans text-sm">
            {dashboardNav.map((entry) => {
              if (!isBranch(entry)) {
                const active = isActive(entry.href);
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-2 transition-colors",
                        active
                          ? "bg-ternary text-secondary shadow-sm"
                          : "text-secondary/90 hover:bg-black/12 hover:text-secondary",
                      )}
                    >
                      <Icon name={entry.icon} size={18} className="shrink-0 opacity-90" />
                      <Container as="span" className="truncate">
                        {entry.label}
                      </Container>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={entry.label} className="relative pt-1">
                  <button
                    type="button"
                    onClick={() => setHomeTreeOpen((o) => !o)}
                    className="relative z-10 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-secondary/95 transition-colors hover:bg-black/12 hover:text-secondary"
                    aria-expanded={homeTreeOpen}
                  >
                    <Icon name={entry.icon} size={18} className="shrink-0 opacity-90" />
                    <Container as="span" className="flex-1 truncate font-medium">
                      {entry.label}
                    </Container>
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className={cn(
                        "shrink-0 opacity-70 transition-transform duration-300 ease-out",
                        homeTreeOpen && "rotate-90",
                      )}
                    />
                  </button>
                  <Container
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      homeTreeOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <Container className="min-h-0 overflow-hidden">
                      <Container className="relative mt-0.5 ml-[17px]">
                        <Container
                          as="span"
                          aria-hidden
                          className="pointer-events-none absolute left-0 top-[-5px] h-1.5 w-px bg-secondary"
                        />
                        <Container
                          as="span"
                          aria-hidden
                          className="pointer-events-none absolute bottom-[1.125rem] left-0 top-0 z-0 w-px bg-secondary"
                        />
                        <ul className="relative z-[1] list-none space-y-0.5 pt-0.5 pb-0">
                          {entry.children.map((child) => {
                            const active = isActive(child.href);
                            return (
                              <li key={child.href} className="flex min-h-[2.5rem] items-stretch">
                                <Container
                                  as="span"
                                  aria-hidden
                                  className="relative flex w-4 shrink-0 items-center"
                                >
                                  <Container
                                    as="span"
                                    className="pointer-events-none absolute left-0 top-1/2 z-[1] h-px w-3.5 -translate-y-1/2 rounded-full bg-secondary"
                                  />
                                </Container>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "relative z-[1] flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-3 py-2.5 transition-colors",
                                    active
                                      ? "bg-secondary text-ternary shadow-sm"
                                      : "text-secondary/85 hover:bg-black/12 hover:text-secondary",
                                  )}
                                >
                                  <Icon
                                    name={child.icon}
                                    size={16}
                                    className={cn("shrink-0", active ? "text-ternary" : "opacity-90")}
                                  />
                                  <Container as="span" className="truncate">
                                    {child.label}
                                  </Container>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </Container>
                    </Container>
                  </Container>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="flex flex-col items-center gap-1 px-1 font-sans">
            {flatIconLinks.map((item) => {
              const active = isActive(item.href);
              const isHomeSubmenu = item.href.startsWith("/admin/home");
              return (
                <li key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    title={item.label}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-md transition-colors",
                      active &&
                        (isHomeSubmenu ? "bg-secondary text-ternary shadow-sm" : "bg-ternary text-secondary shadow-sm"),
                      !active && "text-secondary/90 hover:bg-black/12 hover:text-secondary",
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={cn("shrink-0", active && isHomeSubmenu && "text-ternary")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Container>
  );

  return (
    <Container className="flex min-h-screen font-sans text-text">
      {isMdUp ? (
        <Container
          as="aside"
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex min-h-0 flex-col overflow-hidden bg-primary will-change-[width] motion-reduce:transition-none",
            "transition-[width] duration-300 ease-in-out",
            sidebarExpanded ? "w-56" : "w-[4.25rem]",
          )}
        >
          {sidebarInner}
        </Container>
      ) : (
        <>
          {sidebarExpanded ? (
            <button
              type="button"
              className="fixed inset-0 z-[55] cursor-pointer border-0 bg-ternary/60 p-0 backdrop-blur-[1px] transition-colors hover:bg-ternary/50"
              aria-label="Close menu"
              onClick={() => setSidebarExpanded(false)}
            />
          ) : null}
          <Container
            as="aside"
            className={cn(
              "fixed inset-y-0 left-0 z-[60] flex min-h-0 w-56 max-w-[85vw] flex-col overflow-hidden bg-primary shadow-2xl motion-reduce:transition-none",
              "transition-transform duration-300 ease-in-out",
              sidebarExpanded ? "translate-x-0" : "-translate-x-full",
            )}
          >
            {sidebarInner}
          </Container>
        </>
      )}

      <Container
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col bg-white motion-reduce:transition-none",
          "transition-[padding] duration-300 ease-in-out",
          isMdUp && sidebarExpanded && "md:pl-56",
          isMdUp && !sidebarExpanded && "md:pl-[4.25rem]",
        )}
      >
        <Container
          as="header"
          className={cn(
            "fixed top-0 z-[52] flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-ternary px-4 text-secondary",
            "left-0 right-0 motion-reduce:transition-none",
            "md:transition-[left,right] md:duration-300 md:ease-in-out",
            isMdUp && sidebarExpanded && "md:left-56 md:right-0 md:w-auto",
            isMdUp && !sidebarExpanded && "md:left-[4.25rem] md:right-0 md:w-auto",
          )}
        >
          <Container className="flex min-w-0 items-center gap-1 md:gap-2">
            {!isMdUp ? (
              <Button
                type="button"
                size="sm"
                className="shrink-0 border border-white/20 bg-black/10 !h-9 !min-h-9 !w-9 !min-w-9 !px-0 text-secondary hover:bg-black/18"
                onClick={toggleSidebar}
                aria-label="Open menu"
                leftIcon="Menu"
                iconSize={18}
              />
            ) : null}
            <Container as="span" className="truncate text-sm font-semibold text-secondary">
              Portfolio dashboard
            </Container>
          </Container>

          <Container className="flex shrink-0 items-center gap-2.5">
            <Container
              as="span"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary"
              aria-hidden
            >
              {initials}
            </Container>
            <Container as="span" className="hidden max-w-[10rem] truncate text-sm font-semibold text-secondary sm:inline">
              {displayName}
            </Container>
          </Container>
        </Container>

        <Container
          as="main"
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-auto px-5 pb-5 pt-[calc(3.5rem+20px)] md:pl-5 md:pr-0"
        >
          {children}
        </Container>
      </Container>
    </Container>
  );
}
