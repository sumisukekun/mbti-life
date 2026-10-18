process.chdir(require('node:path').resolve(__dirname,'..'));
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let click90;
const el={value:'',classList:{toggle(){}},addEventListener(type,fn){if(type==='click')click90=fn},style:{}};
let intervalMs;
const c={btoa,atob,console,URLSearchParams,URL,Intl,Date,Math,JSON,location:{search:'',pathname:'/'},navigator:{language:'ja'},localStorage:{getItem(){return null},setItem(){}},document:{getElementById(id){return id==='adwrap'?null:el},documentElement:{},body:{classList:{toggle(){}}},addEventListener(){}},setTimeout(){},clearTimeout(){},setInterval(fn,ms){intervalMs=ms;return 1},clearInterval(){},requestAnimationFrame(){return 1},scrollTo(){},I18N:{}};c.window=c;vm.createContext(c);
for(const f of ['i18n/ja.js','scene.js','result-card.js','app.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const run=s=>vm.runInContext(s,c);
run('launch83(true);stop()');
assert.equal(run('timeline86.length'),1);assert.equal(run('pending.id'),'grad');
run('seekAge86(18);resolve(0);stop()');assert.equal(run('timer'),null);assert.equal(run('manual86'),true);
run('autoSkip=true;while(s.age<35&&!s.dead){if(pending)resolveAuto();step()}stop()');
const latest=run('s.age');assert.equal(latest,35);const future=run('JSON.stringify(timeline86.at(-1).state)');
const rng=run('timeline86.at(-1).rng');
run('seekAge86(20)');assert.equal(run('s.age'),20);assert.equal(run('timer'),null);assert.equal(run('speed'),1);assert.equal(run('autoSkip'),false);assert.equal(run('timeline86.at(-1).state.age'),35);
run('seekAge86(35)');assert.equal(run('JSON.stringify(s)'),future);assert.equal(run('rng83'),rng);
run('seekAge86(18)');assert.equal(run('pending.id'),'grad');assert.equal(run('s.decisions'),0);run('resolve(1);stop()');assert.equal(run('timeline86.length'),1);assert.equal(run('timer'),null);assert.equal(run('s.uni'),false);
run('forwardYear86()');assert.equal(run('s.age'),19);assert.equal(run('timer'),null);assert.equal(run('timeline86.at(-1).state.age'),19);
run('seekAge86(18);forwardYear86()');assert.equal(run('s.age'),19);assert.equal(run('timeline86.length'),2);
for(const [speed,ms] of [[.5,4800],[1,2400],[2,1200]]){run(`pending=null;s.dead=false;speed=${speed};play();stop()`);assert.equal(intervalMs,ms)}
// Branching restores independent deep state, not a reference shared with saved years.
run('seekAge86(18);s.log.push({age:18,k:"test"})');assert.equal(run('timeline86[0].state.log.some(x=>x.k==="test")'),false);
run('launch83(true);stop();autoSkip=true;while(!s.dead){if(pending)resolveAuto();step()}');const death=run('s.age');run('seekAge86(18)');assert.equal(run('s.dead'),false);assert.equal(run('pending.id'),'grad');run(`seekAge86(${death})`);assert.equal(run('s.dead'),true);
// A choice wait must not create a fake running timer, and auto mode must resume.
run('launch83(true);stop();play()');assert.equal(run('timer'),null);assert(run('vLife()').includes('選択待ち'));assert(run('vLife()').includes('選択肢を選ぶ'));
const act90=a=>click90({target:{closest(){return {dataset:{act:a}}}}});
act90('auto');assert.equal(run('pending'),null);assert.equal(run('autoSkip'),true);assert.equal(run('timer'),1);
run('launch83(true);stop()');act90('autotoggle');assert.equal(run('pending'),null);assert.equal(run('timer'),1);run('stop()');
run('launch83(true);stop()');act90('next');assert.equal(run('timer'),null);act90('toggle');assert.equal(run('timer'),null);
console.log('PASS: year slider restore, RNG and future retention, decision redo, branching, manual step, slow speeds, death rewind');
