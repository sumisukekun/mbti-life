# 恋のつづき · v1

Standalone original romance-personality / branching life game at https://mbti.businessmaker.net/love/ . Existing MBTI app files are unchanged.

- 12 original questions, two per each of six axes; 16 original animal characters × four relationship styles = 64 types. Tied axes choose the first side, visibly disclosed.
- 9 deliberate decisions from age 16 through 65, with explicit ages, type-specific starting state and reactions, route-based feedback and 6 attainable endings.
- Back/branch, replay same type, gallery preview, browser-local resume; no identifying profile inputs.
- Canvas 1080×1350 personal result card, image download/native share, X/LINE prefilled links, exact friend-result reconstruction from validated type + nine fictional decisions.
- No analytics or ad scripts on this separate app. Shares reveal fictional decisions; privacy page explains it. No social messages are sent automatically.
- Original fiction, independent of LoveChara/Love Character 64 and MBTI. Does not import or claim compatibility with their type codes. Not a personality test validated by research or a prediction of real futures.

Run from repository root: node tests/love.test.cjs . Checks 4096 answer combinations, all 64 types, all 19683 paths for a sample type and all six endings, corrupted saves, and full UI flow via VM. Browser QA checks real rendering/canvas/links after deployment. Includes responsive CSS for 760px/360px widths; no claim of physical-device tests.

Hero artwork generated for this game: assets/hero-v1.jpg. OpenGraph cover is generated deterministically by tools/gen_love_cover.cjs from the same hero and a locally available Japanese font (LIFE_CARD_FONT).
