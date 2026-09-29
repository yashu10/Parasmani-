"use server";
import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";

export type RfqResult = { ok: true } | { ok: false; error: string; fields?: Record<string, string> };

const MAX_FILE = 4 * 1024 * 1024; // Vercel functions accept ~4.5 MB request bodies
const ALLOWED = /\.(pdf|dwg|dxf|xls|xlsx|zip)$/i;

const schema = z.object({
  name: z.string().trim().min(1, "This field is required.").max(120),
  company: z.string().trim().min(1, "This field is required.").max(160),
  designation: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address.").max(200),
  mobile: z.string().trim().refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid mobile number.").pipe(z.string().max(30)),
  location: z.string().trim().max(160).optional().default(""),
  tonnage: z.string().trim().max(20).optional().default(""),
  grade: z.string().trim().max(120).optional().default(""),
  delivery: z.string().trim().max(20).optional().default(""),
  inspection: z.string().trim().max(160).optional().default(""),
  scope: z.string().trim().min(1, "Scope of work is required.").max(5000),
});

// Best-effort in-memory rate limit (per server instance): 5 submissions / 10 min / IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function submitRfq(formData: FormData): Promise<RfqResult> {
  // honeypot: real users never fill this
  if (String(formData.get("website") || "").trim()) return { ok: true };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (limited(ip)) return { ok: false, error: "Too many submissions. Please try again in a few minutes." };

  const raw = Object.fromEntries(["name", "company", "designation", "email", "mobile", "location", "tonnage", "grade", "delivery", "inspection", "scope"].map((k) => [k, String(formData.get(k) ?? "")]));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0])] ??= issue.message;
    return { ok: false, error: "Please check the highlighted fields and try again.", fields };
  }
  const d = parsed.data;

  const file = formData.get("drawing");
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file && typeof file === "object" && "size" in file && file.size > 0) {
    if (file.size > MAX_FILE) return { ok: false, error: "The drawing file is larger than 4 MB. Please email it to info@parasmaniengineering.com instead." };
    if (!ALLOWED.test(file.name)) return { ok: false, error: "Upload a PDF, DWG, DXF, XLS, XLSX or ZIP file." };
    attachment = { filename: file.name, content: Buffer.from(await file.arrayBuffer()) };
  }

  const rows: [string, string][] = [
    ["Name", d.name], ["Company", d.company], ["Designation", d.designation], ["Email", d.email], ["Mobile", d.mobile],
    ["Project location", d.location], ["Required tonnage", d.tonnage], ["Material grade", d.grade],
    ["Expected delivery", d.delivery], ["Inspection agency", d.inspection], ["Scope of work", d.scope],
  ];
  const html = `<h2>New RFQ — ${esc(d.company)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="border:1px solid #ccc"><b>${k}</b></td><td style="border:1px solid #ccc;white-space:pre-wrap">${esc(v || "—")}</td></tr>`)
    .join("")}</table>${attachment ? `<p>Attachment: ${esc(attachment.filename)}</p>` : ""}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL;
  if (!key || !to) {
    console.warn("[RFQ] RESEND_API_KEY / RFQ_TO_EMAIL not set — RFQ not emailed:", JSON.stringify({ ...d, attachment: attachment?.filename }));
    return { ok: true };
  }
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.RFQ_FROM_EMAIL || "PEPL Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: d.email,
      subject: `RFQ: ${d.company} — ${d.name}`,
      html,
      attachments: attachment ? [attachment] : undefined,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (e) {
    console.error("[RFQ] send failed", e);
    return { ok: false, error: "We couldn't send your RFQ right now. Please email info@parasmaniengineering.com or call +91 98797 95382." };
  }
}
