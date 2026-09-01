export type AisaWorkDetail = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  media: string;
  mediaType: "image" | "video";
  poster?: string;
  flow?: readonly string[];
  flowLead?: string;
  flowNote?: string;
  tools?: readonly string[];
};

export const aisaWorkDetails = {
  "supervision-mail": {
    slug: "supervision-mail",
    category: "AI活用 / 業務改善・進行管理",
    title: "監修メールシステム",
    subtitle: "分散していた確認・修正連絡を、ひとつの流れに。",
    summary: "動画制作における、クライアントへの確認依頼から修正内容の共有までを仕組み化。Asana・メール・LINEに分散していた作業をつなぎ、スプレッドシート上の操作を中心に、一連の処理を進められる形に整理しました。",
    role: "業務整理 / 要件設計 / AI活用 / ワークフロー設計",
    media: "/images/aisa/works/supervision-mail/監修メール送信システム.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/supervision-mail.png",
    flow: ["スプレッドシート操作", "メール作成・送信", "返信確認", "Asana反映", "LINE連絡"],
    flowLead: "操作は主にスプレッドシートだけ",
    flowNote: "Asana・メール・LINEを行き来する作業をつなぎ、確認依頼から修正共有までを一連の流れで進められるようにしています。",
  },
  "ai-site-production": {
    slug: "ai-site-production",
    category: "AI活用 / Web制作",
    title: "AI活用サイト制作",
    subtitle: "アイデアを、使えるWebサイトへ。",
    summary: "自身のサービスを伝えるポートフォリオサイトを、企画・構成からUI設計・実装まで制作。AIを活用しながら改善を重ね、ブランドごとの世界観と使いやすさを両立しました。",
    role: "企画 / 構成 / UI・UX設計 / AI活用 / 実装ディレクション",
    media: "/images/aisa/works/homepage-production.png",
    mediaType: "image",
  },
  "ai-ad-video": {
    slug: "ai-ad-video",
    category: "AI活用 / 広告クリエイティブ",
    title: "AI広告動画生成",
    subtitle: "ひとつの素材から、広告表現を広げる。",
    summary: "商品画像などの限られた素材から、商品カット・使用シーン・人物・背景までAIで展開。広告に必要なビジュアルと映像を制作しました。",
    role: "企画 / 構成 / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-ad-video/LUMEA.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-ad-video-generation.png",
  },
  "ai-promotion-video": {
    slug: "ai-promotion-video",
    category: "AI活用 / クリエイティブ",
    title: "AIプロモーション動画生成",
    subtitle: "撮影なしで、ストーリーのある映像へ。",
    summary: "企画・構成からAIによる映像生成、編集・演出まで一貫して制作。撮影を行わず、ストーリー性のあるプロモーション映像を制作しました。",
    role: "企画 / 構成 / ストーリーボード / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-promotion-video/CMランナー_.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-promotion-video-generation.png",
  },
} satisfies Record<string, AisaWorkDetail>;
