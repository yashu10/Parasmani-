"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ABOUT_SUB, CONTACT, NAV_ALL } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

const topNav = NAV_ALL.filter((n) => !ABOUT_SUB.includes(n.href));
const subNav = NAV_ALL.filter((n) => ABOUT_SUB.includes(n.href));

const Chevron = ({ size = 10, sw = 3, style }: { size?: number; sw?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="square" style={style} aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Header() {
  const path = usePathname() || "/";
  const [subOpen, setSubOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mSub, setMSub] = useState<boolean | undefined>(undefined);
  const inAboutGroup = ABOUT_SUB.includes(path);
  const mOpen = mSub ?? inAboutGroup;

  // close menus on navigation
  useEffect(() => { setMenuOpen(false); setSubOpen(false); setMSub(undefined); }, [path]);
  // lock scroll + Esc while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const isActive = (href: string) => href === "/about" ? (path === "/about" || inAboutGroup) : path === href;

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, height: 84, padding: "0 clamp(16px,3vw,32px)", background: "rgba(var(--bg-rgb),0.92)", borderBottom: "2px solid var(--line)" }}>
        <Link href="/" aria-label="Parasmani Engineering — home" style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "none", padding: "5px 0" }}>
            <Image data-logo="1" src="/images/pepl-logo.png" alt="Parasmani Engineering Pvt. Ltd." width={171} height={42} priority className="logo" />
          </span>
        </Link>

        <nav aria-label="Primary" className="nav-desktop" style={{ alignItems: "center", gap: "clamp(10px,1.4vw,20px)", flex: 1, justifyContent: "flex-end", minWidth: 0 }}>
          {topNav.map((n) => {
            const hasSub = n.href === "/about";
            const active = isActive(n.href);
            return (
              <div key={n.href}
                onMouseEnter={() => hasSub && setSubOpen(true)}
                onMouseLeave={() => hasSub && setSubOpen(false)}
                onBlur={(e) => { if (hasSub && !e.currentTarget.contains(e.relatedTarget as Node)) setSubOpen(false); }}
                style={{ position: "relative", display: "flex", alignItems: "center", height: 84 }}>
                <Link href={n.href} className="nav-top lift" aria-current={path === n.href ? "page" : undefined}
                  onFocus={() => hasSub && setSubOpen(true)}
                  onClick={() => setSubOpen(false)}
                  aria-haspopup={hasSub || undefined} aria-expanded={hasSub ? subOpen : undefined}
                  style={{ color: undefined }}>
                  {n.label}
                  {hasSub && <Chevron />}
                  {active && <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "#00508E", transformOrigin: "left", animation: "pepl-sweep 0.45s var(--ease) both" }} />}
                </Link>
                {hasSub && subOpen && (
                  <div style={{ position: "absolute", top: "100%", left: -20, minWidth: 260, display: "flex", flexDirection: "column", background: "var(--bg)", border: "2px solid rgba(var(--ink-rgb),0.24)", borderTop: "2px solid var(--hl)", boxShadow: "0 18px 40px rgba(0,0,0,0.25)", zIndex: 120, animation: "pepl-drop 0.28s var(--ease) both" }}>
                    {subNav.map((s) => (
                      <Link key={s.href} href={s.href} onClick={() => setSubOpen(false)} aria-current={path === s.href ? "page" : undefined} className="h-hlbg"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "2px solid rgba(var(--ink-rgb),0.12)", color: "var(--ink)", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                        <span style={{ display: "block", width: 6, height: 6, flex: "none", background: path === s.href ? "var(--hl)" : "transparent" }} />
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <ThemeToggle />
          <Link href="/contact" className="btn btn-pri lift" style={{ padding: "12px 20px", fontSize: 11, whiteSpace: "nowrap" }}>REQUEST A QUOTE</Link>
        </nav>

        <div className="nav-mobile" style={{ alignItems: "center", gap: 10 }}>
          <ThemeToggle compact />
          <Link href="/contact" className="btn btn-pri lift" style={{ padding: "12px 14px", fontSize: 10, whiteSpace: "nowrap" }}>QUOTE</Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} className="lift h-inv"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "2px solid var(--ink)", background: "transparent", color: "inherit", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" style={{ position: "fixed", inset: 0, zIndex: 200, background: "var(--bg)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 84, padding: "0 clamp(16px,3vw,32px)", borderBottom: "2px solid var(--line)", flex: "none" }}>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em" }}>PARASMANI ENGINEERING</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="h-inv" autoFocus
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "2px solid var(--ink)", background: "transparent", color: "inherit", cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
            </button>
          </div>
          <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column" }}>
            {topNav.map((n) => {
              const hasSub = n.href === "/about";
              return (
                <div key={n.href} style={{ display: "flex", flexDirection: "column", borderBottom: "2px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <Link href={n.href} onClick={() => setMenuOpen(false)} className="h-hlbg" aria-current={path === n.href ? "page" : undefined}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px clamp(16px,3vw,32px)", color: "inherit", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", minHeight: 64 }}>
                      <span>{n.label}</span>
                      {isActive(n.href) && <span style={{ width: 12, height: 12, background: "var(--hl)", flex: "none" }} />}
                    </Link>
                    {hasSub && (
                      <button onClick={() => setMSub(!mOpen)} aria-label="Show About pages" aria-expanded={mOpen} className="h-hlbg"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 72, flex: "none", border: 0, borderLeft: "2px solid var(--line)", background: "transparent", color: "inherit", cursor: "pointer" }}>
                        <Chevron size={20} sw={2.5} style={{ transition: "transform .3s var(--ease)", transform: mOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                      </button>
                    )}
                  </div>
                  {hasSub && mOpen && (
                    <div style={{ display: "flex", flexDirection: "column", background: "var(--bg2)", borderTop: "2px solid var(--hl)", animation: "pepl-drop 0.28s var(--ease) both" }}>
                      {subNav.map((s) => (
                        <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)} className="h-acc"
                          style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px clamp(32px,6vw,56px)", borderBottom: "2px solid rgba(var(--ink-rgb),0.1)", color: "var(--ink)", fontSize: 17, fontWeight: 700, letterSpacing: "0.02em", minHeight: 56 }}>
                          <span style={{ display: "block", width: 8, height: 8, flex: "none", background: path === s.href ? "var(--hl)" : "transparent", border: "2px solid var(--hl)" }} />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div style={{ padding: "clamp(24px,5vw,40px) clamp(16px,3vw,32px)", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn btn-pri" style={{ padding: "20px 24px", fontSize: 14, minHeight: 56 }}>REQUEST A QUOTE</Link>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "var(--mute)" }}>{CONTACT.phone}<br />{CONTACT.email}</div>
          </div>
        </div>
      )}
    </>
  );
}
