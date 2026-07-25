import Image from "next/image";
import type { MovieWork } from "../data/moviePage";
import { MovieMotionCard } from "./MovieMotionCard";

export function MovieWorkCard({ work }: { work: MovieWork }) {
  return (
    <MovieMotionCard className={`movie-design-work-card${work.isAiCreative ? " is-ai-creative" : ""}`}>
      <div className={`movie-design-work-image movie-design-work-image-${work.tone}`}>
        {work.image ? <Image src={work.image} alt={work.alt} fill sizes="20vw" /> : <span>{work.placeholder}</span>}
      </div>
      <span className="movie-design-work-tag">{work.category}</span>
      <h3>{work.title}</h3>
      <p>{work.description}</p>
    </MovieMotionCard>
  );
}
