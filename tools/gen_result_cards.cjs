/* Rebuild the 10 shared link cards and 100 localized landing pages.
   npm install @napi-rs/canvas; LIFE_CARD_FONT=/path/to/Japanese-font.ttf node tools/gen_result_cards.cjs */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createCanvas,GlobalFonts}=require('@napi-rs/canvas');
process.chdir(path.resolve(__dirname,'..'));
if(!process.env.LIFE_CARD_FONT)throw Error('Set LIFE_CARD_FONT to a Japanese font file');
GlobalFonts.registerFromPath(process.env.LIFE_CARD_FONT,'CardFont');
require('../result-card.js');
const langs=['ja','en','ko','zh','es','fr','de','it','pt','id'];const ctx={I18N:{}};vm.createContext(ctx);for(const l of langs)vm.runInContext(fs.readFileSync('i18n/'+l+'.js','utf8'),ctx);
fs.mkdirSync('share/cards',{recursive:true});
const summaries=['会社を育てる挑戦が、ひとつの人生の物語に。','家族との出会いと時間が、ひとつの人生の物語に。','移り変わる時代を生きた、ひとつの人生の物語。','旅先での出会いと選択が、ひとつの人生の物語に。','積み重ねた仕事と選択が、ひとつの人生の物語に。','人とのつながりを育んだ、ひとつの人生の物語。','日々の積み重ねが実った、ひとつの人生の物語。','小さな喜びを集めた、ひとつの人生の物語。','思いどおりにいかない日も挑み続けた、ひとつの人生の物語。','何気ない毎日を重ねた、ひとつの人生の物語。'];
for(let theme=0;theme<10;theme++){
 const c=createCanvas(LifeResultCard.width,LifeResultCard.height);
 LifeResultCard.draw(c.getContext('2d'),{lang:'ja',font:'CardFont',theme,seed:theme,brand:ctx.I18N.ja.brand,type:'LIFE',static:true,title:ctx.I18N.ja['title.'+theme],summary:summaries[theme],keywords:['人生の選択','もうひとつの人生']});
 fs.writeFileSync('share/cards/life-'+theme+'-v91.png',c.toBuffer('image/png'));
 for(const l of langs){
  const D=ctx.I18N[l],title=D['title.'+theme]+' | '+D.brand;const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let h=fs.readFileSync('share/'+l+'/index.html','utf8');
  h=h.replace(/<title>.*?<\/title>/,'<title>'+escape(title)+'</title>').replace(/(property="og:title" content=")[^"]*/,'$1'+escape(title)).replace(/(name="twitter:title" content=")[^"]*/,'$1'+escape(title));
  h=h.replace(/https:\/\/mbti\.businessmaker\.net\/share-preview-v(?:84\.png|89\.jpg)/g,'https://mbti.businessmaker.net/share/cards/life-'+theme+'-v91.png').replace('content="https://mbti.businessmaker.net/share/'+l+'/"','content="https://mbti.businessmaker.net/share/'+l+'/'+theme+'/"');
  h=h.replace(/(property="og:image:height" content=")\d+/,'$1'+900).replace(/(property="og:image:width" content=")\d+/,'$1'+1600).replace('One in 8.3 Billion — Life Simulator','One in 8.3 Billion — '+['Business','Family','Long life','Traveler','Career','Love','Wealth','Little joys','Challenge','Ordinary days'][theme]);
  fs.mkdirSync('share/'+l+'/'+theme,{recursive:true});fs.writeFileSync('share/'+l+'/'+theme+'/index.html',h);
 }
}
console.log('Generated 10 illustrated link images and 100 localized share pages');
