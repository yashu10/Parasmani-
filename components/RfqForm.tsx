"use client";
import { useRef, useState, useTransition } from "react";
import { submitRfq } from "@/app/contact/actions";

const FIELDS: [id: string, label: string, type: string, placeholder: string, required: boolean, autoComplete?: string][] = [
  ["name", "NAME *", "text", "Full name", true, "name"],
  ["company", "COMPANY *", "text", "Organisation", true, "organization"],
  ["designation", "DESIGNATION", "text", "e.g. Manager — Procurement", false, "organization-title"],
  ["email", "EMAIL *", "email", "name@company.com", true, "email"],
  ["mobile", "MOBILE *", "tel", "+91", true, "tel"],
  ["location", "PROJECT LOCATION", "text", "City, State", false],
  ["tonnage", "REQUIRED TONNAGE", "number", "e.g. 900", false],
  ["grade", "MATERIAL GRADE", "text", "e.g. IS 2062 E250 BR", false],
  ["delivery", "EXPECTED DELIVERY", "date", "", false],
  ["inspection", "INSPECTION AGENCY", "text", "TPI agency, if any", false],
];

const label: React.CSSProperties = { display: "block", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--mute)", marginBottom: 8 };
const errStyle: React.CSSProperties = { display: "block", marginTop: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: "var(--acc)" };

function validate(vals: Record<string, string>) {
  const errs: Record<string, string> = {};
  for (const [id, , , , req] of FIELDS) {
    if (!req) continue;
    const v = (vals[id] || "").trim();
    if (!v) errs[id] = "This field is required.";
    else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[id] = "Enter a valid email address.";
    else if (id === "mobile" && v.replace(/\D/g, "").length < 10) errs[id] = "Enter a valid mobile number.";
  }
  if (!(vals.scope || "").trim()) errs.scope = "Scope of work is required.";
  return errs;
}

const fmtSize = (b: number) => (b >= 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");

export default function RfqForm() {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [serverErrs, setServerErrs] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errs = touched ? { ...serverErrs, ...validate(vals) } : {};
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVals((v) => ({ ...v, [k]: e.target.value }));
    setServerErrs((s) => { const n = { ...s }; delete n[k]; return n; });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    setSent(false);
    const v = validate(vals);
    if (Object.keys(v).length) {
      setFormError("Please check the highlighted fields and try again.");
      const first = formRef.current?.querySelector<HTMLElement>(`#rfq-${Object.keys(v)[0]}`);
      first?.focus();
      return;
    }
    if (file && file.size > 4 * 1024 * 1024) {
      setFormError("The drawing file is larger than 4 MB. Please email it to info@parasmaniengineering.com instead.");
      return;
    }
    setFormError("");
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await submitRfq(fd);
      if (res.ok) {
        setSent(true);
        setVals({});
        setFile(null);
        setTouched(false);
        formRef.current?.reset();
      } else {
        setFormError(res.error);
        if (res.fields) setServerErrs(res.fields);
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="rfq-status">
      <h2 style={{ margin: "0 0 clamp(24px,3vw,36px)", fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 700, letterSpacing: "-0.025em" }}>REQUEST FOR <span className="hl">QUOTE</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 20 }}>
        {FIELDS.map(([id, lab, type, ph, req, ac]) => (
          <div key={id} style={{ minWidth: 0 }}>
            <label htmlFor={`rfq-${id}`} style={label}>{lab}</label>
            <input id={`rfq-${id}`} name={id} type={type} placeholder={ph || undefined} autoComplete={ac}
              aria-required={req} aria-invalid={errs[id] ? true : false} aria-describedby={errs[id] ? `rfq-${id}-err` : undefined}
              value={vals[id] || ""} onChange={set(id)} className="field" min={type === "number" ? 0 : undefined} />
            {errs[id] && <span id={`rfq-${id}-err`} style={errStyle}>{errs[id]}</span>}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <label htmlFor="rfq-scope" style={label}>SCOPE OF WORK *</label>
        <textarea id="rfq-scope" name="scope" rows={4} placeholder="Fabrication only / fabrication + surface treatment / supply + erection…"
          aria-required aria-invalid={errs.scope ? true : false} aria-describedby={errs.scope ? "rfq-scope-err" : undefined}
          value={vals.scope || ""} onChange={set("scope")} className="field" style={{ resize: "vertical" }} />
        {errs.scope && <span id="rfq-scope-err" style={errStyle}>{errs.scope}</span>}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="rfq-website">Website</label>
        <input id="rfq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ marginTop: 24, padding: "clamp(28px,4vw,44px) clamp(16px,2.5vw,28px)", border: "2px dashed rgba(var(--ink-rgb),0.3)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em" }}>DRAWING / BOQ</div>
        <p style={{ margin: "8px 0 18px", fontSize: 13, lineHeight: 1.5, color: "var(--mute)" }}>PDF, DWG, XLS, XLSX or ZIP · up to 4 MB</p>
        <input ref={fileRef} id="rfq-drawing" name="drawing" type="file" accept=".pdf,.dwg,.dxf,.xls,.xlsx,.zip" className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-sm btn-out lift" aria-controls="rfq-drawing">CHOOSE FILES</button>
        {file && <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: "var(--mute)" }}>{file.name} · {fmtSize(file.size)}</div>}
      </div>

      <button type="submit" disabled={pending} className="btn btn-pri lift"
        style={{ display: "flex", width: "100%", marginTop: 24, padding: "20px 26px", fontSize: 13, minHeight: 60, opacity: pending ? 0.7 : 1 }}>
        {pending ? "SENDING…" : "SUBMIT RFQ"}
      </button>
      <div id="rfq-status">
        {formError && <div role="alert" style={{ marginTop: 18, padding: "16px 20px", border: "2px solid var(--acc)", color: "var(--acc)", fontSize: 13, fontWeight: 600 }}>{formError}</div>}
        {sent && <div role="status" style={{ marginTop: 18, padding: "16px 20px", border: "2px solid var(--ink)", background: "var(--bg2)", fontSize: 13, fontWeight: 600 }}>Thank you. Your RFQ has been received. Our team will review the submitted information.</div>}
      </div>
    </form>
  );
}
