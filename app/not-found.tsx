import Link from "next/link";

export default function NotFound() {
  return (
    <div data-anim="screen">
      <div style={{ padding: "clamp(56px,8vw,140px) var(--px)", background: "var(--bg)", borderBottom: "2px solid var(--line)", minHeight: "50vh" }}>
        <span className="lbl">404</span>
        <h1 className="h1" style={{ margin: "22px 0 24px", fontSize: "clamp(34px,5vw,72px)" }}>PAGE NOT <span className="hl">FOUND.</span></h1>
        <Link href="/" className="btn btn-lg btn-out lift">BACK TO HOME</Link>
      </div>
    </div>
  );
}
