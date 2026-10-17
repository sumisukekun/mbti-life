# 結果ごとのOGP画像とシェア用ページを生成（16タイプ × 称号10種 = 160）
# 使い方: python3 tools/gen_og.py  （リポジトリ直下で実行）
import os, re, html, json
from PIL import Image, ImageDraw, ImageFont
BASE='https://mbti.businessmaker.net/'
src=open('index.html',encoding='utf-8').read()
TYPES=dict(re.findall(r"^([EI][SN][TF][JP]):\{n:'([^']+)'",src,re.M))
TITLES=json.loads(re.search(r"const TITLES=(\[.*?\]);",src).group(1))
F=lambda w,s: ImageFont.truetype(f'/usr/share/fonts/opentype/noto/NotoSansCJK-{w}.ttc',s,index=0)
P=(242,54,127);B=(45,87,240);INK=(26,29,58);PAPER=(237,239,245);CARD=(248,249,252);MUTED=(94,99,133);GOLD=(224,164,0)
GRPC={'nt':(45,87,240),'nf':(242,54,127),'sj':(31,157,107),'sp':(224,140,0)}
def grp(t): return ('nt' if t[2]=='T' else 'nf') if t[1]=='N' else ('sj' if t[3]=='J' else 'sp')
def fit(d,text,weight,size,maxw):
    while size>20 and d.textlength(text,font=F(weight,size))>maxw: size-=2
    return F(weight,size)
def card(t,ti,path):
    W,H=1200,630;im=Image.new('RGB',(W,H),PAPER);d=ImageDraw.Draw(im)
    for y in range(6,H,16):
        for x in range(6+((y//16)%2)*8,W,16): d.ellipse((x-2,y-2,x+2,y+2),fill=(205,214,245))
    acc=GRPC[grp(t)]
    d.rectangle((52,52,W-44,H-44),fill=acc);d.rectangle((40,40,W-56,H-56),fill=CARD,outline=INK,width=4)
    d.text((84,70),'わたしの一生、こうなった。',font=F('Bold',26),fill=MUTED)
    for dx,dy,c in [(7,7,(170,185,250)),(0,0,P)]: d.text((80+dx,96+dy),t,font=F('Black',150),fill=c)
    d.text((86,292),TYPES[t],font=F('Medium',30),fill=MUTED)
    q='「'+ti+'」';f=fit(d,q,'Black',76,W-170)
    for dx,dy,c in [(5,5,(250,170,200)),(0,0,INK)]: d.text((78+dx,352+dy),q,font=f,fill=c)
    st=Image.new('RGBA',(230,230),(0,0,0,0));sd=ImageDraw.Draw(st)
    sd.ellipse((10,10,220,220),outline=P,width=7)
    sd.text((115,88),'結果',font=F('Black',44),fill=P,anchor='mm');sd.text((115,148),'16分の1',font=F('Bold',30),fill=P,anchor='mm')
    st=st.rotate(10,resample=Image.BICUBIC);im.paste(st,(900,62),st)
    d.rectangle((40,H-110,W-56,H-56),fill=INK)
    d.text((68,H-101),'#16分の1の人生',font=F('Bold',28),fill=(255,255,255))
    d.text((W-84,H-101),'あなたのMBTIは、どんな一生？',font=F('Bold',28),fill=(255,255,255),anchor='ra')
    im.save(path,optimize=True)
PAGE='''<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{t}の一生は「{ti}」｜16分の1の人生</title>
<meta name="description" content="MBTIタイプで人生を早送り。あなたのMBTIは、どんな一生？">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{t}の一生は「{ti}」｜16分の1の人生">
<meta property="og:description" content="あなたのMBTIは、どんな一生？ いまの年齢から未来を早送り。">
<meta property="og:image" content="{img}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}の一生は「{ti}」｜16分の1の人生">
<meta name="twitter:description" content="あなたのMBTIは、どんな一生？ いまの年齢から未来を早送り。">
<meta name="twitter:image" content="{img}">
<script>location.replace('/'+location.search+location.hash)</script>
</head><body><p><a href="/">16分の1の人生をひらく</a></p></body></html>
'''
os.makedirs('og',exist_ok=True)
for t in TYPES:
    for i,ti in enumerate(TITLES):
        name=f'{t}-{i}'
        card(t,ti,f'og/{name}.png')
        os.makedirs(f'r/{name}',exist_ok=True)
        open(f'r/{name}/index.html','w',encoding='utf-8').write(PAGE.format(t=t,ti=html.escape(ti),url=f'{BASE}r/{name}/',img=f'{BASE}og/{name}.png'))
print(len(TYPES)*len(TITLES),'pages')
