export type MovieWork = {
  title: string;
  category: "動画制作" | "SNS運用" | "Instagramフィード投稿" | "WEB・EC商品画像" | "AIクリエイティブ";
  description: string;
  image?: string;
  alt: string;
  placeholder: string;
  tone: "beauty" | "business" | "food" | "product" | "event";
  href?: string;
  isAiCreative: boolean;
};

export const moviePage = {
  navigation: [
    { label: "MOViE TOP", href: "#movie-top", sectionId: "movie-top" },
    { label: "SERVICES", href: "#services", sectionId: "services" },
    { label: "WORKS", href: "#works", sectionId: "works" },
    { label: "PROFILE", href: "#profile", sectionId: "profile" },
    { label: "HOME", href: "/" },
  ],
  services: [
    { icon: "▰", title: "動画制作", description: "YouTube、ショート動画、PR動画などの企画・編集" },
    { icon: "▯", title: "SNS運用", description: "Instagram、YouTubeなどの投稿制作・運用サポート" },
    { icon: "◇", title: "デザイン制作", description: "フィード投稿、記事画像、EC商品画像などの制作" },
    { icon: "●●", title: "ディレクション", description: "企画、進行管理、品質管理、編集者との連携" },
    { icon: "✦", title: "AIクリエイティブ", description: "AIを活用した動画制作、画像生成、クリエイティブ制作" },
  ],
  works: [
    { category: "Instagramフィード投稿", title: "スキンケアブランド", description: "SNS投稿・ショート動画", image: "/works/ai-concept-movie/key-visual.png", alt: "美容ブランドのクリエイティブイメージ", placeholder: "BEAUTY", tone: "beauty", isAiCreative: false },
    { category: "SNS運用", title: "ビジネス系YouTube", description: "チャンネル運営・編集", alt: "ビジネスYouTubeのプレースホルダー", placeholder: "BUSINESS", tone: "business", isAiCreative: false },
    { category: "動画制作", title: "飲食店PR動画", description: "プロモーション映像", alt: "飲食店PR映像のプレースホルダー", placeholder: "FOOD / PR", tone: "food", isAiCreative: false },
    { category: "WEB・EC商品画像", title: "商品紹介クリエイティブ", description: "EC・SNS広告用画像", alt: "商品紹介画像のプレースホルダー", placeholder: "PRODUCT", tone: "product", isAiCreative: false },
    { category: "AIクリエイティブ", title: "AIコンセプトムービー", description: "AI映像・ビジュアル制作", image: "/works/ai-concept-movie/youtube-view.png", alt: "AIコンセプトムービーのイメージ", placeholder: "AI CREATIVE", tone: "event", isAiCreative: true },
  ] satisfies MovieWork[],
};
