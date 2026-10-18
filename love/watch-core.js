(function(root){'use strict';
const C=typeof module!=='undefined'&&module.exports?require('./core.js'):root.LoveCore;
const major=new Set([2,5,6]);
const places=['school','cafe','park','home','city','travel'];
function clone(x){return JSON.parse(JSON.stringify(x));}
function auto(s,i){const t=C.type(s.game.code);return (t.base+t.mode+i+(s.profile.focus==='dream'?1:s.profile.focus==='calm'?2:0))%3;}
function add(s,text,scene){s.caption=text;s.scene=scene;s.diary.unshift({age:s.age,season:s.season,text});s.diary=s.diary.slice(0,12);}
function daily(s){const D=typeof module!=="undefined"&&module.exports?require("./daily.js"):root.LoveDaily;const e=D.event(s);s.visual=e;add(s,e.text,e.scene);}
function milestones(s){while(s.game.index<C.stages.length&&C.stages[s.game.index].age<=s.age){const i=s.game.index,st=C.stages[i];if(major.has(i)){s.pending=i;add(s,'この先を決める、大切な話がある。少し時間を止めて考えよう。',st.scene);return s;}const c=auto(s,i);s.game=C.choose(s.game,c);add(s,st.choices[c][0]+'。'+st.choices[c][1]+'日々を重ねていく。',st.scene);}return s;}
function init(code,profile={}){const p={relation:['crush','dating','alone'].includes(profile.relation)?profile.relation:'crush',focus:['love','dream','calm'].includes(profile.focus)?profile.focus:'love'};let s={version:2,profile:p,game:C.newGame(code),age:16,season:0,beat:0,pending:null,diary:[],caption:'',scene:'school',done:false};daily(s);return milestones(s);}
function advance(state){if(state.pending!==null||state.done)return clone(state);let s=clone(state);s.beat++;s.age=16+Math.floor(s.beat/4);s.season=s.beat%4;daily(s);milestones(s);if(s.game.index===C.stages.length){s.done=true;s.age=65;add(s,'あの放課後から、ここまで。あなたの恋のつづきが、一枚のカードになります。','sunset');}return s;}
function choose(state,index){if(state.pending===null||![0,1,2].includes(index))throw Error('no pending choice');const s=clone(state),st=C.stages[s.pending];s.game=C.choose(s.game,index);s.pending=null;add(s,st.choices[index][0]+'。'+st.choices[index][1]+'未来を選んだ。',st.scene);return s;}
function restore(x){if(!x||x.version!==2||!Number.isInteger(x.beat)||x.beat<0||x.beat>196||!C.restore(x.game))return null;try{let s=init(x.game.code,x.profile);let guard=0;while((s.beat<x.beat||s.game.log.length<x.game.log.length)&&guard++<210){if(s.pending!==null){const l=x.game.log[s.game.index];if(!l)return null;s=choose(s,l.choice);}else s=advance(s);}if(s.beat!==x.beat||s.game.log.length!==x.game.log.length)return null;return s;}catch(_){return null;}}
const api={init,advance,choose,restore,major:[...major]};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LoveWatch=api;
})(typeof window==='undefined'?globalThis:window);
