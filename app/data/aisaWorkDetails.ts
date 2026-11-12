export type AisaWorkDetail = {
  slug: string;
  category: string;
  title: string;
  titleLines?: readonly string[];
  subtitle: string;
  about: string;
  aboutParagraphs?: readonly string[];
  background?: string;
  backgroundParagraphs?: readonly string[];
  features?: readonly string[];
  role: string;
  media: string | null;
  mediaType: "image" | "video";
  poster?: string;
  fullMedia?: string;
  fullPoster?: string;
  preview?: {
    tabs: readonly {
      id: string;
      label: string;
      src: string;
      width: number;
      height: number;
      alt: string;
    }[];
    videoDirectory: string;
  };
  tools: readonly { name: string; detail: string }[];
};

export const aisaWorkDetails = {
  "sns-cross-analysis": {
    slug: "sns-cross-analysis",
    category: "AI活用 / Webアプリ・データ可視化",
    title: "SNS横断分析｜月次運用レポートシステム",
    titleLines: ["SNS横断分析｜", "月次運用レポート", "システム"],
    subtitle: "SNSインサイトを、月1回の運用レポートに。",
    about: "YouTube Shorts・Instagram Reels・TikTokのインサイトをExcel・CSVで取り込み、月ごとの運用成果を集計・可視化するWebアプリ。",
    aboutParagraphs: [
      "YouTube Shorts・Instagram Reels・TikTokのインサイトをExcel・CSVで取り込み、月ごとの運用成果を集計・可視化するWebアプリ。",
      "投稿別の反応、フォロワー増加、前月比較、改善提案を確認できます。事業成果は任意項目で、未取得でも分析できます。",
    ],
    backgroundParagraphs: [
      "YouTube・Instagram・TikTokなど、SNSごとに分かれているインサイトを、効率よく集計・分析するために制作しました。",
      "API連携による自動取得ではなく、各SNSから出力したExcel・CSVデータを取り込む方式を採用。",
      "複雑な連携設定を必要とせず、月1回のデータ更新で、投稿の反応やフォロワーの成長、前月との比較をまとめて可視化し、次月の運用改善につなげられる仕組みを目指しました。",
    ],
    features: [
      "3媒体の横断分析",
      "CSV・Excelの取り込み",
      "月次データの蓄積と前月比較",
      "フォロワー増減",
      "投稿ランキングとジャンル分析",
      "反応率・ファン化の兆候",
      "ルールベースの改善提案",
      "データの個別削除・置き換え",
    ],
    role: "企画・要件定義・UI設計・AI支援による実装・動作検証",
    media: "/images/aisa/works/sns-cross-analysis/video/FIX_SNS横断分析_紹介動画_V4.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/sns-cross-analysis/sns-cross-analysis.png",
    preview: {
      tabs: [
        {
          id: "dashboard",
          label: "ダッシュボード",
          src: "/images/aisa/works/sns-cross-analysis/dashboard.png",
          width: 2492,
          height: 5378,
          alt: "SNS横断分析の月次ダッシュボード画面",
        },
        {
          id: "analysis-report",
          label: "分析レポート",
          src: "/images/aisa/works/sns-cross-analysis/analysis-report.png",
          width: 2592,
          height: 4934,
          alt: "SNS横断分析の分析レポート画面",
        },
        {
          id: "metric-guide",
          label: "指標の見方",
          src: "/images/aisa/works/sns-cross-analysis/metric-guide.png",
          width: 2492,
          height: 3616,
          alt: "SNS横断分析の指標ガイド画面",
        },
      ],
      videoDirectory: "/images/aisa/works/sns-cross-analysis/video/",
    },
    tools: [
      { name: "ChatGPT", detail: "企画・要件整理・制作支援" },
      { name: "Codex", detail: "AI支援による実装・動作検証" },
      { name: "React", detail: "画面・コンポーネント実装" },
      { name: "TypeScript", detail: "型定義・ロジック実装" },
      { name: "Vite", detail: "開発・ビルド" },
      { name: "Tailwind CSS", detail: "UIスタイリング" },
      { name: "Recharts", detail: "グラフ・データ可視化" },
      { name: "Papa Parse", detail: "CSV読み込み" },
      { name: "SheetJS (xlsx)", detail: "Excel読み込み" },
    ],
  },
  "supervision-mail": {
    slug: "supervision-mail",
    category: "AI活用 / 業務改善",
    title: "監修メールシステム",
    titleLines: ["監修メール", "システム"],
    subtitle: "確認・修正連絡を、ひとつの流れに。",
    about: "監修依頼から確認・修正内容の共有、送信までの流れをGASで自動化。連絡漏れや確認漏れを防ぎ、監修業務を効率化しました。",
    role: "業務整理 / 要件設計 / GAS実装 / フロー設計 / 検証・改善",
    media: "/images/aisa/works/supervision-mail/修正_監修メールシステム.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/supervision-mail.png",
    tools: [
      { name: "Google Apps Script", detail: "メール送信・自動化" },
      { name: "Gmail", detail: "監修依頼・確認連絡" },
      { name: "Google スプレッドシート", detail: "データ管理・進行管理" },
    ],
  },
  "interview-booking": {
    slug: "interview-booking",
    category: "AI活用 / Webアプリ開発・業務改善",
    title: "面談予約システム",
    titleLines: ["面談予約", "システム"],
    subtitle: "予約受付からスケジュール管理まで、ひとつの仕組みに。",
    about: "空き時間の確認から面談予約、Googleカレンダーへの反映、予約完了メールの送信までを一元化。予約者・管理者双方がスムーズに利用できるWebシステムを開発しました。",
    features: [
      "カレンダーの空き時間表示",
      "Webからの面談予約",
      "Googleカレンダーとの連携",
      "予約完了メール・管理者への通知",
      "予約者・管理者からのキャンセル操作",
    ],
    role: "要件設計 / UI設計 / AI支援開発・実装 / 動作検証・改善",
    media: "/images/aisa/works/interview-booking/FIX_面談予約システム_紹介動画_v06.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/interview-booking.png",
    tools: [
      { name: "Claude Code", detail: "AI支援によるシステム開発・実装" },
      { name: "Vercel", detail: "Webアプリの公開・運用" },
      { name: "Supabase", detail: "データベース・予約情報管理" },
      { name: "Google Calendar API", detail: "予約・カレンダー連携" },
      { name: "Gmailなどのメール連携", detail: "予約確認・管理者通知" },
    ],
  },
  "survey-aggregation": {
    slug: "survey-aggregation",
    category: "AI活用 / 業務改善（GAS）",
    title: "アンケート自動集計システム",
    titleLines: ["アンケート自動集計", "システム"],
    subtitle: "順位集計から感想整理まで、約5秒で。",
    about: "アンケートの1位〜3位を自動で得点化し、合計得点によるランキングと候補ごとに寄せられた感想を整理するシステムを開発しました。",
    aboutParagraphs: [
      "アンケートの1位〜3位を自動で得点化し、合計得点によるランキングと候補ごとに寄せられた感想を整理するシステムを開発しました。",
      "Google Apps Scriptを活用し、手作業で行っていた得点計算・順位付け・コメント整理を自動化。実際の業務で使用し、集計作業の効率化を実現しました。",
    ],
    features: [
      "アンケート回答データの読み込み",
      "1位・2位・3位の自動得点化（3点・2点・1点）",
      "合計得点によるランキング作成",
      "候補ごとの感想・コメント抽出",
      "集計結果のスプレッドシート出力",
    ],
    role: "業務課題整理 / 集計仕様設計 / GAS実装 / 動作検証・改善",
    media: "/images/aisa/works/survey-aggregation/survey-aggregation.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/survey-aggregation/survey-aggregation.png",
    tools: [
      { name: "Google Apps Script", detail: "集計処理・自動化" },
      { name: "Google スプレッドシート", detail: "回答・集計結果管理" },
    ],
  },
  "ai-site-production": {
    slug: "ai-site-production",
    category: "AI活用 / Web制作・発信",
    title: "ホームページ制作",
    subtitle: "世界観と使いやすさを両立したWebサイト制作",
    about: "ブランドの世界観を大切にしながら、PC・スマホどちらでも使いやすいWebサイトを制作。構成・デザイン・実装から、問い合わせまでの導線設計まで一貫して行いました。",
    role: "企画 / 構成 / UI・UX設計 / デザイン / 実装 / レスポンシブ対応",
    media: "/images/aisa/works/ai-site-production/ai-site-production-web.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/homepage-production.png",
    tools: [
      { name: "Codex", detail: "サイト実装・修正" },
      { name: "ChatGPT", detail: "構成・文章整理・制作サポート" },
    ],
  },
  "ai-ad-video": {
    slug: "ai-ad-video",
    category: "AI活用 / 広告クリエイティブ",
    title: "AI広告動画生成",
    subtitle: "ひとつの素材から、広告表現を広げる。",
    about: "商品画像などの限られた素材から、商品カット・使用シーン・人物・背景までAIで展開。広告に必要なビジュアルと映像を制作しました。",
    role: "企画 / 構成 / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-ad-video/LUMEA.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-ad-video-generation.png",
    tools: [
      { name: "ChatGPT", detail: "プロンプト・ストーリーボード・画像生成" },
      { name: "Seedance", detail: "動画生成" },
      { name: "ComfyUI", detail: "ワークフロー" },
      { name: "Adobe Premiere Pro", detail: "動画編集" },
    ],
  },
  "ai-promotion-video": {
    slug: "ai-promotion-video",
    category: "AI活用 / クリエイティブ",
    title: "AIプロモーション動画生成",
    titleLines: ["AIプロモーション", "動画生成"],
    subtitle: "撮影なしで、ストーリーのある映像へ。",
    about: "企画・構成からAIによる映像生成、編集・演出まで一貫して制作。撮影なしで、ストーリー性のある映像に仕上げました。",
    role: "企画 / 構成 / ストーリーボード / AI画像・映像生成 / 編集 / 演出",
    media: "/images/aisa/works/ai-promotion-video/CMランナー_.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/ai-promotion-video-generation.png",
    tools: [
      { name: "ChatGPT", detail: "プロンプト・ストーリーボード・画像生成" },
      { name: "Seedance", detail: "動画生成" },
      { name: "ComfyUI", detail: "ワークフロー" },
      { name: "Adobe Premiere Pro", detail: "動画編集" },
    ],
  },
  "video-auto-edit": {
    slug: "video-auto-edit",
    category: "AI活用 / 動画自動化",
    title: "AI指示による動画自動編集",
    titleLines: ["AI指示による", "動画自動編集"],
    subtitle: "修正指示するだけで、完成まで自動で進む",
    about: "Claude Codeから修正指示を出し、Akari Videoを活用してカット・テロップ・画像・BGM・SE・書き出しまでの編集工程を自動化。手作業を減らし、指示から完成まで進められる動画編集フローを構築しました。",
    role: "設計 / 自動編集フロー構築 / 編集指示 / 検証・改善",
    media: "/images/aisa/works/video-auto-edit/uno自動編集紹介_v6.mp4",
    mediaType: "video",
    poster: "/images/aisa/works/video-auto-edit.png",
    fullMedia: "/images/aisa/works/video-auto-edit/uno完成動画.mp4",
    fullPoster: "/images/aisa/works/video-auto-edit-full-poster.png",
    tools: [
      { name: "Claude Code", detail: "編集指示・修正指示" },
      { name: "Akari Video", detail: "動画自動編集" },
    ],
  },
} satisfies Record<string, AisaWorkDetail>;
