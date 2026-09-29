import type { MetadataRoute } from "next";
import { SHOW_CAREERS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/capabilities", "/industries", "/projects", "/facility", "/quality", "/technology", "/rdso-approval", "/contact"];
  if (SHOW_CAREERS) routes.push("/careers");
  return routes.map((r) => ({ url: `${SITE_URL}${r || "/"}`, lastModified: new Date(), changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
