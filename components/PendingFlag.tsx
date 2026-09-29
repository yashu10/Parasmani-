import { SHOW_PENDING } from "@/lib/content";

export default function PendingFlag({ text = "PENDING VERIFICATION" }: { text?: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <span style={{ display: "inline-block", marginTop: 14, padding: "5px 9px", border: "1px solid var(--acc)", color: "var(--acc)", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em" }}>
      {text}
    </span>
  );
}
