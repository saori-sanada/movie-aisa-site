import Link from "next/link";
import Image from "next/image";
import { BrandHeader } from "../../components/BrandHeader";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Reveal } from "../../components/Reveal";
import { aiCreativeWork } from "../../data/aiCreativeWork";

export default function AIConceptMoviePage() {
  return <div className="movie-page work-detail-page"><BrandHeader brand="movie" /><main>
    <article className="work-detail">
      <Breadcrumb current={aiCreativeWork.title} />
      <Reveal hero><p className="eyebrow">CONCEPT MOVIE / PRODUCE / DIRECTION</p><h1>{aiCreativeWork.title}</h1><p className="work-detail-lead">{aiCreativeWork.summary}</p><div className="tool-tags">{aiCreativeWork.tags.map(tag=><span key={tag}>{tag}</span>)}</div></Reveal>
      <Reveal><figure className="work-detail-image"><Image unoptimized src={aiCreativeWork.images.keyVisual} alt="『まっすぐに、なにより、だいすきをつたえる』キービジュアル" width={1285} height={572} sizes="(max-width: 820px) calc(100vw - 40px), 1100px" /><figcaption>KEY VISUAL</figcaption></figure></Reveal>
      <Reveal className="work-detail-copy"><h2>制作背景・コンセプト</h2>{aiCreativeWork.overview.map(p=><p key={p}>{p}</p>)}</Reveal>
      <Reveal><figure className="work-detail-image youtube-view-image"><Image unoptimized src={aiCreativeWork.images.youtubeView} alt="コンセプトムービーのYouTube展開画面" width={704} height={402} sizes="(max-width: 820px) calc(100vw - 40px), 850px" /><figcaption>YOUTUBE VIEW</figcaption></figure></Reveal>
      <div className="work-detail-columns">
        <Reveal><section><h2>担当範囲</h2><ul>{aiCreativeWork.scope.map(item=><li key={item}>{item}</li>)}</ul></section></Reveal>
        <Reveal delay={.08}><section><h2>制作体制について</h2>{aiCreativeWork.production.map(p=><p key={p}>{p}</p>)}</section></Reveal>
      </div>
      <Reveal><div className="work-detail-back"><Link className="primary-button movie-button" href="/movie#works">作品一覧へ戻る <span>←</span></Link></div></Reveal>
    </article>
  </main><footer className="brand-footer movie-footer"><Link className="movie-logo" href="/movie">まなだ<span>MOViE</span></Link><p>コンセプトムービー</p><div><Link href="/">TOP</Link><Link href="/movie#profile">プロフィール</Link><Link href="/movie#tools">ツール</Link></div><small>© 2026 Manada MOViE — Portfolio</small></footer></div>;
}
