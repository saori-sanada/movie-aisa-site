import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMovieWorkDetail, MovieWorkDetailPage } from "../../../components/MovieWorkDetailPage";

export const metadata: Metadata = { title: "BOOST EDGE｜AIスポーツドリンクCM｜まなだMOViE", description: "企画・AI映像生成・動画編集まで一貫して制作した、自主制作スポーツドリンクCM「BOOST EDGE」の制作実績です。" };

export default function BoostEdgePage() { const work = getMovieWorkDetail("boost-edge"); if (!work) notFound(); return <MovieWorkDetailPage work={work} />; }
