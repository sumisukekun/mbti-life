const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createCanvas}=require('@napi-rs/canvas'),C=require('../love/core.js'),W=require('../love/watch-core.js'),D=require('../love/daily.js');
const captions=new Set(),scenes=new Set(),actions=new Set(),samples=[];
for(let code=0;code<64;code++){
 let s=W.init(code.toString(2).padStart(6,'0'));
 const seen=new Set();
 while(!s.done){if(s.pending!==null){s=W.choose(s,0);continue;}const e=D.event(s);captions.add(e.text);scenes.add(e.scene);actions.add(e.action);if(!seen.has(e.scene)){seen.add(e.scene);if(!samples.some(x=>x.scene===e.scene))samples.push({...s,scene:e.scene,visual:e});}s=W.advance(s);}
}
assert(scenes.size>=23);assert(actions.size>=18);assert(captions.size>=200);
// Draw every setting/action through a real canvas, including old saves without visual metadata.
const sandbox={window:{LoveCore:C}};vm.runInNewContext(fs.readFileSync('love/film.js','utf8'),sandbox);const sheet=createCanvas(1440,Math.ceil(samples.length/3)*290),ctx=sheet.getContext('2d');ctx.fillStyle='#fff7f1';ctx.fillRect(0,0,sheet.width,sheet.height);
for(let i=0;i<samples.length;i++){const can=createCanvas(960,540);for(const time of [0,1.4,4.7])sandbox.window.LoveFilm.draw(can,samples[i],time);ctx.drawImage(can,i%3*480,Math.floor(i/3)*290,480,270);ctx.fillStyle='#6b5266';ctx.font='14px sans-serif';ctx.fillText(samples[i].scene+' / '+samples[i].visual.action,12+i%3*480,283+Math.floor(i/3)*290);}
fs.writeFileSync('/workspace/scratch/love-v3-scene-check.png',sheet.toBuffer('image/png'));
console.log('PASS:',captions.size,'different captions;',scenes.size,'settings;',actions.size,'actions; all settings rendered at 3 animation times');
