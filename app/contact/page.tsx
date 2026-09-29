import PageHero from "@/components/PageHero";
import RfqForm from "@/components/RfqForm";
import { CONTACT } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/contact", "Contact & Request for Quote", "Share your project requirements, drawings or BOQ with Parasmani Engineering. Works: Village Vani, Taluka Viramgam, Dist. Ahmedabad, Gujarat 382150. +91 98797 95382.", "/images/Z.jpg");

const line = "2px solid var(--line)";
const MAP_Q = encodeURIComponent("Parasmani Engineering, Vani, Viramgam, Gujarat 382150");

export default function ContactPage() {
  return (
    <div data-anim="screen">
      <PageHero label="CONTACT" img="/images/Z.jpg" alt="PEPL works" before="LET'S ENGINEER YOUR" hl="NEXT PROJECT." h1Size="clamp(34px,5vw,72px)" h1Max="22ch">
        <p style={{ margin: 0, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, maxWidth: "56ch", color: "var(--soft)" }}>
          Share your project requirements, drawings or BOQ and our team can review the scope.
        </p>
      </PageHero>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", borderBottom: line, background: "var(--bg)" }}>
        <div style={{ position: "relative", padding: "clamp(40px,5vw,80px) var(--px)", borderRight: line, minWidth: 0 }}>
          <RfqForm />
        </div>
        <div style={{ minWidth: 0 }}>
          <address style={{ fontStyle: "normal", padding: "clamp(32px,4vw,56px) var(--px)", borderBottom: line }}>
            <div className="lbl">WORKS &amp; REGISTERED OFFICE</div>
            <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.6, maxWidth: "38ch" }}>
              {CONTACT.company}<br />Village Vani, Taluka Viramgam,<br />Dist. Ahmedabad, Gujarat 382150, India
            </p>
          </address>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", borderBottom: line }}>
            <div style={{ padding: "clamp(32px,4vw,56px) var(--px)", borderRight: line, minWidth: 0 }}>
              <div className="lbl">PHONE</div>
              <a href={CONTACT.phoneHref} style={{ display: "block", marginTop: 16, fontSize: "clamp(17px,1.9vw,22px)", fontWeight: 700, letterSpacing: "-0.02em" }}>{CONTACT.phone}</a>
            </div>
            <div style={{ padding: "clamp(32px,4vw,56px) var(--px)", minWidth: 0 }}>
              <div className="lbl">EMAIL</div>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "block", marginTop: 16, fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", wordBreak: "break-all" }}>{CONTACT.email}</a>
            </div>
          </div>
          <div style={{ height: "clamp(260px,30vw,380px)", position: "relative", background: "var(--bg2)" }}>
            <iframe title="Map — Parasmani Engineering works, Viramgam" src={`https://www.google.com/maps?q=${MAP_Q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "grayscale(0.2)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
