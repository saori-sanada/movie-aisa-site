import Link from "next/link";

export function Breadcrumb({ current }: { current: string }) {
  return <nav className="breadcrumb" aria-label="パンくずリスト"><Link href="/">TOP</Link><span aria-hidden="true">/</span><span>{current}</span></nav>;
}
