import { pageMeta } from "@/lib/site";

export const metadata = { ...pageMeta("/terms", "Terms of Use", "Terms of Use for the Parasmani Engineering Pvt. Ltd. website."), robots: { index: false } };

export default function Page() {
  return (
    <div data-anim="screen">
      <div style={{ padding: "clamp(56px,8vw,140px) var(--px)", background: "var(--bg)", borderBottom: "2px solid var(--line)" }}>
        <span className="lbl">LEGAL</span>
        <h1 className="h1" style={{ margin: "22px 0 24px", fontSize: "clamp(34px,5vw,72px)" }}>TERMS OF USE</h1>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, maxWidth: "60ch", color: "var(--soft)" }}>
          This page is being prepared and will be published after review by Parasmani Engineering Pvt. Ltd. For questions, write to info@parasmaniengineering.com.
        </p>
      </div>
    </div>
  );
}
