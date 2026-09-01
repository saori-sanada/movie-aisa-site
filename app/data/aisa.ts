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
    slug: "ai-promotion-video-generation",
    category: "AI活用 / クリエイティブ",
    thumbnail: "/images/aisa/works/ai-promotion-video-generation.png",
    title: "AIプロモーション動画生成",
    description: "AIを活用し、ストーリー性のある動画を制作",
    detailUrl: "/aisa/works/ai-promotion-video",
    detailEnabled: true,
    alt: "AIプロモーション動画生成のサムネイル",
    visualLabel: "AI PROMOTION VIDEO GENERATION",
  },
  {
    slug: "progress-management",
    category: "AI活用 / 業務改善",
    thumbnail: "/images/aisa/works/progress-management.png",
    title: "業務進行管理システム",
    description: "",
    detailUrl: null,
    detailEnabled: false,
    alt: "業務進行管理システムのサムネイル",
    visualLabel: "PROGRESS MANAGEMENT",
  },
  {
    slug: "ai-ad-video-generation",
    category: "AI活用 / クリエイティブ",
    thumbnail: "/images/aisa/works/ai-ad-video-generation.png",
    title: "AI広告動画生成",
    description: "",
    detailUrl: "/aisa/works/ai-ad-video",
    detailEnabled: true,
    alt: "AI広告動画生成のサムネイル",
    visualLabel: "AI AD VIDEO GENERATION",
  },
  {
    slug: "homepage-production",
    category: "AI活用 / Web制作・発信",
    thumbnail: "/images/aisa/works/homepage-production.png",
    title: "ホームページ制作",
    description: "",
    detailUrl: null,
    detailEnabled: false,
    alt: "ホームページ制作のサムネイル",
    visualLabel: "HOMEPAGE PRODUCTION",
  },
  {
    slug: "supervision-mail",
    category: "AI活用 / 業務自動化",
    thumbnail: "/images/aisa/works/supervision-mail.png",
    title: "監修メールシステム",
    description: "",
    detailUrl: "/aisa/works/supervision-mail",
    detailEnabled: true,
    alt: "監修メールシステムのサムネイル",
    visualLabel: "SUPERVISION MAIL",
  },
  {
    slug: "interview-booking",
    category: "AI活用 / 業務改善",
    thumbnail: "/images/aisa/works/interview-booking.png",
    title: "面談予約システム",
    description: "",
    detailUrl: null,
    detailEnabled: false,
    alt: "面談予約システムのサムネイル",
    visualLabel: "INTERVIEW BOOKING",
  },
  {
    slug: "video-auto-edit",
    category: "AI活用 / 動画自動化",
    thumbnail: "/images/aisa/works/video-auto-edit.png",
    title: "動画自動編集",
    description: "",
    detailUrl: null,
    detailEnabled: false,
    alt: "動画自動編集のサムネイル",
    visualLabel: "VIDEO AUTO EDIT",
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
