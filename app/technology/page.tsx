import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import { chain, tech } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/technology", "Technology — One Data Chain from Model to Machine", "3D modelling, CAD/CAM and CNC data flow directly into production, with digital planning, monitoring, quality traceability and documentation.", "/images/S.jpg");

const line = "2px solid var(--line)";

export default function TechnologyPage() {
  return (
    <div data-anim="screen">
      <PageHero label="TECHNOLOGY" img="/images/S.jpg" alt="Engineering and CNC programming workstation" before="ONE DATA CHAIN." hl="NOTHING RE-TYPED.">
        <p style={{ margin: 0, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, maxWidth: "58ch", color: "var(--soft)" }}>Engineering information should flow into production without unnecessary manual re-entry.</p>
      </PageHero>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        {chain.map((s) => (
          <li key={s.num} style={{ padding: "clamp(28px,3.5vw,44px) clamp(16px,2.5vw,28px)", borderRight: line, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{s.num}</div>
            <div style={{ marginTop: 14, fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{s.name}</div>
          </li>
        ))}
      </ol>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", borderBottom: line }}>
        {tech.map((t) => (
          <div key={t.num} style={{ padding: "clamp(32px,4vw,56px) var(--px)", borderRight: line, borderBottom: line, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{t.num}</div>
            <h2 style={{ margin: "14px 0 10px", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>{t.name}</h2>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--mute)" }}>{t.body}</p>
          </div>
        ))}
      </div>
      <div style={{ height: "clamp(260px,34vw,440px)", position: "relative" }}>
        <Slot src="/images/U.jpg" alt="CNC production on the shop floor" sizes="100vw" />
      </div>
    </div>
  );
}
