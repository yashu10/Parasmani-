import Slot from "./Slot";
import Words from "./Words";

type Props = {
  label: string;
  img: string;
  alt: string;
  before?: string;
  hl?: string;
  after?: string;
  h1Size?: string;
  h1Max?: string;
  h1Margin?: string;
  children?: React.ReactNode;
};

/** Page header: full-width photo, left-to-right gradient, label + H1 (+ optional intro). */
export default function PageHero({ label, img, alt, before, hl, after, h1Size = "clamp(38px,5.6vw,82px)", h1Max, h1Margin, children }: Props) {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "clamp(420px,62vh,640px)", display: "flex", alignItems: "flex-end", borderBottom: "2px solid var(--line)" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Slot src={img} alt={alt} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(var(--bg-rgb),0.94) 0%, rgba(var(--bg-rgb),0.8) 42%, rgba(var(--bg-rgb),0.2) 78%, rgba(var(--bg-rgb),0.05) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(56px,8vw,140px) var(--px)", minWidth: 0, maxWidth: 980 }}>
        <span className="lbl">{label}</span>
        <Words before={before} hl={hl} after={after} className="h1" style={{ margin: h1Margin ?? (children ? "22px 0 24px" : "22px 0 0"), fontSize: h1Size, maxWidth: h1Max }} />
        {children}
      </div>
    </div>
  );
}
