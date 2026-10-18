const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../love/core.js');
const codes=new Set();
for(let n=0;n<4096;n++){const a=Array.from({length:12},(_,i)=>(n>>i)&1),r=C.diagnose(a);codes.add(r.code);assert(C.type(r.code).name);}
assert.equal(codes.size,64);assert.equal(new Set([...codes].map(c=>C.type(c).style+C.type(c).name)).size,64);
assert.throws(()=>C.diagnose([0,1]));assert.throws(()=>C.diagnose(Array(12).fill(5)));assert.throws(()=>C.newGame('BAD'));
const reachable=new Set();
// Explore all 3^9 choice paths for a representative type with each ending reachable.
for(let n=0;n<3**9;n++){let g=C.newGame('111000'),x=n;for(let j=0;j<9;j++){g=C.choose(g,x%3);x=Math.floor(x/3);}reachable.add(C.ending(g).key);assert.equal(g.log.length,9);assert(g.stats.every(v=>v>=0&&v<=100));}
assert.equal(reachable.size,6);
let g=C.newGame('000000'),original=JSON.stringify(g);g=C.choose(g,0);assert.equal(JSON.stringify(C.newGame('000000')),original);assert.equal(g.index,1);assert.equal(g.route.voice,1);
assert.deepEqual(C.restore(JSON.parse(JSON.stringify(g))),g);assert.equal(C.restore({...g,log:[{stage:4,choice:0}]}),null);assert.equal(C.restore({...g,log:[{stage:0,choice:4}]}),null);assert.throws(()=>C.choose(g,-1));
let appClick;const storage=new Map(),app={innerHTML:'',dataset:{},addEventListener(n,fn){if(n==='click')appClick=fn},contains(){return false}},toast={hidden:true};
const c={LoveCore:C,console,URLSearchParams,location:{search:''},navigator:{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{title:'',querySelector:s=>s==='#app'?app:s==='#toast'?toast:null,addEventListener(){},fonts:{ready:new Promise(()=>{})}},setTimeout:()=>1,clearTimeout(){},scrollTo(){}};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('love/app.js','utf8'),c);const run=s=>vm.runInContext(s,c);const click=dataset=>appClick({target:{closest(){return {dataset}}}});
assert(app.innerHTML.includes('恋のタイプを診断する'));click({act:'quiz'});assert(app.innerHTML.includes('Q1'));
for(let i=0;i<12;i++)click({answer:String(i%2)});
assert.equal(run('view'),'type');assert.equal(run('answers.length'),12);assert(app.innerHTML.includes('このタイプで、恋の未来へ'));click({act:'start'});assert.equal(run('view'),'play');
for(let i=0;i<9;i++)click({choice:String(i%3)});
assert.equal(run('view'),'result');assert(app.innerHTML.includes('LINEで友達に送る'));assert(app.innerHTML.includes('resultCanvas'));assert.match(run('resultURL()'),/\?t=[01]{6}&p=[012]{9}$/);
const type=run('game.code');click({act:'back'});assert.equal(run('game.index'),8);assert.equal(run('view'),'play');click({choice:'2'});assert.equal(run('view'),'result');assert.equal(run('game.code'),type);click({act:'retry'});assert.equal(run('game.index'),0);assert.equal(run('game.code'),type);
click({act:'home'});assert(app.innerHTML.includes('つづきへ'));click({act:'resume'});assert.equal(run('view'),'play');click({act:'gallery'});assert.equal((app.innerHTML.match(/data-base=/g)||[]).length,16);click({base:'15'});click({mode:'3'});click({act:'trytype'});assert.equal(run('ownType'),'111111');
const saved=JSON.parse(storage.get('love.game.v1'));assert(!('answers' in saved));assert(!('name' in saved));
run("location.search='?t=000000&p=012012012'");
const c2={...c,location:{search:'?t=000000&p=012012012'}};c2.window=c2;vm.createContext(c2);vm.runInContext(fs.readFileSync('love/app.js','utf8'),c2);assert.equal(vm.runInContext('view',c2),'result');assert.equal(vm.runInContext('friend',c2),true);
console.log('PASS: 4096 answer combinations reach 64 original types; all 6 endings; 19683 complete lives; restored saves; complete quiz/game UI flow; rewind/retry/gallery/shared result; no profile inputs');
