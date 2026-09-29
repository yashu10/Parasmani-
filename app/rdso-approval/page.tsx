import Link from "next/link";
import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import { rdsoDocs } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/rdso-approval", "RDSO Approval — Vendor Documentation (Under Process)", "Parasmani Engineering's RDSO vendor approval for Indian Railways is under process. View the fabrication profile and the 12 supporting documents on record.", "/images/rail-hero.jpg");

const line = "2px solid var(--line)";
const head: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--soft)" };

export default function RdsoPage() {
  return (
    <div data-anim="screen">
      <PageHero label="RDSO · INDIAN RAILWAYS" img="/images/rail-hero.jpg" alt="Railway box girder in the fabrication shop" before="RDSO APPROVAL" hl="UNDER PROCESS.">
        <p style={{ margin: 0, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, maxWidth: "56ch", color: "var(--soft)" }}>
          Vendor and fabrication profile, with the technical documentation submitted in support of our RDSO approval application.
        </p>
      </PageHero>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        <div style={{ padding: "clamp(28px,4vw,48px) var(--px)", borderRight: line, minWidth: 0 }}>
          <div style={head}>DOCUMENTS ON RECORD</div>
          <div data-count="" style={{ marginTop: 10, fontSize: "clamp(40px,5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>12</div>
        </div>
        <div style={{ padding: "clamp(28px,4vw,48px) var(--px)", borderRight: line, minWidth: 0 }}>
          <div style={head}>APPLICATION STATUS</div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--hl)" }}>
            <span style={{ display: "block", width: 12, height: 12, background: "var(--hl)" }} />UNDER PROCESS
          </div>
        </div>
        <div style={{ padding: "clamp(28px,4vw,48px) var(--px)", minWidth: 0 }}>
          <div style={head}>REGISTRATION ID</div>
          <div style={{ marginTop: 14, fontSize: 16, lineHeight: 1.5, color: "var(--ink)" }}>To be published on approval.</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        <div style={{ position: "relative", height: "clamp(220px,24vw,320px)", borderRight: line, minWidth: 0 }}><Slot src="/images/rail-1.jpg" alt="Railway track and girder bridge" sizes="(max-width: 900px) 100vw, 33vw" /></div>
        <div style={{ position: "relative", height: "clamp(220px,24vw,320px)", borderRight: line, minWidth: 0 }}><Slot src="/images/rail-2.jpg" alt="Indian Railways locomotive" sizes="(max-width: 900px) 100vw, 33vw" /></div>
        <div style={{ position: "relative", height: "clamp(220px,24vw,320px)", minWidth: 0 }}><Slot src="/images/rail-3.jpg" alt="Rail infrastructure" sizes="(max-width: 900px) 100vw, 33vw" /></div>
      </div>
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", background: "var(--bg)" }}>
        <span className="lbl">SUBMISSION FILE</span>
        <h2 className="h2" style={{ margin: "20px 0 14px" }}>DOCUMENTS ON <span className="hl">RECORD</span></h2>
        <p style={{ margin: "0 0 clamp(28px,4vw,48px)", fontSize: 16, lineHeight: 1.55, color: "var(--soft)", maxWidth: "60ch" }}>Every supporting document submitted for RDSO vendor approval. Open any available file to view or download it.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", borderTop: line, borderLeft: line }}>
          {rdsoDocs.map((d) => (
            <div key={d.num} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "clamp(24px,3vw,36px) clamp(16px,2.4vw,28px)", borderRight: line, borderBottom: line, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--hl)" }}>{d.num}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: d.statusColor }}>{d.status}</span>
              </div>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{d.name}</h3>
              <p style={{ margin: 0, flex: 1, fontSize: 15, lineHeight: 1.5, color: "var(--soft)" }}>{d.desc}</p>
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener" className="btn btn-out" style={{ justifyContent: "space-between", gap: 12, padding: "14px 16px", fontSize: 12 }}>
                  VIEW DOCUMENT<span className="sr-only"> — {d.name} (PDF, opens in new tab)</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
              ) : (
                <Link href="/contact" className="btn lift req-copy" style={{ justifyContent: "space-between", gap: 12, padding: "14px 16px", fontSize: 12 }}>REQUEST COPY</Link>
              )}
            </div>
          ))}
        </div>
        <style>{`.req-copy{border:2px solid rgba(var(--ink-rgb),0.3);background:transparent;color:var(--soft)}.req-copy:hover{border-color:var(--ink);color:var(--ink)}`}</style>
      </div>
    </div>
  );
}
