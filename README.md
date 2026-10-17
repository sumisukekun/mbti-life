# 16分の1の人生 — World Edition

MBTIタイプと生きる国を選んで、ひとりの人生を最期まで早送りするブラウザゲーム。
16か国 × 10言語（日本語・English・한국어・繁體中文・Español・Français・Deutsch・Italiano・Português・Bahasa Indonesia）。

- プレイ: https://mbti.businessmaker.net/ （/en/ /ko/ /zh/ /es/ /fr/ /de/ /it/ /pt/ /id/ は各言語の入口）
- `index.html` … 画面の土台 / `style.css` … 見た目 / `app.js` … ゲーム本体 / `scene.js` … ドット絵の情景
- `i18n/*.js` … 言語辞書（ja が原本。キーをそろえて追加すれば言語を増やせる）
- `tools/gen_og.py` … 言語別のOGP画像（`og/`）とシェア用ページ（`r/`）を生成

## 広告・投げ銭
`app.js` の先頭近くにある `TIP_URLS`（投げ銭URL）と `ADSENSE`（ca-pub と広告ユニットID）を入れると表示されます。AdSense 利用時はリポジトリ直下に `ads.txt` を置きます。

## 公開方法（GitHub Pages）
Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)`

※ 診断と人生のできごとはエンタメ用のフィクションです。
© BusinessMaker
