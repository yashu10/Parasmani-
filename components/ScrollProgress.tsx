"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.scrollingElement || document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.width = (span > 0 ? (window.scrollY / span) * 100 : 0).toFixed(1) + "%";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "sticky", top: 84, zIndex: 99, height: 2, background: "rgba(var(--ink-rgb),0.14)" }}>
      <div ref={bar} style={{ height: 2, width: "0%", background: "#00508E" }} />
    </div>
  );
}
