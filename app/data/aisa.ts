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
    icon: "guide",
    title: "AI活用支援",
    lines: ["業務に合わせたAI活用の提案", "ツール選定・導入サポート", "プロンプト設計", "データ整理・分析・可視化"],
  },
  {
    icon: "automation",
    title: "業務効率化・自動化",
    lines: ["繰り返し業務の自動化", "メール・通知・データ処理", "ツール間の連携", "業務フローの整理・改善"],
  },
  {
    icon: "creative",
    title: "AIクリエイティブ",
    lines: ["AI画像・動画制作", "広告クリエイティブ", "ライティング・資料制作", "生成AIを活用したコンテンツ制作"],
  },
  {
    icon: "tools",
    title: "Web・業務ツール制作",
    lines: ["Webサイト制作", "予約・管理ツール", "業務用ミニシステム", "AIを組み込んだ仕組みづくり"],
  },
  {
    icon: "agent",
    title: "AIエージェント・業務支援",
    lines: ["チャットボット", "社内業務を支援するAI", "確認・通知・情報整理の自動化", "運用・改善サポート"],
  },
] as const;

export const aisaWorks = [
  {
    slug: "ai-assistant",
    category: "AI活用支援",
    thumbnail: null,
    title: "社内AIアシスタント",
    description: "問い合わせ業務を自動化\n対応時間を70%削減",
    detailUrl: null,
    detailEnabled: false,
    alt: "社内AIアシスタントの制作実績イメージ",
    visualLabel: "AI ASSISTANT",
  },
  {
    slug: "data-analytics",
    category: "データ分析・活用",
    thumbnail: null,
    title: "データ分析ダッシュボード",
    description: "売上・顧客データを可視化\n意思決定の精度が向上",
    detailUrl: null,
    detailEnabled: false,
    alt: "データ分析ダッシュボードの制作実績イメージ",
    visualLabel: "DATA ANALYTICS",
  },
  {
    slug: "ai-document",
    category: "コンテンツ制作",
    thumbnail: null,
    title: "AIで作る提案資料",
    description: "提案資料を自動生成\n作成時間を80%削減",
    detailUrl: null,
    detailEnabled: false,
    alt: "AIで作る提案資料の制作実績イメージ",
    visualLabel: "AI DOCUMENT",
  },
  {
    slug: "image-generation",
    category: "AIクリエイティブ",
    thumbnail: null,
    title: "商品画像生成",
    description: "AIで商品ビジュアルを制作\nコストを50%削減",
    detailUrl: null,
    detailEnabled: false,
    alt: "AI商品画像生成の制作実績イメージ",
    visualLabel: "IMAGE GENERATION",
  },
  {
    slug: "workflow-automation",
    category: "業務自動化",
    thumbnail: null,
    title: "業務ワークフロー自動化",
    description: "定型業務を自動化\n確認作業をシンプルに",
    detailUrl: null,
    detailEnabled: false,
    alt: "業務ワークフロー自動化の制作実績イメージ",
    visualLabel: "WORKFLOW AUTOMATION",
  },
] as const;

export const aisaContact = {
  heading: "AIでできることから、一緒に整理します。",
  paragraphs: [
    ["「こんな作業を減らしたい」", "「AIを使いたいけれど、何から始めればいいか分からない」"],
    ["そんな段階からでも大丈夫です。"],
    ["現在の業務や課題を伺いながら、", "無理なく使える方法を一緒に考えます。"],
  ],
} as const;

export const aisaProfile = {
  name: "真田紗織",
  nameEn: "SAORI SANADA",
  role: "Creative Producer",
  lead: "AIを、仕事の心強いパートナーに。",
  image: "/images/aisa-profile.png",
  imageAlt: "真田紗織のプロフィール写真",
  body: [
    "動画制作や企業YouTubeの運営を通して、制作進行や外部パートナーとの調整、社内連携など、複数の人と仕事を動かす現場に携わってきました。",
    "AIが身近な存在になったことで、日々の業務に追われる時間を減らし、本当に「やりたい」ことに時間を使える仕組みをつくれないかと考えるようになりました。AIをうまく取り入れることで、作業を減らすだけでなく、考えること、つくること、人と向き合うことに、もっと時間を使える。その可能性に魅力を感じています。",
    "15年の教育現場で培った、相手に合わせて分かりやすく伝える力と、デジタル推進委員としての知見を生かし、管理する側にも、実際に作業する側にも使いやすい仕組みを設計します。",
    "AIやデジタルに不慣れな方にも寄り添い、導入して終わりではなく、無理なく使い続けられる形まで丁寧に伴走します。",
    "仕組みは、使われて初めて価値が生まれると考えています。「使ってください」とお願いするのではなく、現場の人が無理なく使えて、自然に続けられる仕組みをつくること。それを大切にしています。",
  ],
} as const;
