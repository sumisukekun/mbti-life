const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('analytics.js','utf8');
function boot({id='G-TEST123456',consent='',dnt=false,brokenStorage=false}={}) {
  const scripts=[],elements=[],listeners={};
  const d={documentElement:{lang:'ja'},referrer:'https://example.com/private?income=123',
    head:{appendChild(el){scripts.push(el)}},body:{appendChild(){}},
    addEventListener(name,fn){listeners[name]=fn},
    createElement(tag){const el={tag,children:[],style:{},setAttribute(){},appendChild(c){this.children.push(c)},addEventListener(n,fn){this[n]=fn},remove(){}};elements.push(el);return el;}};
  const w={LIFE_ANALYTICS_CONFIG:{measurementId:id},location:{origin:'https://mbti.businessmaker.net',href:'https://mbti.businessmaker.net/?r=SECRET&income=999#SECRET'},navigator:{doNotTrack:dnt?'1':'0'},localStorage:{getItem(){if(brokenStorage)throw Error('blocked');return consent},setItem(){if(brokenStorage)throw Error('blocked')}}};
  vm.runInNewContext(source,{window:w,document:d,URL,Date,Set});
  const events=()=>Array.from(w.dataLayer||[]).filter(a=>a[0]==='event');
  return {w,d,scripts,elements,listeners,events};
}
let c=boot({id:''});c.w.LifeAnalytics.view('home');c.w.LifeAnalytics.event('game_start',{mbti_type:'INFP'});assert.equal(c.scripts.length,0);assert.equal(c.events().length,0);assert.equal(c.elements.length,0);
c=boot();c.w.LifeAnalytics.view('home');assert.equal(c.scripts.length,0);c.elements.find(e=>e.textContent==='許可しない').click();assert.equal(c.events().length,0);
c=boot();c.w.LifeAnalytics.view('home');c.elements.find(e=>e.textContent==='許可する').click();assert.equal(c.scripts.length,1);assert.equal(c.events().length,1);
for(let i=0;i<100;i++)c.w.LifeAnalytics.view('home');assert.equal(c.events().length,1);
c.w.LifeAnalytics.view('life');c.w.LifeAnalytics.event('game_start',{mbti_type:'INFP',income:999,name:'SECRET',age:75});
c.w.LifeAnalytics.event('bad_event',{income:999});c.w.LifeAnalytics.event('share_click',{method:'line',content_type:'result',url:'SECRET'});
assert.equal(c.scripts.length,1);assert.equal(c.events().length,4);
assert.equal(c.events()[2][2].mbti_type,'INFP');assert.equal(c.events()[3][2].method,'line');
const serialized=JSON.stringify(c.w.dataLayer);assert(!serialized.includes('SECRET'));assert(!serialized.includes('income'));assert(!serialized.includes('private'));assert(serialized.includes('https://example.com/'));
c.w.LifeAnalytics.settings();c.elements.filter(e=>e.textContent==='許可しない').at(-1).click();const before=c.events().length;c.w.LifeAnalytics.event('game_start');assert.equal(c.events().length,before);assert.equal(c.w['ga-disable-G-TEST123456'],true);
c=boot({consent:'granted',dnt:true});c.w.LifeAnalytics.view('home');assert.equal(c.scripts.length,0);
c=boot({consent:'granted'});c.w.navigator.globalPrivacyControl=true;c.w.LifeAnalytics.view('home');assert.equal(c.scripts.length,0);
c=boot({brokenStorage:true});c.w.LifeAnalytics.view('home');c.elements.find(e=>e.textContent==='許可する').click();assert.equal(c.scripts.length,1);
console.log('PASS: no requests before consent/config; opt-out and DNT/GPC; deduplicated screens; safe payload allowlist; blocked storage');
