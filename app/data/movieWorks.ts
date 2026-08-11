export type MovieWork = {
  slug: string;
  category: string;
  title: string;
  thumbnail: string;
  previewVideo: string | null;
  mediaType: "video" | "image";
  aspectRatio: "16:9" | "9:16" | "1:1";
  detailUrl: string | null;
  detailEnabled: boolean;
  alt: string;
  backgroundColor: string;
  productionType?: string;
  scope?: readonly string[];
};

export const movieWorks = [
  {
    slug: "beauty",
    category: "Instagramフィード投稿",
    title: "スキンケアブランド",
    thumbnail: "/works/movie/business.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "16:9",
    detailUrl: null,
    detailEnabled: false,
    alt: "美容ブランドのクリエイティブイメージ",
    backgroundColor: "#ead8d3",
  },
  {
    slug: "boost-edge",
    category: "CM・広告動画",
    title: "AIで描くスポーツドリンクCM「BOOST EDGE」",
    thumbnail: "/works/movie/boost-edge.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "16:9",
    detailUrl: null,
    detailEnabled: false,
    alt: "スポーツドリンクCM BOOST EDGEのサムネイル",
    backgroundColor: "#072b55",
    productionType: "自主制作",
    scope: ["企画", "構成", "AI画像生成", "AI映像生成", "動画編集", "演出"],
  },
  {
    slug: "business",
    category: "SNS運用",
    title: "ビジネス系YouTube",
    thumbnail: "/works/movie/cosmetics.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "16:9",
    detailUrl: null,
    detailEnabled: false,
    alt: "映像制作の編集画面を映したビジネス動画のイメージ",
    backgroundColor: "#ded3cc",
  },
  {
    slug: "food",
    category: "動画制作",
    title: "飲食店PR動画",
    thumbnail: "/works/movie/misogi.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "9:16",
    detailUrl: null,
    detailEnabled: false,
    alt: "飲食店PR動画を想定した縦型映像のイメージ",
    backgroundColor: "#ead6c7",
  },
  {
    slug: "product",
    category: "WEB・EC商品画像",
    title: "商品紹介クリエイティブ",
    thumbnail: "/works/movie/manada-movie.png",
    previewVideo: null,
    mediaType: "image",
    aspectRatio: "1:1",
    detailUrl: null,
    detailEnabled: false,
    alt: "商品紹介クリエイティブを想定した正方形作品のイメージ",
    backgroundColor: "#e5d9d4",
  },
] satisfies MovieWork[];
