import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";
import MotionRoot from "@/components/MotionRoot";
import { ALLOW_INDEXING, SITE_NAME, SITE_URL, orgJsonLd } from "@/lib/site";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Parasmani Engineering — Heavy Steel Fabrication", template: "%s | PEPL" },
  description: "Parasmani Engineering Pvt. Ltd.: engineering, detailing, CNC production, welding, surface treatment and inspection under one roof in Viramgam, Gujarat.",
  applicationName: SITE_NAME,
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
  
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0A1622" }, { color: "#0A1622" }],
};

// Runs before paint: restore theme (no flash) and enable motion classes.
const bootScript = `(function(){var d=document.documentElement;try{if(localStorage.getItem('pepl-mono')==='1')d.setAttribute('data-theme','light')}catch(e){}
d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!window.__peplMotion)d.classList.add('motion-off')},3000)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="dark" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only">Skip to content</a>
        <div style={{ position: "relative" }}>
          <Background />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Header />
            <ScrollProgress />
            <main id="main">{children}</main>
            <CtaBand />
            <Footer />
          </div>
        </div>
        <MotionRoot />
      </body>
    </html>
  );
}
