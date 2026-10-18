const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),W=require('../love/watch-core.js'),C=require('../love/core.js'),D=require('../love/drama.js'),F=require('../love/family.js'),{createCanvas}=require('@napi-rs/canvas');
const reached=new Set(),samples=new Map();let episodeCount=0;
for(let seed=0;seed<32;seed++)for(let branch=0;branch<3;branch++){
 let s=W.init((seed%64).toString(2).padStart(6,'0'),{seed,relation:'dating'}),parts=new Map(),guard=0;
 while(!s.done&&guard++<210){const e=s.visual,expected=F.event(s);if(s.pending===null){if(expected?.major)assert.equal(e.id,expected.id,'family milestones must not be replaced');if(e.episode){assert.equal(e.scene,s.scene);reached.add(e.episode.id);const k=s.age+'-'+e.episode.id;if(!parts.has(k))parts.set(k,new Set());parts.get(k).add(e.episode.part);const sk=e.episode.id+':'+e.episode.part;if(!samples.has(sk))samples.set(sk,structuredClone(s));}}
  s=s.pending===null?W.advance(s):W.choose(s,s.pending===6?branch:0);
 }
 assert(s.done);for(const p of parts.values()){assert.deepEqual([...p].sort(),[1,2,3]);episodeCount++;}assert.deepEqual(W.restore(s),s);assert(s.keepsakes.length>0);
}
assert.equal(reached.size,D.arcs.length);assert.notEqual(W.init('000000',{seed:1}).visual.episode.id,W.init('000000',{seed:2}).visual.episode.id);
const sandbox={window:{LoveCore:C}};vm.runInNewContext(fs.readFileSync('love/film.js','utf8'),sandbox);const can=createCanvas(960,540);
for(const s of samples.values())for(const a of [0,1.2,4.2])sandbox.window.LoveFilm.draw(can,s,a);
const picks=['cat:1','cat:3','shop:1','shop:3','fight:1','fight:3','band:2','band:3','cake:1','cake:3','grandday:1','grandday:3'],sheet=createCanvas(1440,1080),ctx=sheet.getContext('2d');
picks.forEach((key,i)=>{const s=samples.get(key);sandbox.window.LoveFilm.draw(can,s,2.5);ctx.drawImage(can,i%3*480,Math.floor(i/3)*270,480,270);});fs.writeFileSync('/workspace/scratch/love-drama-scenes-v5.png',sheet.toBuffer('image/png'));
console.log('PASS:',D.arcs.length,'story arcs,',episodeCount,'complete three-part episodes, 96 complete lives, family priority, seed variation, save replay and all story frames rendered');
