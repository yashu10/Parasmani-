# PEPL — Parasmani Engineering website (Next.js 15)

11-page site, built from `design_handoff_pepl_nextjs/design/PEPL Website Orange.dc.html`.

## Local chalana

```bash
npm install
npm run dev
```
Browser mein kholo: http://localhost:3000

Production build check: `npm run build` then `npm start`.

## Vercel pe deploy

1. GitHub pe ek khali repo banao (e.g. `pepl`) aur push karo:
   ```bash
   git init
   git add .
   git commit -m "PEPL site"
   git branch -M main
   git remote add origin https://github.com/<username>/pepl.git
   git push -u origin main
   ```
2. vercel.com → **Add New → Project** → repo import → **Deploy** (preset Next.js hi rehne do).
3. Optional env vars (Settings → Environment Variables): `.env.example` dekho.
   Kuch bhi set na karo to bhi site chalegi. RFQ form tab submissions sirf Vercel logs mein dikhayega.

## Kya kahan hai

| Path | Kaam |
|---|---|
| `lib/content.ts` | Saari copy: industries, projects, machines, certs, RDSO docs, roles |
| `app/<route>/page.tsx` | Har page (Server Components, apna `metadata`) |
| `components/` | Header, Footer, CTA band, Background, motion, RFQ form, etc. |
| `app/contact/actions.ts` | RFQ server action (zod + Resend, honeypot, rate limit) |
| `lib/bg/scene.ts` | Three.js background (`NEXT_PUBLIC_BG_MODE=3d` pe) |
| `app/sitemap.ts`, `app/robots.ts` | SEO. Indexing OFF until `NEXT_PUBLIC_ALLOW_INDEXING=1` |
| `public/images/` | Logo + 33 photos |

## Launch se pehle

- Client se high-res photos + usage rights, leadership portraits, plant film.
- Pending facts confirm karke `NEXT_PUBLIC_SHOW_PENDING=0`.
- Quality downloads ke PDFs (abhi notice dikhata hai) → `public/docs/` + `components/QualityDocs.tsx`.
- RDSO PDFs abhi client ki current site se link hain. Self-host: `public/rdso/` mein copy, `NEXT_PUBLIC_RDSO_BASE=/rdso/`.
- Privacy / Terms pages ka real text.
- Final domain pe `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_ALLOW_INDEXING=1`.
