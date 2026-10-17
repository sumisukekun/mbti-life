/* 16分の1の人生 — World Edition */
'use strict';
const LANGS=['ja','en','ko','zh','es','fr','de','it','pt','id'];
const HTML_LANG={ja:'ja',en:'en',ko:'ko',zh:'zh-Hant-TW',es:'es',fr:'fr',de:'de',it:'it',pt:'pt-BR',id:'id'};
const NUM_LOCALE={ja:'ja-JP',en:'en-US',ko:'ko-KR',zh:'zh-TW',es:'es-ES',fr:'fr-FR',de:'de-DE',it:'it-IT',pt:'pt-BR',id:'id-ID'};
const COUNTRIES={
  jp:{lang:'ja',cur:'JPY',mult:10000,retire:63,life:3,code:'JPN',ll:[35.7,139.7]},
  us:{lang:'en',cur:'USD',mult:150,retire:66,life:-1,code:'USA',ll:[38.9,-77.0]},
  uk:{lang:'en',cur:'GBP',mult:110,retire:66,life:0,code:'GBR',ll:[51.5,-0.1]},
  kr:{lang:'ko',cur:'KRW',mult:100000,retire:60,life:2,code:'KOR',ll:[37.6,127.0]},
  tw:{lang:'zh',cur:'TWD',mult:1800,retire:65,life:1,code:'TWN',ll:[25.0,121.5]},
  es:{lang:'es',cur:'EUR',mult:75,retire:66,life:2,code:'ESP',ll:[40.4,-3.7]},
  mx:{lang:'es',cur:'MXN',mult:450,retire:65,life:-3,code:'MEX',ll:[19.4,-99.1]},
  fr:{lang:'fr',cur:'EUR',mult:80,retire:64,life:2,code:'FRA',ll:[48.9,2.35]},
  de:{lang:'de',cur:'EUR',mult:90,retire:67,life:0,code:'DEU',ll:[52.5,13.4]},
  it:{lang:'it',cur:'EUR',mult:70,retire:67,life:2,code:'ITA',ll:[41.9,12.5]},
  br:{lang:'pt',cur:'BRL',mult:110,retire:65,life:-3,code:'BRA',ll:[-15.8,-47.9]},
  id:{lang:'id',cur:'IDR',mult:150000,retire:58,life:-6,code:'IDN',ll:[-6.2,106.8]},
  ph:{lang:'en',cur:'PHP',mult:800,retire:60,life:-7,code:'PHL',ll:[14.6,121.0]},
  au:{lang:'en',cur:'AUD',mult:230,retire:67,life:2,code:'AUS',ll:[-33.9,151.2]},
  ca:{lang:'en',cur:'CAD',mult:170,retire:65,life:1,code:'CAN',ll:[45.4,-75.7]},
  in:{lang:'en',cur:'INR',mult:1500,retire:60,life:-8,code:'IND',ll:[28.6,77.2]}};
const REGIONS=[['asia',['jp','kr','tw','id','ph','in']],['europe',['uk','fr','de','it','es']],['americas',['us','ca','mx','br']],['oceania',['au']]];
const CORDER=REGIONS.flatMap(r=>r[1]);
const NAMES={jp:['ゆい','はると','さくら','そうた','あおい','れん','ひな','ゆうと','めい','りく'],us:['Emma','Liam','Olivia','Noah','Ava','Ethan','Mia','Lucas','Chloe','Jack'],
  uk:['Amelia','Oliver','Isla','George','Freya','Harry','Lily','Alfie','Grace','Theo'],kr:['서연','민준','지우','도윤','하은','서준','지아','시우','수아','하준'],
  tw:['怡君','家豪','雅婷','志明','欣怡','冠宇','詠晴','宥廷','子晴','承恩'],es:['Lucía','Hugo','Martina','Mateo','Sofía','Leo','Julia','Martín','Paula','Daniel'],
  mx:['Sofía','Santiago','Valentina','Mateo','Regina','Sebastián','Ximena','Diego','Camila','Emiliano'],
  fr:['Louise','Gabriel','Jade','Raphaël','Emma','Léo','Alice','Louis','Chloé','Hugo'],de:['Emilia','Noah','Mia','Matteo','Hannah','Leon','Lina','Paul','Ella','Finn'],
  it:['Sofia','Leonardo','Aurora','Francesco','Giulia','Alessandro','Ginevra','Tommaso','Beatrice','Lorenzo'],br:['Helena','Miguel','Alice','Arthur','Laura','Gael','Manuela','Heitor','Valentina','Davi'],
  id:['Putri','Rizky','Ayu','Fajar','Dewi','Bagus','Sari','Dimas','Nadia','Arif'],ph:['Maria','Juan','Angel','Jose','Andrea','Mark','Nicole','Paolo','Bea','Miguel'],
  au:['Charlotte','Oliver','Isla','Jack','Amelia','William','Mia','Noah','Ava','Henry'],ca:['Olivia','Liam','Emma','Noah','Charlotte','Jacob','Amélie','William','Maya','Benjamin'],
  in:['Ananya','Aarav','Diya','Vihaan','Saanvi','Arjun','Aadhya','Reyansh','Ishita','Kabir']};

/* ---------- 言語・国 ---------- */
const qs=new URLSearchParams(location.search);
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function detectLang(){const n=(navigator.language||'ja').toLowerCase();for(const l of LANGS)if(n.startsWith(l))return l;return 'en'}
let lang=qs.get('lang')||ls('mbtiLang')||detectLang();if(!LANGS.includes(lang)||!I18N[lang])lang=I18N[lang]?lang:'ja';
let COUNTRY=qs.get('c')||ls('mbtiCountry')||({ja:'jp',en:'us',ko:'kr',zh:'tw',es:'es',fr:'fr',de:'de',it:'it',pt:'br',id:'id'}[lang]);if(!COUNTRIES[COUNTRY])COUNTRY='jp';
function tr(k,p){const D=I18N[lang]||{};let v=D[k];if(v==null)v=I18N.ja[k];if(v==null)return k;
  return p?v.replace(/\{(\w+)\}/g,(m,x)=>p[x]==null?m:rv(p[x])):v}
function rv(v){if(v&&typeof v==='object')return tr(v.k,v.p);if(typeof v==='string'&&v[0]==='@')return tr(v.slice(1));return v}
const CN=c=>tr('country.'+c);
const SEP=()=>tr('_sep');
function q(t){return (lang==='ja'||lang==='zh')?'「'+t+'」':lang==='de'?'„'+t+'“':lang==='fr'?'« '+t+' »':'“'+t+'”'}
function applyLang(){document.documentElement.lang=HTML_LANG[lang];document.title=tr('meta.title');ls('mbtiLang',lang);ls('mbtiCountry',COUNTRY)}
function langName(l){return (I18N[l]||{})['lang.name']||l}

/* ---------- お金 ---------- */
function fmtMoney(u,cc){cc=cc||(s&&s.country)||COUNTRY;const C=COUNTRIES[cc];u=Math.round(u);
  if(cc==='jp'&&lang==='ja'){const neg=u<0,a=Math.abs(u);const r=a>=10000?(Math.floor(a/10000)+'億'+(a%10000?(a%10000)+'万':'')):a+'万';return (neg?'-':'')+r+'円'}
  try{return new Intl.NumberFormat(NUM_LOCALE[lang],{style:'currency',currency:C.cur,notation:'compact',maximumFractionDigits:1}).format(u*C.mult)}catch(e){return C.cur+' '+(u*C.mult)}}
function rangeLabel(lo,hi){return lo===0?tr('range.under',{b:fmtMoney(hi)}):hi==null?tr('range.over',{a:fmtMoney(lo)}):tr('range.mid',{a:fmtMoney(lo),b:fmtMoney(hi)})}

/* ---------- 基本データ ---------- */
const ORDER=['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const grp=t=>t[1]==='N'?(t[2]==='T'?'nt':'nf'):(t[3]==='J'?'sj':'sp');
const QUIZ=[['E','I'],['S','N'],['T','F'],['J','P'],['E','I'],['S','N'],['T','F'],['J','P'],['E','I'],['S','N'],['T','F'],['J','P']];
const R=Math.random, pick=a=>a[Math.floor(R()*a.length)];
const clamp=v=>Math.max(0,Math.min(100,v));
const EDU={jh:[200,.75],hs:[260,.85],vo:[280,.95],jc:[280,.95],univ:[320,1.05],grad:[380,1.15]};
const eduName=e=>tr('edu.'+(EDU[e]?e:'hs'));
function jobKey(g,early){return early?`jobE.${g}.${Math.floor(R()*2)}`:`job.${g}.${Math.floor(R()*5)}`}
function newName(){const L=NAMES[s.country]||NAMES.us;const used=[s.pname,...(s.kidNames||[])];const f=L.filter(n=>!used.includes(n));return pick(f.length?f:L)}

let s=null, view='home', qi=0, qa=[], timer=null, speed=1, pending=null, autoSkip=false, untilChoice=false;
let cardType=null,cardFromQuiz=false,shareOpen=false;

function add(s,k,n){const b=s[k];s[k]=clamp(s[k]+n);if(k==='career'&&s.income&&s.working){s.income=Math.max(80,Math.round(s.income*(1+(s[k]-b)/220)));s.maxIncome=Math.max(s.maxIncome||0,s.income)}}
function ms(s,k,p){s.ms.push([s.age,k,p||null])}
function push(k,p,kind){s.log.push({age:s.age,k,p:p||null,kind:kind||''})}
const RK=(k,p)=>({k,p});

/* ---------- 出来事 ---------- */
const EV=[
{id:'oshi',a:[16,45],max:2,w:{F:1.6,P:1.3},fx:s=>{add(s,'happy',8);s.money-=30}},
{id:'game',a:[16,35],max:2,w:{I:1.8,P:1.5},fx:s=>{add(s,'health',-3);add(s,'happy',5)}},
{id:'party',a:[18,40],max:3,w:{E:2.2},fx:s=>{add(s,'love',7);add(s,'happy',4)}},
{id:'solotrip',a:[18,60],max:2,w:{I:1.5,N:1.4,P:1.4},fx:s=>{add(s,'happy',8);s.money-=20;s.trips++}},
{id:'cert',a:[20,50],max:2,w:{J:1.8,S:1.6},c:s=>s.working,fx:s=>{add(s,'career',9)}},
{id:'fight',a:[23,55],max:2,w:{T:1.5,P:1.4,E:1.2},c:s=>s.working&&!s.founder,fx:s=>{add(s,'career',-6);add(s,'happy',-5)}},
{id:'promo',a:[26,58],max:3,w:{J:1.6,T:1.5},c:s=>s.working&&s.career>40&&!s.founder,fx:s=>{add(s,'career',10);add(s,'happy',4)}},
{id:'side',a:[22,55],max:1,w:{N:1.7,P:1.6},c:s=>s.working,fx:s=>{s.money+=180;add(s,'happy',5)}},
{id:'invest',a:[22,60],max:1,w:{P:1.8,N:1.4},c:s=>s.money>200,fx:s=>{s.money-=Math.round(s.money*0.3);add(s,'happy',-7)}},
{id:'savings',a:[30,60],max:2,w:{J:2,S:1.6},c:s=>s.money>100,fx:s=>{s.money+=Math.round(150+s.money*0.15)}},
{id:'love',a:[18,50],max:4,base:2.4,w:{E:1.6,F:1.5},c:s=>!s.partner&&!s.married,ms:'ms.partner',fx:s=>{s.partner=true;s.pname=newName();add(s,'love',14);add(s,'happy',8)}},
{id:'breakup',a:[18,50],max:3,base:1.2,w:{P:1.3,T:1.2},c:s=>s.partner&&!s.married,fx:s=>{s.partner=false;s.cohabit=false;add(s,'love',-8);add(s,'happy',-10)}},
{id:'baby',key:s=>s.kids?'ev.baby2':'ev.baby',a:[27,45],max:3,base:2.2,w:{F:1.4,J:1.3},c:s=>s.married&&s.kids<3&&!s.noKids,ms:'ms.baby',fx:s=>{s.kids++;s.kidAges.push(s.age);s.kidNames.push(newName());add(s,'love',12);add(s,'happy',10);add(s,'health',-3)}},
{id:'cat',key:s=>s.t.I?'ev.cat.I':'ev.cat.E',a:[22,70],max:1,w:{F:1.5,I:1.3},fx:s=>{add(s,'happy',9);s.pet=true;s.petAt=s.age}},
{id:'hosp',a:[30,90],max:3,base:1.4,c:s=>s.health<55,fx:s=>{add(s,'health',-10);add(s,'happy',-6);s.money-=40}},
{id:'gym',a:[20,70],max:2,w:{J:1.8,E:1.2},fx:s=>{add(s,'health',9)}},
{id:'nightowl',a:[18,45],max:2,w:{P:1.8,N:1.2},fx:s=>{add(s,'health',-5)}},
{id:'buzz',a:[18,45],max:1,w:{E:1.6,N:1.5},fx:s=>{add(s,'happy',6);add(s,'career',3)}},
{id:'friendwed',a:[24,40],max:2,w:{F:1.8},fx:s=>{add(s,'love',5);add(s,'happy',3)}},
{id:'house',a:[28,60],max:1,w:{J:2,S:1.4},c:s=>s.money>900&&!s.house,ms:'ms.house',fx:s=>{s.money-=700;s.house=true;s.atHome=false;add(s,'happy',8)}},
{id:'move',a:[30,60],max:1,w:{N:1.6,I:1.4,P:1.3},ms:'ms.move',fx:s=>{add(s,'happy',7);add(s,'health',5)}},
{id:'care',a:[45,65],max:1,w:{F:1.6,S:1.4},fx:s=>{add(s,'happy',-6);add(s,'love',6);add(s,'health',-3)}},
{id:'reunion',a:[30,55],max:1,w:{E:1.6},fx:s=>{add(s,'love',5);add(s,'happy',4)}},
{id:'hobby',params:()=>({hobby:'@hobby.'+Math.floor(R()*3)}),a:[30,80],max:1,w:{I:1.6,S:1.3,F:1.2},fx:s=>{add(s,'happy',7)}},
{id:'kidsout',a:[50,68],max:1,c:s=>s.kids>0,fx:s=>{add(s,'happy',-2);s.kidsOut=true}},
{id:'grand',a:[55,80],max:2,base:1.6,c:s=>s.kids>0,ms:'ms.grand',fx:s=>{add(s,'happy',12);add(s,'love',8);s.grand++;if(!s.grandAt)s.grandAt=s.age}},
{id:'checkup',a:[45,80],max:2,fx:s=>{add(s,'health',-3)}},
{id:'lottery',a:[18,90],max:1,base:.25,fx:s=>{s.money+=10;add(s,'happy',3)}},
{id:'project',a:[28,58],max:2,w:{T:1.6,J:1.5,E:1.2},c:s=>s.working,fx:s=>{add(s,'career',9);s.money+=60}},
{id:'dream',a:[18,40],max:2,w:{E:1.4,N:1.4,F:1.4},fx:s=>{add(s,'love',5);add(s,'happy',5)}},
{id:'cozy',a:[18,90],max:3,w:{I:2},fx:s=>{add(s,'happy',5)}},
{id:'world',a:[55,80],max:1,w:{P:1.8,E:1.3,N:1.3},c:s=>s.money>1200,ms:'ms.world',fx:s=>{s.money-=400;add(s,'happy',14);s.trips+=3}},
{id:'divorce',a:[30,65],max:1,base:.9,w:{T:1.3,P:1.3},c:s=>s.married&&s.love<45,ms:'ms.divorce',fx:s=>{s.married=false;s.partner=false;s.divorced=true;add(s,'happy',-12);s.money-=Math.round(Math.max(0,s.money)*0.3)}},
{id:'mentor',a:[40,62],max:1,w:{F:1.5,J:1.4,E:1.2},c:s=>s.working,fx:s=>{add(s,'career',5);add(s,'love',4)}},
{id:'book',a:[30,75],max:1,w:{N:1.8,I:1.6},ms:'ms.book',fx:s=>{add(s,'happy',10);add(s,'career',6);s.money+=50}},
{id:'volunteer',a:[25,85],max:1,w:{F:1.7,S:1.3},fx:s=>{add(s,'love',6);add(s,'happy',5)}},
{id:'cafe',a:[60,95],max:2,w:{E:1.5},fx:s=>{add(s,'love',5);add(s,'happy',4)}},
{id:'walk',a:[65,100],max:2,w:{I:1.4,J:1.2},fx:s=>{add(s,'health',4)}},
/* 大きな決断 */
{choice:1,id:'future',a:[24,42],base:4,max:2,w:{F:1.3,J:1.3},c:s=>s.partner&&!s.married,
 o:[{id:'marry',lean:'J',fx:s=>{s.married=true;s.marriedAt=s.age;ms(s,'ms.married');add(s,'love',14);add(s,'happy',10);return RK('ch.future.r.marry',{name:s.pname})}},
    {id:'cohabit',lean:'S',fx:s=>{s.cohabit=true;add(s,'love',6);return 'ch.future.r.cohabit'}},
    {id:'free',lean:'P',fx:s=>{if(R()<.55){s.partner=false;s.cohabit=false;add(s,'happy',-6);return 'ch.future.r.freeBreak'}add(s,'happy',2);return 'ch.future.r.freeStay'}},
    {id:'honest',lean:'F',fx:s=>{add(s,'love',3);if(R()<.3){s.partner=false;s.cohabit=false;add(s,'happy',-5);return 'ch.future.r.honestBreak'}return RK('ch.future.r.honestWait',{name:s.pname})}}]},
{choice:1,id:'offer',a:[26,45],max:1,base:1.8,w:{P:1.3,N:1.3},c:s=>s.working&&!s.founder,
 o:[{id:'move',lean:'N',fx:s=>{const nj=jobKey(s.jobGrp||grp(s.type));s.job=nj;ms(s,'ms.jobchange',{job:'@'+nj});s.career=clamp(s.career-8+Math.round(R()*24));s.income=Math.round((s.income||300)*1.08);add(s,'happy',5);return RK('ch.offer.r.move',{job:'@'+nj})}},
    {id:'stay',lean:'S',fx:s=>{add(s,'career',4);return 'ch.offer.r.stay'}},
    {id:'negotiate',lean:'T',fx:s=>{add(s,'career',6);s.income=Math.round((s.income||300)*1.07);return 'ch.offer.r.negotiate'}},
    {id:'consult',lean:'F',fx:s=>{add(s,'love',3);if(R()<.5){const nj=jobKey(s.jobGrp||grp(s.type));s.job=nj;ms(s,'ms.jobchange',{job:'@'+nj});add(s,'happy',4);return RK('ch.offer.r.consultMove',{job:'@'+nj})}add(s,'career',2);return 'ch.offer.r.consultStay'}}]},
{choice:1,id:'idea',a:[27,48],max:1,base:1.4,w:{N:1.8,T:1.4,P:1.4,E:1.2},c:s=>s.working&&!s.founder,
 o:[{id:'quit',lean:'P',fx:s=>startUp(s,0)},
    {id:'team',lean:'E',fx:s=>startUp(s,.12)},
    {id:'side',lean:'J',fx:s=>{if(R()<.5){s.money+=150;add(s,'happy',5);ms(s,'ms.side');return 'ch.idea.r.sideOk'}add(s,'happy',-2);return 'ch.idea.r.sideFail'}},
    {id:'stay',lean:'S',fx:s=>'ch.idea.r.stay'}]},
{choice:1,id:'abroad',a:[22,40],max:1,base:1.2,w:{N:1.4,P:1.5},
 o:[{id:'go',lean:'N',fx:s=>{ms(s,'ms.abroad');add(s,'happy',9);add(s,'career',5);s.trips+=2;add(s,'love',-4);return 'ch.abroad.r.go'}},
    {id:'root',lean:'E',fx:s=>{ms(s,'ms.emigrate');add(s,'happy',10);add(s,'love',-6);add(s,'career',3);s.trips+=3;return 'ch.abroad.r.root'}},
    {id:'short',lean:'J',fx:s=>{add(s,'happy',5);add(s,'career',2);s.trips+=1;return 'ch.abroad.r.short'}},
    {id:'stay',lean:'S',fx:s=>{add(s,'love',3);return 'ch.abroad.r.stay'}}]},
{choice:1,id:'kids',a:[28,40],max:1,base:1.5,c:s=>s.married&&s.kids===0,
 o:[{id:'want',lean:'F',fx:s=>{s.wantKids=true;add(s,'love',4);return 'ch.kids.r.want'}},
    {id:'two',lean:'T',fx:s=>{s.noKids=true;add(s,'happy',3);s.money+=100;return 'ch.kids.r.two'}},
    {id:'nature',lean:'P',fx:s=>{add(s,'love',2);return 'ch.kids.r.nature'}}]},
{choice:1,id:'house',a:[30,55],max:1,base:1.3,c:s=>!s.house&&s.money>400&&!s.atHome,
 o:[{id:'buy',lean:'S',fx:s=>{s.house=true;s.money-=500;add(s,'happy',6);ms(s,'ms.house');return 'ch.house.r.buy'}},
    {id:'rent',lean:'P',fx:s=>{s.money+=50;return 'ch.house.r.rent'}},
    {id:'country',lean:'N',fx:s=>{s.house=true;s.money-=250;add(s,'happy',8);add(s,'health',4);ms(s,'ms.move');return 'ch.house.r.country'}}]},
{choice:1,id:'manager',a:[35,56],max:1,base:1.8,c:s=>s.working&&!s.founder&&s.career>45,
 o:[{id:'yes',lean:'T',fx:s=>{add(s,'career',12);s.income=Math.round((s.income||300)*1.15);s.maxIncome=Math.max(s.maxIncome||0,s.income);add(s,'health',-4);ms(s,'ms.manager');return 'ch.manager.r.yes'}},
    {id:'expert',lean:'I',fx:s=>{add(s,'career',6);add(s,'happy',5);return 'ch.manager.r.expert'}},
    {id:'decline',lean:'F',fx:s=>{add(s,'happy',6);add(s,'love',5);return 'ch.manager.r.decline'}}]},
{choice:1,id:'half',a:[50,60],max:1,base:2,c:s=>s.working,
 o:[{id:'stay',lean:'J',fx:s=>{add(s,'career',4);return 'ch.half.r.stay'}},
    {id:'early',lean:'P',fx:s=>{s.working=false;s.retired=true;s.pension=Math.round(90+(s.income||300)*0.15);s.money+=600;add(s,'happy',8);ms(s,'ms.early');return 'ch.half.r.early'}},
    {id:'indie',lean:'N',fx:s=>startUp(s,.05)},
    {id:'learn',lean:'I',fx:s=>{add(s,'career',6);add(s,'happy',4);ms(s,'ms.relearn');return 'ch.half.r.learn'}}]},
{choice:1,id:'after',a:[62,74],max:1,base:2.5,c:s=>s.retired,
 o:[{id:'travel',lean:'E',fx:s=>{s.trips+=2;s.money-=150;add(s,'happy',8);ms(s,'ms.travel');return 'ch.after.r.travel'}},
    {id:'hobby',lean:'I',fx:s=>{add(s,'happy',8);return 'ch.after.r.hobby'}},
    {id:'local',lean:'F',fx:s=>{add(s,'love',8);add(s,'happy',4);return 'ch.after.r.local'}},
    {id:'health',lean:'J',fx:s=>{add(s,'health',10);return 'ch.after.r.health'}}]}
];
function uniChoice(){return {choice:1,id:'grad',o:[
  {id:'uni',lean:'N',fx:x=>{x.decided18=true;x.uni=true;x.edu='univ';x.gradAge=22;ms(x,'ms.uni');return 'ch.grad.r.uni'}},
  {id:'work',lean:'S',fx:x=>{x.decided18=true;x.edu='hs';add(x,'happy',3);startJob(true);return 'ch.grad.r.work'}},
  {id:'vo',lean:'J',fx:x=>{x.decided18=true;x.uni=true;x.edu='vo';x.gradAge=20;ms(x,'ms.vo');return 'ch.grad.r.vo'}},
  {id:'gap',lean:'P',fx:x=>{x.decided18=true;x.edu='hs';add(x,'happy',3);return 'ch.grad.r.gap'}}]}}
function startUp(s,bonus){s.founder=true;s.working=true;s.retired=false;s.money-=300;ms(s,'ms.startup');
  const ok=R()<0.35+bonus+s.career/250+(s.t.T?.08:0);s.startup=ok;
  if(ok){s.career=clamp(s.career+20);s.income=Math.round((s.income||300)*1.8);s.maxIncome=Math.max(s.maxIncome||0,s.income);return 'r.startup.ok'}
  add(s,'happy',-10);s.career=clamp(s.career-15);return 'r.startup.fail'}

/* ---------- 人生の進行 ---------- */
function newLife(type){
  const t={};for(const c of 'EISNTFJP')t[c]=type.includes(c);
  return {type,t,country:COUNTRY,age:18,money:30,health:clamp(80+Math.round(R()*15)),love:35+Math.round(R()*15),career:5,happy:60,
    partner:false,married:false,kids:0,job:null,uni:false,working:false,retired:false,founder:false,house:false,
    trips:0,grand:0,ms:[],log:[],counts:{},dead:false,startAge:18,gradAge:22,hist:[],kidAges:[],kidNames:[],pname:null,decisions:0,seed:Math.floor(R()*1e9)};
}
function weight(e){
  if(s.age<e.a[0]||s.age>e.a[1])return 0;
  if(e.c&&!e.c(s))return 0;
  if((s.counts[e.id]||0)>=(e.max||1))return 0;
  let w=e.base||1;if(e.w)for(const k in e.w)if(s.t[k])w*=e.w[k];
  return w;
}
function pickEvent(){const ws=EV.map(weight);const tot=ws.reduce((a,b)=>a+b,0);if(!tot)return null;
  let r=R()*tot;for(let i=0;i<EV.length;i++){r-=ws[i];if(r<=0)return EV[i]}return null}
function startJob(early){
  const g=grp(s.type);s.job=jobKey(g,early);s.working=true;s.career=early?12:20;
  s.income=Math.round((EDU[s.edu]||EDU.hs)[0]*(early?.85:1));s.maxIncome=Math.max(s.maxIncome||0,s.income);
  ms(s,'ms.job',{job:'@'+s.job});push('log.startJob',{job:'@'+s.job},'ms');
}
function yearly(){
  const kidCost=s.kidsOut?0:s.kids*40;
  const home=s.atHome&&!s.married?-50:0;
  if(s.working){if(!s.income)s.income=300;
    if(s.age<50)s.income=Math.round(s.income*(1+0.008*((EDU[s.edu]||EDU.hs)[1])));
    s.maxIncome=Math.max(s.maxIncome||0,s.income);
    s.money+=Math.round(s.income*0.78-(70+s.income*0.38)-kidCost-home)}
  else if(s.retired){s.money+=Math.round(Math.max(130,s.pension||150)-125-kidCost/2)}
  else if(s.homemaker){s.money+=Math.round((s.married?60:-60)-kidCost/3)}
  else if(s.uni){s.money-=35}
  else{s.money-=60}
  if(s.age>40)add(s,'health',-(0.7+(s.age>65?1.1:0)+(s.age>80?1:0)));
  if(!s.partner&&!s.married&&s.age>30)add(s,'love',-0.6);
  const target=(s.health+s.love+s.career*.6+Math.min(100,40+s.money/80)+40)/4.3;
  s.happy=clamp(s.happy+(target-s.happy)*0.15);
}
function narr(){
  const k=s.uni?'uni':s.working?(s.age<35?'young':s.age<55?'mid':'late'):s.retired?'retired':s.homemaker?'home':'idle';
  const n={uni:3,young:3,mid:3,late:3,retired:3,home:2,idle:2}[k];
  const out=[`nar.${k}.${Math.floor(R()*n)}`];
  if(s.kidAges.some(b=>s.age-b<12&&s.age-b>=0))out.push('nar.kid.'+Math.floor(R()*2));
  else if(R()<.45)out.push('flav.'+pick([...s.type]));
  if(s.health<40&&R()<.35)out.push('nar.ill.'+Math.floor(R()*3));
  else if(s.happy>75&&R()<.5)out.push('nar.good');
  else if(s.happy<35&&R()<.6)out.push('nar.bad');
  return out;
}
function deathCheck(){
  if(s.age<50)return false;
  const life=COUNTRIES[s.country].life;
  const p=0.0018*Math.exp((s.age-55-life)/8)*(1.7-s.health/100);
  return R()<p||s.age>=108;
}
function resolveAuto(){const i=pending.o.findIndex(o=>s.t[o.lean]);resolve(i<0?0:i)}
function step(){
  if(pending||s.dead)return;
  s.age++;
  yearly();
  s.hist.push(Math.round(s.happy));
  s.log.push({age:s.age,kind:'nar',ks:narr()});
  if(s.age===18&&!s.decided18&&!s.uni&&!s.working){pending=uniChoice();if(!autoSkip)stop();else resolveAuto();return}
  const retireAt=s.retireAt||(s.founder?70:COUNTRIES[s.country].retire);
  if(s.uni&&s.age>=s.gradAge){s.uni=false;startJob(false)}
  else if(s.age>=19&&s.age<60&&!s.working&&!s.uni&&!s.retired&&!s.homemaker&&R()<(s.onLeave?.7:.45)){
    if(s.onLeave){s.job=s.job||'job.default';s.working=true;s.onLeave=false;push('log.returnJob',{job:'@'+s.job},'ms');ms(s,'ms.return')}else startJob(s.age<23)}
  else if(s.age>=retireAt&&s.working){s.working=false;s.retired=true;s.pension=Math.round(110+(s.income||300)*0.2);
    ms(s,s.founder?'ms.retireF':'ms.retire');push(s.founder?'log.retireF':'log.retire',null,'ms')}
  let n=R()<.8?1:0;if(R()<.28)n++;
  for(let i=0;i<n;i++){
    const e=pickEvent();if(!e)break;
    s.counts[e.id]=(s.counts[e.id]||0)+1;
    if(e.choice){pending=e;if(!autoSkip)stop();else resolveAuto();break}
    const before=s.happy;e.fx(s);
    if(e.ms)ms(s,e.ms);
    push(e.key?e.key(s):'ev.'+e.id,e.params?e.params():null,e.ms?'ms':(s.happy>=before?'up':'dn'));
  }
  if(!pending&&deathCheck()){s.dead=true;push('log.death',{age:s.age},'ms');stop();const me=s;
    setTimeout(()=>{if(view==='life'&&s===me)startFinale()},speed>1?600:1400)}
}
function resolve(i){
  const e=pending;pending=null;untilChoice=false;s.decisions++;
  const r=e.o[i].fx(s);const rr=typeof r==='string'?RK(r):r;
  push('log.choice',{h:'@ch.'+e.id+'.h',o:RK('ch.'+e.id+'.o.'+e.o[i].id,chParams()),r:rr},'ch');
  if(view==='life')render();
  if(!autoSkip&&!s.dead)play();
}
function chParams(){return {name:s.pname||'',country:'@country.'+s.country}}
function play(){stop();timer=setInterval(()=>{step();if(pending||s.dead)untilChoice=false;render()},untilChoice?60:Math.round(1100/speed))}
function stop(){clearInterval(timer);timer=null}

/* ---------- 初期設定 ---------- */
const DEF={age:20,status:'student',school:'univ',rel:'single',edu:'univ',mar:'single',kids:0,sav:1,job:'office',inc:1,health:'mid',home:'rent',sit:'seek'};
let prof={...DEF};
try{const v=JSON.parse(ls('mbtiLifeProfile2')||'null');if(v&&v.age)prof={...DEF,...v}}catch(e){}
const SCHOOLS=['jh','hs','vo','jc','univ','grad'];
const JOBCAT=['office','it','med','gov','edu','creator','service','maker','pro','free','owner','part'];
const JOBGRP={office:'sj',it:'nt',med:'nf',gov:'sj',edu:'nf',creator:'nf',service:'sp',maker:'sp',pro:'nt',free:'sp',owner:'nt',part:'sp'};
const INC=[[0,200,160],[200,400,300],[400,600,500],[600,800,700],[800,1000,900],[1000,1500,1200],[1500,null,1800]];
const SAV=[[0,50,20],[50,300,150],[300,1000,600],[1000,3000,1800],[3000,null,4500]];
function startLife(type,p){
  COUNTRY=COUNTRY||'jp';s=newLife(type);s.age=p.age;s.startAge=p.age;
  push('log.start',{age:p.age,country:'@country.'+s.country,type},'ms');
  s.startPlace=p.status==='student'?'school':p.status==='work'?(p.job==='owner'?'tower':'office'):(p.sit==='retired'||p.age>=65)?'park':'home';
  if(p.status==='student'){
    if(p.rel==='partner'){s.partner=true;s.pname=newName();add(s,'love',12)}
    if(p.school==='jh'||p.school==='hs'){s.edu='hs';if(p.age>=18)pending=uniChoice()}
    else{s.edu=p.school;s.decided18=true;s.uni=true;s.gradAge=Math.max({vo:20,jc:20,univ:22,grad:24}[p.school],p.age+1)}
    s.money=Math.round(10+Math.max(0,p.age-18)*15);
    return;
  }
  s.decided18=true;s.edu=p.edu;
  s.money=SAV[+p.sav][2];
  s.health=clamp({good:90,mid:75,weak:50}[p.health]-Math.max(0,p.age-40)*0.6);
  if(p.mar==='partner'){s.partner=true;s.pname=newName();add(s,'love',12)}
  if(p.mar==='married'){s.partner=true;s.married=true;s.pname=newName();s.marriedAt=Math.max(20,p.age-5);add(s,'love',22)}
  if(p.mar==='divorced'){s.divorced=true;add(s,'love',-5);push('log.divorced')}
  s.kids=p.kids;for(let i=0;i<p.kids;i++){const ka=Math.max(0,p.age-28-i*3);s.kidAges.push(p.age-ka);s.kidNames.push(newName())}
  if(p.kids&&p.age>55)s.kidsOut=true;
  if(p.home==='own')s.house=true;if(p.home==='parents')s.atHome=true;
  if(p.status==='work'){
    s.job='jobs.'+p.job;s.jobGrp=JOBGRP[p.job];s.working=true;
    s.income=INC[+p.inc][2];s.maxIncome=s.income;
    s.career=clamp(Math.round((s.income-120)/12));
    if(p.job==='owner'){s.founder=true;s.startup=true}
    const ra=s.founder?70:COUNTRIES[s.country].retire;if(p.age>=ra)s.retireAt=p.age+2;
    push('log.working',{job:'@'+s.job,inc:rangeLabel(INC[+p.inc][0],INC[+p.inc][1])});
  }else{
    if(p.sit==='home'){s.homemaker=true;add(s,'love',6)}
    if(p.sit==='leave'){s.onLeave=true;s.job='job.default';s.income=300;add(s,'health',-6)}
    if(p.sit==='retired'||p.age>=65){s.retired=true;s.pension=150}
  }
}

/* ---------- イメージ図 ---------- */
const SCN=[
 ['friendwed','sc.friendwed',['ev.friendwed']],['breakup','sc.divorce',['ev.divorce']],
 ['breakup','sc.breakup',['ev.breakup','ch.future.r.freeBreak','ch.future.r.honestBreak']],['wedding','sc.wedding',['ch.future.r.marry']],
 ['grandbaby','sc.grandbaby',['ev.grand']],['baby','sc.baby',['ev.baby','ev.baby2']],['date','sc.date',['ev.love']],['cohabit','sc.cohabit',['ch.future.r.cohabit']],
 ['entrance','sc.entrance',['ch.grad.r.uni','ch.grad.r.vo']],['startup','sc.startupOk',['r.startup.ok']],['closed','sc.closed',['r.startup.fail']],['startup','sc.startup',['ch.idea.r.sideOk']],
 ['retire','sc.retire',['log.retire','log.retireF','ch.half.r.early']],['firstjob','sc.firstjob',['log.startJob','log.returnJob']],
 ['jobchange','sc.jobchange',['ch.offer.r.move','ch.offer.r.consultMove']],['promotion','sc.promotion',['ch.manager.r.yes','ev.promo']],
 ['newhouse','sc.newhouse',['ev.house','ch.house.r.buy']],['country','sc.country',['ev.move','ch.house.r.country']],
 ['travel','sc.travel',['ch.abroad.r.go','ch.abroad.r.root','ch.abroad.r.short','ev.world','ch.after.r.travel']],['mountain','sc.mountain',['ev.solotrip']],
 ['hosp','sc.hosp',['ev.hosp']],['clinic','sc.clinic',['ev.checkup']],['gym','sc.gym',['ev.gym']],['walk','sc.walk',['ev.walk','ch.after.r.health']],
 ['stage','sc.stage',['ev.oshi']],['gamer','sc.gamer',['ev.game','ev.nightowl']],['izakaya','sc.izakaya',['ev.party','ev.reunion']],['campfire','sc.campfire',['ev.dream']],
 ['study','sc.study',['ev.cert','ch.half.r.learn']],['book','sc.book',['ev.book']],
 ['coins','sc.coins',['ev.lottery','ev.side','ev.savings','ch.offer.r.negotiate','ev.project']],['crash','sc.crash',['ev.invest']],
 ['cat','sc.cat',['ev.cat.I','ev.cat.E']],['fight','sc.fight',['ev.fight']],['care','sc.care',['ev.care']],['hobby','sc.hobby',['ev.hobby','ch.after.r.hobby']],
 ['kidsout','sc.kidsout',['ev.kidsout']],['buzz','sc.buzz',['ev.buzz']],['volunteer','sc.volunteer',['ev.volunteer','ch.after.r.local']],
 ['cafe','sc.cafe',['ev.cafe']],['cozy','sc.cozy',['ev.cozy']],['mentor','sc.mentor',['ev.mentor']]];
const MS_SCENE={'ms.job':'firstjob','ms.return':'firstjob','ms.retire':'retire','ms.retireF':'retire','ms.partner':'date','ms.baby':'baby','ms.house':'newhouse','ms.move':'country',
 'ms.grand':'grandbaby','ms.world':'travel','ms.divorce':'breakup','ms.book':'book','ms.married':'wedding','ms.jobchange':'jobchange','ms.startup':'startup','ms.side':'coins',
 'ms.abroad':'travel','ms.emigrate':'travel','ms.manager':'promotion','ms.early':'retire','ms.relearn':'study','ms.travel':'travel','ms.uni':'entrance','ms.vo':'entrance'};
function yearKeys(age){return s.log.filter(l=>l.age===age&&l.kind!=='nar').map(l=>l.kind==='ch'?l.p.r.k:l.k)}
function sceneEvent(){
  if(!s||s.dead)return null;const ks=yearKeys(s.age);if(!ks.length)return null;
  for(const [key,label,list] of SCN)if(list.some(k=>ks.includes(k)))return {key,label};
  return null;
}
let sceneOverride=null;
function drawScene(c,t){
  if(sceneOverride){const sv=s.age,sd=s.dead,sh=s.happy,sH=s.health;s.age=sceneOverride.age;s.dead=false;if(!sceneOverride.key){s.happy=70;s.health=80}
    try{if(sceneOverride.key)drawSpecial(c,t,sceneOverride.key);else drawSceneBase(c,t)}finally{s.age=sv;s.dead=sd;s.happy=sh;s.health=sH}return}
  const sp=sceneEvent();if(sp){drawSpecial(c,t,sp.key);return}
  drawSceneBase(c,t);
}
function season(){return ((s.age-s.startAge)%4+4)%4}
let rafId=0;
function loop(t){rafId=0;
  const cv=document.getElementById('scene')||document.getElementById('fscene');
  if(cv&&s){const c=cv.getContext('2d');c.imageSmoothingEnabled=false;drawScene(c,t)}
  const gl=document.getElementById('globe');if(gl)drawGlobe(gl,t);
  if(cv||gl)rafId=requestAnimationFrame(loop)}
function startLoop(){if(!rafId)rafId=requestAnimationFrame(loop)}
function sceneHtml(){
  const si=sceneEvent();const label=si?si.label:sceneInfo().label;
  const last=[...s.log].reverse().find(l=>l.kind!=='nar');
  const cap=last&&last.age===s.age?logText(last):'';
  return `<section class="scene o0"><canvas id="scene" width="${SW}" height="${SH}" role="img" aria-label="${esc(tr(label))}"></canvas>
    <div class="scap"><span class="chip">${s.dead?esc(tr('fr.age',{age:s.age})):tr('u.age',{n:s.age})} · ${tr('season.'+season())} · ${esc(tr(label))}</span>${cap?`<span class="say">${esc(cap)}</span>`:''}</div></section>`;
}

/* ---------- 地球儀（トップ） ---------- */
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
let globeCols=null;
function drawGlobe(cv,t){
  const c=cv.getContext('2d'),W=cv.width,H=cv.height,Rr=W*0.36,cx=W/2,cy=H/2;
  if(!globeCols||t%2000<20)globeCols={dot:cssVar('--blue'),pink:cssVar('--pink'),ink:cssVar('--ink'),card:cssVar('--card'),line:cssVar('--line')};
  const G=globeCols;c.clearRect(0,0,W,H);
  const lon0=(t/80)%360,lat0=18*Math.PI/180;const rad=Math.PI/180;
  c.beginPath();c.arc(cx,cy,Rr,0,7);c.fillStyle=G.card;c.fill();c.lineWidth=2;c.strokeStyle=G.line;c.stroke();
  const P=(la,lo)=>{const L=la*rad,O=(lo-lon0)*rad;const x=Math.cos(L)*Math.sin(O);const y=Math.cos(lat0)*Math.sin(L)-Math.sin(lat0)*Math.cos(L)*Math.cos(O);
    const z=Math.sin(lat0)*Math.sin(L)+Math.cos(lat0)*Math.cos(L)*Math.cos(O);return [cx+x*Rr,cy-y*Rr,z]};
  for(let la=-75;la<=75;la+=10){const n=Math.max(6,Math.round(36*Math.cos(la*rad)));for(let i=0;i<n;i++){const [x,y,z]=P(la,i*360/n);if(z<=0)continue;
    c.globalAlpha=.15+z*.55;c.fillStyle=G.dot;c.beginPath();c.arc(x,y,1.4+z*1.2,0,7);c.fill()}}
  c.globalAlpha=1;
  const lon0f=lon0;const pins=CORDER.map(cc=>{const [la,lo]=COUNTRIES[cc].ll;const [x,y,z]=P(la,lo);return {cc,x,y,z}}).sort((a,b)=>a.z-b.z);
  c.font=`700 ${Math.round(W/30)}px ${getComputedStyle(document.body).fontFamily}`;c.textBaseline='middle';
  for(const p of pins){if(p.z<=-0.05)continue;const on=p.cc===COUNTRY;const a=Math.min(1,p.z*2+.25);c.globalAlpha=a;
    if(on){const pr=8+((t/40)%18);c.strokeStyle=G.pink;c.lineWidth=2;c.globalAlpha=a*(1-((t/40)%18)/18);c.beginPath();c.arc(p.x,p.y,pr,0,7);c.stroke();c.globalAlpha=a}
    c.fillStyle=on?G.pink:G.ink;c.beginPath();c.arc(p.x,p.y,on?6:4,0,7);c.fill();
    if(on){const lb=CN(p.cc);const tw=c.measureText(lb).width+14;c.fillStyle=G.pink;
    c.beginPath();c.roundRect(p.x+8,p.y-11,tw,22,11);c.fill();c.fillStyle=G.card;c.fillText(lb,p.x+15,p.y+1)}}
  c.globalAlpha=1;
}

/* ---------- 旗（SVG） ---------- */
function flag(cc){
  const W=30,H=20;let b='';
  if(cc==='jp')b=`<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>`;
  if(cc==='us'){for(let i=0;i<13;i++)b+=`<rect y="${i*20/13}" width="30" height="${20/13+.05}" fill="${i%2?'#fff':'#B22234'}"/>`;b+=`<rect width="12" height="10.8" fill="#3C3B6E"/>`;for(let y=0;y<4;y++)for(let x=0;x<5;x++)b+=`<circle cx="${1.4+x*2.3}" cy="${1.4+y*2.6}" r=".55" fill="#fff"/>`}
  if(cc==='uk')b=`<rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/>`;
  if(cc==='kr')b=`<rect width="30" height="20" fill="#fff"/><path d="M10 10a5 5 0 0 1 10 0a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 0-5 0" fill="#CD2E3A"/><path d="M20 10a5 5 0 0 1-10 0a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 0 5 0" fill="#0047A0"/><g stroke="#000" stroke-width="1.1"><path d="M4 4.5l2.6-2.2M4.9 5.5l2.6-2.2M5.8 6.5l2.6-2.2"/><path d="M26 15.5l-2.6 2.2M25.1 14.5l-2.6 2.2M24.2 13.5l-2.6 2.2"/><path d="M26 4.5l-2.6-2.2M25.1 5.5l-2.6-2.2M24.2 6.5l-2.6-2.2"/><path d="M4 15.5l2.6 2.2M4.9 14.5l2.6 2.2M5.8 13.5l2.6 2.2"/></g>`;
  if(cc==='tw')b=`<rect width="30" height="20" fill="#FE0000"/><rect width="15" height="10" fill="#000095"/><circle cx="7.5" cy="5" r="2.6" fill="#fff"/><circle cx="7.5" cy="5" r="1.8" fill="#000095"/><circle cx="7.5" cy="5" r="1.5" fill="#fff"/>`;
  if(cc==='es')b=`<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>`;
  if(cc==='mx')b=`<rect width="10" height="20" fill="#006847"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE1126"/><circle cx="15" cy="10" r="2.4" fill="#8C6B2A"/>`;
  if(cc==='fr')b=`<rect width="10" height="20" fill="#002395"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ED2939"/>`;
  if(cc==='de')b=`<rect width="30" height="7" fill="#000"/><rect y="6.6" width="30" height="7" fill="#DD0000"/><rect y="13.3" width="30" height="6.7" fill="#FFCE00"/>`;
  if(cc==='it')b=`<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/>`;
  if(cc==='br')b=`<rect width="30" height="20" fill="#009C3B"/><path d="M15 2.5L27 10L15 17.5L3 10Z" fill="#FFDF00"/><circle cx="15" cy="10" r="4.2" fill="#002776"/><path d="M11 9.2q4-1.6 8 .6" stroke="#fff" stroke-width=".8" fill="none"/>`;
  if(cc==='id')b=`<rect width="30" height="10" fill="#CE1126"/><rect y="10" width="30" height="10" fill="#fff"/>`;
  if(cc==='ph')b=`<rect width="30" height="10" fill="#0038A8"/><rect y="10" width="30" height="10" fill="#CE1126"/><path d="M0 0L14 10L0 20Z" fill="#fff"/><circle cx="4.6" cy="10" r="1.8" fill="#FCD116"/>`;
  if(cc==='au')b=`<rect width="30" height="20" fill="#00008B"/><g transform="scale(.5)"><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/></g><circle cx="7.5" cy="15" r="2" fill="#fff"/><circle cx="22" cy="5" r="1" fill="#fff"/><circle cx="25" cy="10" r="1" fill="#fff"/><circle cx="20" cy="12" r="1" fill="#fff"/><circle cx="22" cy="16.5" r="1" fill="#fff"/>`;
  if(cc==='ca')b=`<rect width="30" height="20" fill="#fff"/><rect width="7.5" height="20" fill="#D52B1E"/><rect x="22.5" width="7.5" height="20" fill="#D52B1E"/><path d="M15 4l1.2 2.4 1.6-.6-.5 3.2 2-1.4.5 1.4 1.6-.2-1 2 .8.6-3.4 2.4.4 1.4-2.4-.4V17h-.6v-2.2l-2.4.4.4-1.4-3.4-2.4.8-.6-1-2 1.6.2.5-1.4 2 1.4-.5-3.2 1.6.6Z" fill="#D52B1E"/>`;
  if(cc==='in')b=`<rect width="30" height="6.7" fill="#FF9933"/><rect y="6.6" width="30" height="6.8" fill="#fff"/><rect y="13.3" width="30" height="6.7" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".7"/><circle cx="15" cy="10" r=".6" fill="#000080"/>`;
  return `<svg class="flag" viewBox="0 0 ${W} ${H}" aria-hidden="true">${b}</svg>`;
}

/* ---------- 画面 ---------- */
const app=document.getElementById('app');
function esc(t){return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function topNav(){return `<nav class="topnav"><button class="brand plain" data-act="home">${tr('brand.short')}</button>
  <span class="navc">${flag(COUNTRY)}<span>${esc(CN(COUNTRY))}</span></span>
  <label class="langsel"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
  <select id="langsel" aria-label="${esc(tr('home.lang'))}">${LANGS.filter(l=>I18N[l]).map(l=>`<option value="${l}"${l===lang?' selected':''}>${esc(langName(l))}</option>`).join('')}</select></label></nav>`}
function vHome(){
  return `${topNav()}
  <header class="hero2">
    <div class="htext"><span class="eyebrow">${tr('hero.eyebrow')}</span>
      <h1 class="riso">${tr('brand.html')}</h1>
      <p class="hsub">${esc(tr('hero.sub'))}</p>
      <p class="hstat">${esc(tr('hero.stat'))}</p></div>
    <figure class="globe"><canvas id="globe" width="520" height="520" aria-hidden="true"></canvas><figcaption>${esc(tr('home.globe'))}</figcaption></figure>
  </header>
  <section class="sec"><div class="sech"><span class="stepn">01</span><h2>${esc(tr('home.country'))}</h2></div><p class="note">${esc(tr('home.countryNote'))}</p>
    ${REGIONS.map(([r,list])=>`<div class="region"><span class="rlabel">${esc(tr('home.region.'+r))}</span><div class="cgrid">${list.map(c=>`<button class="cbtn${c===COUNTRY?' on':''}" data-country="${c}" aria-pressed="${c===COUNTRY}">${flag(c)}<b>${esc(CN(c))}</b><span>${esc(tr('home.speaks',{lang:langName(COUNTRIES[c].lang)}))}</span></button>`).join('')}</div></div>`).join('')}</section>
  <section class="sec"><div class="sech"><span class="stepn">02</span><h2>${esc(tr('home.type'))}</h2></div>
    <div class="grid16">${ORDER.map(t=>`<button class="tbtn ${grp(t)}" data-type="${t}"><b>${t}</b><span>${esc(tr('type.'+t+'.n'))}</span></button>`).join('')}</div></section>
  <div class="or">${esc(tr('home.or'))}</div>
  <div class="quizcta dots"><p><b>${esc(tr('home.quizQ'))}</b><br>${esc(tr('home.quizSub'))}</p><button class="btn" data-act="quiz">${esc(tr('home.quizBtn'))}</button></div>
  <p class="note">${esc(tr('home.note'))}</p>${footer()}`;
}
function vQuiz(){
  const n=qi+1;
  return `${topNav()}<div class="row" style="justify-content:space-between;align-items:center"><button class="btn small ghost" data-act="home">${esc(tr('quiz.quit'))}</button><span class="eyebrow">Q${n} / ${QUIZ.length}</span></div>
  <div class="prog"><i style="width:${qi/QUIZ.length*100}%"></i></div>
  <div class="qcard dots"><h2 class="riso">${esc(tr('quiz.'+n))}</h2>
  <button class="opt" data-ans="${QUIZ[qi][0]}"><small>A</small>${esc(tr('quiz.'+n+'.a'))}</button>
  <button class="opt" data-ans="${QUIZ[qi][1]}"><small>B</small>${esc(tr('quiz.'+n+'.b'))}</button></div>`;
}
function vCard(type,fromQuiz){
  return `${topNav()}<span class="eyebrow">${esc(tr(fromQuiz?'card.fromQuiz':'card.yours'))}</span>
  <div class="tcard"><div class="code">${type}</div><h2>${esc(tr('type.'+type+'.n'))}</h2><p>${esc(tr('type.'+type+'.d'))}</p>
  <div class="axes">${[...type].map(c=>`<div><b>${c}</b>${esc(tr('axis.'+c))}</div>`).join('')}</div></div>
  <p>${esc(tr('card.lead',{country:CN(COUNTRY)}))}</p>
  <div class="row"><button class="btn" data-act="setup" data-type="${type}">${esc(tr('card.go'))}</button><button class="btn ghost" data-act="home">${esc(tr('card.change'))}</button></div>`;
}
function radios(name,opts,cur){return `<div class="seg">${opts.map(o=>`<label><input type="radio" name="${name}" id="${name}-${o[0]}" value="${o[0]}" ${String(o[0])===String(cur)?'checked':''}><span>${esc(o[1])}</span></label>`).join('')}</div>`}
function sel(id,opts,cur,label){return `<select class="sel" id="${id}" aria-label="${esc(label)}">${opts.map(o=>`<option value="${o[0]}" ${String(o[0])===String(cur)?'selected':''}>${esc(o[1])}</option>`).join('')}</select>`}
function fld(label,inner){return `<div class="field"><span>${esc(label)}</span>${inner}</div>`}
function vSetup(type){
  const sch=SCHOOLS.map(k=>[k,tr('edu.'+k)]);
  return `${topNav()}<span class="eyebrow">${type} · ${esc(tr('type.'+type+'.n'))}</span>
  <h2 class="riso" style="margin:0;font-size:26px">${esc(tr('setup.title'))}</h2>
  <p style="margin:0;color:var(--muted)">${esc(tr('setup.lead',{country:CN(COUNTRY)}))}</p>
  <form class="setup" id="setupform">
    <div class="field"><span>${esc(tr('p.country'))}</span><button type="button" class="cchip" data-act="home">${flag(COUNTRY)}<b>${esc(CN(COUNTRY))}</b><span>↺</span></button></div>
    ${fld(tr('setup.age'),`<div class="agebox"><output id="ageout">${prof.age}</output><input type="range" id="age" min="15" max="80" value="${prof.age}" aria-label="${esc(tr('setup.age'))}"></div>`)}
    ${fld(tr('setup.status'),radios('status',[['student',tr('st.student')],['work',tr('st.work')],['none',tr('st.none')]],prof.status))}
    <div class="grp" data-for="student">
      ${fld(tr('setup.school'),radios('school',sch,prof.school))}
      ${fld(tr('setup.love'),radios('rel',[['single',tr('rel.single')],['partner',tr('rel.partner')]],prof.rel))}
    </div>
    <div class="grp" data-for="adult">
      ${fld(tr('setup.edu'),radios('edu',sch,prof.edu))}
      ${fld(tr('setup.mar'),radios('mar',[['single',tr('mar.single')],['partner',tr('mar.partner')],['married',tr('mar.married')],['divorced',tr('mar.divorced')]],prof.mar))}
      ${fld(tr('setup.kids'),radios('kids',[0,1,2,3].map(n=>[n,tr('kids.'+n)]),prof.kids))}
    </div>
    <div class="grp" data-for="work">
      ${fld(tr('setup.job'),sel('job',JOBCAT.map(j=>[j,tr('jobcat.'+j)]),prof.job,tr('setup.job')))}
      ${fld(tr('setup.income'),sel('inc',INC.map((b,i)=>[i,rangeLabel(b[0],b[1])]),prof.inc,tr('setup.income')))}
    </div>
    <div class="grp" data-for="none">
      ${fld(tr('setup.sit'),radios('sit',['seek','home','leave','retired'].map(k=>[k,tr('sit.'+k)]),prof.sit))}
    </div>
    <div class="grp" data-for="adult">
      ${fld(tr('setup.savings'),sel('sav',SAV.map((b,i)=>[i,rangeLabel(b[0],b[1])]),prof.sav,tr('setup.savings')))}
      ${fld(tr('setup.health'),radios('health',['good','mid','weak'].map(k=>[k,tr('health.'+k)]),prof.health))}
      ${fld(tr('setup.home'),radios('home',['parents','rent','own'].map(k=>[k,tr('home.'+k)]),prof.home))}
    </div>
  </form>
  <div class="row"><button class="btn" data-act="begin" data-type="${type}">${esc(tr('setup.go'))}</button></div>
  <button class="quick" data-act="quick" data-type="${type}">${esc(tr('setup.quick'))}</button>`;
}
function readSetup(){
  const f=document.getElementById('setupform');if(!f)return prof;
  const v=n=>(f.querySelector(`input[name="${n}"]:checked`)||{}).value;
  const g=id=>document.getElementById(id).value;
  prof={...prof,age:+g('age'),status:v('status')||'student',school:v('school')||'hs',rel:v('rel')||'single',edu:v('edu')||'hs',mar:v('mar')||'single',
    kids:+(v('kids')||0),sav:g('sav'),job:g('job'),inc:g('inc'),health:v('health')||'mid',home:v('home')||'rent',sit:v('sit')||'seek'};
  if(prof.age<18){prof.status='student';if(!['jh','hs'].includes(prof.school))prof.school='hs'}
  ls('mbtiLifeProfile2',JSON.stringify(prof));
  return prof;
}
function syncSetup(){
  const f=document.getElementById('setupform');if(!f)return;const age=+document.getElementById('age').value;
  document.getElementById('ageout').textContent=age;
  const young=age<18;
  ['status-work','status-none'].forEach(id=>{const el=document.getElementById(id);el.disabled=young;if(young&&el.checked){el.checked=false;document.getElementById('status-student').checked=true}});
  ['vo','jc','univ','grad'].forEach(k=>{const el=document.getElementById('school-'+k);el.disabled=young;if(young&&el.checked){el.checked=false;document.getElementById('school-hs').checked=true}});
  const st=(f.querySelector('input[name="status"]:checked')||{}).value||'student';
  f.querySelectorAll('.grp').forEach(gp=>{const k=gp.dataset.for;gp.hidden=!(k===st||(k==='adult'&&st!=='student'))});
}

/* ---------- 進行画面 ---------- */
const YEAR0=new Date().getFullYear();
const yearOf=age=>YEAR0+(age-s.startAge);
function bar(label,v,color){return `<div class="bar"><span>${esc(label)}</span><span class="tr"><i style="width:${v}%;background:${color}"></i></span><span class="v">${Math.round(v)}</span></div>`}
function avatar(){
  let x=s.seed||1;const r=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};
  const col={nt:'var(--blue)',nf:'var(--pink)',sj:'var(--good)',sp:'var(--sun)'}[grp(s.type)];
  let rects='';for(let y=0;y<7;y++)for(let i=0;i<4;i++){if(r()<.55){const xs=i===3?[3]:[i,6-i];xs.forEach(xx=>rects+=`<rect x="${xx}" y="${y}" width="1" height="1"/>`)}}
  return `<svg class="ava" viewBox="-1 -1 9 9" aria-hidden="true"><rect x="-1" y="-1" width="9" height="9" fill="var(--paper)"/><g fill="${col}">${rects}</g></svg>`;
}
function phase(){return s.dead?'—':s.uni?tr('ph.student',{edu:eduName(s.edu)}):s.working?(s.founder?tr('ph.founder'):tr(s.job||'job.default')):s.retired?tr('ph.retired'):s.homemaker?tr('ph.home'):tr('ph.seek')}
function kidLabel(){if(!s.kids)return tr('fam.none');
  return s.kidAges.slice(0,s.kids).map((b,i)=>({a:s.age-b,i})).filter(o=>o.a>=0).map(o=>tr('kid.item',{nth:tr('kid.'+Math.min(o.i,3)),name:s.kidNames[o.i]||'',age:o.a})).join(' · ')||tr('u.people',{n:s.kids})}
function relLabel(){return s.married?tr('fam.married',{name:s.pname,n:s.age-(s.marriedAt||s.age)}):s.partner?tr(s.cohabit?'fam.cohabit':'fam.partner',{name:s.pname}):tr('fam.alone')}
function homeLabel(){return tr(s.house?'h.own':s.atHome?'h.parents':'h.rent')}
function logText(l){if(l.kind==='nar')return l.ks.map(k=>tr(k)).join(SEP());return tr(l.k,l.p)}
function vLife(){
  let dec='';
  if(pending){const e=pending,P=chParams();dec=`<section class="decision" aria-live="polite">
    <div class="dhead"><span class="eyebrow pinkish">${esc(tr('life.big'))}</span><span class="eyebrow pinkish">${esc(tr('u.age',{n:s.age}))} · ${yearOf(s.age)}</span></div>
    <h2 class="dtitle">${esc(tr('life.decTitle',{age:s.age,h:tr('ch.'+e.id+'.h',P)}))}</h2>
    <p class="dbody">${esc(tr('ch.'+e.id+'.body',P))}</p>
    <p class="dnote">${esc(tr('ch.'+e.id+'.note',P))}</p>
    <div class="dopts">${e.o.map((o,i)=>`<button class="dopt" data-choose="${i}"><span class="num">${i+1}</span><span class="lbl">${esc(tr('ch.'+e.id+'.o.'+o.id,P))}</span>${s.t[o.lean]?`<span class="like">${esc(tr('life.like',{type:s.type}))}</span>`:''}</button>`).join('')}</div>
    <button class="btn small ghost" data-act="auto" style="align-self:center">${esc(tr('life.autoAll'))}</button></section>`}
  const groups=[];for(const l of s.log){const g=groups[groups.length-1];if(g&&g.age===l.age)g.items.push(l);else groups.push({age:l.age,items:[l]})}
  const logHtml=groups.slice().reverse().map((g,gi)=>`<li class="yr${gi===0?' new':''}${g.items.some(x=>x.kind==='ms'||x.kind==='ch')?' big':''}"><div class="yh"><b>${esc(tr('u.age',{n:g.age}))}</b><span>${yearOf(g.age)}</span></div><div class="yb">${g.items.map(x=>
     x.kind==='nar'?`<p class="nar">${esc(logText(x))}</p>`:x.kind==='ch'?`<p class="evch">${esc(logText(x))}</p>`:`<p class="ev ${x.kind}">${x.kind==='up'?'<span class="tag up">UP</span>':x.kind==='dn'?'<span class="tag dn">DOWN</span>':''}${esc(logText(x))}</p>`).join('')}</div></li>`).join('');
  const end=s.dead?s.age:Math.max(100,s.age+1);let cells='';
  const msAges=new Set(s.ms.map(m=>m[0]));
  for(let a=s.startAge;a<=end;a++){const i=a-s.startAge-1;const h=a===s.startAge?null:s.hist[i];
    const lived=a<=s.age;const st=lived&&h!=null?`style="--h:${h}"`:'';
    cells+=`<i class="${lived?'on':''}${msAges.has(a)?' ms':''}${a===s.age?' now':''}" ${st} title="${esc(tr('u.age',{n:a}))}${lived&&h!=null?' · '+esc(tr('p.happyTip',{n:h})):''}"></i>`}
  const spd=[1,2,4,8].map(v=>`<button class="sp${speed===v&&!untilChoice?' on':''}" data-speed="${v}">${v}×</button>`).join('');
  return `<header class="topbar">
    <div class="tleft"><span class="brand">${tr('brand.short')}</span><span class="tage">${esc(tr('u.age',{n:s.age}))}</span><span class="tmeta">${flag(s.country)} ${esc(CN(s.country))} · ${yearOf(s.age)} · ${s.type} · ${esc(phase())}</span></div>
    <div class="tctrl">${s.dead?`<button class="btn small" data-act="toend">${esc(tr('life.toEnd'))}</button>`:`
      <button class="sp" data-act="toggle">${esc(tr(timer?'life.pause':'life.play'))}</button>${spd}
      <button class="sp${untilChoice?' on':''}" data-act="next">${esc(tr('life.next'))}</button>
      <button class="sp${autoSkip?' on':''}" data-act="autotoggle">${esc(tr(autoSkip?'life.autoOn':'life.auto'))}</button>
      <button class="sp" data-act="skip">${esc(tr('life.skip'))}</button>`}</div>
    <div class="tprog"><i style="width:${Math.min(100,(s.age-s.startAge)/(Math.max(100,s.age)-s.startAge)*100)}%"></i></div></header>
  <div class="lifegrid">
    <div class="col">
      <section class="panel idcard o2"><div class="idhead"><span>${esc(tr('p.id'))} · ${s.type}</span><span>${COUNTRIES[s.country].code}</span></div>
        <div class="idbody">${avatar()}<div class="idinfo"><h3>${esc(tr('type.'+s.type+'.n'))}</h3><dl>
          <dt>${esc(tr('p.country'))}</dt><dd>${flag(s.country)} ${esc(CN(s.country))}</dd>
          <dt>${esc(tr('p.start'))}</dt><dd>${esc(tr('u.age',{n:s.startAge}))} · ${yearOf(s.startAge)}</dd>
          <dt>${esc(tr('p.now'))}</dt><dd>${esc(phase())}</dd>
          <dt>${esc(tr('p.edu'))}</dt><dd>${esc(eduName(s.edu))}${s.uni?esc(tr('p.inSchool')):''}</dd>
          <dt>${esc(tr('p.home'))}</dt><dd>${esc(homeLabel())}</dd></dl></div></div>
        <div class="mrz">L&lt;16&lt;&lt;${s.type}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;${yearOf(s.startAge)}<br>${String(s.seed).padStart(9,'0').slice(0,9)}&lt;${COUNTRIES[s.country].code}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div></section>
      <section class="panel o3"><div class="ph"><h3>${esc(tr('p.status'))}</h3><span>0–100</span></div>
        <div class="bars">${bar(tr('p.health'),s.health,'var(--good)')}${bar(tr('p.happy'),s.happy,'var(--sun)')}${bar(tr('p.love'),s.love,'var(--pink)')}${bar(tr('p.work'),s.career,'var(--blue)')}</div>
        <div class="money"><span>${esc(tr('p.savings'))} <b>${esc(fmtMoney(s.money))}</b></span><span>${s.working&&s.income?esc(tr('p.income'))+' <b>'+esc(fmtMoney(s.income))+'</b>':s.retired?esc(tr('p.pension')):s.uni?esc(tr('p.student')):''}</span></div></section>
    </div>
    <div class="col center">
      ${sceneHtml()}
      ${dec?`<div class="o1">${dec}</div>`:''}
      <section class="panel o6 logp"><div class="ph"><h3>${esc(tr('p.log'))}</h3><span>${esc(tr('p.newest'))}</span></div><ol class="log">${logHtml}</ol></section>
    </div>
    <div class="col">
      <section class="panel o4"><div class="ph"><h3>${esc(tr('p.family'))}</h3></div><dl class="kv">
        <dt>${esc(tr('p.partner'))}</dt><dd>${esc(relLabel())}</dd>
        <dt>${esc(tr('p.kids'))}</dt><dd>${esc(kidLabel())}</dd>
        ${s.grand?`<dt>${esc(tr('p.grand'))}</dt><dd>${esc(tr('u.people',{n:s.grand}))}</dd>`:''}
        <dt>${esc(tr('p.home'))}</dt><dd>${esc(homeLabel())}</dd>
        ${s.pet?`<dt>${esc(tr('p.pet'))}</dt><dd>${esc(tr('p.cat'))}</dd>`:''}
        <dt>${esc(tr('p.job'))}</dt><dd>${esc(phase())}</dd></dl></section>
      <section class="panel o5"><div class="ph"><h3>${esc(tr('p.map'))}</h3><span>${esc(tr('p.mapUnit'))}</span></div><div class="lmap">${cells}</div>
        <p class="maplg"><i class="on" style="--h:20"></i>${esc(tr('p.mapBad'))} <i class="on" style="--h:85"></i>${esc(tr('p.mapGood'))} <i class="on ms" style="--h:60"></i>${esc(tr('p.mapBig'))}</p></section>
    </div>
  </div>`;
}

/* ---------- 称号・運勢・キーワード ---------- */
function titleIdx(){
  if(s.founder&&s.startup&&s.money>4000)return 0;
  if(s.kids>=2&&s.grand>=1&&s.love>65)return 1;
  if(s.age>=95)return 2;
  if(s.trips>=4)return 3;
  if(s.career>=85)return 4;
  if(s.love>=80)return 5;
  if(s.money>=7000)return 6;
  if(s.happy>=75)return 7;
  if(s.founder&&!s.startup)return 8;
  return 9;
}
const title=()=>tr('title.'+titleIdx());
const c15=v=>Math.max(1,Math.min(5,Math.round(v)));
function ratings(){const mi=s.maxIncome||0;
  return {work:c15(mi>=1000?5:s.career/20+0.6),money:c15(s.money<0?1:s.money<500?2:s.money<2000?3:s.money<6000?4:5),
    love:c15(s.love/22+(s.married?1:0)+(s.kids?0.5:0)),health:c15(s.age<70?1:s.age<78?2:s.age<86?3:s.age<94?4:5)}}
const KW=[[['ms.startup'],'kw.challenge'],[['ms.abroad','ms.emigrate','ms.world','ms.travel'],'kw.adventure'],[['ms.married','ms.partner'],'kw.love'],[['ms.baby','ms.grand'],'kw.family'],
  [['ms.house'],'kw.stable'],[['ms.move'],'kw.slow'],[['ms.book'],'kw.express'],[['ms.jobchange'],'kw.turn'],[['ms.divorce'],'kw.restart'],[['ms.return'],'kw.comeback'],[['ms.retire','ms.retireF','ms.early'],'kw.closure']];
function keywords(){const out=[];
  for(const [ks,w] of KW){if(out.length>=3)break;if(s.ms.some(m=>ks.includes(m[1]))&&!out.includes(w))out.push(w)}
  for(const c of s.type){if(out.length>=3)break;const w='kw.'+c;if(!out.includes(w))out.push(w)}
  return out.slice(0,3)}
function curve(n){const h=s.hist.length?s.hist:[s.happy];const o=[];for(let i=0;i<n;i++)o.push(h[Math.floor(i*(h.length-1)/(n-1||1))]);return o}
function starStr(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
const RATES=['work','money','love','health'];

/* ---------- シェア ---------- */
/* 収益化の設定：ここに入れるだけで表示される */
const TIP_URLS={ja:'',other:''};          // 投げ銭：ja=OFUSE など / other=Ko-fi など（空なら非表示）
const ADSENSE={client:'ca-pub-4478590779171256',slot:''};        // 広告：AdSense の ca-pub-… と広告ユニットID（空なら非表示）
const CONTACT_URL='https://businessmaker.net/';
const tipUrl=()=>lang==='ja'?(TIP_URLS.ja||TIP_URLS.other):(TIP_URLS.other||TIP_URLS.ja);
function tipBox(){const u=tipUrl();return u?`<div class="tipbox"><div><b>${esc(tr('tip.h'))}</b><p>${esc(tr('tip.p'))}</p></div><a class="btn pinkbtn" href="${esc(u)}" target="_blank" rel="noopener">♥ ${esc(tr('tip.btn'))}</a></div>`:''}
function footer(){return `<footer class="foot">${tipUrl()?`<a href="${esc(tipUrl())}" target="_blank" rel="noopener">♥ ${esc(tr('tip.btn'))}</a>`:''}<a href="privacy.html">${esc(tr('foot.privacy'))}</a><a href="${CONTACT_URL}" target="_blank" rel="noopener">${esc(tr('foot.contact'))}</a><span>© BusinessMaker</span></footer>`}
let adLoaded=false;
function syncAd(){const w=document.getElementById('adwrap');if(!w)return;const show=!!(ADSENSE.client&&ADSENSE.slot)&&['home','end','friend'].includes(view)&&!shareOpen;
  w.hidden=!show;if(!show)return;w.querySelector('.adl').textContent=tr('ad.label');
  if(!adLoaded){adLoaded=true;const sc=document.createElement('script');sc.async=true;sc.crossOrigin='anonymous';sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+ADSENSE.client;document.head.appendChild(sc);
    const ins=w.querySelector('ins');ins.setAttribute('data-ad-client',ADSENSE.client);ins.setAttribute('data-ad-slot',ADSENSE.slot);(window.adsbygoogle=window.adsbygoogle||[]).push({})}}
const SHARE_URL='https://mbti.businessmaker.net/';
function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function dec(t){try{t=t.replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(decodeURIComponent(escape(atob(t))))}catch(e){return null}}
function shareData(){return {t:s.type,a:s.age,ti:titleIdx(),r:ratings(),kw:keywords(),c:curve(24),l:lang,cc:s.country}}
function resultUrl(){return SHARE_URL+'r/'+(lang==='ja'?'':lang+'/')+s.type+'-'+titleIdx()+'/?r='+enc(shareData())}
function shareBody(){return tr('share.text',{type:s.type,title:title(),age:s.age,country:CN(s.country),kw:keywords().map(k=>tr(k)).join(tr('kw.sep'))})}
function shareWord(){const w=document.getElementById('shword');return w&&w.value.trim()?w.value.trim().slice(0,140)+'\n\n':''}
function shareText(){return shareWord()+shareBody()+'\n'+resultUrl()}
function xUrl(){return 'https://x.com/intent/post?text='+encodeURIComponent(shareWord()+shareBody())+'&url='+encodeURIComponent(resultUrl())}
function threadsUrl(){return 'https://www.threads.net/intent/post?text='+encodeURIComponent(shareText())}
let friend=null;
try{const r=qs.get('r');const o=r&&dec(r);if(o&&ORDER.includes(o.t)&&+o.a>0){friend=o;view='friend';if(o.cc&&COUNTRIES[o.cc]&&!qs.get('c')&&!ls('mbtiCountry'))COUNTRY=o.cc}}catch(e){}
function rateHtml(r){return `<div class="rates">${RATES.map(k=>{const v=c15(r&&r[k]);return `<div><span>${esc(tr('rate.'+k))}</span><b class="st">${starStr(v)}</b><i>${esc(tr('rate.'+k+'.'+v))}</i></div>`}).join('')}</div>`}
function sparkSvg(c,label){c=(Array.isArray(c)?c:[]).map(v=>Math.max(0,Math.min(100,+v||0)));if(c.length<2)return '';
  const W=300,H=60,pts=c.map((v,i)=>[(i/(c.length-1))*W,H-4-(v/100)*(H-8)]);
  const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  return `<figure class="spark"><figcaption>${esc(label)}</figcaption><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${d} L${W} ${H} L0 ${H}Z" fill="var(--pink)" opacity=".14"/><path d="${d}" fill="none" stroke="var(--pink)" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg></figure>`}
function vFriend(){
  const f=friend,n=v=>Math.max(0,Math.round(+v||0));
  const ti=typeof f.ti==='number'?tr('title.'+Math.max(0,Math.min(9,f.ti))):String(f.ti||'').slice(0,30);
  const kw=Array.isArray(f.kw)?f.kw.slice(0,3).map(w=>esc(/^kw\.[A-Za-z]+$/.test(w)?tr(w):String(w).slice(0,12))):[];
  const cc=COUNTRIES[f.cc]?f.cc:null;
  return `${topNav()}<span class="eyebrow">${esc(tr('fr.eyebrow'))}</span>
  <div class="grave dots"><span class="eyebrow">${f.t} · ${esc(tr('type.'+f.t+'.n'))}</span><span class="span">${cc?flag(cc)+' '+esc(CN(cc))+' · ':''}${esc(tr('fr.age',{age:n(f.a)}))}</span><h2 class="riso">${esc(ti)}</h2>
  ${rateHtml(f.r)}
  ${kw.length?`<div class="kws">${kw.map(w=>`<span>#${w}</span>`).join('')}</div>`:''}
  ${sparkSvg(f.c,tr('fr.wave'))}</div>
  <div class="friendcta"><h3>${esc(tr('fr.ctaH'))}</h3><p>${esc(tr('fr.ctaP'))}</p><button class="btn" data-act="home">${esc(tr('fr.ctaBtn'))}</button></div>`;
}

/* ---------- 最期の演出 ---------- */
let fin={slides:[],i:0,t:0};
function causeKey(){return s.health<25?'hosp':(s.married||s.kids)?'family':s.age>=85?'sleep':'alone'}
function listJoin(a){return a.join(tr('list.sep'))}
function attendList(){const a=[];if(s.married&&s.pname)a.push(tr('fin.att.partner',{name:s.pname}));if(s.kids)a.push(tr('fin.att.kids',{n:s.kids}));if(s.grand)a.push(tr('fin.att.grand',{n:s.grand}));a.push(tr('fin.att.friends'));return listJoin(a)}
function buildFinale(){
  const cc=s.country,sl=[];
  sl.push({t:'text',big:tr('fin.lastYear',{age:s.age}),lines:[tr('fin.cause.'+causeKey(),{country:CN(cc)}),tr('fin.last',{w:tr('last.'+grp(s.type)+'.'+(s.seed%2))})],dur:5200});
  sl.push({t:'scene',key:null,place:s.startPlace||'home',age:s.startAge,label:'sc.start',cap:tr('fin.memStart',{age:s.startAge,country:CN(cc)})});
  let mems=[];const seen=new Set();
  for(const [age,k,p] of s.ms){const key=MS_SCENE[k];if(!key)continue;const id=key+'|'+age;if(seen.has(id))continue;seen.add(id);mems.push({t:'scene',key,age,label:'sc.'+key,cap:tr(k,p)})}
  if(mems.length>9){const step=mems.length/9;mems=Array.from({length:9},(_,i)=>mems[Math.floor(i*step)])}
  sl.push(...mems);
  sl.push({t:'scene',key:'funeral',age:s.age,label:'sc.funeral',cap:tr('fin.funeral.'+cc),sub:tr('fin.attend',{list:attendList()}),dur:5600});
  sl.push({t:'sum'});
  fin={slides:sl,i:0,t:0};
}
function startFinale(){stop();buildFinale();view='finale';shareOpen=false;render();scheduleFin()}
function scheduleFin(){clearTimeout(fin.t);const sl=fin.slides[fin.i];if(!sl||sl.t==='sum')return;fin.t=setTimeout(()=>{finNext()},sl.dur||3000)}
function finNext(){if(view!=='finale')return;if(fin.i<fin.slides.length-1){fin.i++;render();scheduleFin()}}
function vFinale(){
  const sl=fin.slides[fin.i],n=fin.slides.length;let body='';
  if(sl.t==='text')body=`<h2 class="fbig">${esc(sl.big)}</h2>${sl.lines.map((l,i)=>`<p class="fline" style="animation-delay:${.9+i*1.2}s">${esc(l)}</p>`).join('')}`;
  else if(sl.t==='scene'){sceneOverride={key:sl.key,age:sl.age,place:sl.place};
    body=`<div class="fscene"><canvas id="fscene" width="${SW}" height="${SH}" role="img" aria-label="${esc(tr(sl.label))}"></canvas></div>
      <p class="fage">${esc(tr('u.age',{n:sl.age}))} · ${yearOf(sl.age)}</p><p class="fcap">${esc(sl.cap)}</p>${sl.sub?`<p class="fline" style="animation-delay:1.2s">${esc(sl.sub)}</p>`:''}`}
  else{const T=tr('type.'+s.type+'.n');const fam=[];if(s.kids)fam.push(tr('fin.att.kids',{n:s.kids}));if(s.grand)fam.push(tr('fin.att.grand',{n:s.grand}));
    const yrs=s.age;const birth=yearOf(0),death=yearOf(s.age);
    body=`<h2 class="fname">${s.type} · ${esc(T)}</h2><p class="fyrs">${flag(s.country)} ${esc(CN(s.country))} · ${birth} – ${death}</p>
      <p class="fline" style="animation-delay:.5s">${esc(tr('fin.sumYears',{years:yrs,days:Math.round(yrs*365.25).toLocaleString(NUM_LOCALE[lang])}))}</p>
      <p class="fline" style="animation-delay:1.4s">${esc(fam.length?tr('fin.sumFamily',{list:listJoin(fam)}):tr('fin.sumMemories'))}</p>
      <p class="fline strong" style="animation-delay:2.4s">${esc(tr('fin.sumOne'))}</p>
      <button class="btn finbtn" data-act="record" style="animation-delay:3.2s">${esc(tr('fin.record'))}</button>`}
  return `<div class="fin" data-act="finnext"><button class="fskip" data-act="record">${esc(tr('fin.skip'))}</button>
    <div class="fbody" key="${fin.i}">${body}</div>
    <div class="fprog" aria-hidden="true"><i style="width:${(fin.i+1)/n*100}%"></i></div>
    ${sl.t!=='sum'?`<p class="ftap">${esc(tr('fin.tap'))}</p>`:''}</div>`;
}

/* ---------- 人生の記録（結果） ---------- */
function bestAge(){if(!s.hist.length)return s.startAge;let bi=0;s.hist.forEach((v,i)=>{if(v>s.hist[bi])bi=i});return s.startAge+1+bi}
function recSummary(){const P=[];
  P.push(tr('rec.s.born',{country:CN(s.country),age:s.startAge,type:s.type}));
  P.push(tr('rec.s.edu',{edu:eduName(s.edu)}));
  if(s.job&&s.maxIncome)P.push(tr('rec.s.job',{job:tr(s.job),inc:fmtMoney(s.maxIncome)}));
  if(s.married&&s.pname)P.push(tr('rec.s.married',{name:s.pname})+(SEP()&&!/[ ,，、]$/.test(tr('rec.s.married',{name:s.pname}))?SEP():'')+(s.kids?tr('rec.s.kids',{k:s.kids,g:s.grand}):tr('rec.s.noKids')));
  else P.push(s.kids?tr('rec.s.kids',{k:s.kids,g:s.grand}):tr('rec.s.single'));
  P.push(tr('rec.s.end',{age:s.age}));
  return P.join(SEP())}
function vEnd(){
  const no=COUNTRIES[s.country].code+'-'+yearOf(0)+'-'+String(s.seed%10000).padStart(4,'0');
  const hl=s.ms.filter(m=>!['ms.job'].includes(m[1]));
  const f=(k,v)=>`<div><dt>${esc(tr(k))}</dt><dd>${v}</dd></div>`;
  let cells='';const msAges=new Set(s.ms.map(m=>m[0]));
  for(let a=s.startAge+1;a<=s.age;a++){const h=s.hist[a-s.startAge-1];cells+=`<i class="on${msAges.has(a)?' ms':''}" style="--h:${h}" title="${esc(tr('u.age',{n:a}))}"></i>`}
  return `${topNav()}
  <article class="record">
    <header class="rhead"><span>${esc(tr('rec.head'))}</span><span>No. ${no}</span></header>
    <div class="rbody">
      <div class="rmain">
        <span class="eyebrow">${flag(s.country)} ${esc(CN(s.country))} · ${s.type}</span>
        <h1 class="rname">${esc(tr('type.'+s.type+'.n'))}</h1>
        <p class="rspan">${esc(tr('rec.span',{y0:yearOf(0),y1:yearOf(s.age),age:s.age,country:CN(s.country)}))}</p>
        <p class="rsum">${esc(recSummary())}</p>
        <p class="rcause">${esc(tr('rec.f.cause'))}: ${esc(tr('fin.cause.'+causeKey(),{country:CN(s.country)}))}</p>
        <p class="rtitle"><span>${esc(tr('rec.f.title'))}</span><b>${esc(q(title()))}</b></p>
      </div>
      <dl class="rfields">
        ${f('rec.f.edu',esc(eduName(s.edu)))}
        ${f('rec.f.job',esc(s.job?tr(s.job):'—'))}
        ${f('rec.f.partner',esc(s.married&&s.pname?s.pname:(s.divorced?tr('mar.divorced'):'—')))}
        ${f('rec.f.kids',esc(tr('rec.kg',{k:s.kids,g:s.grand})))}
        ${f('rec.f.maxInc',esc(s.maxIncome?fmtMoney(s.maxIncome):'—'))}
        ${f('rec.f.wealth',esc(fmtMoney(s.money)))}
        ${f('rec.f.best',esc(tr('u.age',{n:bestAge()})))}
        ${f('rec.f.decisions',esc(tr('rec.count',{n:s.decisions})))}
        ${f('rec.f.likes',keywords().map(k=>`<span class="kwc">#${esc(tr(k))}</span>`).join(' '))}
      </dl>
    </div>
    <div class="rmap"><div class="lmap">${cells}</div></div>
  </article>
  <section class="sec"><h3>${esc(tr('rec.highlights'))}</h3><ul class="mslist">${hl.map(m=>`<li><span>${esc(tr('u.age',{n:m[0]}))}</span>${esc(tr(m[1],m[2]))}</li>`).join('')||`<li><span>—</span>${esc(tr('rec.quiet'))}</li>`}</ul></section>
  <div class="ractions">
    <button class="btn ghost" data-act="replay">${esc(tr('rec.replay'))}</button>
    <button class="btn pinkbtn" data-act="shopen">${esc(tr('rec.share'))}</button>
    <button class="btn" data-act="again">${esc(tr('rec.again'))}</button>
  </div>
  <button class="quick" data-act="home">${esc(tr('rec.other'))}</button>
  ${tipBox()}
  <p class="note">${esc(tr('rec.note'))}</p>
  ${footer()}
  ${shareOpen?vShare():''}`;
}
function vShare(){
  return `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="shT"><div class="mbox">
    <div class="mhead"><h3 id="shT">${esc(tr('sh.title'))}</h3><button class="mx" data-act="shclose" aria-label="${esc(tr('sh.close'))}">×</button></div>
    <p class="mlead">${esc(tr('sh.lead'))}</p>
    <label class="mword"><span>${esc(tr('sh.word'))}</span><textarea id="shword" rows="2" maxlength="140" placeholder="${esc(tr('sh.wordPh'))}"></textarea></label>
    <button class="btn pinkbtn wide" data-act="nshare" id="nshare" hidden>${esc(tr('sh.img'))}</button>
    <div class="mgrid">
      <a class="sbtn" id="shx" href="${xUrl()}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/></svg>${esc(tr('sh.x'))}</a>
      <a class="sbtn" id="shth" href="${threadsUrl()}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 22c-3 0-5.3-1-6.8-2.9C4 17.4 3.3 15 3.3 12s.7-5.4 2.1-7.1C6.9 3 9.2 2 12.2 2c2.3 0 4.2.6 5.6 1.7 1.3 1 2.2 2.5 2.7 4.3l-2 .5c-.8-3-3-4.5-6.3-4.5-2.4 0-4.2.7-5.3 2.2-1 1.3-1.6 3.3-1.6 5.8s.5 4.5 1.6 5.8c1.1 1.5 2.9 2.2 5.3 2.2 2.1 0 3.6-.5 4.8-1.6 1.3-1.2 1.3-2.7.9-3.6-.2-.5-.6-1-1.1-1.3-.1 1-.4 1.8-.9 2.5-.8 1-1.9 1.6-3.3 1.7-1.1.1-2.1-.2-2.9-.7-.9-.6-1.4-1.5-1.5-2.5-.1-2 1.5-3.4 4-3.6.9-.1 1.7 0 2.5.1-.1-.6-.3-1-.6-1.3-.4-.5-1.1-.7-2-.7-1.2 0-2 .4-2.6 1.2l-1.6-1.1c.9-1.3 2.3-2 4.2-2 1.5 0 2.6.5 3.4 1.4.7.8 1 1.9 1.1 3.3.6.3 1.1.6 1.5 1.1.7.8 1.1 1.9 1.1 3.1 0 1.5-.6 3-1.9 4.1-1.5 1.4-3.5 2.1-6.1 2.2Zm.5-9.2h-.5c-1.6.1-2.4.8-2.4 1.6.1.9 1 1.3 2 1.2 1.6-.1 2.3-1.1 2.5-2.6-.5-.1-1-.2-1.6-.2Z"/></svg>${esc(tr('sh.threads'))}</a>
      <button class="sbtn" data-act="copy">${esc(tr('sh.copy'))}</button>
      <button class="sbtn" data-act="saveimg">${esc(tr('sh.save'))}</button>
    </div>
    <figure class="mprev"><figcaption>${esc(tr('sh.preview'))}</figcaption><img class="imgcard" id="cardimg" alt="${esc(s.type+' · '+title())}"></figure>
    <p class="note">${esc(tr('sh.privacy'))}</p>
  </div></div>`;
}
function updShareLinks(){const x=document.getElementById('shx'),t=document.getElementById('shth');if(x)x.href=xUrl();if(t)t.href=threadsUrl()}
const FONTS={fr:['"Dela Gothic One"','"Zen Kaku Gothic New"'],de:['"Dela Gothic One"','"Zen Kaku Gothic New"'],it:['"Dela Gothic One"','"Zen Kaku Gothic New"'],pt:['"Dela Gothic One"','"Zen Kaku Gothic New"'],id:['"Dela Gothic One"','"Zen Kaku Gothic New"'],ja:['"Dela Gothic One"','"Zen Kaku Gothic New"'],en:['"Dela Gothic One"','"Zen Kaku Gothic New"'],es:['"Dela Gothic One"','"Zen Kaku Gothic New"'],ko:['"Black Han Sans"','"Noto Sans KR"'],zh:['"Noto Sans TC"','"Noto Sans TC"']};
async function drawCard(){
  const img=document.getElementById('cardimg');if(!img)return;
  const F=FONTS[lang]||FONTS.ja;const DW=lang==='zh'?'900 ':'';
  try{await Promise.all([document.fonts.load(DW+'80px '+F[0]),document.fonts.load('700 30px '+F[1])])}catch(e){}
  const W=1200,H=675,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  const P='#F2367F',B='#2D57F0',INK='#1A1D3A',PAPER='#EDEFF5',MUTED='#5E6385',GOLD='#E0A400';
  const D=DW+'{s}px '+F[0]+',sans-serif',BD=F[1]+',sans-serif';const DF=n=>D.replace('{s}',n);
  const sd=shareData();
  g.fillStyle=PAPER;g.fillRect(0,0,W,H);
  g.fillStyle='rgba(45,87,240,.16)';for(let y=6;y<H;y+=16)for(let x=(y/16%2)*8+6;x<W;x+=16){g.beginPath();g.arc(x,y,2,0,7);g.fill()}
  g.fillStyle=B;g.fillRect(52,52,W-96,H-96);g.fillStyle='#F8F9FC';g.fillRect(40,40,W-96,H-96);
  g.strokeStyle=INK;g.lineWidth=4;g.strokeRect(40,40,W-96,H-96);
  g.font=DF(150);g.textBaseline='alphabetic';
  g.fillStyle='rgba(45,87,240,.55)';g.fillText(sd.t,84,224);g.fillStyle=P;g.fillText(sd.t,78,218);
  g.fillStyle=MUTED;g.font='500 26px '+BD;g.fillText(tr('type.'+sd.t+'.n')+'  |  '+CN(s.country),84,266);
  g.save();g.translate(940,150);g.rotate(-0.12);g.strokeStyle=P;g.lineWidth=5;g.beginPath();g.arc(0,0,92,0,7);g.stroke();
  g.fillStyle=P;g.textAlign='center';g.font='700 26px '+BD;g.fillText(tr('cv.age'),0,-22);g.font=DF(72);g.fillText(sd.a,0,50);g.restore();
  const tt=q(title());let fs=60;g.font=DF(fs);while(g.measureText(tt).width>W-170&&fs>32){fs-=4;g.font=DF(fs)}
  g.fillStyle='rgba(242,54,127,.6)';g.fillText(tt,84,356);g.fillStyle=INK;g.fillText(tt,80,352);
  RATES.forEach((k,i)=>{const x=84+i*262,v=sd.r[k];
    g.fillStyle=MUTED;g.font='500 22px '+BD;g.fillText(tr('rate.'+k),x,408);
    g.font='30px '+BD;for(let s2=0;s2<5;s2++){g.fillStyle=s2<v?GOLD:'#C9CDE0';g.fillText('★',x+s2*30,446)}
    g.fillStyle=INK;let rf=24;g.font='700 '+rf+'px '+BD;const rl=tr('rate.'+k+'.'+v);while(g.measureText(rl).width>230&&rf>14){rf-=2;g.font='700 '+rf+'px '+BD}g.fillText(rl,x,482)});
  g.font='700 24px '+BD;let kx=84;
  sd.kw.forEach(w=>{const t='#'+tr(w),tw=g.measureText(t).width+32;g.fillStyle=INK;g.beginPath();g.roundRect(kx,510,tw,46,23);g.fill();g.fillStyle='#fff';g.fillText(t,kx+16,541);kx+=tw+12});
  const cx=Math.max(kx+30,700),cw=W-96-cx-20,cy=520,ch=46,cv=sd.c;
  if(cw>120&&cv.length>1){g.fillStyle=MUTED;g.font='500 18px '+BD;g.fillText(tr('cv.wave'),cx,cy-8);
    g.beginPath();cv.forEach((v,i)=>{const x=cx+i/(cv.length-1)*cw,y=cy+ch-v/100*ch;i?g.lineTo(x,y):g.moveTo(x,y)});
    g.strokeStyle=P;g.lineWidth=4;g.lineJoin='round';g.stroke();
    g.lineTo(cx+cw,cy+ch);g.lineTo(cx,cy+ch);g.closePath();g.fillStyle='rgba(242,54,127,.12)';g.fill()}
  g.fillStyle=INK;g.fillRect(40,H-96,W-96,40);g.fillStyle='#fff';g.font='700 22px '+BD;g.textAlign='left';g.fillText(tr('cv.hash'),64,H-68);
  g.textAlign='right';g.fillText(tr('cv.foot'),W-80,H-68);
  img.src=c.toDataURL('image/png');
  try{const nb=document.getElementById('nshare');if(nb&&navigator.canShare&&navigator.canShare({files:[new File([new Blob(['x'])],'a.png',{type:'image/png'})]}))nb.hidden=false}catch(e){}
}

/* ---------- 描画・操作 ---------- */
function render(){
  if(view!=='finale')sceneOverride=null;
  app.innerHTML=view==='home'?vHome():view==='quiz'?vQuiz():view==='card'?vCard(cardType,cardFromQuiz):view==='setup'?vSetup(cardType):view==='friend'?vFriend():view==='life'?vLife():view==='finale'?vFinale():vEnd();
  app.classList.toggle('wide',view==='life'||view==='end');app.classList.toggle('mid',view==='home');
  document.body.classList.toggle('dark-stage',view==='finale');
  if(view==='setup')syncSetup();
  if(view==='end'&&shareOpen)drawCard();
  syncAd();
  startLoop();
}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,1800)}
function go(v){stop();view=v;render();scrollTo(0,0)}
function quickRun(){stop();autoSkip=true;if(pending)resolveAuto();let g=0;while(!s.dead&&g++<200){step()}startFinale();scrollTo(0,0)}

document.addEventListener('keydown',e=>{
  if(view==='life'&&pending&&/^[1-4]$/.test(e.key)&&pending.o[+e.key-1]){resolve(+e.key-1);render()}
  if(view==='finale'&&(e.key===' '||e.key==='Enter'||e.key==='ArrowRight')){e.preventDefault();finNext()}
  if(view==='end'&&shareOpen&&e.key==='Escape'){shareOpen=false;render()}
});
app.addEventListener('input',e=>{if(e.target.id==='age')syncSetup();if(e.target.id==='shword')updShareLinks()});
app.addEventListener('change',e=>{
  if(e.target.name==='status')syncSetup();
  if(e.target.id==='langsel'){if(view==='setup')readSetup();lang=e.target.value;applyLang();render()}
});
app.addEventListener('click',e=>{
  const b=e.target.closest('button,[data-act]');if(!b)return;
  if(b.dataset.country){COUNTRY=b.dataset.country;const l=COUNTRIES[COUNTRY].lang;if(I18N[l])lang=l;applyLang();render();return}
  if(b.dataset.type&&!b.dataset.act){cardType=b.dataset.type;cardFromQuiz=false;go('card');return}
  if(b.dataset.ans){qa.push(b.dataset.ans);qi++;
    if(qi>=QUIZ.length){const c=k=>qa.filter(x=>x===k).length;cardType=(c('E')>=2?'E':'I')+(c('S')>=2?'S':'N')+(c('T')>=2?'T':'F')+(c('J')>=2?'J':'P');cardFromQuiz=true;view='card'}
    render();return}
  if(b.dataset.choose){resolve(+b.dataset.choose);render();return}
  if(b.dataset.speed){speed=+b.dataset.speed;untilChoice=false;if(!pending&&!s.dead)play();render();return}
  const a=b.dataset.act;
  if(a==='home'){if(friend){friend=null;try{history.replaceState(null,'',location.pathname)}catch(e){}}clearTimeout(fin.t);go('home')}
  if(a==='setup'){cardType=b.dataset.type;go('setup')}
  if(a==='quiz'){qi=0;qa=[];go('quiz')}
  if(a==='begin'){stop();pending=null;autoSkip=false;speed=1;const p=view==='setup'?readSetup():prof;startLife(b.dataset.type,p);
    view='life';render();scrollTo(0,0);if(!pending)play()}
  if(a==='quick'){pending=null;startLife(b.dataset.type,readSetup());quickRun();return}
  if(a==='toggle'){timer?stop():play();render()}
  if(a==='next'){if(pending)return;untilChoice=true;play();render()}
  if(a==='autotoggle'){autoSkip=!autoSkip;if(autoSkip&&pending)resolveAuto();render()}
  if(a==='auto'){autoSkip=true;resolveAuto();render()}
  if(a==='toend'){startFinale();scrollTo(0,0)}
  if(a==='skip'){quickRun()}
  if(a==='finnext'){if(e.target.closest('.fskip,.finbtn'))return;finNext()}
  if(a==='record'){e.stopPropagation();clearTimeout(fin.t);shareOpen=false;go('end')}
  if(a==='replay'){startFinale();scrollTo(0,0)}
  if(a==='again'){const t=s.type;stop();pending=null;autoSkip=false;speed=1;COUNTRY=s.country;startLife(t,prof);view='life';render();scrollTo(0,0);if(!pending)play()}
  if(a==='shopen'){shareOpen=true;render()}
  if(a==='shclose'){shareOpen=false;render()}
  if(a==='saveimg'){const im=document.getElementById('cardimg');if(!im||!im.src)return;const l=document.createElement('a');l.href=im.src;l.download='onelife16_'+s.type+'_'+s.age+'.png';document.body.appendChild(l);l.click();l.remove();toast(tr('t.saved'))}
  if(a==='nshare'){const im=document.getElementById('cardimg');fetch(im.src).then(r=>r.blob()).then(bl=>{const f=new File([bl],'onelife16.png',{type:'image/png'});return navigator.share({files:[f],text:shareText()})}).catch(()=>{})}
  if(a==='copy'){const t=shareText();
    const fallback=()=>{const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast(tr('t.copied'))}catch(err){toast(tr('t.select'))}ta.remove()};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>toast(tr('t.copied')),fallback);else fallback()}
});
applyLang();
render();
