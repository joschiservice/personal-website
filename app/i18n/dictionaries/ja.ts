import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Dictionary } from "@/app/i18n/getDictionary";
import en from "./en";

type MilestoneTranslation = Pick<
  CareerMilestone,
  "title" | "subTitle" | "summary" | "routeLabel"
> &
  Partial<Pick<CareerMilestone, "impact" | "tasks" | "skills">>;

const milestoneTranslations: Record<string, MilestoneTranslation> = {
  "independent-products": {
    title: "個人プロダクトエンジニア",
    subTitle: "プロダクト開発・最適化",
    summary:
      "ShiftIQと、後にRosterSpecとなるソルバー開発は、同じプロジェクトとして始まりました。介護サービスの管理者と直接協力し、ShiftIQをMVP後の段階からパイロット導入直前まで開発しました。再利用可能なスケジューリング基盤はRosterSpecとして継続し、現在はオープンソースプロジェクトとして一般公開しています。",
    impact: [
      { label: "プロダクト段階", value: "MVP後" },
      { label: "業務検証", value: "介護サービス管理者" },
      { label: "計画作業", value: "数時間 → 数分" },
      { label: "現在", value: "オープンソース" },
    ],
    routeLabel: "個人プロダクト開発",
  },
  elektrohub: {
    title: "Eコマース・業務システム担当フルスタックエンジニア",
    subTitle: "正社員",
    summary:
      "Elektrohub唯一のエンジニアとして、事業の中核となるEコマース・業務プラットフォームを再構築し、運用しました。プロダクトの課題発見、アーキテクチャ設計、外部連携、リリース、本番環境の信頼性までを一貫して担当しました。",
    impact: [
      { label: "担当範囲", value: "唯一のエンジニア" },
      { label: "本番処理", value: "10,000件超の注文" },
      { label: "性能改善", value: "平均約80%高速化" },
      { label: "最大改善", value: "10分超 → 数秒" },
    ],
    tasks: [
      "保守性、可観測性、テスト容易性、将来の拡張性を高めるため、Laravel・Vue.js製の中核プラットフォームをNestJS、Next.js、TypeScript、PostgreSQLで再構築",
      "Galaxus、JTL Wawi、JTL Fulfillment Network、Shopifyの4サービスと、自社B2Bコマース基盤を接続するモジュール型コネクターアーキテクチャを設計",
      "20名以上が利用するB2Bプラットフォームを、検索と効率的な発注フローを中心とした高速でレスポンシブなReact体験へ刷新",
      "重要なワークフローとデータベース処理を平均約80%高速化し、最大のケースでは10分超から数秒へ短縮",
      "プラットフォームの改善、分析ダッシュボード、自動テストに加え、運用全体を担うことで、10,000件を超える注文の安定処理を実現",
      "Docker、GitHub Actions、DigitalOcean、Vercel、PostgreSQL、Sentryを用いたインフラ、本番運用、バックアップ、リリース、障害対応を担当",
      "従業員、経営陣、B2B顧客から直接要件を収集し、ユーザー価値、事業効果、複雑性、工数に基づいて優先順位を決定",
      "Shopifyブログ記事の下書きを支援する社内LLMツールを開発し、Symfony、PHP、Vue.jsを用いた関連クライアント案件も提供",
    ],
    routeLabel: "フルスタック開発",
  },
  nistech: {
    title: "ソフトウェア開発者（職業訓練）",
    subTitle: "職業訓練（Ausbildung）",
    summary:
      "通常3年間の職業訓練を2年半に短縮して修了しました。実運用されているデスクトップソフトウェアの開発や、レガシーなC#・WPF領域のモダナイズに携わり、保守しやすいデータアクセスとレスポンシブなUXをテーマにIHK修了プロジェクトを完成させました。",
    impact: [
      { label: "訓練期間", value: "3年 → 2.5年" },
      { label: "IHK評価", value: "83点 · 良" },
      { label: "修了課題", value: "62時間" },
      { label: "クエリ改善", value: "5回 → 1回" },
    ],
    tasks: [
      "C#、.NET Framework、WPF、XAML、MVVM、Entity Framework、リレーショナルデータベースを用いて、Qualli.lifeデスクトップ製品の既存領域をモダナイズ",
      "Visual BasicからC#へのリファクタリングと移行、UI改善、本番不具合の調査、テスト、顧客向け機能のリリースを担当",
      "文書・印刷テンプレートのドメイン固有プレースホルダー向けに、IntelliSense風の自動補完とシンタックスハイライトを開発",
      "医療データモジュールと、成熟した本番コードベースにおけるデータベース連携ロジックの開発に参画",
      "IHK修了課題として、非同期読み込み、権限、印刷、複数ユーザー、データアクセスの一元化を含む連絡先モジュールの基盤を再設計",
      "責務を明確に分離し不要な書き込みを避けながら、修了課題のデータベース処理を5クエリから1クエリに削減",
    ],
    routeLabel: "システム開発",
  },
  senvion: {
    title: "組み込みソフトウェア開発者",
    subTitle: "インターンシップ",
    summary:
      "Senvion Deutschlandでの設備技術開発インターンとして、マイクロコントローラー向けソフトウェア、モーター制御、センサーデータ処理に取り組みました。事業は後にSiemens Gamesaの一部となりました。",
    tasks: [
      "マイクロコントローラー向けソフトウェアの開発",
      "モーター制御とセンサーデータの読み取り・処理",
    ],
    skills: ["組み込みシステム"],
    routeLabel: "最初の実務経験",
  },
  shiftiq: {
    title: "ShiftIQ — インテリジェント勤務スケジュール基盤",
    subTitle: "勤務スケジューリングプロダクト",
    summary:
      "実際の介護サービスにおける勤務表作成業務をもとに、雇用契約、欠勤、休暇、従業員の希望、必要人員、設定可能なハード制約とソフト制約をモデル化しました。Python、FastAPI、OR-Toolsで構築したソルバーが、手作業では数時間かかる完全な勤務表の候補を数分で生成し、業務を作成中心から確認・調整中心の流れへ変えます。MVP後、パイロット導入直前まで到達しましたが、想定顧客が契約中の既存ソフトウェアから切り替えることは商業的に成立しないと判明し、展開を停止しました。",
    tasks: [
      "介護サービス管理者の実際の計画業務を、プロダクト要件と人間中心のスケジューリングフローへ変換",
      "従業員、雇用契約、欠勤、休暇、希望、必要人員、通知、印刷、スケジュール確認機能を開発",
      "設定可能な業務制約と従業員の希望を扱うPython、FastAPI、OR-Tools製の専用ソルバーを実装",
      "MVP後・パイロット導入直前まで開発した後、既存ベンダー契約により切り替えが現実的でないことを商業検証で確認",
    ],
    routeLabel: "プロダクト構築",
  },
  rosterspec: {
    title: "RosterSpec — オープンソース・スケジューリングソルバー",
    subTitle: "オープンソース最適化システム",
    summary:
      "RosterSpecはShiftIQと同時に、その再利用可能なソルバー基盤として始まりました。現在は、業務要件を明示的かつテスト可能なハード制約とソフト制約として表現するオープンソース・スケジューリングシステムとしてGitHubで一般公開し、制約ベースのアプローチを誰でも検証、利用、拡張できるようにしています。",
    tasks: [
      "最適化を製品固有のロジックにせず、ShiftIQと並行して再利用可能なソルバー基盤を開発",
      "勤務計画のルールを、複数のシナリオで再利用できる構造化・テスト可能な制約へ汎用化",
      "構造化され検証可能なエンジニアリングワークフローにおけるLLM活用を検証するため、実験的な評価ハーネスを追加",
      "RosterSpecをオープンソースプロジェクトとしてGitHubで公開",
    ],
    skills: ["Python", "OR-Tools", "制約プログラミング", "LLM評価"],
    routeLabel: "オープンソース公開",
  },
  "ihk-qualification": {
    title: "ドイツIHK認定資格 — ソフトウェア開発",
    subTitle: "公的職業資格",
    summary:
      "通常3年間のFachinformatiker für Anwendungsentwicklung（アプリケーション開発ITスペシャリスト）職業訓練を2年半で修了し、83点（評価「良」）を取得。ドイツおよび欧州資格枠組みのレベル4に相当します。",
    skills: ["EQFレベル4", "83点 · 良"],
    routeLabel: "資格取得",
  },
  sparky: {
    title: "Sparky — Kia・Hyundai EV向けクラウド車両管理基盤",
    subTitle: "プロダクト開発",
    summary:
      "より優れたコネクテッドカー体験を目指してSparkyを開発しました。Siri対応、ウィジェット、Live Activities、詳細な走行データ、柔軟な空調スケジュール機能を実装しています。",
    routeLabel: "プロダクト開発",
  },
  ng001: {
    title: "NG001 — Kia e-Soulの独自改良",
    subTitle: "ソフトウェア・ハードウェア開発",
    summary:
      "モバイル連携アプリと並行し、車両とスマートに連動する独自のアンビエントライトシステムを通して、車内体験そのものの改善にも取り組みました。",
    skills: ["Arduino", "C++", "CAD", "電子工学"],
    routeLabel: "ハードウェア開発",
  },
  arcticwolf: {
    title: "ArcticWolf — 旧Fortniteビルドの復元・ライブデータ記録",
    subTitle: "ゲームMod開発",
    summary:
      "既存のModを特定の旧Fortniteビルド向けに適応し、ゲーム内の興味深い変化を可視化するライブイベント記録機能を追加しました。",
    routeLabel: "リバースエンジニアリング",
  },
  "ibm-full-stack-certificate": {
    title: "IBM Full Stack Software Developer Specialization",
    subTitle: "プロフェッショナル認定",
    summary:
      "フルスタック開発、クラウド基盤、コンテナ、デプロイ、モダンなアプリケーション設計を扱う認定資格です。",
    skills: [
      "フルスタック開発",
      "クラウドコンピューティング",
      "サーバーレスコンピューティング",
      "CI/CD",
      "マイクロサービス",
      "React.js",
      "Python",
      "Django",
      "GitHub",
      "Docker",
      "Kubernetes",
      "データベース",
    ],
    routeLabel: "認定資格",
  },
};

function localizeMilestone(milestone: CareerMilestone): CareerMilestone {
  return { ...milestone, ...milestoneTranslations[milestone.id] };
}

const localizedStops = en.timeline.stops.map(({ experience, attachedMilestones }) => ({
  experience: localizeMilestone(experience),
  attachedMilestones: attachedMilestones.map(localizeMilestone),
}));

const categoryLabels: Record<string, string> = {
  Languages: "言語",
  Frameworks: "フレームワーク",
  Libraries: "ライブラリ",
  Platform: "プラットフォーム",
  "Cloud & Ops": "クラウド・運用",
  Tools: "ツール",
  Other: "その他",
};

const toolTranslations: Record<
  string,
  { title: string; flavor: string; stats: { label: string; value: string }[] }
> = {
  TypeScript: {
    title: "型の鍛冶師",
    flavor: "UIやサービスから共通の型定義まで、私の技術スタックの中心です。",
    stats: [
      { label: "型定義", value: "明示的" },
      { label: "リファクタ", value: "安全" },
      { label: "対応範囲", value: "E2E" },
    ],
  },
  "Node.js": {
    title: "ランタイム船長",
    flavor: "本番サービス、外部連携、バックグラウンド処理を一つのエコシステムで。",
    stats: [
      { label: "サービス", value: "実運用" },
      { label: "連携", value: "接続済み" },
      { label: "ランタイム", value: "実証済み" },
    ],
  },
  NestJS: {
    title: "サービス設計者",
    flavor: "適切な境界と堅実な標準を備えた、構造化バックエンド。",
    stats: [
      { label: "モジュール", value: "構成済み" },
      { label: "ガード", value: "稼働" },
      { label: "API", value: "型安全" },
    ],
  },
  "Next.js": {
    title: "ルートランナー",
    flavor: "素早い反復と本番品質を両立するフルスタックReact開発。",
    stats: [
      { label: "描画", value: "ハイブリッド" },
      { label: "開発速度", value: "高速" },
      { label: "SEO", value: "強力" },
    ],
  },
  React: {
    title: "状態管理の達人",
    flavor: "再利用可能な部品から、きれいに拡張できるインタラクティブUIを構築。",
    stats: [
      { label: "部品", value: "再利用可能" },
      { label: "状態フロー", value: "明快" },
      { label: "UI", value: "高度" },
    ],
  },
  "TanStack Query": {
    title: "キャッシュ戦略家",
    flavor: "取得、キャッシュ、同期を制御するサーバー状態管理。",
    stats: [
      { label: "キャッシュ", value: "スマート" },
      { label: "再取得", value: "自動" },
      { label: "同期", value: "安定" },
    ],
  },
  GraphQL: {
    title: "スキーマ仲介者",
    flavor: "フロントエンドとバックエンドを揃える、精密なデータ契約。",
    stats: [
      { label: "クエリ", value: "正確" },
      { label: "スキーマ", value: "共有" },
      { label: "過剰取得", value: "抑制" },
    ],
  },
  Docker: {
    title: "コンテナ操縦士",
    flavor: "ローカルと本番で一貫した、再現可能な環境を構築。",
    stats: [
      { label: "配布単位", value: "可搬" },
      { label: "環境差異", value: "少" },
      { label: "スタック", value: "再現可能" },
    ],
  },
  PostgreSQL: {
    title: "データ保管庫",
    flavor: "確かな構造が必要なシステムのための、信頼できるリレーショナル設計。",
    stats: [
      { label: "スキーマ", value: "正規化" },
      { label: "クエリ", value: "最適化" },
      { label: "整合性", value: "厳密" },
    ],
  },
  DigitalOcean: {
    title: "Droplet管理人",
    flavor: "分かりやすい制御と低い運用負荷を両立する、無駄のないインフラ。",
    stats: [
      { label: "Droplet", value: "管理済み" },
      { label: "運用負荷", value: "低" },
      { label: "構築", value: "直接" },
    ],
  },
  Vercel: {
    title: "デプロイ錬金術師",
    flavor: "コミットから本番まで、プレビュー中心で摩擦の少ないリリース。",
    stats: [
      { label: "プレビュー", value: "即時" },
      { label: "リリース", value: "数分" },
      { label: "ロールバック", value: "容易" },
    ],
  },
  AWS: {
    title: "スケール装備庫",
    flavor: "幅広い機能、きめ細かな制御、グローバル展開を必要とするシステムのクラウド基盤。",
    stats: [
      { label: "サービス", value: "広範" },
      { label: "拡張性", value: "弾力的" },
      { label: "範囲", value: "グローバル" },
    ],
  },
  Sentry: {
    title: "スタックトレース探偵",
    flavor: "問題を早期発見し、本番環境の挙動を説明可能に。",
    stats: [
      { label: "エラー", value: "追跡" },
      { label: "シグナル", value: "実用的" },
      { label: "調査時間", value: "短縮" },
    ],
  },
  GitHub: {
    title: "マージの守護者",
    flavor: "バージョン管理、レビュー、協働を支える安定した中心地。",
    stats: [
      { label: "PRフロー", value: "効率的" },
      { label: "履歴", value: "明瞭" },
      { label: "自動化", value: "対応" },
    ],
  },
  Cursor: {
    title: "補完の勝負師",
    flavor: "速度、文脈、反復に最適化したAI支援コーディング。",
    stats: [
      { label: "編集", value: "高速化" },
      { label: "文脈", value: "深い" },
      { label: "反復", value: "高速" },
    ],
  },
  "Codex App": {
    title: "ターミナルの相棒",
    flavor: "実際のコードベースに密着した、エージェント駆動の開発フロー。",
    stats: [
      { label: "実行", value: "実践的" },
      { label: "フロー", value: "直接的" },
      { label: "勢い", value: "高" },
    ],
  },
  "T3 Code": {
    title: "スターター鍛造所",
    flavor: "アイデアからプロダクトへ素早く進むための、実用的なフルスタック基盤。",
    stats: [
      { label: "雛形", value: "方針明確" },
      { label: "スタック", value: "モダン" },
      { label: "準備時間", value: "短い" },
    ],
  },
  Shopify: {
    title: "コマースエンジン",
    flavor: "Eコマース業務、ストアフロントロジック、事業者向けプロダクト開発。",
    stats: [
      { label: "ストア", value: "提供済み" },
      { label: "連携", value: "独自" },
      { label: "コマース", value: "実運用" },
    ],
  },
  "Tailwind CSS": {
    title: "ユーティリティの魔術師",
    flavor: "品質や一貫性を損なわず、UIを素早く実装。",
    stats: [
      { label: "実装速度", value: "高速" },
      { label: "一貫性", value: "強" },
      { label: "仕上げ", value: "精密" },
    ],
  },
};

const localizedTools = en.tools.items.map((item) => ({
  ...item,
  category: categoryLabels[item.category ?? "Other"],
  ...toolTranslations[item.name],
}));

const ja: Dictionary = {
  metadata: {
    title: "Joschua Haß（ヨシュア・ハス）",
    description:
      "TypeScript、React、Next.js、NestJS、Node.js、PostgreSQLを専門とする、プロダクト志向のフルスタックエンジニア。",
  },
  accessibility: {
    skipToContent: "メインコンテンツへ移動",
    opensNewTab: "新しいタブで開きます",
  },
  nav: {
    identity: "Joschua Haß",
    monogram: "JH",
    label: "メインナビゲーション",
    home: "ホーム",
    work: "経歴",
    about: "プロフィール",
    notes: "記事",
    contact: "お問い合わせ",
    imprint: "法的情報",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    mobileLabel: "モバイルナビゲーション",
    languageLabel: "表示言語",
    languages: { en: "英語", ja: "日本語" },
  },
  hero: {
    label: "フルスタック・プロダクトエンジニア / TypeScript · React · Node.js",
    headlineLead: "複雑な業務課題を",
    headlineAccent: "信頼できるプロダクトへ",
    description:
      "UI、バックエンドサービス、外部連携、データベース、インフラ、本番運用まで、エンドツーエンドの経験を持つプロダクト志向のフルスタックエンジニアです。",
    primaryAction: "職務経歴を見る",
    secondaryAction: "CVをダウンロード",
    primaryActionLabel: "職務経歴を見る",
    secondaryActionLabel: "CVをダウンロード",
    cvLanguageMenuLabel: "CVの言語を選択",
    socialsLabel: "オンライン",
    nextSectionLabel: "プロフィールへ進む",
  },
  about: {
    label: "01 / プロフィール",
    title: "プロフィール",
    statement: "UIの判断から本番運用まで、プロダクトを考え抜くエンジニアリング。",
    annotationsLabel: "基本情報と仕事の原則",
    profileFactsLabel: "基本情報",
    profileFacts: [
      ["拠点", "7月末に東京へ移住予定"],
      ["ドイツ語", "母語"],
      ["英語", "C2"],
      ["日本語", "初級 · JLPT N5程度"],
    ],
    principlesLabel: "仕事の原則",
    paragraphs: [
      "10代の頃、友人たちとEuro Truck Simulator 2のバーチャル運送会社で使っていた共同作業ツールの提供が終了したことをきっかけに、本格的なソフトウェア開発を始めました。そのまま諦めるのではなく、コミュニティ向けに代替サービスを開発した経験から、プロダクト思考、実際のユーザーニーズ、そして人に頼られるソフトウェアを届ける面白さを学びました。",
      "現在はTypeScript、React、Next.js、NestJS、Node.js、PostgreSQLを専門とする、プロダクト志向のフルスタックエンジニアです。要件整理とアーキテクチャから実装、デプロイ、監視、本番サポートまで一貫して担当できます。近年はEコマース、社内業務ソフトウェア、外部連携、そして利用者の業務を止めずに事業の中核システムをモダナイズする仕事に注力してきました。",
    ],
    principles: [
      ["設計", "複雑さを丁寧に整理し、分かりやすく使いやすい形にする。"],
      ["システム", "実運用に耐える、信頼できる基盤を作る。"],
      ["オーナーシップ", "設計から提供まで、成果に責任を持つ。"],
    ],
  },
  writing: {
    label: "02 / フィールドノート",
    title: "最新の記事",
    intro: "プロダクト、技術的なトレードオフ、共有する価値のある探究について。",
    allWriting: "すべての記事を見る",
  },
  timeline: {
    label: "03 / 経歴",
    title: "職務経歴",
    description:
      "組み込み・デスクトップ開発から、フルスタックでプロダクト全体を担う開発と最適化まで。実務、個人プロダクト、資格をまとめています。",
    newer: "新しい経歴を表示",
    older: "以前の経歴を表示",
    readMore: "詳細を見る",
    present: "現在",
    kinds: { experience: "職務経験", project: "プロジェクト", certificate: "資格" },
    impactLabel: "成果",
    stops: localizedStops,
  },
  tools: {
    label: "04 / シグネチャーデッキ",
    title: "8枚のカード、ひとつの技術スタック。",
    description:
      "型安全なプロダクトUIからサービス、データ、本番運用まで、私の開発を形づくる技術だけを厳選した小さなコレクションです。",
    deckLabel: "シグネチャーデッキ・初版",
    completeSet: "全8枚・コンプリートセット",
    rarityGuideLabel: "レアリティガイド",
    collectionLabel: "主要技術カードコレクション",
    editionLabel: "初版・2026",
    traitsLabel: "カード特性",
    rarities: { Common: "コモン", Rare: "レア", Epic: "エピック", Legendary: "レジェンド" },
    rarityNotes: {
      Rare: "信頼のユーティリティ",
      Epic: "深い専門領域",
      Legendary: "中核技術",
    },
    items: localizedTools,
  },
  interests: {
    label: "05 / 仕事の外側",
    title: "興味・情熱",
    description: "旅、航空、好奇心が、ソフトウェアの仕事をより広い世界につなげています。",
    items: [
      {
        ...en.interests.items[0],
        title: "日本",
        description:
          "日本は最初、興味を持った旅先の一つでした。しかし訪れるたびに、ここで暮らす自分を想像できる場所へと変わりました。東京の活気と静かな住宅街の対比、地域ごとの違い、食、デザイン、日常の細部に表れる心配りに惹かれています。今は東京を生活の拠点にする準備を進め、訪問者としてだけでなく、現地の暮らしにより深く関われるよう日本語を学んでいます。",
      },
      {
        ...en.interests.items[1],
        title: "航空",
        description:
          "航空は長年続いている、少しお金のかかる趣味です。Microsoft Flight Simulatorで多くの時間を過ごし、航空機について必要以上に調べ、客室レイアウトやエンジン音、そしてA350の素晴らしさにはつい熱くなります。YouTubeのおすすめ欄は、かなり前に航空以外を表示することを諦めました。",
      },
      {
        ...en.interests.items[2],
        title: "ソフトウェア開発",
        description:
          "ソフトウェア開発への興味は、いつも個人プロジェクトへ発展します。Webアプリ、モバイルアプリ、妙に具体的な問題を解くツールなど、表面はシンプルで内部は堅牢なプロダクトを作ることが好きです。また、業界が何でも『革命的』と呼んだ半年後に別のものへ置き換える習慣には、健全な距離感を持っています。",
      },
    ],
    previous: "前の項目",
    next: "次の項目",
    regionLabel: "個人的な興味",
  },
  flightRadar: {
    ...en.flightRadar,
    label: "06 / 旅の記録",
    title: "この先の航路も続いています。",
    description:
      "飛行機で世界を巡ることが大好きです。旅を通じて異なる文化に触れ、素晴らしい人々と出会い、忘れられない経験を重ねてきました。これまでのフライトをまとめています。",
    imageAlt: "FlightRadar24で見るフライト履歴",
    action: "FlightRadar24のフライト履歴を開く",
  },
  footer: {
    label: "複雑なプロダクト課題がありますか？",
    title: "シンプルに変えていきましょう。",
    contact: "気軽に相談する",
    copyright: "すべての権利を保有します。",
    imprint: "法的情報",
  },
  contact: {
    metadataTitle: "お問い合わせ",
    metadataDescription: "メール、LinkedIn、GitHub、InstagramからJoschua Haßへご連絡いただけます。",
    label: "お問い合わせ / 連絡先",
    titleLead: "良い仕事は、",
    titleAccent: "対話から始まります。",
    intro:
      "プロダクトの課題、仕事のご相談、または共有したい面白い話があれば、ご都合のよい連絡手段を選んでお気軽にご連絡ください。",
    directoryLabel: "直接の連絡先",
    directoryTitle: "ご都合のよい方法をお選びください。",
    emailLabel: "メール",
    emailIntro: "仕事のご相談、協業、少し詳しくお話ししたい内容に最適です。",
    socialsLabel: "ソーシャルプロフィール",
    socials: {
      linkedin: "職務経験とプロフェッショナルな近況",
      github: "プロジェクト、実験、ソースコード",
      instagram: "旅、飛行機、仕事以外の日々",
    },
    unavailable: "この連絡方法は現在利用できません。",
    note: "フォームも受付番号もありません。メッセージは私に直接届きます。",
  },
  blog: {
    metadataTitle: "ブログ",
    metadataDescription:
      "Joschua Haßによる、ソフトウェア開発、プロダクト設計、信頼できるシステムづくりの記録。",
    label: "フィールドノート",
    title: "アイデア、トレードオフ、書き残す価値のあること。",
    intro: "丁寧なプロダクトづくり、複雑な技術システムを解きほぐすこと、そしてその過程で得た学びについて。",
    rss: "RSSで購読",
    emptyLabel: "最初の記事を準備中",
    emptyTitle: "ノートは開いています。",
    emptyBody: "現在、最初の記事を準備しています。その間、サイト内のプロジェクトや経歴をご覧ください。",
    exploreWork: "職務経歴を見る",
    localOnly: "ローカル開発環境のみ",
    drafts: "下書きプレビュー",
    draftsBody: "これらの記事は本番ビルドには含まれません。",
    allWriting: "すべての記事",
    draftPreview: "下書きプレビュー",
    tags: "タグ",
    read: "読む",
    minRead: "分で読めます",
    readingTime: (minutes: number) => `${minutes}分で読めます`,
    readArticle: (title: string) => `${title}を読む`,
    copyLink: "リンクをコピー",
    copied: "コピーしました",
    copyFailed: "コピーできませんでした",
    moreArticles: "その他の記事",
    enlargeImage: "画像を拡大",
    fullscreenImage: "画像を全画面表示",
    closeFullscreenImage: "全画面表示を閉じる",
    onThisPage: "目次",
    tableOfContents: "記事の目次",
    newer: "新しい記事",
    older: "以前の記事",
    keepReading: "続きを読む",
    related: "関連記事",
  },
  imprint: {
    label: "法的情報 / ドイツ",
    title: "Impressum / 法的表示",
    metadataDescription: "jhass.devの法的表示および連絡先情報。",
    intro: "ドイツデジタルサービス法（DDG）第5条に基づく情報。",
    operator: "ウェブサイト運営者",
    contactTitle: "連絡先",
    phone: "電話",
    email: "メール",
    addressLines: ["To Westen 5", "25770 Hemmingstedt, Germany"],
    copyrightTitle: "著作権",
    copyrightBody:
      "本サイトおよびその内容にはドイツの著作権法が適用されます。法律で明示的に認められる場合を除き、保護された著作物の利用、複製、加工には各権利者の事前の同意が必要です。個別の複製は私的利用に限り認められます。無断利用は著作権法に違反する場合があります。",
  },
};

export default ja;
