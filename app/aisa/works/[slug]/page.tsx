import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AisaWorkDetailPage, getAisaWorkDetail } from "../../../components/AisaWorkDetailPage";
import { aisaWorkDetails } from "../../../data/aisaWorkDetails";

export function generateStaticParams() { return Object.keys(aisaWorkDetails).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const work = getAisaWorkDetail(slug); return work ? { title: `${work.title}｜aisa`, description: work.subtitle } : {}; }
export default async function AisaWorkPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const work = getAisaWorkDetail(slug); if (!work) notFound(); return <AisaWorkDetailPage work={work} />; }
