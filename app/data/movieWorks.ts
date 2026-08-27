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
    slug: "sns-creative",
    category: "SNSクリエイティブ / 投稿・商品画像",
    title: "SNS投稿画像制作",
    thumbnail: "/works/movie/sns-creative.png",
    previewVideo: null,
    mediaType: "image",
    aspectRatio: "1:1",
    detailUrl: "/movie/works/sns-creative/",
    detailEnabled: true,
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
    detailUrl: "/movie/works/boost-edge/",
    detailEnabled: true,
    alt: "スポーツドリンクCM BOOST EDGEのサムネイル",
    backgroundColor: "#072b55",
    productionType: "自主制作",
    scope: ["企画", "構成", "AI画像生成", "AI映像生成", "動画編集", "演出"],
  },
  {
    slug: "cosme-short",
    category: "SNSショート動画 / 美容・コスメ",
    title: "おすすめコスメ4選",
    thumbnail: "/works/movie/cosmetics.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "9:16",
    detailUrl: "/movie/works/cosme-short/",
    detailEnabled: true,
    alt: "映像制作の編集画面を映したビジネス動画のイメージ",
    backgroundColor: "#ded3cc",
  },
  {
    slug: "digital-marketing",
    category: "YouTube編集 / ビジネス系動画",
    title: "デジタルマーケティング講座",
    thumbnail: "/works/digital-marketing/%20digital-marketing-thumbnail.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "9:16",
    detailUrl: "/movie/works/digital-marketing/",
    detailEnabled: true,
    alt: "飲食店PR動画を想定した縦型映像のイメージ",
    backgroundColor: "#ead6c7",
  },
  {
    slug: "manada-movie",
    category: "アニメーション動画 / サービス紹介",
    title: "まなだMOViE紹介ムービー",
    thumbnail: "/works/movie/manada-movie.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "16:9",
    detailUrl: "/movie/works/manada-movie/",
    detailEnabled: true,
    alt: "商品紹介クリエイティブを想定した正方形作品のイメージ",
    backgroundColor: "#e5d9d4",
  },
  {
    slug: "kikonai-misogi",
    category: "プロモーションショート動画",
    title: "木古内寒中みそぎまつり",
    thumbnail: "/works/%20kikonai-misogi/kikonai-misogi-thumbnail.png",
    previewVideo: null,
    mediaType: "video",
    aspectRatio: "16:9",
    detailUrl: "/movie/works/kikonai-misogi/",
    detailEnabled: true,
    alt: "木古内寒中みそぎまつりのプロモーション動画サムネイル",
    backgroundColor: "#d9c9bd",
  },
] satisfies MovieWork[];
