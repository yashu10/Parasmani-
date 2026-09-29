"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MODE = (process.env.NEXT_PUBLIC_BG_MODE || "image").toLowerCase(); // "image" | "3d" | "off"

const VARIANT: Record<string, number> = {
  "/": 0, "/about": 2, "/capabilities": 1, "/industries": 3, "/projects": 1,
  "/facility": 3, "/quality": 2, "/technology": 0, "/careers": 2, "/rdso-approval": 3, "/contact": 1,
};

type Bg = { setVariant(n: number): void; setTheme(t: "dark" | "light"): void; dispose(): void };

function ThreeCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const bg = useRef<Bg | null>(null);
  const path = usePathname() || "/";
  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const start = () => {
      import("@/lib/bg/scene").then(({ mount }) => {
        if (cancelled || !canvas.current) return;
        bg.current = mount(canvas.current);
        bg.current.setVariant(VARIANT[pathRef.current] ?? 0);
        bg.current.setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
      });
    };
    // load after first paint so three.js never blocks LCP
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = ric ? ric(start) : window.setTimeout(start, 200);
    const onTheme = (e: Event) => bg.current?.setTheme((e as CustomEvent).detail);
    window.addEventListener("pepl-theme", onTheme);
    return () => {
      cancelled = true;
      if (!ric) clearTimeout(id);
      window.removeEventListener("pepl-theme", onTheme);
      bg.current?.dispose();
      bg.current = null;
    };
  }, []);

  useEffect(() => { bg.current?.setVariant(VARIANT[path] ?? 0); }, [path]);

  return <canvas ref={canvas} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0, display: "block" }} />;
}

export default function Background() {
  return (
    <>
      {MODE === "3d" && <ThreeCanvas />}
      {MODE === "image" && (
        <>
          <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
            <Image src="/images/prefab-bg.jpg" alt="" fill sizes="100vw" quality={55} style={{ objectFit: "cover" }} />
          </div>
          <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "rgba(var(--bg-rgb),0.88)" }} />
        </>
      )}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(115% 85% at 50% 40%, rgba(var(--bg-rgb),0) 30%, rgba(var(--bg-rgb),0.88) 100%)" }} />
    </>
  );
}
