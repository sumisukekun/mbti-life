process.chdir(require('node:path').resolve(__dirname,'..'));
const vm=require('vm'),fs=require('fs'),assert=require('node:assert/strict');
const el={value:"",classList:{toggle(){}},addEventListener(){},hidden:false,style:{}};
const c={btoa,atob,console,URLSearchParams,URL,Intl,Date,Math,JSON,location:{search:'',pathname:'/'},navigator:{language:'ja'},localStorage:{data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=v}},document:{getElementById(id){return id==='adwrap'?null:el},documentElement:{},body:{classList:{toggle(){}}},addEventListener(){}},setTimeout(){},clearTimeout(){},setInterval(){return 1},clearInterval(){},requestAnimationFrame(){return 1},scrollTo(){},I18N:{}};c.window=c;vm.createContext(c);
for(const f of ['i18n/ja.js','scene.js','result-card.js','app.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
(async()=>{
 vm.runInContext(`launch83(true);stop();autoSkip=true;while(!s.dead){if(pending)resolveAuto();step()}`,c);
 const result=vm.runInContext('resultUrl()',c),u=new URL(result);assert.match(u.pathname,/^\/share\/ja\/[0-9]\/$/);assert.deepEqual(JSON.parse(JSON.stringify(vm.runInContext(`dec(new URL(resultUrl()).searchParams.get('r'))`,c))),JSON.parse(JSON.stringify(vm.runInContext('shareData()',c))));
 const line94=new URL(vm.runInContext('lineShareUrl94(true)',c));assert.equal(line94.origin,'https://social-plugins.line.me');assert.equal(line94.pathname,'/lineit/share');assert.equal(line94.searchParams.get('url'),result);assert(line94.searchParams.get('text').includes(vm.runInContext('s.type',c)));assert(!line94.searchParams.get('text').includes('undefined'));const invite94=new URL(vm.runInContext('lineShareUrl94()',c));assert.equal(invite94.searchParams.get('url'),'https://mbti.businessmaker.net/play/?v=94');assert(vm.runInContext('vHome()',c).includes('LINEで友達に紹介'));assert(vm.runInContext('vEnd()',c).includes('LINEで結果を送る'));
 const markup=vm.runInContext('vShare()',c);assert(markup.includes('結果画像をコピー'));assert(!markup.includes('Ctrl'));assert(!markup.includes('xsteps'));const end92=vm.runInContext('vEnd()',c);assert.equal((end92.match(/Xに投稿する<\/a>/g)||[]).length,1);const intent92=new URL(vm.runInContext('xUrl()',c));assert.equal(intent92.origin,'https://x.com');assert.equal(intent92.searchParams.get('text'),vm.runInContext('shareBody()',c));assert.equal(intent92.searchParams.get('url'),result);assert(vm.runInContext('vEnd()',c).includes('data-act="shopen"'));
 assert(!markup.includes('id="shword"'),'No personal opinion input');
 const scenarios=[{founder:true,startup:true,money:5000},{kids:2,grand:1,love:75},{age:98},{trips:5},{career:90},{love:90},{money:8000},{happy:80},{founder:true,startup:false},{}];
 const original=vm.runInContext('JSON.stringify(s)',c);
 for(let i=0;i<scenarios.length;i++){
   c.scenario=scenarios[i];c.originalState=original;
   const model=vm.runInContext(`s=Object.assign(JSON.parse(originalState),{founder:false,startup:false,money:0,kids:0,grand:0,love:30,age:70,trips:0,career:10,happy:40,pname:'DO_NOT_SHARE_PERSONAL_NAME'},scenario);resultModel85()`,c);
   assert.equal(model.theme,i);assert.equal(model.age,vm.runInContext('s.age',c));assert(!JSON.stringify(model).includes('DO_NOT_SHARE_PERSONAL_NAME'));
   assert.match(new URL(vm.runInContext('resultUrl()',c)).pathname,new RegExp('/'+i+'/$'));
   const page=fs.readFileSync(`share/ja/${i}/index.html`,'utf8');assert(page.includes(`life-${i}-v91.png`));
 }
 c.originalState=original;vm.runInContext('s=JSON.parse(originalState)',c);
 const status={},im={src:'data:image/png;base64,eA=='};c.document.getElementById=id=>id==='cardimg'?im:status;
 await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('コピーできません'));
 c.ClipboardItem=class {constructor(items){this.items=items}};c.fetch=async()=>({blob:async()=>({type:'image/png'})});let copied;
 c.navigator.clipboard={write:async items=>{copied=items;await items[0].items['image/png']}};
 await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('コピーしました'));assert(copied[0].items['image/png']);
 c.navigator.clipboard.write=async()=>{throw Error('denied')};await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('許可されません'));
 im.src='';await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('お待ちください'));
 for(const lang of ['ja','en','ko','zh','es','fr','de','it','pt','id']){
 const h=fs.readFileSync(`share/${lang}/index.html`,'utf8');assert(h.includes('summary_large_image'));assert(h.includes(lang==='ja'?'share-preview-v89.jpg':'share-preview-v84.png'));
 let target;const ctx={URLSearchParams,URL,location:{search:u.search,origin:u.origin,replace(v){target=v}},document:{getElementById(){return {}}}};vm.createContext(ctx);vm.runInContext(h.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);const dest=new URL(target,u.origin);assert.equal(dest.searchParams.get('r'),u.searchParams.get('r'));assert.equal(dest.searchParams.get('lang'),lang);
 }
 console.log('PASS: 10 outcome themes; factual model and name privacy; no opinion input; image copy; result roundtrip; 10 languages');
})().catch(e=>{console.error(e);process.exitCode=1});
