export const aisaNavigation = [
  { label: "aisaTOP", href: "#aisa-top", sectionId: "aisa-top" },
  { label: "SERVICE", href: "#services", sectionId: "services" },
  { label: "WORKS", href: "#works", sectionId: "works" },
  { label: "PROFILE", href: "#profile", sectionId: "profile" },
  { label: "CONTACT", href: "#contact", sectionId: "contact" },
  { label: "HOME", href: "/", sectionId: "home" },
] as const;

export const aisaServices = [
  {
    icon: "AI",
    title: "AI活用支援",
    lines: ["業務効率化の提案", "AIツール導入支援", "プロンプト設計", "活用トレーニング"],
  },
  {
    icon: "↻",
    title: "業務自動化",
    lines: ["自動化設計・構築", "RPA・API連携", "データ処理自動化", "ワークフロー最適化"],
  },
  {
    icon: "✎",
    title: "コンテンツ制作",
    lines: ["AIライティング", "画像・デザイン生成", "動画生成・編集", "資料・スライド作成"],
  },
  {
    icon: "▥",
    title: "データ分析・活用",
    lines: ["データ整理・可視化", "分析レポート作成", "予測・シミュレーション", "意思決定支援"],
  },
  {
    icon: "⌘",
    title: "AIエージェント開発",
    lines: ["チャットボット構築", "社内AIエージェント", "カスタムAI開発", "運用・改善サポート"],
  },
] as const;

export const aisaWorks = [
  {
    image: null,
    title: "社内AIアシスタント",
    description: "問い合わせ業務を自動化\n対応時間を70%削減",
    href: null,
    alt: "社内AIアシスタントの制作実績イメージ",
    visualLabel: "AI ASSISTANT",
  },
  {
    image: null,
    title: "データ分析ダッシュボード",
    description: "売上・顧客データを可視化\n意思決定の精度が向上",
    href: null,
    alt: "データ分析ダッシュボードの制作実績イメージ",
    visualLabel: "DATA ANALYTICS",
  },
  {
    image: null,
    title: "AIで作る提案資料",
    description: "提案資料を自動生成\n作成時間を80%削減",
    href: null,
    alt: "AIで作る提案資料の制作実績イメージ",
    visualLabel: "AI DOCUMENT",
  },
  {
    image: null,
    title: "商品画像生成",
    description: "AIで商品ビジュアルを制作\nコストを50%削減",
    href: null,
    alt: "AI商品画像生成の制作実績イメージ",
    visualLabel: "IMAGE GENERATION",
  },
] as const;

export const aisaContact = {
  heading: "お問い合わせ",
  message: "ご相談・ご依頼については、こちらからお問い合わせください。",
} as const;

export const aisaProfile = {
  name: "真田紗織",
  nameEn: "SAORI SANADA",
  role: "Creative Producer",
  lead: "AIを、仕事の心強いパートナーに。",
  image: "/images/aisa-profile.png",
  imageAlt: "真田紗織のプロフィール写真",
  body: [
    "企業YouTube6チャンネル以上の運営に携わり、制作進行や外部パートナーとの調整、社内連携を担ってきました。",
    "複数の案件が同時に動く現場で直面したのは、情報の分散や業務の属人化、繰り返される確認作業。その経験をきっかけに、AIを活用した業務改善と仕組み化に取り組んでいます。",
    "15年の教育現場で培った、相手に合わせて分かりやすく伝える力と、デジタル推進委員としての知見を生かし、管理する側にも、実際に作業する側にも使いやすい仕組みを設計します。",
    "AIやデジタルに不慣れな方にも寄り添い、無理なく使い続けられる形まで丁寧に伴走します。",
  ],
} as const;
