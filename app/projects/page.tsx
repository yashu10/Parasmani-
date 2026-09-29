import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import { projects } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/projects", "Projects — Structural Steel Packages", "Selected structural steel fabrication projects across power, infrastructure, steel, EPC and heavy engineering — engineering, fabrication, inspection, dispatch and site.", "/images/A.jpg");

const line = "2px solid var(--line)";
const thin = "1px solid rgba(var(--ink-rgb),0.14)";

export default function ProjectsPage() {
  return (
    <div data-anim="screen">
      <PageHero label="PROJECTS" img="/images/A.jpg" alt="Fabricated steel project" before="PROJECTS ARE THE" hl="PROOF." h1Margin="22px 0 18px">
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--mute)", maxWidth: "56ch" }}>
          Project information will be added after verification. Unconfirmed fields are shown as &ldquo;To be confirmed&rdquo; rather than estimated.
        </p>
      </PageHero>
      {projects.map((p) => (
        <article key={p.num} style={{ borderBottom: line, background: "var(--bg)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
            <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", borderRight: line, minWidth: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>PROJECT {p.num}</span>
              <h2 style={{ margin: "16px 0 28px", fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>{p.title}</h2>
              <dl style={{ borderTop: line, fontSize: 14, margin: 0 }}>
                {([["Client", p.client], ["Industry", p.industry], ["Scope", p.scope], ["Quantity", p.qty], ["Location", p.location]] as const).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: thin }}>
                    <dt style={{ color: "var(--mute)" }}>{k}</dt><dd style={{ margin: 0, fontWeight: 600, textAlign: "right" }}>{v}</dd>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0" }}>
                  <dt style={{ color: "var(--mute)" }}>Status</dt>
                  <dd style={{ margin: 0, fontWeight: 600, textAlign: "right", padding: "4px 8px", border: "1px solid rgba(var(--ink-rgb),0.3)", fontSize: 11, letterSpacing: "0.06em" }}>{p.status}</dd>
                </div>
              </dl>
            </div>
            <div style={{ minHeight: "clamp(260px,30vw,380px)", aspectRatio: "3 / 2", alignSelf: "stretch", position: "relative", minWidth: 0 }}>
              <Slot src={p.img} alt={p.title} style={{ position: "absolute", inset: 0 }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))", borderTop: line }}>
            {p.stages.map((st) => (
              <div key={st.name} style={{ borderRight: line, minWidth: 0 }}>
                <div style={{ height: "clamp(110px,12vw,150px)" }}><Slot src={st.img} alt={`${p.title} — ${st.name} stage`} sizes="(max-width: 900px) 50vw, 20vw" /></div>
                <div style={{ padding: "12px 16px", borderTop: line, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}>{st.name}</div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
