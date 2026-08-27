import Link from "next/link";
import Image from "next/image";
import { movieWorkDetails, type MovieWorkDetail } from "../data/movieWorkDetails";
import { MovieWorkGallery } from "./MovieWorkGallery";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

export function MovieWorkDetailPage({ work }: { work: MovieWorkDetail }) {
  return (
    <div className="movie-work-detail-page">
      <main className="movie-work-detail">
        <Link href="/movie#works" className="movie-work-detail-back-link">← WORKSへ戻る</Link>
        <div className="movie-work-detail-grid">
          <figure className={`movie-work-detail-video-wrap movie-work-detail-media-${work.mediaAspect.replace(":", "-")}`}>
            {work.mediaAspect === "gallery" && work.gallery ? <MovieWorkGallery images={work.gallery.map((src) => `${basePath}${src}`)} title={work.title} /> : work.mediaType === "image" ? <Image unoptimized src={`${basePath}${work.video}`} alt={work.title} width={864} height={496} /> : <video controls playsInline preload="metadata" {...(work.mediaAspect === "9:16" ? {} : { poster: `${basePath}${work.poster}` })}><source src={`${basePath}${work.video}`} type="video/mp4" />お使いのブラウザでは動画を再生できません。</video>}
          </figure>
          <aside className="movie-work-detail-info">
            <p className="movie-work-detail-category">{work.category} <span aria-hidden="true">｜</span> 自主制作</p>
            <h1>{work.slug === "digital-marketing" ? <>デジタル<br />マーケティング講座</> : work.title}</h1>
            <p className="movie-work-detail-subtitle">{work.slug === "boost-edge" ? <>AI×映像編集で制作した<br className="movie-work-detail-desktop-break" />スポーツドリンクCM</> : work.subtitle}</p>
            <section><p className="movie-work-detail-label">ABOUT</p><p className="movie-work-detail-summary">{work.slug === "boost-edge" ? <>AIを活用し、企画・映像生成から編集・演出まで<br className="movie-work-detail-desktop-break" />一貫して制作した自主制作CM。</> : work.slug === "manada-movie" ? <>まなだMOViEのサービスや想いを伝える紹介ムービー。<br />企画・構成・制作プロデュース・ナレーションを担当し、<br />外部クリエイターと連携して制作しました。<br />案件に応じて、クリエイターと連携した制作にも対応しています。</> : work.summary}</p></section>
            <section><p className="movie-work-detail-label">ROLE</p><p className="movie-work-detail-role">{work.roleText}</p>{work.productionNote ? <small className="movie-work-detail-production-note">{work.productionNote}</small> : null}</section>
            {work.credit ? <section><p className="movie-work-detail-label">CREDIT</p><p className="movie-work-detail-role">{work.credit}</p></section> : null}
            {work.tools.length > 0 ? <section><p className="movie-work-detail-label">TOOLS</p><div className="movie-work-detail-tool-list">{work.tools.map((tool) => <span key={tool.name}><strong>{tool.name}</strong><small>{tool.detail}</small></span>)}</div></section> : null}
          </aside>
        </div>
      </main>
    </div>
  );
}

export function getMovieWorkDetail(slug: string) { return movieWorkDetails[slug as keyof typeof movieWorkDetails]; }
