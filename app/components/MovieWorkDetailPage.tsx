import Link from "next/link";
import { movieWorkDetails, type MovieWorkDetail } from "../data/movieWorkDetails";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

export function MovieWorkDetailPage({ work }: { work: MovieWorkDetail }) {
  return (
    <div className="movie-work-detail-page">
      <main className="movie-work-detail">
        <Link href="/movie#works" className="movie-work-detail-back-link">← WORKSへ戻る</Link>
        <div className="movie-work-detail-grid">
          <figure className="movie-work-detail-video-wrap">
            <video controls playsInline preload="metadata" poster={`${basePath}${work.poster}`}>
              <source src={`${basePath}${work.video}`} type="video/mp4" />
              お使いのブラウザでは動画を再生できません。
            </video>
          </figure>
          <aside className="movie-work-detail-info">
            <p className="movie-work-detail-category">{work.category} <span aria-hidden="true">｜</span> 自主制作</p>
            <h1>{work.title}</h1>
            <p className="movie-work-detail-subtitle">AI×映像編集で制作した<br className="movie-work-detail-desktop-break" />スポーツドリンクCM</p>
            <section><p className="movie-work-detail-label">ABOUT</p><p className="movie-work-detail-summary">AIを活用し、企画・映像生成から編集・演出まで<br className="movie-work-detail-desktop-break" />一貫して制作した自主制作CM。</p></section>
            <section><p className="movie-work-detail-label">ROLE</p><p className="movie-work-detail-role">企画 / 構成 / AI画像・映像生成 / 編集 / 演出</p></section>
            <section><p className="movie-work-detail-label">TOOLS</p><div className="movie-work-detail-tool-list">{work.tools.map((tool) => <span key={tool.name}><strong>{tool.name}</strong><small>{tool.detail}</small></span>)}</div></section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export function getMovieWorkDetail(slug: string) { return movieWorkDetails[slug as keyof typeof movieWorkDetails]; }
