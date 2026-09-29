"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { certs, downloads } from "@/lib/content";

const line = "2px solid var(--line)";

/**
 * Certifications + downloads. Documents are not supplied yet, so clicking one shows the notice
 * (as in the prototype). Add real files under public/docs/ and swap the buttons for links.
 */
export default function QualityDocs() {
  const params = useSearchParams();
  const [notice, setNotice] = useState(false);
  useEffect(() => { if (params.get("doc")) setNotice(true); }, [params]);
  const show = () => setNotice(true);

  return (
    <>
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", borderBottom: line }}>
        <h2 className="h2s" style={{ margin: "0 0 clamp(24px,3vw,40px)" }}><span className="hl">CERTIFICATIONS</span> &amp; APPROVALS</h2>
        <div style={{ borderTop: line }}>
          {certs.map((c) => (
            <div key={c.name} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "clamp(8px,1.5vw,24px)", padding: "20px 0", borderBottom: "2px solid rgba(var(--ink-rgb),0.14)", alignItems: "baseline" }}>
              <h3 className="lh" style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", minWidth: 0 }}>{c.name}</h3>
              <div style={{ minWidth: 0 }}><span style={{ display: "inline-block", padding: "5px 9px", border: "1px solid rgba(var(--ink-rgb),0.3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--soft)" }}>{c.status}</span></div>
              <div style={{ fontSize: 14, color: "var(--mute)", minWidth: 0 }}>{c.evidence}</div>
              <div style={{ minWidth: 0 }}>
                <button onClick={show} className="lift h-ink" style={{ border: 0, background: "transparent", color: "var(--acc)", fontSize: 13, fontWeight: 600, padding: 0, cursor: "pointer", textAlign: "left" }}>{c.download}</button>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: "20px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--mute)" }}>Only formally held certificates are published. No approval is implied until verified.</p>
      </div>
      <div id="downloads" style={{ padding: "clamp(48px,7vw,120px) var(--px) 0" }}>
        <h2 className="h2s" style={{ margin: "0 0 clamp(24px,3vw,40px)" }}><span className="hl">DOWNLOADS</span></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", borderTop: line, borderBottom: line, background: "var(--bg)" }}>
        {downloads.map((d) => (
          <button key={d.name} onClick={show} className="lift h-bg2"
            style={{ display: "block", width: "100%", textAlign: "left", padding: "clamp(28px,3.5vw,44px) clamp(16px,2.5vw,32px)", border: 0, borderRight: line, background: "transparent", color: "inherit", cursor: "pointer", minWidth: 0, minHeight: 56 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>{d.name}</div>
            <div style={{ marginTop: 10, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{d.meta} ↓</div>
          </button>
        ))}
      </div>
      {notice && (
        <div role="status" style={{ margin: "clamp(24px,3vw,40px) var(--px)", padding: "18px 22px", border: "2px solid var(--acc)", fontSize: 13, fontWeight: 600, background: "var(--bg)" }}>
          This document will be published here once it is released by PEPL. For a copy now, write to info@parasmaniengineering.com.
        </div>
      )}
    </>
  );
}
