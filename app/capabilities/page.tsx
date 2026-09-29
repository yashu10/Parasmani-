import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import { capEng, capHeavy, processStages } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/capabilities", "Capabilities — Heavy Steel Fabrication, Design & Engineering", "Heavy structural steel, complex fabricated assemblies, shop and fabrication drawings, CNC data and a nine-stage controlled process from drawing to delivery.", "/images/W.jpg");

const line = "2px solid var(--line)";
const row = "2px solid rgba(var(--ink-rgb),0.14)";

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: line }}>
      {items.map((c) => (
        <li key={c} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: row, fontSize: 15 }}>
          <span aria-hidden="true" style={{ color: "var(--acc)", fontWeight: 700, flex: "none" }}>—</span><span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

const cellHead: React.CSSProperties = { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--soft)" };
const cellBody: React.CSSProperties = { marginTop: 8, fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: "var(--ink)" };

export default function CapabilitiesPage() {
  return (
    <div data-anim="screen">
      <PageHero label="CAPABILITIES" img="/images/W.jpg" alt="Steel fabrication capabilities at PEPL" before="ENGINEERED FOR" hl="COMPLEXITY." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        <div style={{ borderRight: line, minWidth: 0 }}>
          <div style={{ height: "clamp(200px,24vw,300px)" }}><Slot src="/images/G.jpg" alt="Built-up girder on the fit-up line" /></div>
          <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", borderTop: line }}>
            <h2 className="h2s" style={{ margin: "0 0 28px" }}>HEAVY <span className="hl">STEEL</span> FABRICATION</h2>
            <List items={capHeavy} />
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ height: "clamp(200px,24vw,300px)" }}><Slot src="/images/S.jpg" alt="Engineering and detailing workstation" /></div>
          <div style={{ padding: "clamp(40px,5vw,80px) var(--px)", borderTop: line }}>
            <h2 className="h2s" style={{ margin: "0 0 28px" }}><span className="hl">DESIGN</span> &amp; ENGINEERING</h2>
            <List items={capEng} />
          </div>
        </div>
      </div>
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px)" }}>
        <span className="lbl">PROCESS</span>
        <h2 className="h2" style={{ margin: "20px 0 14px" }}>FROM DRAWING TO <span className="hl">DELIVERY</span></h2>
        <p style={{ margin: "0 0 clamp(28px,4vw,48px)", fontSize: 16, lineHeight: 1.55, color: "var(--mute)", maxWidth: "58ch" }}>Nine controlled stages. Each carries a hold point, a document and a signature before the job moves on.</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: line }}>
          {processStages.map((p) => (
            <li key={p.number} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(8px,1.5vw,24px)", padding: "22px 0", borderBottom: row }}>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--hl)" }}>{p.number}</span>
                <h3 className="lh" style={{ margin: "8px 0 0", fontSize: 19, fontWeight: 700, letterSpacing: "-0.015em" }}>{p.name}</h3>
              </div>
              <div style={{ minWidth: 0 }}><div style={cellHead}>HOLD POINT</div><div style={cellBody}>{p.hold}</div></div>
              <div style={{ minWidth: 0 }}><div style={cellHead}>DOCUMENT</div><div style={cellBody}>{p.doc}</div></div>
              <div style={{ minWidth: 0 }}><div style={cellHead}>SIGNATURE</div><div style={cellBody}>{p.sign}</div></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
