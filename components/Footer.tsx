import Link from "next/link";
import { CONTACT, NAV_ALL } from "@/lib/content";

const head: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "var(--mute)", marginBottom: 20 };

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg3)", color: "var(--ink)" }}>
      <div style={{ padding: "clamp(48px,6vw,90px) var(--px) clamp(32px,4vw,56px)", borderBottom: "2px solid var(--line)" }}>
        <div className="h1" style={{ fontSize: "clamp(30px,6vw,86px)" }}>ENGINEERED TO DELIVER.</div>
        <div className="lbl" style={{ marginTop: 24 }}>INTEGRITY · OWNERSHIP · EXCELLENCE · CARE</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "clamp(28px,4vw,48px)", padding: "clamp(40px,5vw,72px) var(--px)" }}>
        <div>
          <div style={head}>NAVIGATE</div>
          <nav aria-label="Footer" style={{ display: "grid", gap: 10 }}>
            {NAV_ALL.map((n) => (
              <Link key={n.href} href={n.href} className="lift" style={{ color: "var(--ink)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", lineHeight: "normal", width: "fit-content", transition: "transform .25s var(--ease), box-shadow .25s ease, color .25s" }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <div style={head}>CONTACT</div>
          <div style={{ fontSize: 13, lineHeight: 1.9 }}>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />
            {CONTACT.street}<br />{CONTACT.district}, Gujarat {CONTACT.postalCode}
          </div>
        </div>
        <div>
          <div style={head}>LEGAL</div>
          <div style={{ display: "grid", gap: 10, fontSize: 13 }}>
            <Link href="/privacy" style={{ width: "fit-content" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ width: "fit-content" }}>Terms</Link>
          </div>
        </div>
        <div>
          <div style={head}>ORGANISATION</div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--mute)", maxWidth: "34ch" }}>
            Parasmani Engineering Pvt. Ltd. — a fabrication engineering organisation delivering engineered steel for India&apos;s infrastructure and industrial sectors.
          </p>
        </div>
      </div>
      <div style={{ padding: "20px var(--px)", borderTop: "2px solid var(--acc)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--mute)" }}>
        © PARASMANI ENGINEERING PVT. LTD.
      </div>
    </footer>
  );
}
