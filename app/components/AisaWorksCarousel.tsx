import type { aisaWorks } from "../data/aisa";
import pageStyles from "../aisa/AisaPage.module.css";
import { WorksAutoMarquee } from "./WorksAutoMarquee";

type AisaWork = (typeof aisaWorks)[number];

export function AisaWorksCarousel({ works }: { works: readonly AisaWork[] }) {
  return (
    <WorksAutoMarquee
      brand="aisa"
      heading={<div className={pageStyles.heading}><span>WORKS</span><h2>AI活用事例</h2></div>}
      items={works}
    />
  );
}
