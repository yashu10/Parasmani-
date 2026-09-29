import Link from "next/link";
import Words from "./Words";

export default function CtaBand() {
  return (
    <section style={{ padding: "clamp(56px,9vw,150px) var(--px)", background: "#00508E", color: "#fff" }}>
      <Words as="h2" before="YOUR DRAWINGS. OUR STEEL." hl="DELIVERED ON TIME." className="h1"
        style={{ margin: "0 0 24px", fontSize: "clamp(30px,6vw,86px)", maxWidth: "20ch" }} />
      <p style={{ margin: "0 0 36px", maxWidth: "52ch", fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.55, color: "#fff" }}>
        Send us your drawings and tonnage. Our engineering team replies with a detailed quote within 48 hours.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Link href="/contact" className="btn lift cta-a" style={{ padding: "20px 28px", fontSize: 13, minHeight: 60 }}>REQUEST A QUOTE</Link>
        <Link href="/quality?doc=company-profile" className="btn lift cta-b" style={{ padding: "20px 28px", fontSize: 13, minHeight: 60 }}>COMPANY PROFILE</Link>
      </div>
      <style>{`.cta-a{border:2px solid #fff;background:#fff;color:#00508E}.cta-a:hover{background:transparent;color:#fff}
.cta-b{border:2px solid #fff;background:transparent;color:#fff}.cta-b:hover{background:#fff;color:#00508E}`}</style>
    </section>
  );
}
