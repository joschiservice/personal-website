import type { CareerMilestone } from "@/app/data/timelineSection";
import type { Dictionary } from "@/app/i18n/getDictionary";
import en from "./en";

type MilestoneTranslation = Pick<CareerMilestone, "title" | "subTitle" | "summary"> &
  Partial<Pick<CareerMilestone, "organization" | "attachedLabel" | "impact" | "tasks" | "skills">>;

const milestoneTranslations: Record<string, MilestoneTranslation> = {
  "independent-products": {
    title: "独立ソフトウェアエンジニア",
    organization: "個人プロジェクト・ドイツ、日本",
    subTitle: "独立",
    summary:
      "Elektrohubの後は、自分のプロダクト作りに時間を使い、4か月間日本で日本語を勉強しました。\n\nまったく違う2つの課題に取り組みました。介護チームのシフト作成と、Eコマースの日々の業務の連携です。どちらも、設計やバックエンドからUI、自動化、デプロイまで一人で作りました。",
    attachedLabel: "主なプロジェクト",
  },
  elektrohub: {
    title: "フルスタックエンジニア",
    subTitle: "正社員",
    summary:
      "Elektrohubでただ一人のエンジニアでした。オンラインショップと日々の業務を支えるプラットフォームを作り直し、その周りのこともすべて担当しました。何が必要かを聞き出すところから、設計、外部連携、リリース、本番環境を健全に保つことまでです。",
    impact: [
      { label: "連携したシステム", value: "4つ＋自社B2Bショップ" },
      { label: "処理した注文", value: "10,000件以上" },
      { label: "一番遅かった処理", value: "10分以上 → 10秒未満" },
    ],
    tasks: [
      "保守、テスト、監視、拡張をしやすくするため、中核プラットフォームをLaravel・Vue.jsからNestJS、Next.js、TypeScript、PostgreSQLへ作り直しました",
      "4つの外部システム（Galaxus、JTL Wawi、JTL Fulfillment Network、Shopify）と自社のB2Bショップをつなぐコネクターの仕組みを設計しました",
      "20人以上が使うB2Bショップを、すばやい検索と注文を中心にした高速なReactアプリに作り直しました",
      "重要なワークフローやデータベース処理を平均で約80%高速化しました",
      "プラットフォームの改善、分析ダッシュボード、自動テスト、日々の運用によって、10,000件以上の注文を滞りなく処理しました",
      "インフラと本番運用を担当しました。Docker、GitHub Actions、DigitalOcean、Vercel、PostgreSQL、Sentry、バックアップ、リリース、ときどき障害対応も",
      "従業員、経営陣、B2B顧客と直接話し、次に作るものを決めました",
      "Shopifyのブログ記事の下書きを手伝う社内LLMツールを作り、Symfony、PHP、Vue.jsでのクライアント案件も担当しました",
    ],
  },
  nistech: {
    title: "ソフトウェア開発の職業訓練生",
    subTitle: "職業訓練（Ausbildung）",
    summary:
      "Qualli.lifeという長く続くC#のデスクトップ製品で仕事を覚えました。古いコードを新しくし、本番の不具合を直し、新機能をリリースしました。IHKの修了課題では、連絡先モジュールの土台を作り直し、データアクセスを整理してUIの応答性を高めました。",
    impact: [
      { label: "期間", value: "3年 → 2.5年" },
      { label: "IHK評価", value: "83点（良）" },
    ],
    tasks: [
      "C#、.NET Framework、WPF、XAML、MVVM、Entity Frameworkでアプリの一部を刷新しました",
      "Visual BasicのコードをC#に移行し、あわせてUIも改善しました",
      "文書・印刷テンプレートのプレースホルダー向けに、IntelliSense風の自動補完とシンタックスハイライトを作りました",
      "別の医療データモジュールや、大規模で成熟したコードベースのデータベース処理にも携わりました",
      "IHKの修了課題として、連絡先モジュールの土台を設計し直しました。非同期読み込み、権限、印刷、複数ユーザー、データアクセスの一元化を含みます",
      "データベース処理を見直し、クエリの回数を減らして不要な書き込みをなくしました",
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
    title: "ShiftIQ",
    subTitle: "勤務スケジューリング",
    summary:
      "介護サービス向けのシフト作成プラットフォームを開発しました。制約最適化を使い、スタッフの都合、雇用契約、希望、現場の要件を考慮します。パイロット導入の直前まで進みましたが、導入先が既存ベンダーと契約していたため、展開は見送りました。",
    tasks: [
      "介護サービス管理者の実際のシフト作成の流れを、現場の考え方に合った要件とワークフローに落とし込みました",
      "スタッフ、雇用契約、欠勤、休暇、希望、必要人数、通知、印刷、シフト確認の機能を作りました",
      "設定可能なルールとスタッフの希望を扱う、Python、FastAPI、OR-Tools製の独立したソルバーを書きました",
      "お客さんが既存ベンダーとの契約に縛られていると、良いプロダクトだけでは足りないことを学びました",
    ],
  },
  luma: {
    title: "Luma",
    subTitle: "コマース業務",
    summary:
      "Eコマース業務のための統合ワークスペースを作りました。注文、在庫、フルフィルメント、仕入れを、設定可能なワークフローでつなぎます。システム設計、ワークフロー実行、外部連携の設計に注力しました。",
    tasks: [
      "React製のWebアプリ、API、バックグラウンドワーカー、PostgreSQLからなるTypeScriptのモジュラーモノリスとして、プロダクトを設計・開発しました",
      "Shopify、JTL、Cin7、Starshipit、Gmailのコネクターを作り、それぞれのデータを注文、在庫、フルフィルメント、返品の共通モデルにまとめました",
      "Temporal上にワークフローエンジンを作りました。ワークフローはバージョン管理され、TypeScriptのステップはWebAssemblyのサンドボックスで動きます",
      "外部システムへの変更はすべてポリシーチェックと承認を通し、監査ログを残して、変更が実際に反映されたかも別途確認するようにしました",
      "PostgreSQLの行レベルセキュリティとテナント単位のデータアクセスで、顧客データを分離しました",
      "ShopifyとJTLのシミュレーターを作り、実際のアカウントなしで一連の流れをテストできるようにしました",
      "デリバリー周りも整えました。AWSのInfrastructure as Code、CIの品質ゲート、E2Eテストとブラウザテスト、負荷テストです",
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
    flavor: "型システムのあるJavaScript。ユーザーより先に、あなたのミスを指摘してくれます。",
    stats: [
      { label: "登場", value: "2012" },
      { label: "設計者", value: "C#の生みの親" },
      { label: "Go版", value: "10倍高速" },
    ],
  },
  "Node.js": {
    title: "機関室",
    flavor: "ブラウザを飛び出したJavaScript。今ではサーバーやスクリプト、ビルドツールの半分を動かしています。",
    stats: [
      { label: "登場", value: "2009" },
      { label: "エンジン", value: "ChromeのV8" },
      { label: "JSの実行", value: "1スレッド" },
    ],
  },
  "Next.js": {
    title: "本拠地",
    flavor: "ルーティング、レンダリング、バンドルを整えてくれるReactフレームワーク。あとは何をキャッシュするか悩むだけです。",
    stats: [
      { label: "登場", value: "2016" },
      { label: "ルート", value: "フォルダ" },
      { label: "バンドラー", value: "Rust製" },
    ],
  },
  React: {
    title: "UI使い",
    flavor: "小さなコンポーネントでUIを組み立てるライブラリ。見た目を書けば、何を変えるかは任せられます。",
    stats: [
      { label: "登場", value: "2013" },
      { label: "誕生", value: "Facebook" },
      { label: "モバイル", value: "React Native" },
    ],
  },
  NestJS: {
    title: "バックエンド設計士",
    flavor: "モジュールと依存性注入を持ち込むNode.jsフレームワーク。放っておくと荒れるバックエンドに効きます。",
    stats: [
      { label: "登場", value: "2017" },
      { label: "影響元", value: "Angular" },
      { label: "土台", value: "Express" },
    ],
  },
  PostgreSQL: {
    title: "データの番人",
    flavor: "Webより古いのに、毎年新しい技を覚えるリレーショナルデータベース。",
    stats: [
      { label: "登場", value: "1986" },
      { label: "誕生", value: "UCバークレー" },
      { label: "マスコット", value: "Slonik" },
    ],
  },
  Docker: {
    title: "輸送コンテナ",
    flavor: "アプリと必要なものをコンテナに詰めて、「自分の環境では動く」論争をほぼ終わらせます。",
    stats: [
      { label: "登場", value: "2013" },
      { label: "初披露", value: "5分のトーク" },
      { label: "マスコット", value: "Moby Dock" },
    ],
  },
  Sentry: {
    title: "バグレーダー",
    flavor: "本番のクラッシュを整ったスタックトレースに変えるエラー監視。悪い知らせも、きれいに整理。",
    stats: [
      { label: "登場", value: "2008" },
      { label: "始まり", value: "Djangoアプリ" },
      { label: "置き換えた", value: "エラーメール" },
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
      "ミュンヘン在住のソフトウェアエンジニア、ヨシュア・ハスのサイト。TypeScript、React、Next.js、NestJS、PostgreSQLでWebアプリを作っています。",
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
    label: "ミュンヘン在住",
    headlineLead: "こんにちは、ヨシュアです。",
    headlineName: "ヨシュア",
    headlineNicknames: [],
    headlineAccent: "フルスタックエンジニア、ときどきモノづくりオタク。",
    description:
      "主にTypeScriptで、企業が頼れるWebアプリを作っています。仕事の外では、モノを分解したり、エンジニアリングの動画にハマったり、ときどき旅に出て頭をリセットしたりしています。",
    descriptionHighlight: "TypeScript",
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
      { label: "経験", value: "5年（短縮した2年半の職業訓練を含む）" },
      { label: "言語", value: "ドイツ語（母語）、英語（流暢）、日本語（N5）" },
      {
        label: "コーヒーか紅茶か",
        value: "コーヒー。でも日本に行ってから、お茶も少し好きになりました",
        icon: "coffee",
      },
      {
        label: "YouTubeの沼",
        value: "BPS.spaceのロケット",
        href: "https://www.youtube.com/@BPSspace",
        icon: "rocket",
      },
    ],
    paragraphs: [
      "15歳でプログラミングを始めました。最初のプロジェクトのひとつは、友人たちとEuro Truck Simulator 2で運営していたバーチャル運送会社の管理ツールです。使っていたツールが終了したので、自分で作りました。自分が作ったものを初めて人に使ってもらい、役に立っているのを見られたことは、今でもこの仕事でいちばん好きなところです。",
      "今は主にNext.jsとReactでWebアプリを作り、裏側はNestJSとPostgreSQLです。ここ数年はEコマース企業でただ一人のエンジニアだったので、何が本当に必要かを聞き出すところから、本番で問題が起きたときの素早い対応まで、すべて担当していました。",
      "いちばん楽しいのは、人の毎日の仕事を楽にするソフトウェアです。ばらばらのシステムや外部連携を一か所にまとめることが多いです。設計の判断には時間をかけます。あとになっても自信を持てるようにするためです。",
      "ドイツ北部で育ち、東京での4か月を除いて、今はミュンヘンに住んでいます。個人プロジェクトは、電気自動車のためのより良いアプリや、車に組み込んだ自作のライティングシステムのように、いじることから生まれます。",
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
    kinds: { experience: "職歴", project: "プロジェクト", certificate: "資格" },
    impactLabel: "ハイライト",
    stops: localizedStops,
  },
  tools: {
    label: "ツール",
    title: "スターターデッキ",
    description:
      "よく使う8つの技術をトレーディングカードにしました。ロゴを並べるだけでは退屈だったので。",
    rarityGuideLabel: "レアリティガイド",
    collectionLabel: "技術カード",
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
        title: "モノを分解すること",
        description:
          "たいていのプロジェクトは、気になることから始まります。電気自動車に欲しい機能がなかったので、もっと良いアプリを作り、独自のライトシステムも組み込みました。",
      },
      {
        ...en.interests.items[1],
        title: "エンジニアリング沼",
        description:
          "Linus Tech Tips、BPS.space、Rich Rebuilds、Real Engineering、Billy Ellisで、一晩くらいは平気で溶かせます。ロケット、EV修理、iPhoneの脆弱性。テーマは何でもいいんです。",
        videos: [
          { ...en.interests.items[1].videos[0], topic: "モデルロケットの着陸" },
          { ...en.interests.items[1].videos[1], topic: "事故EVの復活" },
          { ...en.interests.items[1].videos[2], topic: "モノの作られ方" },
        ],
      },
      {
        ...en.interests.items[2],
        title: "旅に出ること",
        description:
          "ときどき旅に出て頭をリセットします。日本は旅行先から東京での4か月になり、今も日本語を勉強しています。",
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
      "すべてのフライトを記録していて、できるだけ窓側を選びます。好きな機体はA350で、飛べないときはMicrosoft Flight Simulatorです。",
    action: "フライト一覧を見る",
    mapLabel: "ダブリンから仙台まで、28の空港の間を飛んだ路線の地図です。",
    passLabel: "搭乗券",
    aroundTheEarth: "地球一周",
    flightsLabel: "フライト",
    distanceLabel: "距離",
    hoursLabel: "飛行時間",
    airportsLabel: "空港",
    windowSeatsLabel: "窓側の席",
    mostFlownLabel: "最多路線",
    flightSingular: "便",
    flightPlural: "便",
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
      "ドイツ北部出身、ミュンヘン在住のソフトウェアエンジニアです。",
    getInTouch: "連絡する",
    share: "この記事をシェア",
    shareOn: (platform: string) => `${platform}でシェア`,
    shareByEmail: "メールでシェア",
    backToAll: "記事一覧に戻る",
  },
  notFound: {
    label: "404",
    title: "このページは存在しません。",
    action: "ホームに戻る",
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
