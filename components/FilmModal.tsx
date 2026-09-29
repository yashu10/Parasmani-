"use client";
import { useEffect, useState } from "react";

export default function FilmModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn lift film-btn"
        style={{ position: "absolute", left: 0, bottom: 0, gap: 12, padding: "16px 22px", border: 0, color: "#fff", fontSize: 11, letterSpacing: "0.08em", minHeight: 52, zIndex: 1, pointerEvents: "auto" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6,4 20,12 6,20" /></svg>
        PLAY PLANT FILM
      </button>
      <style>{`.film-btn{background:#00508E}.film-btn:hover{background:var(--hl)}`}</style>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Plant film" onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 210, background: "rgba(var(--bg3-rgb),0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)" }}>
          <div style={{ width: "100%", maxWidth: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingBottom: 16 }}>
              <span style={{ color: "var(--ink)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>PEPL PLANT FILM</span>
              <button onClick={() => setOpen(false)} aria-label="Close" autoFocus className="lift film-x"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "2px solid var(--ink)", background: "transparent", color: "var(--ink)", cursor: "pointer" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
              </button>
              <style>{`.film-x:hover{background:var(--acc)!important;border-color:#00508E!important}`}</style>
            </div>
            <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--bg3)", border: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {process.env.NEXT_PUBLIC_PLANT_FILM_URL ? (
                <video src={process.env.NEXT_PUBLIC_PLANT_FILM_URL} controls autoPlay playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              ) : (
                <div style={{ textAlign: "left", padding: "clamp(20px,4vw,48px)" }}>
                  <div style={{ color: "var(--ink)", fontSize: "clamp(18px,2.6vw,28px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>PLANT FILM — TO BE CONFIRMED</div>
                  <p style={{ margin: "12px 0 0", color: "var(--mute)", fontSize: 14, lineHeight: 1.55, maxWidth: "46ch" }}>Drop the final plant film into this frame. No video asset has been supplied yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
