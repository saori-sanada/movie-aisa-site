export type AisaWorkDetail = {
  slug: string;
  category: string;
  title: string;
  titleLines?: readonly string[];
  subtitle: string;
  about: string;
  role: string;
  media: string;
  mediaType: "image" | "video";
  poster?: string;
  fullMedia?: string;
  fullPoster?: string;
  tools: readonly { name: string; detail: string }[];
};

export const aisaWorkDetails = {
  "supervision-mail": {
    slug: "supervision-mail",
    category: "AI活用 / 業務改善",
    title: "監修メールシステム",
    titleLines: ["監修メール", "システム"],
    subtitle: "確認・修正連絡を、ひとつの流れに。",
    about: "監修依頼から確認・修正内容の共有、送信までの流れをGASで自動化。連絡漏れや確認漏れを防ぎ、監修業務を効率化しました。",
    role: "業務整理 / 要件設計 / GAS実装 / フロー設計 / 検証・改善",
    media: "/images/aisa/works/supervision-mail/修正_監修メールシステム.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/supervision-mail.png",
    tools: [
      { name: "Google Apps Script", detail: "メール送信・自動化" },
      { name: "Gmail", detail: "監修依頼・確認連絡" },
      { name: "Google スプレッドシート", detail: "データ管理・進行管理" },
    ],
  },
  "ai-site-production": {
    slug: "ai-site-production",
    category: "AI活用 / Web制作",
    title: "AI活用サイト制作",
    subtitle: "アイデアを、使えるWebサイトへ。",
    about: "自身のサービスを伝えるポートフォリオサイトを、企画・構成からUI設計・実装まで制作しました。",
    role: "企画 / 構成 / UI・UX設計 / AI活用 / 実装",
    media: "/images/aisa/works/homepage-production.png",
    mediaType: "image",
    tools: [{ name: "既存データ記載なし", detail: "使用ツール情報は未登録" }],
  },
  "ai-ad-video": {
    slug: "ai-ad-video",
    category: "AI活用 / 広告クリエイティブ",
    title: "AI広告動画生成",
    subtitle: "ひとつの素材から、広告表現を広げる。",
    about: "商品画像などの限られた素材から、商品カット・使用シーン・人物・背景までAIで展開。広告に必要なビジュアルと映像を制作しました。",
    role: "企画 / 構成 / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-ad-video/LUMEA.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-ad-video-generation.png",
    tools: [
      { name: "ChatGPT", detail: "プロンプト・ストーリーボード・画像生成" },
      { name: "Seedance", detail: "動画生成" },
      { name: "ComfyUI", detail: "ワークフロー" },
      { name: "Adobe Premiere Pro", detail: "動画編集" },
    ],
  },
  "ai-promotion-video": {
    slug: "ai-promotion-video",
    category: "AI活用 / クリエイティブ",
    title: "AIプロモーション動画生成",
    titleLines: ["AIプロモーション", "動画生成"],
    subtitle: "撮影なしで、ストーリーのある映像へ。",
    about: "企画・構成からAIによる映像生成、編集・演出まで一貫して制作。撮影なしで、ストーリー性のある映像に仕上げました。",
    role: "企画 / 構成 / ストーリーボード / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-promotion-video/CMランナー_.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-promotion-video-generation.png",
    tools: [
      { name: "ChatGPT", detail: "プロンプト・ストーリーボード・画像生成" },
      { name: "Seedance", detail: "動画生成" },
      { name: "ComfyUI", detail: "ワークフロー" },
      { name: "Adobe Premiere Pro", detail: "動画編集" },
    ],
  },
  "video-auto-edit": {
    slug: "video-auto-edit",
    category: "AI活用 / 動画自動化",
    title: "AI指示による動画自動編集",
    titleLines: ["AI指示による", "動画自動編集"],
    subtitle: "修正指示するだけで、完成まで自動で進む",
    about: "Claude Codeから修正指示を出し、Akari Videoを活用してカット・テロップ・画像・BGM・SE・書き出しまでの編集工程を自動化。手作業を減らし、指示から完成まで進められる動画編集フローを構築しました。",
    role: "設計 / 自動編集フロー構築 / 編集指示 / 検証・改善",
    media: "/images/aisa/works/video-auto-edit/uno自動編集紹介_v6.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/video-auto-edit.png",
    fullMedia: "/images/aisa/works/video-auto-edit/uno完成動画.mp4",
    fullPoster: "/images/aisa/works/video-auto-edit-full-poster.png",
    tools: [
      { name: "Claude Code", detail: "編集指示・修正指示" },
      { name: "Akari Video", detail: "動画自動編集" },
    ],
  },
} satisfies Record<string, AisaWorkDetail>;
