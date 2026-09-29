import Link from "next/link";
import PageHero from "@/components/PageHero";
import Slot from "@/components/Slot";
import { industries } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/industries", "Industries — Power, Steel, Railways, Oil & Gas and more", "Fabricated steel for power & energy, steel & metals, infrastructure, cement, railways, EPC, defence, heavy engineering, oil & gas, solar and food processing.", "/images/H.jpg");

const line = "2px solid var(--line)";

export default function IndustriesPage() {
  return (
    <div data-anim="screen">
      <PageHero label="INDUSTRIES" img="/images/H.jpg" alt="Industrial steel structures" before="ENGINEERED FOR" hl="INDUSTRY." />
      {industries.map((i) => (
        <section key={i.num} id={i.name.toLowerCase().replace(/[^a-z]+/g, "-")} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", borderBottom: line, background: "var(--bg)" }}>
          <div style={{ minHeight: "clamp(240px,26vw,340px)", aspectRatio: "3 / 2", alignSelf: "stretch", position: "relative", borderRight: line, minWidth: 0 }}>
            <Slot src={i.img} alt={`${i.name} — fabricated steel`} style={{ position: "absolute", inset: 0 }} />
          </div>
          <div style={{ padding: "clamp(40px,5vw,90px) var(--px)", minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--acc)" }}>{i.num}</span>
            <h2 style={{ margin: "16px 0 20px", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>{i.name.toUpperCase()}</h2>
            <p style={{ margin: "0 0 28px", fontSize: 16, lineHeight: 1.55, maxWidth: "48ch", color: "var(--soft)" }}>{i.long}</p>
            <Link href="/projects" className="btn btn-sm btn-out lift">VIEW RELATED PROJECTS</Link>
          </div>
        </section>
      ))}
    </div>
  );
}
