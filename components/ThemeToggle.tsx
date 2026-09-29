"use client";
import { useEffect, useState } from "react";

const ThemeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
  </svg>
);

export function useTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);
  const toggle = () => {
    const on = !light;
    setLight(on);
    document.documentElement.setAttribute("data-theme", on ? "light" : "dark");
    try { localStorage.setItem("pepl-mono", on ? "1" : "0"); } catch {}
    window.dispatchEvent(new CustomEvent("pepl-theme", { detail: on ? "light" : "dark" }));
  };
  return { light, toggle };
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { light, toggle } = useTheme();
  if (compact) {
    return (
      <button onClick={toggle} aria-pressed={light} aria-label="Toggle light and dark theme" className="lift h-inv"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "2px solid rgba(var(--ink-rgb),0.4)", background: "transparent", color: "inherit", cursor: "pointer" }}>
        <ThemeIcon size={20} />
      </button>
    );
  }
  return (
    <button onClick={toggle} aria-pressed={light} aria-label="Toggle light and dark theme" className="btn lift h-inv"
      style={{ gap: 8, padding: "10px 14px", border: "2px solid rgba(var(--ink-rgb),0.4)", background: "transparent", color: "inherit", fontSize: 11, whiteSpace: "nowrap", marginLeft: 8 }}>
      <ThemeIcon size={16} />
      {light ? "DARK" : "LIGHT"}
    </button>
  );
}
