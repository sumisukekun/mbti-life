# 16分の1の人生 — World Edition

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
