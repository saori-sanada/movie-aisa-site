import Link from "next/link";
import { BrandHeader } from "../components/BrandHeader";
import { SectionHeading } from "../components/SectionHeading";
import { aisaCases } from "../data/aisa";
import { Breadcrumb } from "../components/Breadcrumb";
import { CrossBusiness } from "../components/CrossBusiness";
import { BusinessProfile } from "../components/BusinessProfile";
import { BusinessTools } from "../components/BusinessTools";

export default function AisaPage() {
  return <div className="aisa-page">
    <BrandHeader brand="aisa" />
    <main>
      <section className="aisa-hero">
        <div className="aisa-hero-copy"><Breadcrumb current="aisa" /><p className="eyebrow">AI × AUTOMATION FOR SMALL TEAMS</p><h1>毎日の仕事に、<br /><span>少しの余白</span>を。</h1><p className="hero-lead">AIと自動化を、むずかしいままにしない。あなたの仕事に合う、小さくて実用的な仕組みを一緒につくります。</p><div className="hero-actions"><a className="primary-button aisa-button" href="#contact">相談してみる <span aria-hidden="true">→</span></a><a className="secondary-button" href="#cases">事例を見る</a></div></div>
        <div className="aisa-hero-visual" aria-label="業務が整理されていくイメージ"><div className="workflow-card workflow-input"><span>01</span><p>散らばった作業</p><small>input</small></div><div className="workflow-line"><i></i><b>aisa</b><i></i></div><div className="workflow-card workflow-output"><span>02</span><p>シンプルな流れ</p><small>output</small></div><div className="soft-gradient" /></div>
      </section>

      <section id="capabilities" className="aisa-section capability-section"><SectionHeading eyebrow="WHAT I CAN DO" title="できること" description="今あるツールを活かしながら、無理なく使える形を選びます。" /><div className="capability-grid">{[
        ['AI活用サポート','文章・リサーチ・整理など、日常業務へのAI導入を支援。',['活用方法の整理','プロンプト設計','社内ミニガイド']],
        ['業務自動化','繰り返し作業を見つけ、ツール同士をつないで自動化。',['データ転記','通知・集計','ファイル整理']],
        ['小さな業務ツール','チームに合わせた、シンプルな専用ツールを試作。',['管理画面','入力フォーム','業務フロー']],
      ].map((x,i)=><article key={x[0] as string}><span className="cap-number">0{i+1}</span><div className="cap-icon" aria-hidden="true">{i===0?'✦':i===1?'↗':'□'}</div><h3>{x[0] as string}</h3><p>{x[1] as string}</p><ul>{(x[2] as string[]).map(y=><li key={y}>{y}</li>)}</ul></article>)}</div></section>

      <section id="cases" className="aisa-section case-section"><SectionHeading eyebrow="CASE STUDIES" title="代表事例" description="以下の数値・結果は、レイアウト確認用の仮データです。" /><div className="case-grid">{aisaCases.map(item=><article className="case-card" key={item.title}><div className="case-card-head"><span>CASE {item.number}</span><h3>{item.title}</h3></div><dl><div><dt>BEFORE / 解決前</dt><dd>{item.before}</dd></div><div><dt>DO / 実施内容</dt><dd>{item.action}</dd></div><div className="result-row"><dt>RESULT / 改善結果</dt><dd>{item.result}</dd></div></dl><div className="tool-tags">{item.tools.map(tool=><span key={tool}>{tool}</span>)}</div><button type="button" className="text-button">詳細を見る <span aria-hidden="true">→</span></button></article>)}</div></section>

      <BusinessProfile brand="aisa" />
      <BusinessTools brand="aisa" />
      <section id="contact" className="aisa-contact"><div><p className="eyebrow">LET’S TALK</p><h2>「これ、自動化できる？」<br />からで大丈夫です。</h2><p>専門用語は必要ありません。今の仕事をそのまま教えてください。</p></div><a className="primary-button aisa-button" href="mailto:hello@example.com">相談内容をメールする <span aria-hidden="true">↗</span></a></section>
      <CrossBusiness from="aisa" />
    </main>
    <footer className="brand-footer aisa-footer"><Link className="aisa-logo" href="/aisa">aisa<span>.</span></Link><p>AIと自動化で、毎日の仕事を少し軽く。</p><div><Link href="/">TOP</Link><a href="#profile">プロフィール</a><a href="#tools">ツール</a><Link href="/movie">動画制作・SNS支援</Link></div><small>© 2026 aisa — Prototype</small></footer>
  </div>;
}
