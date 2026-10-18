const assert=require('node:assert/strict'),W=require('../love/watch-core.js');
let count=0;
for(let code=0;code<64;code++)for(let path=0;path<27;path++){
 let s=W.init(code.toString(2).padStart(6,'0'),{relation:'alone',focus:'dream'}),decisions=0,guard=0;
 while(!s.done&&guard++<210){
  if(s.pending!==null||s.beat%40===0)assert.deepEqual(W.restore(JSON.parse(JSON.stringify(s))),s);
  if(s.pending!==null){assert.equal(s.pending,[2,5,6][decisions]);s=W.choose(s,Math.floor(path/3**decisions)%3);decisions++;}
  else s=W.advance(s);
 }
 assert.equal(s.done,true);assert.equal(decisions,3);assert.equal(s.age,65);assert.equal(s.game.log.length,9);count++;
 assert.deepEqual(W.restore(s),s);
}
assert.equal(W.restore({version:2,beat:2000}),null);
console.log('PASS: '+count+' automatic lives, 3 major decisions, seasonal progress, save replay and complete endings');
