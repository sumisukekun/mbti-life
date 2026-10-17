# OGP画像とシェア用ページを言語ごとに生成する
#   python3 tools/gen_og.py   （リポジトリ直下で実行）
# 出力:
#   ja : r/TYPE-i/index.html, og/TYPE-i.png, ogp.png
#   他 : r/<lang>/TYPE-i/index.html, og/<lang>/TYPE-i.png, ogp_<lang>.png, <lang>/index.html
import os, re, json, html
from PIL import Image, ImageDraw, ImageFont

BASE = 'https://mbti.businessmaker.net/'
LANGS = ['ja', 'en', 'ko', 'zh', 'es', 'fr', 'de', 'it', 'pt', 'id']
FONT_INDEX = {'ja': 0, 'en': 0, 'es': 0, 'fr': 0, 'de': 0, 'it': 0, 'pt': 0, 'id': 0, 'ko': 1, 'zh': 3}
OG_LOCALE = {'ja': 'ja_JP', 'en': 'en_US', 'ko': 'ko_KR', 'zh': 'zh_TW', 'es': 'es_ES', 'fr': 'fr_FR', 'de': 'de_DE', 'it': 'it_IT', 'pt': 'pt_BR', 'id': 'id_ID'}
HTML_LANG = {'ja': 'ja', 'en': 'en', 'ko': 'ko', 'zh': 'zh-Hant-TW', 'es': 'es', 'fr': 'fr', 'de': 'de', 'it': 'it', 'pt': 'pt-BR', 'id': 'id'}
TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP']

def load(lang):
    t = open(f'i18n/{lang}.js', encoding='utf-8').read()
    return json.loads(t[t.index('{'):t.rindex('}') + 1])

D = {l: load(l) for l in LANGS}
P = (242, 54, 127); INK = (26, 29, 58); PAPER = (237, 239, 245); CARD = (248, 249, 252); MUTED = (94, 99, 133)
GRPC = {'nt': (45, 87, 240), 'nf': (242, 54, 127), 'sj': (31, 157, 107), 'sp': (224, 140, 0)}

def grp(t): return ('nt' if t[2] == 'T' else 'nf') if t[1] == 'N' else ('sj' if t[3] == 'J' else 'sp')
def strip(s): return re.sub(r'<[^>]+>', '', s)
def quote(lang, s): return f'「{s}」' if lang in ('ja', 'zh') else f'„{s}“' if lang == 'de' else f'« {s} »' if lang == 'fr' else f'“{s}”'

def F(lang, w, size):
    return ImageFont.truetype(f'/usr/share/fonts/opentype/noto/NotoSansCJK-{w}.ttc', size, index=FONT_INDEX[lang])

def fit(d, text, lang, w, size, maxw, minsize=22):
    while size > minsize and d.textlength(text, font=F(lang, w, size)) > maxw: size -= 2
    return F(lang, w, size)

def dots(d, W, H):
    for y in range(6, H, 16):
        for x in range(6 + ((y // 16) % 2) * 8, W, 16): d.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(205, 214, 245))

def flag(im, cc, x, y, w=60, h=40):
    d = ImageDraw.Draw(im)
    if cc == 'jp':
        d.rectangle((x, y, x + w, y + h), fill='white'); r = h * .3; d.ellipse((x + w/2 - r, y + h/2 - r, x + w/2 + r, y + h/2 + r), fill=(188, 0, 45))
    elif cc == 'us':
        for i in range(13): d.rectangle((x, y + i*h/13, x + w, y + (i+1)*h/13), fill=(178, 34, 52) if i % 2 == 0 else 'white')
        d.rectangle((x, y, x + w*.4, y + h*.54), fill=(60, 59, 110))
    elif cc == 'uk':
        d.rectangle((x, y, x + w, y + h), fill=(1, 33, 105))
        d.line((x, y, x + w, y + h), fill='white', width=8); d.line((x + w, y, x, y + h), fill='white', width=8)
        d.line((x, y, x + w, y + h), fill=(200, 16, 46), width=3); d.line((x + w, y, x, y + h), fill=(200, 16, 46), width=3)
        d.rectangle((x + w/2 - 6, y, x + w/2 + 6, y + h), fill='white'); d.rectangle((x, y + h/2 - 6, x + w, y + h/2 + 6), fill='white')
        d.rectangle((x + w/2 - 3, y, x + w/2 + 3, y + h), fill=(200, 16, 46)); d.rectangle((x, y + h/2 - 3, x + w, y + h/2 + 3), fill=(200, 16, 46))
    elif cc == 'kr':
        d.rectangle((x, y, x + w, y + h), fill='white'); r = h * .25; cx, cy = x + w/2, y + h/2
        d.pieslice((cx - r, cy - r, cx + r, cy + r), 180, 360, fill=(205, 46, 58)); d.pieslice((cx - r, cy - r, cx + r, cy + r), 0, 180, fill=(0, 71, 160))
        for dx, dy in [(-1, -1), (1, 1), (1, -1), (-1, 1)]: d.rectangle((cx + dx*w*.33 - 4, cy + dy*h*.3 - 4, cx + dx*w*.33 + 4, cy + dy*h*.3 + 4), fill='black')
    elif cc == 'tw':
        d.rectangle((x, y, x + w, y + h), fill=(254, 0, 0)); d.rectangle((x, y, x + w/2, y + h/2), fill=(0, 0, 149))
        r = h * .13; d.ellipse((x + w/4 - r, y + h/4 - r, x + w/4 + r, y + h/4 + r), fill='white')
    elif cc == 'es':
        d.rectangle((x, y, x + w, y + h), fill=(170, 21, 27)); d.rectangle((x, y + h/4, x + w, y + h*3/4), fill=(241, 191, 0))
    elif cc == 'mx':
        d.rectangle((x, y, x + w/3, y + h), fill=(0, 104, 71)); d.rectangle((x + w/3, y, x + 2*w/3, y + h), fill='white'); d.rectangle((x + 2*w/3, y, x + w, y + h), fill=(206, 17, 38))
        r = h * .12; d.ellipse((x + w/2 - r, y + h/2 - r, x + w/2 + r, y + h/2 + r), fill=(140, 107, 42))
    elif cc in ('fr', 'it'):
        cols = [(0, 35, 149), 'white', (237, 41, 57)] if cc == 'fr' else [(0, 146, 70), 'white', (206, 43, 55)]
        for k, c in enumerate(cols): d.rectangle((x + k*w/3, y, x + (k+1)*w/3, y + h), fill=c)
    elif cc == 'de':
        for k, c in enumerate(['black', (221, 0, 0), (255, 206, 0)]): d.rectangle((x, y + k*h/3, x + w, y + (k+1)*h/3), fill=c)
    elif cc == 'br':
        d.rectangle((x, y, x + w, y + h), fill=(0, 156, 59)); d.polygon([(x + w/2, y + 4), (x + w - 5, y + h/2), (x + w/2, y + h - 4), (x + 5, y + h/2)], fill=(255, 223, 0))
        r = h * .21; d.ellipse((x + w/2 - r, y + h/2 - r, x + w/2 + r, y + h/2 + r), fill=(0, 39, 118))
    elif cc == 'id':
        d.rectangle((x, y, x + w, y + h/2), fill=(206, 17, 38)); d.rectangle((x, y + h/2, x + w, y + h), fill='white')
    elif cc == 'ph':
        d.rectangle((x, y, x + w, y + h/2), fill=(0, 56, 168)); d.rectangle((x, y + h/2, x + w, y + h), fill=(206, 17, 38)); d.polygon([(x, y), (x + w*.45, y + h/2), (x, y + h)], fill='white')
        r = h * .09; d.ellipse((x + w*.15 - r, y + h/2 - r, x + w*.15 + r, y + h/2 + r), fill=(252, 209, 22))
    elif cc == 'au':
        d.rectangle((x, y, x + w, y + h), fill=(0, 0, 139)); d.rectangle((x, y, x + w/2, y + h/2), fill=(1, 33, 105))
        d.line((x, y, x + w/2, y + h/2), fill='white', width=4); d.line((x + w/2, y, x, y + h/2), fill='white', width=4)
        d.rectangle((x + w/4 - 3, y, x + w/4 + 3, y + h/2), fill=(200, 16, 46)); d.rectangle((x, y + h/4 - 3, x + w/2, y + h/4 + 3), fill=(200, 16, 46))
        for sx, sy in [(.25, .75), (.75, .25), (.85, .5), (.68, .6), (.75, .82)]: d.ellipse((x + sx*w - 2, y + sy*h - 2, x + sx*w + 2, y + sy*h + 2), fill='white')
    elif cc == 'ca':
        d.rectangle((x, y, x + w, y + h), fill='white'); d.rectangle((x, y, x + w/4, y + h), fill=(213, 43, 30)); d.rectangle((x + 3*w/4, y, x + w, y + h), fill=(213, 43, 30))
        d.polygon([(x + w/2, y + 6), (x + w/2 + 8, y + h/2), (x + w/2, y + h - 8), (x + w/2 - 8, y + h/2)], fill=(213, 43, 30))
    elif cc == 'in':
        for k, c in enumerate([(255, 153, 51), 'white', (19, 136, 8)]): d.rectangle((x, y + k*h/3, x + w, y + (k+1)*h/3), fill=c)
        r = h * .13; d.ellipse((x + w/2 - r, y + h/2 - r, x + w/2 + r, y + h/2 + r), outline=(0, 0, 128), width=2)
    d.rectangle((x, y, x + w, y + h), outline=(200, 205, 220), width=1)

def frame(acc):
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), PAPER); d = ImageDraw.Draw(im); dots(d, W, H)
    d.rectangle((52, 52, W - 44, H - 44), fill=acc); d.rectangle((40, 40, W - 56, H - 56), fill=CARD, outline=INK, width=4)
    return im, d

def footer(im, d, lang, L):
    W, H = im.size
    d.rectangle((40, H - 110, W - 56, H - 56), fill=INK)
    d.text((68, H - 101), L['cv.hash'], font=fit(d, L['cv.hash'], lang, 'Bold', 28, 420), fill='white')
    d.text((W - 84, H - 101), L['cv.foot'], font=fit(d, L['cv.foot'], lang, 'Bold', 28, 600), fill='white', anchor='ra')

def stamp(im, lang, top, bottom, acc=P):
    st = Image.new('RGBA', (230, 230), (0, 0, 0, 0)); sd = ImageDraw.Draw(st)
    sd.ellipse((10, 10, 220, 220), outline=acc, width=7)
    sd.text((115, 88), top, font=fit(sd, top, lang, 'Black', 44, 170, 20), fill=acc, anchor='mm')
    sd.text((115, 148), bottom, font=fit(sd, bottom, lang, 'Bold', 30, 170, 16), fill=acc, anchor='mm')
    st = st.rotate(10, resample=Image.BICUBIC); im.paste(st, (900, 62), st)

def result_card(lang, t, i, path):
    L = D[lang]; im, d = frame(GRPC[grp(t)])
    d.text((84, 70), L['og.top'], font=fit(d, L['og.top'], lang, 'Bold', 26, 760), fill=MUTED)
    for dx, dy, c in [(7, 7, (170, 185, 250)), (0, 0, P)]: d.text((80 + dx, 96 + dy), t, font=F(lang, 'Black', 150), fill=c)
    d.text((86, 292), L[f'type.{t}.n'], font=fit(d, L[f'type.{t}.n'], lang, 'Medium', 30, 760), fill=MUTED)
    q = quote(lang, L[f'title.{i}']); f = fit(d, q, lang, 'Black', 72, 1030, 30)
    for dx, dy, c in [(5, 5, (250, 170, 200)), (0, 0, INK)]: d.text((78 + dx, 360 + dy), q, font=f, fill=c)
    stamp(im, lang, L['og.stamp'], strip(L['brand.short']))
    footer(im, d, lang, L)
    im.convert('P', palette=Image.ADAPTIVE, colors=64).save(path, optimize=True)

def main_card(lang, path):
    L = D[lang]; im, d = frame((45, 87, 240))
    d.text((84, 70), 'MBTI LIFE SIMULATOR · WORLD EDITION', font=F('en', 'Bold', 24), fill=MUTED)
    b = strip(L['brand']); f = fit(d, b, lang, 'Black', 108, 760, 40)
    for dx, dy, c in [(6, 6, (150, 170, 250)), (0, 0, INK)]: d.text((80 + dx, 110 + dy), b, font=f, fill=c)
    sub = L['hero.stat']; d.text((84, 270), sub, font=fit(d, sub, lang, 'Bold', 34, 1040), fill=P)
    for k, cc in enumerate(['jp', 'kr', 'tw', 'id', 'ph', 'in', 'uk', 'fr', 'de', 'it', 'es', 'us', 'ca', 'mx', 'br', 'au']): flag(im, cc, 84 + k * 62, 344, 50, 34)
    x = 84
    for t in ['INTJ', 'ENFP', 'ISFJ', 'ESTP', 'INFP', 'ENTJ']:
        tw = d.textlength(t, font=F('en', 'Bold', 26)) + 30
        d.rounded_rectangle((x, 420, x + tw, 464), radius=22, outline=INK, width=2, fill=PAPER); d.text((x + 15, 424), t, font=F('en', 'Bold', 26), fill=INK); x += tw + 10
    d.text((x + 6, 426), '… 16 types', font=F('en', 'Medium', 24), fill=MUTED)
    stamp(im, lang, L['cv.age'], '??')
    footer(im, d, lang, L)
    im.convert('P', palette=Image.ADAPTIVE, colors=96).save(path, optimize=True)

PAGE = '''<!doctype html>
<html lang="{hl}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{img}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="{loc}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{img}">
<script>location.replace('/?'+(location.search?location.search.slice(1)+'&':'')+'lang={lang}'+location.hash)</script>
</head><body><p><a href="/?lang={lang}">{brand}</a></p></body></html>
'''

for lang in LANGS:
    L = D[lang]; pre = '' if lang == 'ja' else lang + '/'
    os.makedirs('og/' + pre, exist_ok=True)
    for t in TYPES:
        for i in range(10):
            name = f'{t}-{i}'
            result_card(lang, t, i, f'og/{pre}{name}.png')
            os.makedirs(f'r/{pre}{name}', exist_ok=True)
            ti = L['og.title'].replace('{type}', t).replace('{title}', L[f'title.{i}'])
            open(f'r/{pre}{name}/index.html', 'w', encoding='utf-8').write(PAGE.format(
                hl=HTML_LANG[lang], title=html.escape(ti), desc=html.escape(L['og.desc']), url=f'{BASE}r/{pre}{name}/',
                img=f'{BASE}og/{pre}{name}.png', loc=OG_LOCALE[lang], lang=lang, brand=html.escape(strip(L['brand']))))
    main = 'ogp.png' if lang == 'ja' else f'ogp_{lang}.png'
    main_card(lang, main)
    if lang != 'ja':
        os.makedirs(lang, exist_ok=True)
        open(f'{lang}/index.html', 'w', encoding='utf-8').write(PAGE.format(
            hl=HTML_LANG[lang], title=html.escape(L['meta.title']), desc=html.escape(L['meta.desc']), url=f'{BASE}{lang}/',
            img=f'{BASE}{main}', loc=OG_LOCALE[lang], lang=lang, brand=html.escape(strip(L['brand']))))
    print(lang, 'done')
