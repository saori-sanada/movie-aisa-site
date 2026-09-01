import Image from "next/image";
import Link from "next/link";
import { aisaWorkDetails, type AisaWorkDetail } from "../data/aisaWorkDetails";
import styles from "../aisa/AisaWorkDetail.module.css";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

export function AisaWorkDetailPage({ work }: { work: AisaWorkDetail }) {
  return <div className={styles.page}>
    <main className={styles.main}>
      <Link href="/aisa#works" className={styles.back}>← WORKSへ戻る</Link>
      <div className={`${styles.grid} ${work.slug === "supervision-mail" ? styles.system : ""}`}>
        <div className={`${styles.media} ${work.mediaType === "image" ? styles.imageMedia : ""}`}>
          {work.mediaType === "image" ? <Image src={`${basePath}${work.media}`} alt={work.title} fill sizes="(max-width: 800px) calc(100vw - 32px), 58vw" priority /> : <video controls playsInline preload="metadata" poster={work.poster ? `${basePath}${work.poster}` : undefined}><source src={`${basePath}${work.media}`} type="video/mp4" />お使いのブラウザでは動画を再生できません。</video>}
        </div>
        <article className={styles.info}>
          <p className={styles.category}>{work.category}</p>
          <h1>{work.slug === "supervision-mail" ? <>監修メール<br />システム</> : work.title}</h1>
          <p className={styles.subtitle}>{work.subtitle}</p>
          <section><h2>ABOUT</h2><p>{work.summary}</p></section>
          <section><h2>ROLE</h2><p>{work.role}</p></section>
          {work.flow ? <section><h2>FLOW</h2>{work.flowLead ? <p className={styles.flowLead}>{work.flowLead}</p> : null}{work.flowNote ? <p className={styles.flowNote}>{work.flowNote}</p> : null}<ol className={styles.flow}>{work.flow.map((step) => <li key={step}>{step}</li>)}</ol></section> : null}
          {work.tools?.length ? <section><h2>TOOLS</h2><div className={styles.tools}>{work.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></section> : null}
        </article>
      </div>
    </main>
  </div>;
}

export function getAisaWorkDetail(slug: string) { return aisaWorkDetails[slug as keyof typeof aisaWorkDetails]; }
