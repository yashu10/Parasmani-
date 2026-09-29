import Slot from "@/components/Slot";
import Words from "@/components/Words";
import Metrics from "@/components/Metrics";
import { SHOW_PENDING, machines } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/facility", "Facility — Plant & Machinery", "40,000 m² industrial land, 6,000 m² covered area, 30 MT cranes and a 50 × 10 m twin-beam gantry. CNC plasma, drilling, SAW line, shot blasting and painting bay.", "/images/A.jpg");

const line = "2px solid var(--line)";

export default function FacilityPage() {
  return (
    <div data-anim="screen">
      <div style={{ position: "relative", minHeight: "clamp(320px,42vw,500px)", display: "flex", alignItems: "flex-end", borderBottom: line }}>
        <div style={{ position: "absolute", inset: 0 }}><Slot src="/images/A.jpg" alt="PEPL facility exterior" priority sizes="100vw" /></div>
        <div style={{ position: "relative", padding: "clamp(32px,4vw,64px) var(--px)", background: "var(--bg)", borderTop: line, borderRight: line, maxWidth: 720 }}>
          <span className="lbl">FACILITY</span>
          <Words before="WHERE ENGINEERING BECOMES" hl="REAL." className="h1" style={{ margin: "18px 0 0", fontSize: "clamp(30px,4.4vw,64px)" }} />
        </div>
      </div>
      <Metrics />
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px) 0" }}>
        <h2 className="h2" style={{ margin: "0 0 14px" }}>PLANT &amp; <span className="hl">MACHINERY</span></h2>
        <p style={{ margin: "0 0 clamp(28px,4vw,48px)", fontSize: 16, lineHeight: 1.55, color: "var(--mute)", maxWidth: "54ch" }}>Machine specifications are published only once verified against the asset register.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", borderTop: line, background: "var(--bg)" }}>
        {machines.map((m) => (
          <div key={m.name} style={{ borderRight: line, borderBottom: line, minWidth: 0 }}>
            <div style={{ height: "clamp(150px,16vw,200px)" }}><Slot src={m.img} alt={m.name} sizes="(max-width: 900px) 100vw, 25vw" /></div>
            <div style={{ padding: "22px clamp(16px,2.5vw,28px)", borderTop: line }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{m.name}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--mute)" }}>{m.fn}</p>
              {SHOW_PENDING && (
                <span style={{ display: "inline-block", marginTop: 14, padding: "5px 9px", border: "1px solid rgba(var(--ink-rgb),0.3)", color: "var(--mute)", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em" }}>SPECIFICATIONS PENDING VERIFICATION</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
