import { metrics } from "@/lib/content";
import PendingFlag from "./PendingFlag";

export default function Metrics({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", borderBottom: "2px solid var(--line)", ...style }}>
      {metrics.map((m) => (
        <div key={m.label} style={{ padding: "clamp(28px,4vw,48px) var(--px)", borderRight: "2px solid var(--line)", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span data-count="" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.92 }}>{m.value}</span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.04em", color: "var(--mute)" }}>{m.unit}</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}>{m.label}</div>
          <PendingFlag />
        </div>
      ))}
    </div>
  );
}
