import { Fragment } from "react";

type Props = {
  as?: "h1" | "h2" | "p";
  before?: string;
  hl?: string;
  after?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Headline with per-word rise. Words are server-rendered as real text (crawlers read the full
 * headline); the rise itself is applied on the client by <MotionRoot/> after hydration.
 */
export default function Words({ as: Tag = "h1", before = "", hl = "", after = "", className, style }: Props) {
  const parts = [
    ...before.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: false })),
    ...hl.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: true })),
    ...after.split(/\s+/).filter(Boolean).map((w) => ({ w, hl: false })),
  ];
  return (
    <Tag data-words="" className={className} style={style}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <span data-word="" style={{ display: "inline-block", color: p.hl ? "var(--hl)" : undefined }}>
              {p.w}
            </span>
          </span>
          {i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
