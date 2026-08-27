export type MovieWorkDetail = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  points: readonly string[];
  role: readonly string[];
  tools: readonly { name: string; detail: string }[];
  information: readonly { label: string; value: string }[];
  video: string;
  poster: string;
  mediaType: "video" | "image";
  mediaAspect: "16:9" | "9:16" | "gallery";
  roleText: string;
  productionNote?: string;
  credit?: string;
  gallery?: readonly string[];
};

export const movieWorkDetails = {
  "boost-edge": {
    slug: "boost-edge",
    category: "CM・広告動画",
    title: "BOOST EDGE",
    subtitle: "AI×映像編集で制作したスポーツドリンクCM",
    summary: "架空のスポーツドリンク「BOOST EDGE」の広告映像。企画からAI映像生成、編集・演出まで一貫して制作しました。",
    points: ["実写撮影を行わず、AIを活用して映像を制作", "参照画像を用いて人物・商品・衣装の一貫性を調整", "AI特有の不自然なつながりを編集で補正", "カメラワーク・テンポ・音まで含めてCMとして演出"],
    role: ["企画", "構成", "絵コンテ", "商品・キャラクター設計", "AI画像・映像生成", "動画編集", "音響・演出"],
    tools: [{ name: "ChatGPT", detail: "プロンプト・ストーリーボード・画像生成" }, { name: "Seedance", detail: "動画生成" }, { name: "ComfyUI", detail: "ワークフロー" }, { name: "Adobe Premiere Pro", detail: "動画編集" }],
    information: [{ label: "制作形態", value: "自主制作" }, { label: "作品種別", value: "CM・広告動画" }, { label: "想定商材", value: "スポーツドリンク" }],
    video: "/works/boost-edge/boost-edge-web.mp4",
    poster: "/works/movie/boost-edge.png",
    mediaType: "video",
    mediaAspect: "16:9",
    roleText: "企画 / 構成 / AI画像・映像生成 / 編集 / 演出",
  },
  "sns-creative": {
    slug: "sns-creative", category: "SNSクリエイティブ / 投稿・商品画像", title: "SNS投稿画像制作", subtitle: "目的に合わせて、伝わるデザインを。",
    summary: "住宅・店舗紹介・商品訴求など、用途に合わせたSNS投稿画像を制作。", points: [], role: [], tools: [{ name: "Canva", detail: "デザイン・画像編集" }], information: [],
    video: "/works/movie/sns-creative.png", poster: "/works/movie/sns-creative.png", mediaType: "image", mediaAspect: "gallery", roleText: "デザイン / 構成 / クリエイティブ制作", gallery: ["/works/sns-creative/1.png", "/works/sns-creative/2.png", "/works/sns-creative/3.png", "/works/sns-creative/4.png", "/works/sns-creative/5.png"],
  },
  "cosme-short": {
    slug: "cosme-short", category: "SNSショート動画 / 美容・コスメ", title: "おすすめコスメ4選", subtitle: "美容・コスメをテーマにしたSNSショート動画",
    summary: "おすすめコスメを分かりやすく紹介する、美容系SNSショート動画を制作。", points: [], role: [], information: [],
    video: "/works/cosme-short/cosme-short-web.mp4", poster: "/works/cosme-short/cosme-short-thumbnail.png", mediaType: "video", mediaAspect: "9:16", roleText: "構成 / 動画編集", tools: [{ name: "Adobe Premiere Pro", detail: "動画編集" }],
  },
  "digital-marketing": {
    slug: "digital-marketing", category: "YouTube編集 / ビジネス系動画", title: "デジタルマーケティング講座", subtitle: "初心者にも伝わるビジネス系YouTube動画",
    summary: "デジタルマーケティングの内容を、初心者にも分かりやすく届けるYouTube動画を編集。", points: [], role: [], information: [],
    video: "/works/digital-marketing/digital-marketing-web.mp4", poster: "/works/digital-marketing/%20digital-marketing-thumbnail.png", mediaType: "video", mediaAspect: "16:9", roleText: "動画編集", tools: [{ name: "Adobe Premiere Pro", detail: "動画編集" }],
  },
  "manada-movie": {
    slug: "manada-movie", category: "アニメーション動画 / サービス紹介", title: "まなだMOViE紹介ムービー", subtitle: "サービスの想いをやさしく伝える紹介ムービー",
    summary: "まなだMOViEのサービスや想いを伝える紹介ムービー。企画・構成・制作プロデュース・ナレーションを担当し、外部クリエイターと連携して制作しました。案件に応じて、クリエイターと連携した制作にも対応しています。", points: [], role: [], information: [],
    video: "/works/%20manada-movie/manada-movie-web.mp4", poster: "/works/movie/manada-movie.png", mediaType: "video", mediaAspect: "16:9", roleText: "企画 / 構成 / 制作プロデュース / ナレーション", tools: [], credit: "映像制作：HanaSakuMotion",
  },
  "kikonai-misogi": {
    slug: "kikonai-misogi", category: "プロモーションショート動画", title: "木古内寒中みそぎまつり", subtitle: "地域の伝統と迫力を伝えるプロモーション映像",
    summary: "木古内寒中みそぎまつりの魅力と迫力を伝えるプロモーションショート動画。既存のSNS掲載写真・リール動画素材を活用し、構成・編集・演出を行いました。", points: [], role: [], information: [],
    video: "/works/%20kikonai-misogi/kikonai-misogi-web.mp4", poster: "/works/%20kikonai-misogi/kikonai-misogi-thumbnail.png", mediaType: "video", mediaAspect: "9:16", roleText: "構成 / 動画編集 / 演出", tools: [{ name: "Adobe Premiere Pro", detail: "動画編集" }],
  },
} satisfies Record<string, MovieWorkDetail>;
