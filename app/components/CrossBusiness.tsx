import Link from "next/link";
import { Reveal } from "./Reveal";

export function CrossBusiness({ from }: { from: "movie" | "aisa" }) {
  const movie = from === "movie";
  return <Reveal className={`cross-business ${from}-cross`}><section>
    <p className="eyebrow">ANOTHER SERVICE</p>
    <h2>{movie ? "AIを活用した業務改善もご相談いただけます" : "動画制作・SNS運用もご相談いただけます"}</h2>
    <p>{movie ? "定型作業の自動化や、業務フローの整理、AIを活用した仕組みづくりは、aisaで支援しています。" : "動画制作、SNS運用、制作ディレクションについては、まなだMOViEで支援しています。"}</p>
    <div className="cross-actions"><Link className={`primary-button ${movie ? "aisa-button" : "movie-button"}`} href={movie ? "/aisa" : "/movie"}>{movie ? "AI業務改善・自動化支援を見る" : "動画制作・SNS支援を見る"} <span aria-hidden="true">→</span></Link><Link className="inline-link" href="/">TOPに戻る</Link></div>
  </section></Reveal>;
}
