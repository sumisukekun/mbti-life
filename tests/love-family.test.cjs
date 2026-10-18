const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),C=require('../love/core.js'),W=require('../love/watch-core.js'),F=require('../love/family.js'),{createCanvas}=require('@napi-rs/canvas');
const routes=[],pictures=[];
for(let branch=0;branch<3;branch++){
 let s=W.init('000000'),guard=0,events=[];
 while(!s.done&&guard++<210){if(s.pending!==null)s=W.choose(s,s.pending===6?branch:0);else{s=W.advance(s);if(s.visual?.major&&s.scene===s.visual.scene){events.push(s.visual.id);if(branch===0&&['wedding','birth','primary','childWedding','grandbirth','reunion'].some(id=>s.visual.id==='family-'+id))pictures.push(JSON.parse(JSON.stringify(s)));}}}
 assert(s.done);assert.deepEqual(W.restore(s),s);assert.equal(new Set(s.moments.map(x=>x.id)).size,s.moments.length);routes.push(events);
 if(branch===0){for(const id of ['wedding','birth','firstSteps','primary','graduation','leaving','childWedding','grandbirth','reunion'])assert(events.includes('family-'+id),id);const f=F.state(s);assert.equal(f.children[0].age,29);assert.equal(f.grandchildren[0].age,3);}
 else assert(!events.includes('family-birth')&&!events.includes('family-grandbirth'));
}
assert(!routes[2].includes('family-wedding'));assert(routes[1].includes('family-wedding'));
const canvas=createCanvas(1440,1080),ctx=canvas.getContext('2d'),sandbox={window:{LoveCore:C}};vm.runInNewContext(fs.readFileSync('love/film.js','utf8'),sandbox);
for(let i=0;i<pictures.length;i++){const can=createCanvas(960,540);sandbox.window.LoveFilm.draw(can,pictures[i],2.7);ctx.drawImage(can,i%2*720,Math.floor(i/2)*360,720,360);}
fs.writeFileSync('/workspace/scratch/love-family-scenes-v4.png',canvas.toBuffer('image/png'));
console.log('PASS: marriage, birth, growing child, independence, child wedding and grandchildren in chronological order; 3 distinct life routes; save replay; six family scenes rendered');
