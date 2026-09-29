import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SHOW_CAREERS, roles } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/careers", "Careers — Engineering, Production & Quality Roles", "Open roles at Parasmani Engineering, Viramgam, Gujarat: structural, production, welding, QA/QC and planning engineers, project manager, welders and fabricators.", "/images/K.jpg");

export default function CareersPage() {
  if (!SHOW_CAREERS) notFound();
  return (
    <div data-anim="screen">
      <PageHero label="CAREERS" img="/images/K.jpg" alt="PEPL team on the shop floor" hl="OWNERSHIP" after="IS A JOB DESCRIPTION HERE.">
        <p style={{ margin: 0, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, maxWidth: "52ch", color: "var(--soft)" }}>
          PEPL is building its engineering, production and quality functions. Write to us with the role in the subject line.
        </p>
      </PageHero>
      <div style={{ padding: "clamp(48px,7vw,120px) var(--px)", background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(24px,3vw,40px)" }}>
          <h2 className="h2" style={{ margin: 0 }}>OPEN <span className="hl">ROLES</span></h2>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", color: "var(--soft)" }}>ALL ROLES · VIRAMGAM, GUJARAT</span>
        </div>
        <div style={{ borderTop: "2px solid rgba(var(--ink-rgb),0.24)" }}>
          {roles.map((r) => (
            <div key={r.num} className="role-row" style={{ display: "grid", gridTemplateColumns: "48px minmax(0,2fr) minmax(0,1fr) auto", gap: "clamp(12px,2vw,32px)", alignItems: "center", padding: "22px 0", borderBottom: "2px solid rgba(var(--ink-rgb),0.14)" }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "var(--hl)" }}>{r.num}</span>
              <h3 style={{ margin: 0, fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.2, minWidth: 0 }}>{r.role}</h3>
              <div style={{ fontSize: 15, color: "var(--soft)", minWidth: 0 }}>{r.department}</div>
              <a href={r.mailto} className="btn btn-out" aria-label={`Apply for ${r.role}`} style={{ gap: 10, padding: "12px 18px", fontSize: 12, whiteSpace: "nowrap" }}>
                APPLY
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
