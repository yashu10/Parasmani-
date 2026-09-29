import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import QualityDocs from "@/components/QualityDocs";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta("/quality", "Quality — Certifications, Inspection & Downloads", "Welder qualifications, NDT, hold points and dispatch documentation controlled by procedure. Third-party and client inspection accommodated at any stage.", "/images/Q.jpg");

export default function QualityPage() {
  return (
    <div data-anim="screen">
      <PageHero label="QUALITY" img="/images/Q.jpg" alt="Quality inspection of fabricated steel" before="QUALITY IS ENGINEERED INTO" hl="EVERY STAGE." h1Size="clamp(30px,4.4vw,64px)">
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, maxWidth: "50ch", color: "var(--soft)" }}>
          Welder qualifications, NDT, hold points and dispatch documentation are controlled by procedure. Third-party and client inspection are accommodated at any stage.
        </p>
      </PageHero>
      <Suspense fallback={null}>
        <QualityDocs />
      </Suspense>
    </div>
  );
}
