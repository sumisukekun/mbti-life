process.chdir(require('node:path').resolve(__dirname,'..'));
const vm=require('vm'),fs=require('fs'),assert=require('node:assert/strict');
const el={value:"",classList:{toggle(){}},addEventListener(){},hidden:false,style:{}};
const c={btoa,atob,console,URLSearchParams,URL,Intl,Date,Math,JSON,location:{search:'',pathname:'/'},navigator:{language:'ja'},localStorage:{data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=v}},document:{getElementById(id){return id==='adwrap'?null:el},documentElement:{},body:{classList:{toggle(){}}},addEventListener(){}},setTimeout(){},clearTimeout(){},setInterval(){return 1},clearInterval(){},requestAnimationFrame(){return 1},scrollTo(){},I18N:{}};c.window=c;vm.createContext(c);
for(const f of ['i18n/ja.js','scene.js','app.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
(async()=>{
 vm.runInContext(`launch83(true);stop();autoSkip=true;while(!s.dead){if(pending)resolveAuto();step()}`,c);
 const result=vm.runInContext('resultUrl()',c),u=new URL(result);assert.equal(u.pathname,'/share/ja/');assert.deepEqual(JSON.parse(JSON.stringify(vm.runInContext(`dec(new URL(resultUrl()).searchParams.get('r'))`,c))),JSON.parse(JSON.stringify(vm.runInContext('shareData()',c))));
 const markup=vm.runInContext('vShare()',c);assert(markup.includes('結果画像をコピー'));assert(markup.includes('Xの投稿画面を開く'));assert(vm.runInContext('vEnd()',c).includes('data-act="shopen"'));
 const status={},im={src:'data:image/png;base64,eA=='};c.document.getElementById=id=>id==='cardimg'?im:status;
 await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('コピーできません'));
 c.ClipboardItem=class {constructor(items){this.items=items}};c.fetch=async()=>({blob:async()=>({type:'image/png'})});let copied;
 c.navigator.clipboard={write:async items=>{copied=items;await items[0].items['image/png']}};
 await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('コピーしました'));assert(copied[0].items['image/png']);
 c.navigator.clipboard.write=async()=>{throw Error('denied')};await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('許可されません'));
 im.src='';await vm.runInContext('copyImage84()',c);assert(status.textContent.includes('お待ちください'));
 for(const lang of ['ja','en','ko','zh','es','fr','de','it','pt','id']){
 const h=fs.readFileSync(`share/${lang}/index.html`,'utf8');assert(h.includes('summary_large_image'));assert(h.includes('share-preview-v84.png'));
 let target;const ctx={URLSearchParams,URL,location:{search:u.search,origin:u.origin,replace(v){target=v}},document:{getElementById(){return {}}}};vm.createContext(ctx);vm.runInContext(h.match(/<script>([\s\S]*?)<\/script>/)[1],ctx);const dest=new URL(target,u.origin);assert.equal(dest.searchParams.get('r'),u.searchParams.get('r'));assert.equal(dest.searchParams.get('lang'),lang);
 }
 console.log('PASS: image copy success/denied/unsupported/not-ready; modal; result roundtrip; all 10 share routes');
})().catch(e=>{console.error(e);process.exitCode=1});
