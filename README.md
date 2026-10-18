# 83億分の1の人生 — World Edition

MBTIタイプと生きる国を選んで、ひとりの人生を最期まで早送りするブラウザゲーム。
16か国 × 10言語（日本語・English・한국어・繁體中文・Español・Français・Deutsch・Italiano・Português・Bahasa Indonesia）。

- プレイ: https://mbti.businessmaker.net/ （/en/ /ko/ /zh/ /es/ /fr/ /de/ /it/ /pt/ /id/ は各言語の入口）
- `index.html` … 画面の土台 / `style.css` … 見た目 / `app.js` … ゲーム本体 / `scene.js` … ドット絵の情景
- `i18n/*.js` … 言語辞書（ja が原本。キーをそろえて追加すれば言語を増やせる）
- `tools/gen_og.py` … 言語別のOGP画像（`og/`）とシェア用ページ（`r/`）を生成

## 広告・投げ銭
`app.js` の `TIP_URLS`（投げ銭URL）と `ADSENSE`（ca-pub と広告ユニットID）で設定します。
- 投げ銭：日本語 = OFUSE（https://ofuse.me/5598eedc）、その他の言語 = Ko-fi（https://ko-fi.com/businessmaker）
- 広告：AdSense ユニット `mbti-life-display`（4533542225）。ホーム・結果・シェア閲覧画面のみ表示、未配信時は枠ごと非表示
- ads.txt：このリポジトリ直下と businessmaker.net 直下の両方に設置
- EU/英国向け同意メッセージ：AdSense「プライバシーとメッセージ」で公開済み（英・独・仏・西・伊・葡）

## 公開方法（GitHub Pages）
Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)`

※ 診断と人生のできごとはエンタメ用のフィクションです。
© BusinessMaker

## v83
ランダム即時開始、日本時間の日替わり共通チャレンジ、端末内の24件人生履歴、共有URL修正を追加。83億は世界観を表すタイトルであり人口比や組み合わせ数の保証ではありません。

## v84：Xへの画像付き投稿
結果の「Xに画像付きで投稿」から共有画面を開きます。PCは結果画像をコピーし、Xの投稿画面でCtrl+V（Macは⌘+V）。コピー未対応・拒否時は画像を保存して写真ボタンで添付します。対応端末では既存の画像共有も利用できます。実際の投稿は利用者が画像を確認して行います。

`share/<lang>/` は静的なカード用メタデータを持ち、結果パラメータを保持してゲームへ転送します。リンクプレビューはブランド共通画像、コピー・保存する画像は各プレイの年齢・称号・評価を含む結果画像です。X側のプレビュー表示は制御できません。

検証：`node tests/share.test.cjs`（画像コピー成功・拒否・未対応・準備中、共有URLの結果復元、10言語の転送）。
