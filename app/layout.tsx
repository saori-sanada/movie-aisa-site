import type { Metadata } from "next";
import "./globals.css";
import { RevealManager } from "./components/RevealManager";

export const metadata: Metadata = { title: { default: "Unlock Potential. | 真田紗織", template: "%s | 真田紗織" }, description: "人の可能性をひらく。Creative Producer 真田紗織のポートフォリオサイト。" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><RevealManager />{children}</body></html>;
}
