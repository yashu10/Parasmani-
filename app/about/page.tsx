import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import Words from "@/components/Words";
import { leaders, values } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/about", "About — Values, Vision & Leadership", "Parasmani Engineering is a fabrication engineering organisation built on four values: integrity, ownership, excellence and care. Vision, mission, purpose and leadership.", "/images/B.jpg");

const line = "2px solid var(--line)";

export default function AboutPage() {
  return (
    <div data-anim="screen">
      <PageHero label="ABOUT" img="/images/B.jpg" alt="PEPL fabrication works" before="AN ORGANISATION BUILT ON" hl="FOUR VALUES." h1Size="clamp(34px,5vw,72px)" h1Max="20ch" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        {values.map((v) => (
          <div key={v.name} style={{ padding: "clamp(32px,4vw,56px) var(--px)", borderRight: line, minWidth: 0 }}>
            <h2 className="lh" style={{ margin: 0, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--acc)" }}>{v.name}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--soft)" }}>{v.meaning}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", borderBottom: line }}>
        <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", borderRight: line, minWidth: 0 }}>
          <h3 className="lbl lh" style={{ margin: 0 }}>VISION</h3>
          <p style={{ margin: "22px 0 0", fontSize: "clamp(18px,2vw,25px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.22 }}>To become the world&apos;s most admired, result-driven, referred and preferred fabrication engineering organisation.</p>
        </div>
        <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", borderRight: line, minWidth: 0 }}>
          <h3 className="lbl lh" style={{ margin: 0 }}>MISSION</h3>
          <p style={{ margin: "22px 0 0", fontSize: 16, lineHeight: 1.55, color: "var(--soft)" }}>Deliver engineered steel solutions through disciplined processes, capable people, technology and uncompromising quality.</p>
        </div>
        <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", minWidth: 0 }}>
          <h3 className="lbl lh" style={{ margin: 0 }}>PURPOSE</h3>
          <p style={{ margin: "22px 0 0", fontSize: 16, lineHeight: 1.55, color: "var(--soft)" }}>To transform engineering requirements into reliable, manufacturable and deliverable steel solutions.</p>
        </div>
      </div>
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px) 0" }}>
        <h2 className="h2" style={{ margin: "0 0 clamp(28px,4vw,48px)" }}><span className="hl">LEADERSHIP</span></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", borderTop: line, borderBottom: line, background: "var(--bg)" }}>
        {leaders.map((l) => (
          <div key={l.role} style={{ borderRight: line, minWidth: 0 }}>
            <div style={{ height: "clamp(220px,26vw,320px)" }}><Slot alt={`${l.role} — portrait`} /></div>
            <div style={{ padding: "24px clamp(16px,2.5vw,32px)", borderTop: line }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{l.role}</div>
              <h3 className="lh" style={{ margin: "10px 0 0", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{l.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "clamp(56px,9vw,150px) var(--px)", background: "#00508E", color: "#fff" }}>
        <blockquote style={{ margin: 0 }}>
          <Words as="p" before="ENGINEER WITH INTEGRITY. EXECUTE WITH OWNERSHIP. DELIVER WITH EXCELLENCE. CARE THROUGHOUT." className="h1"
            style={{ margin: 0, fontSize: "clamp(28px,5vw,72px)", lineHeight: 0.94, maxWidth: "22ch" }} />
          <footer style={{ marginTop: 36, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#fff" }}>CMD STATEMENT · DAXESH SONI</footer>
        </blockquote>
      </div>
    </div>
  );
}
