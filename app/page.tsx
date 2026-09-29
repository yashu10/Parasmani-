import Link from "next/link";
import Slot from "@/components/Slot";
import Words from "@/components/Words";
import Metrics from "@/components/Metrics";
import FilmModal from "@/components/FilmModal";
import { SHOW_CAREERS, capEng, capHeavy, clientSlots, industries, projects, ticker, why } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("/", "Heavy Steel Fabrication & Engineering", "Engineering, detailing, CNC production, welding, surface treatment and inspection under one roof and one plan — Parasmani Engineering, Viramgam, Gujarat."),
  title: { absolute: "Parasmani Engineering — Engineering Steel. Building Possibility." },
};

const line = "2px solid var(--line)";
const thin = "1px solid rgba(var(--ink-rgb),0.14)";
const SHOW_3D_HINT = (process.env.NEXT_PUBLIC_BG_MODE || "image").toLowerCase() === "3d";

function SectionHead({ label, before, hl, after, href, cta }: { label: string; before?: string; hl: string; after?: string; href: string; cta: string }) {
  return (
    <div style={{ padding: "clamp(48px,7vw,120px) var(--px) 0" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(28px,4vw,48px)" }}>
        <div>
          <span className="lbl">{label}</span>
          <h2 className="h2" style={{ margin: "20px 0 0" }}>{before}<span className="hl">{hl}</span>{after}</h2>
        </div>
        <Link href={href} className="btn btn-sm btn-out lift">{cta}</Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const tickerTwice = ticker.concat(ticker);
  return (
    <div data-anim="screen">
      {/* Hero */}
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", borderBottom: line, minHeight: "min(88vh,820px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Slot src="/images/U.jpg" alt="PEPL plant shop floor with heavy steel fabrication in progress" priority sizes="100vw" />
        </div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(var(--bg-rgb),0.94) 0%, rgba(var(--bg-rgb),0.82) 38%, rgba(var(--bg-rgb),0.25) 72%, rgba(var(--bg-rgb),0.05) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: "clamp(48px,7vw,110px) var(--px)", minWidth: 0 }}>
          <span className="lbl">PARASMANI ENGINEERING PVT. LTD.</span>
          <Words before="ENGINEERING STEEL. BUILDING" hl="POSSIBILITY." className="h1" style={{ margin: 0, fontSize: "clamp(38px,5.6vw,82px)" }} />
          <p style={{ margin: 0, maxWidth: "50ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "var(--soft)" }}>
            Engineering, detailing, CNC production, welding, surface treatment and inspection under one roof and one plan.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/capabilities" className="btn btn-lg btn-pri lift">EXPLORE CAPABILITIES</Link>
            <Link href="/contact" className="btn btn-lg btn-out lift">REQUEST A QUOTE</Link>
          </div>
          {SHOW_3D_HINT && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "var(--mute)" }}>DRAG THE BACKGROUND TO ORBIT</span>}
        </div>
        <div style={{ position: "relative", zIndex: 1, minHeight: 400, minWidth: 0, pointerEvents: "none" }}>
          <FilmModal />
        </div>
      </div>

      {/* Ticker */}
      <div style={{ overflow: "hidden", borderBottom: line, background: "#00508E" }}>
        <div className="marquee" style={{ display: "flex", width: "max-content" }}>
          {tickerTwice.map((w, i) => (
            <span key={i} aria-hidden={i >= ticker.length || undefined} style={{ display: "flex", alignItems: "center", gap: 22, padding: "14px 22px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#fff", whiteSpace: "nowrap" }}>
              {w}<span style={{ display: "block", width: 6, height: 6, background: "var(--bg)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* At a glance */}
      <div style={{ padding: "clamp(24px,3vw,40px) var(--px) 0" }}>
        <h2 className="lh" style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>PEPL AT A GLANCE</h2>
      </div>
      <Metrics style={{ marginTop: "clamp(20px,3vw,32px)", borderTop: line }} />

      {/* 01 Capability */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", borderRight: line, minWidth: 0 }}>
          <span className="lbl">01 — CAPABILITY</span>
          <h2 className="h2" style={{ margin: "20px 0 0" }}>ENGINEERING + <span className="hl">FABRICATION</span></h2>
          <div style={{ marginTop: 36, borderTop: line }}>
            <h3 className="lbl lh" style={{ margin: 0, padding: "20px 0 12px" }}>HEAVY STEEL FABRICATION</h3>
            {capHeavy.map((c) => <div key={c} style={{ padding: "11px 0", borderBottom: thin, fontSize: 15 }}>{c}</div>)}
          </div>
        </div>
        <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ height: "clamp(180px,22vw,300px)", marginBottom: 36 }}>
            <Slot src="/images/O.jpg" alt="Covered fabrication bay at the PEPL works" />
          </div>
          <div style={{ borderTop: line }}>
            <h3 className="lbl lh" style={{ margin: 0, padding: "20px 0 12px" }}>DESIGN &amp; ENGINEERING</h3>
            {capEng.map((c) => <div key={c} style={{ padding: "11px 0", borderBottom: thin, fontSize: 15 }}>{c}</div>)}
          </div>
        </div>
      </div>

      {/* 02 Sectors */}
      <SectionHead label="02 — SECTORS" hl="INDUSTRIES" after=" WE SERVE" href="/industries" cta="ALL INDUSTRIES" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", borderTop: line, background: "var(--bg)" }}>
        {industries.map((i) => (
          <Link key={i.num} href="/industries" className="lift h-bg2" style={{ display: "block", width: "100%", borderRight: line, borderBottom: line, color: "inherit", minWidth: 0, transition: "background-color .25s, transform .25s var(--ease), box-shadow .25s" }}>
            <div style={{ height: "clamp(130px,14vw,180px)" }}><Slot src={i.img} alt={`${i.name} — steel fabrication`} sizes="(max-width: 700px) 100vw, 25vw" /></div>
            <div style={{ padding: "20px clamp(16px,2vw,24px)", borderTop: line }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{i.num}</span>
              <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>{i.name}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* 03 Evidence */}
      <SectionHead label="03 — EVIDENCE" before="SELECTED " hl="PROJECTS" href="/projects" cta="VIEW ALL PROJECTS" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", borderTop: line, borderBottom: line, background: "var(--bg)" }}>
        {projects.slice(0, 3).map((p) => (
          <article key={p.num} style={{ borderRight: line, minWidth: 0 }}>
            <div style={{ height: "clamp(180px,20vw,240px)" }}><Slot src={p.img} alt={p.title} sizes="(max-width: 1000px) 100vw, 33vw" /></div>
            <div style={{ padding: "clamp(24px,3vw,36px) clamp(16px,2.5vw,32px)", borderTop: line }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{p.num} · {p.industry}</span>
              <h3 style={{ margin: "14px 0 22px", fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{p.title}</h3>
              <dl style={{ fontSize: 13, margin: 0 }}>
                {([["Client", p.client], ["Scope", p.scope], ["Quantity", p.qty], ["Location", p.location]] as const).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "9px 0", borderBottom: thin }}>
                    <dt style={{ color: "var(--mute)" }}>{k}</dt><dd style={{ margin: 0, fontWeight: 600, textAlign: "right" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* 04 Rationale + clients */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", borderBottom: line }}>
        <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", borderRight: line, minWidth: 0 }}>
          <span className="lbl">04 — RATIONALE</span>
          <h2 className="h2" style={{ margin: "20px 0 36px" }}>WHY PARTNER WITH <span className="hl">PEPL?</span></h2>
          <div style={{ borderTop: line }}>
            {why.map((w) => (
              <div key={w.title} style={{ padding: "20px 0", borderBottom: line }}>
                <h3 className="lh" style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>{w.title}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--mute)", maxWidth: "48ch" }}>{w.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", borderBottom: line }}>
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(22px,2.6vw,32px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}><span className="hl">CLIENTS</span> &amp; PROJECT PARTNERS</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 2, background: "var(--line)", border: line }}>
              {clientSlots.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 78, background: "var(--bg)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--mute)", minWidth: 0, textAlign: "center", padding: "0 8px" }}>{c}</div>
              ))}
            </div>
            <p style={{ margin: "18px 0 0", fontSize: 12, lineHeight: 1.55, color: "var(--mute)" }}>Client logos shown only with written permission.</p>
          </div>
          {SHOW_CAREERS && (
            <div style={{ padding: "clamp(48px,7vw,120px) var(--px)" }}>
              <h2 style={{ margin: "0 0 10px", fontSize: "clamp(22px,2.6vw,32px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>BUILD THE <span className="hl">NEXT PROJECT</span> WITH US.</h2>
              <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.55, color: "var(--mute)", maxWidth: "42ch" }}>Ownership is a job description here.</p>
              <Link href="/careers" className="btn btn-lg btn-out lift">VIEW OPEN POSITIONS</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
