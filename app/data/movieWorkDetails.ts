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
  },
} satisfies Record<string, MovieWorkDetail>;
