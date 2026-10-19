import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Dictionary } from "@/app/i18n/getDictionary";
import en from "./en";

type MilestoneTranslation = Pick<CareerMilestone, "title" | "subTitle" | "summary"> &
  Partial<Pick<CareerMilestone, "impact" | "tasks" | "skills" | "invitation">>;

const milestoneTranslations: Record<string, MilestoneTranslation> = {
  "auren-labs": {
    title: "創業者・ソフトウェアエンジニア",
    subTitle: "創業",
    summary:
      "Lumaを作るためにAuren Labsを立ち上げました。オンラインストアの裏側の仕事、つまり注文、在庫、出荷、仕入れを、すでに使っているツールをまたいで一つのワークスペースにまとめます。繰り返しの作業はWorkflowsが引き受け、大事な判断は人が承認します。きっかけは、Elektrohubでそのシステムを毎日使う人たちと一緒に働いた経験です。",
    tasks: [
      "プロダクトデザインからフルスタック開発、本番運用まで、Lumaの設計と開発をしています",
      "ストアがすでに使っているシステムの注文、在庫、出荷、仕入れを一か所にまとめています",
      "繰り返しの作業を引き受け、大事な判断は人が承認するWorkflowsを作っています",
    ],
    invitation:
      "Lumaはまだ始まったばかりです。オンラインストアの運営をしている方、またはその人たちのためのツールを作っている方、手間がかかりすぎていることがあればぜひ聞かせてください。早期導入で一緒にLumaを形にしてもらえたらうれしいです。",
  },
  "independent-products": {
    title: "個人プロダクトエンジニア",
    subTitle: "独立",
    summary:
      "2025年末から2026年春まで、自分のプロダクトに取り組んでいました。ShiftIQは介護サービスの管理者と一緒に、現場での実際のシフト作成の流れをもとに作り、パイロット導入の直前まで進めました。",
  },
  elektrohub: {
    title: "フルスタックエンジニア",
    subTitle: "正社員",
    summary:
      "Elektrohubでただ一人のエンジニアでした。オンラインショップと日々の業務を支えるプラットフォームを作り直し、その周りのこともすべて担当しました。何が必要かを聞き出すところから、設計、外部連携、リリース、本番環境を健全に保つことまでです。",
    impact: [
      { label: "エンジニアチーム", value: "私ひとり" },
      { label: "処理した注文", value: "10,000件以上" },
      { label: "一番遅かった処理", value: "10分以上 → 数秒" },
    ],
    tasks: [
      "保守、テスト、監視、拡張をしやすくするため、中核プラットフォームをLaravel・Vue.jsからNestJS、Next.js、TypeScript、PostgreSQLへ作り直しました",
      "4つの外部システム（Galaxus、JTL Wawi、JTL Fulfillment Network、Shopify）と自社のB2Bショップをつなぐコネクターの仕組みを設計しました",
      "20人以上が使うB2Bショップを、すばやい検索と注文を中心にした高速なReactアプリに作り直しました",
      "重要なワークフローやデータベース処理を平均で約80%高速化しました。最も遅かった処理は10分以上から数秒になりました",
      "プラットフォームの改善、分析ダッシュボード、自動テスト、日々の運用によって、10,000件以上の注文を滞りなく処理しました",
      "インフラと本番運用を担当しました。Docker、GitHub Actions、DigitalOcean、Vercel、PostgreSQL、Sentry、バックアップ、リリース、ときどき障害対応も",
      "従業員、経営陣、B2B顧客と直接話し、価値と工数を比べながら次に作るものを決めました",
      "Shopifyのブログ記事の下書きを手伝う社内LLMツールを作り、Symfony、PHP、Vue.jsでのクライアント案件も担当しました",
    ],
  },
  nistech: {
    title: "ソフトウェア開発の職業訓練生",
    subTitle: "職業訓練（Ausbildung）",
    summary:
      "通常3年の職業訓練を2年半で修了しました。お客さんが毎日使うデスクトップソフトの開発に関わり、古いC#・WPFのコードを新しくし、IHKの修了課題ではデータアクセスの整理とUIの応答性の改善に取り組みました。",
    impact: [
      { label: "期間", value: "3年 → 2.5年" },
      { label: "IHK評価", value: "83点（良）" },
    ],
    tasks: [
      "C#、.NET Framework、WPF、XAML、MVVM、Entity Framework、リレーショナルデータベースを使い、Qualli.lifeデスクトップアプリの一部を刷新しました",
      "Visual BasicからC#への移行、UIの改善、本番の不具合調査、テストを行い、お客さんが使う機能をリリースしました",
      "文書・印刷テンプレートのプレースホルダー向けに、IntelliSense風の自動補完とシンタックスハイライトを作りました",
      "別の医療データモジュールや、大規模で成熟したコードベースのデータベース処理にも携わりました",
      "IHKの修了課題として、連絡先モジュールの土台を設計し直しました。非同期読み込み、権限、印刷、複数ユーザー、データアクセスの一元化を含みます",
      "その課題のデータベース処理を5回のクエリから1回に減らし、不要な書き込みもなくしました",
    ],
  },
  senvion: {
    title: "組み込みソフトウェア開発者",
    subTitle: "インターンシップ",
    summary:
      "初めての本格的なエンジニアリング経験です。マイコン向けのソフトウェアを書き、モーターを制御し、センサーデータを処理しました。この会社は後にSiemens Gamesaの一部になりました。",
    tasks: [
      "マイコン向けソフトウェアの開発",
      "モーター制御とセンサーデータの処理",
    ],
    skills: ["組み込みシステム"],
  },
  shiftiq: {
    title: "ShiftIQ：介護サービス向けのシフト作成",
    subTitle: "勤務スケジューリングプロダクト",
    summary:
      "実際の介護サービスのシフト作成の流れから生まれたプロダクトです。雇用契約、欠勤、休暇、スタッフの希望、必要人数、さまざまなハード制約・ソフト制約を扱います。Python、FastAPI、OR-Toolsで作ったソルバーが数分でシフト案を作るので、何時間も悩む作業が、確認して調整する作業に変わります。MVPを超えてパイロット直前まで進みましたが、展開は止めました。お客さんが今のベンダーと契約で結ばれていて、乗り換えるメリットがなかったためです。",
    tasks: [
      "介護サービス管理者の実際のシフト作成の流れを、現場の考え方に合った要件とワークフローに落とし込みました",
      "スタッフ、雇用契約、欠勤、休暇、希望、必要人数、通知、印刷、シフト確認の機能を作りました",
      "設定可能なルールとスタッフの希望を扱う、Python、FastAPI、OR-Tools製の独立したソルバーを書きました",
      "お客さんが既存ベンダーとの契約に縛られていると、良いプロダクトだけでは足りないことを学びました",
    ],
  },
  "ihk-qualification": {
    title: "IHK認定資格（ソフトウェア開発）",
    subTitle: "ドイツの公的職業資格",
    summary:
      "Fachinformatiker für Anwendungsentwicklung（アプリケーション開発者）としてのドイツの公的資格です。3年のところを2年半で修了し、83点（評価「良」）でした。ドイツおよび欧州資格枠組みのレベル4にあたります。",
    skills: ["EQFレベル4", "83点（良）"],
  },
  sparky: {
    title: "Sparky：Kia・Hyundai EV向けのより良いアプリ",
    subTitle: "個人プロジェクト",
    summary:
      "自分の車のアプリにもっと機能が欲しくて、Sparkyを作りました。Siri対応、ウィジェット、Live Activities、より詳しい走行データ、柔軟なエアコンのスケジュール設定を追加しています。",
  },
  ng001: {
    title: "NG001：手を加えたKia e-Soul",
    subTitle: "ソフトウェア・ハードウェア",
    summary:
      "アプリと並行して、車そのものにも手を入れ始めました。車両と連動する独自のアンビエントライトです。",
    skills: ["Arduino", "C++", "CAD", "電子工作"],
  },
  arcticwolf: {
    title: "ArcticWolf：昔のFortniteを復活させる",
    subTitle: "ゲームMod開発",
    summary:
      "既存のModを改造して、ある古いFortniteのビルドをもう一度動くようにし、ゲーム内の面白い変化を見つけるためのライブイベント記録を追加しました。",
  },
  "ibm-full-stack-certificate": {
    title: "IBM Full Stack Software Developer",
    subTitle: "プロフェッショナル認定",
    summary:
      "フルスタック開発、クラウドの基礎、コンテナ、デプロイ、アプリケーション設計を学ぶオンラインの専門講座です。",
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
};

const toolTranslations: Record<
  string,
  { title: string; flavor: string; stats: { label: string; value: string }[] }
> = {
  TypeScript: {
    title: "主人公",
    flavor: "フロントエンドもバックエンドも、その間の型も。コードを書いているなら、たぶんこれです。",
    stats: [
      { label: "使用頻度", value: "毎日" },
      { label: "慣れ", value: "ホーム" },
      { label: "anyの数", value: "ごくわずか" },
    ],
  },
  "Node.js": {
    title: "機関室",
    flavor: "API、外部連携、止まるまで誰も気づかないバックグラウンド処理を動かしています。",
    stats: [
      { label: "使用頻度", value: "毎日" },
      { label: "担当", value: "APIとジョブ" },
      { label: "相棒", value: "NestJS" },
    ],
  },
  "Next.js": {
    title: "本拠地",
    flavor: "UIがあるものなら、まずこれ。このサイトもNext.jsで動いています。",
    stats: [
      { label: "使用頻度", value: "ほぼ全案件" },
      { label: "動かすもの", value: "このサイト" },
      { label: "アップデート", value: "頻繁" },
    ],
  },
  React: {
    title: "UI使い",
    flavor: "インターフェースの考え方そのもの。小さな部品、はっきりした状態、想定外はなし。",
    stats: [
      { label: "使用頻度", value: "毎日" },
      { label: "得意", value: "複雑なUI" },
      { label: "再レンダリング", value: "管理下" },
    ],
  },
  NestJS: {
    title: "バックエンド設計士",
    flavor: "育っていくバックエンドが、スパゲッティになる前に構造を与えてくれます。",
    stats: [
      { label: "用途", value: "サーバー" },
      { label: "得意", value: "構造化" },
      { label: "デコレーター", value: "たくさん" },
    ],
  },
  PostgreSQL: {
    title: "データの番人",
    flavor: "本物のデータが住む場所。EXPLAIN ANALYZEと楽しい時間をたくさん過ごしました。",
    stats: [
      { label: "使用頻度", value: "全案件" },
      { label: "得意", value: "実データ" },
      { label: "好きなコマンド", value: "EXPLAIN" },
    ],
  },
  Docker: {
    title: "輸送コンテナ",
    flavor: "ノートPCでも本番でも同じ環境。「自分の環境では動く」が減ります。",
    stats: [
      { label: "使用頻度", value: "どこでも" },
      { label: "得意", value: "同じ環境" },
      { label: "想定外", value: "少なめ" },
    ],
  },
  Sentry: {
    title: "バグレーダー",
    flavor: "お客さんより先に、何かが壊れたことを教えてくれます。",
    stats: [
      { label: "使う場所", value: "本番環境" },
      { label: "見つけるもの", value: "早めのバグ" },
      { label: "睡眠", value: "改善" },
    ],
  },
};

const localizedTools = en.tools.items.map((item) => ({
  ...item,
  category: categoryLabels[item.category] ?? item.category,
  ...toolTranslations[item.name],
}));

const ja: Dictionary = {
  metadata: {
    title: "Joschua Haß（ヨシュア・ハス）",
    description:
      "東京在住のソフトウェアエンジニア、ヨシュア・ハスのサイト。TypeScript、React、Next.js、NestJS、PostgreSQLでWebアプリを作っています。",
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
    about: "自己紹介",
    notes: "ブログ",
    contact: "連絡先",
    imprint: "法的情報",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    mobileLabel: "モバイルナビゲーション",
    languageLabel: "表示言語",
    languages: { en: "英語", ja: "日本語" },
  },
  hero: {
    label: "東京在住のソフトウェアエンジニア",
    headlineLead: "こんにちは、ヨシュアです。",
    headlineAccent: "フルスタックエンジニア、ときどき航空オタク。",
    description:
      "ドイツ北部で育ち、今は東京で暮らしています。仕事は主にTypeScriptとWeb開発で、休みの日はたいてい飛行機について調べています。",
    primaryAction: "経歴を見る",
    secondaryAction: "CVをダウンロード",
    primaryActionLabel: "経歴を見る",
    secondaryActionLabel: "CVをダウンロード",
    cvLanguageMenuLabel: "CVの言語を選択",
    socialsLabel: "こちらにも",
    nextSectionLabel: "自己紹介へ進む",
  },
  about: {
    label: "自己紹介",
    title: "自己紹介",
    statement: "トラックのゲームから、本番システムまで。",
    annotationsLabel: "プロフィール",
    profileFactsLabel: "プロフィール",
    profileFacts: [
      ["拠点", "東京"],
      ["出身", "ドイツ北部"],
      ["言語", "ドイツ語（母語）、英語（流暢）、日本語（勉強中・N5程度）"],
      ["得意分野", "フルスタックのTypeScript"],
    ],
    paragraphs: [
      "プログラミングを始めたきっかけは、トラックのシミュレーターゲームでした。友人たちとEuro Truck Simulator 2でバーチャル運送会社を運営していたのですが、みんなで使っていた管理ツールが終了してしまい、代わりのツールを自分で作りました。自分が作ったものを初めて人に使ってもらえた経験で、今でもそれがこの仕事でいちばん好きなところです。",
      "今は主にTypeScriptを書いています。フロントエンドはReactとNext.js、その裏側はNestJSとPostgreSQLです。ここ数年はEコマース企業でただ一人のエンジニアだったので、何が必要かを聞き出すところから、本番で何か壊れたときの対応まで、すべて自分で担当するのが当たり前になりました。",
      "いちばん楽しいのは、誰かが仕事を進めるために頼っているソフトウェアを作ることです。社内ツールや外部連携、会社を実際に動かしている少しごちゃっとしたシステム。そういうものを速く、安定して、少し使いやすくするのが好きです。",
      "ドイツ北部で育ち、今は東京に住んでいます。コードを書いていないときは、たぶん日本語を勉強しているか、フライトシミュレーターで飛んでいるか、飛行機について調べています。",
    ],
  },
  writing: {
    label: "記事",
    title: "最近の記事",
    intro: "最近考えていること、学んでいること、作っているものについて書いています。",
    allWriting: "すべての記事",
  },
  timeline: {
    label: "経歴",
    title: "これまでの仕事",
    description:
      "仕事、個人プロジェクト、いくつかの資格を新しい順に並べています。マイコンから始まり、今はフルスタックのWebアプリを作っています。",
    newer: "新しい経歴を表示",
    older: "以前の経歴を表示",
    readMore: "担当したこと",
    present: "現在",
    now: "現在",
    alongside: "並行して",
    sendMessage: "メッセージを送る",
    kinds: { experience: "職歴", project: "プロジェクト", certificate: "資格" },
    impactLabel: "ハイライト",
    stops: localizedStops,
  },
  tools: {
    label: "ツール",
    title: "スターターデッキ",
    description:
      "よく使う8つの技術をトレーディングカードにしました。ロゴを並べるだけでは退屈だったので。レアリティは使う頻度で決めています。",
    deckLabel: "ヨシュアのデッキ · 2026",
    completeSet: "全8枚、どれもよく使うもの",
    rarityGuideLabel: "レアリティガイド",
    collectionLabel: "技術カード",
    editionLabel: "2026年版",
    traitsLabel: "カードのステータス",
    rarities: { Common: "コモン", Rare: "レア", Epic: "エピック", Legendary: "レジェンド" },
    rarityNotes: {
      Rare: "必要なときに",
      Epic: "ほぼ毎週",
      Legendary: "毎日",
    },
    items: localizedTools,
  },
  interests: {
    label: "仕事の外",
    title: "好きなこと",
    description: "コードを書いていないときは、たいていこのどれかのことを考えています。",
    items: [
      {
        ...en.interests.items[0],
        title: "日本",
        description:
          "最初は旅行先のひとつでしたが、訪れるたびに住みたい場所になっていき、今は実際に住んでいます。にぎやかな駅から2分歩くだけで静かな路地がある感じや、日常のちょっとしたところに込められた気配りが今でも好きです。眺めているだけでなく、ここでの生活にちゃんと参加できるように日本語を勉強しています。",
      },
      {
        ...en.interests.items[1],
        title: "航空",
        description:
          "長く続けている趣味です。Microsoft Flight Simulatorで過ごす時間が長く、飛行機についてよく調べています。客室レイアウトやエンジン音、A350がいちばん好きな理由なら、何時間でも話せます。",
      },
      {
        ...en.interests.items[2],
        title: "個人開発",
        description:
          "コードを書くのは仕事であり、趣味でもあります。個人プロジェクトはたいてい、車のアプリに欲しい機能がないといった妙に具体的な不満から始まり、Webアプリやモバイルアプリ、小さなツールになります。",
      },
    ],
    previous: "前の項目",
    next: "次の項目",
    regionLabel: "好きなこと",
  },
  flightRadar: {
    ...en.flightRadar,
    label: "旅",
    title: "窓側の席をお願いします。",
    description:
      "飛行機にはよく乗るので、すべてのフライトをFlightRadar24に記録しています。これまでの記録はこちらです。",
    imageAlt: "FlightRadar24のフライト統計",
    action: "フライト一覧を見る",
  },
  footer: {
    label: "連絡先",
    title: "話しませんか？",
    body:
      "どんなことでも、気軽にメッセージを送ってください。連絡をもらえるのはいつでもうれしいです。",
    contact: "連絡する",
    copyright: "すべての権利を保有します。",
    imprint: "法的情報",
  },
  contact: {
    metadataTitle: "連絡先",
    metadataDescription: "メール、LinkedIn、GitHub、InstagramからJoschua Haßに連絡できます。",
    label: "連絡先",
    titleLead: "気軽にどうぞ。",
    titleAccent: "必ず返信します。",
    intro:
      "プロジェクトのご相談、記事についての質問など、気軽にご連絡ください。メールがいちばん確実です。",
    directoryLabel: "連絡方法",
    directoryTitle: "使いやすいものをどうぞ。",
    emailLabel: "メール",
    emailTitle: "メールを送る",
    emailIntro: "プロジェクトのご相談や質問など、少し長くなりそうな話に向いています。",
    primaryChannel: "おすすめの連絡方法",
    copyEmail: "メールをコピー",
    copied: "コピーしました",
    copyFailed: "コピーできませんでした",
    socialsLabel: "SNS",
    proofLabel: "プロフィール",
    professionalProfile: "職歴",
    buildingInPublic: "コード",
    linkedinProof: "職歴と推薦",
    githubProof: "個人プロジェクトとオープンソース",
    personalLabel: "仕事以外",
    socials: {
      linkedin: "職歴と経験です。",
      github: "個人で作っているもの。",
      instagram: "だいたい飛行機と日本です。",
    },
    unavailable: "現在メールはご利用いただけません。LinkedInからご連絡ください。",
    note: "問い合わせフォームはありません。メッセージは私の受信箱に直接届きます。",
  },
  blog: {
    metadataTitle: "ブログ",
    metadataDescription:
      "Joschua Haßのブログ。最近考えていること、学んでいること、作っているものについて書いています。",
    label: "記事",
    title: "ブログ",
    intro: "最近考えていること、学んでいること、作っているものについて書いています。",
    rss: "RSSフィード",
    emptyLabel: "まだ記事はありません",
    emptyTitle: "最初の記事を準備中です。",
    emptyBody: "いま最初のいくつかの記事を書いています。それまでは、サイトのほかのページをご覧ください。",
    exploreWork: "経歴を見る",
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
    writtenBy: "書いた人",
    authorBio:
      "ドイツ北部出身、東京在住のソフトウェアエンジニアです。",
    getInTouch: "連絡する",
    share: "この記事をシェア",
    shareOn: (platform: string) => `${platform}でシェア`,
    shareByEmail: "メールでシェア",
    backToAll: "記事一覧に戻る",
  },
  imprint: {
    label: "法的情報",
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
