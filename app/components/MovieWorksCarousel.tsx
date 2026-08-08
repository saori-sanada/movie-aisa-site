import type { MovieWork } from "../data/movieWorks";
import { WorksAutoMarquee } from "./WorksAutoMarquee";

export function MovieWorksCarousel({ works }: { works: MovieWork[] }) {
  return (
    <WorksAutoMarquee
      brand="movie"
      heading={<div className="movie-design-heading"><span>WORKS</span><h2>制作実績</h2></div>}
      items={works}
    />
  );
}
