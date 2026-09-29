"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Client-only motion layer (ported from the prototype's tag()/wire()):
 * - block reveal: top-level blocks of [data-anim="screen"] fade up when 10% visible;
 *   grids with 3+ children reveal child-by-child, 0.06s apart
 * - [data-words] headlines: words rise 105% → 0, 0.045s apart, at 30% visible
 * - [data-count] numbers ≥ 10 count up over 1.1s (en-IN grouping) at 60% visible
 * All hidden-before-reveal CSS is gated behind html.motion (set only with JS + no reduced motion).
 */
const EASE = "cubic-bezier(0.16,1,0.3,1)";

function inView(el: Element, cb: () => void, amount: number) {
  const h = (el as HTMLElement).offsetHeight || 1;
  const threshold = Math.min(amount, (window.innerHeight / h) * 0.5);
  const io = new IntersectionObserver((es) => {
    if (es.some((e) => e.isIntersecting)) { io.disconnect(); cb(); }
  }, { threshold });
  io.observe(el);
  return io;
}

function countUp(el: HTMLElement) {
  if (el.dataset.countDone) return;
  el.dataset.countDone = "1";
  const raw = (el.textContent || "").trim();
  const m = raw.match(/^([\d,]+)$/);
  if (!m) return;
  const end = parseInt(m[1].replace(/,/g, ""), 10);
  if (!isFinite(end) || end < 10) return;
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / 1100);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(end * eased).toLocaleString("en-IN");
    if (k < 1) requestAnimationFrame(step);
    else el.textContent = raw;
  };
  el.textContent = "0";
  requestAnimationFrame(step);
}

export default function MotionRoot() {
  const path = usePathname();

  useEffect(() => {
    (window as Window & { __peplMotion?: boolean }).__peplMotion = true;
    const root = document.documentElement;
    if (!root.classList.contains("motion") || root.classList.contains("motion-off")) return;

    const run = () => {
      // headline words
      document.querySelectorAll<HTMLElement>("[data-words]:not([data-words-wired])").forEach((el) => {
        el.dataset.wordsWired = "1";
        const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
        (inView(el, () => {
          words.forEach((w, i) => {
            const a = w.animate([{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
              { duration: 750, delay: i * 45, easing: EASE, fill: "both" });
            a.finished.then(() => { w.setAttribute("data-risen", ""); a.cancel(); }).catch(() => {});
          });
        }, 0.3));
      });

      // count-up
      document.querySelectorAll<HTMLElement>("[data-count]:not([data-count-wired])").forEach((el) => {
        el.dataset.countWired = "1";
        (inView(el, () => countUp(el), 0.6));
      });

      // block reveal
      document.querySelectorAll<HTMLElement>('[data-anim="screen"]').forEach((scr) => {
        Array.from(scr.children).forEach((node, idx) => {
          const block = node as HTMLElement;
          if (idx === 0 || block.dataset.animWired) return; // first block (hero) arrives with the screen fade
          block.dataset.animWired = "1";
          const kids = Array.from(block.children) as HTMLElement[];
          const grid = kids.length >= 3 && getComputedStyle(block).display === "grid";
          const targets = grid ? kids : [block];
          if (grid) {
            kids.forEach((k) => { k.style.opacity = "0"; });
            block.setAttribute("data-revealed", "");
          }
          (inView(block, () => {
            targets.forEach((t, i) => {
              const a = t.animate(
                [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0px)" }],
                { duration: 600, delay: grid ? i * 60 : 0, easing: EASE, fill: "both" });
              a.finished.then(() => {
                t.style.opacity = "";
                t.setAttribute("data-revealed", "");
                a.cancel();
              }).catch(() => {});
            });
          }, 0.1));
        });
      });
    };

    // Observers disconnect themselves once they fire. They are not torn down on route change,
    // because layout-level blocks (CTA band) persist across routes and must still reveal.
    const raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [path]);

  return null;
}
