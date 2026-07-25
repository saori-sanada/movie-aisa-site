export const topContent = {
  owner: "真田紗織",
  role: "Creative Producer",
  slogan: "Unlock Potential.",
  sloganJa: "人の可能性をひらく。",
  images: {
    normal: "/top/top-normal.png",
    movie: "/top/top-movie-hover.png",
    aisa: "/top/top-aisa-hover.png",
  },
  brands: {
    movie: {
      label: "VIDEO / CREATE",
      title: "想いを、映像に。",
      description: ["心を動かす物語を、", "映像というカタチに。"],
      action: "動画制作を見る",
      href: "/movie",
    },
    aisa: {
      label: "AI / EXPAND",
      title: "可能性を、未来へ。",
      description: ["AIで、あなたの「やりたい」を", "実現できる未来へ。"],
      action: "AI事業を見る",
      href: "/aisa",
    },
  },
} as const;
