(function(root){'use strict';
const C=typeof module!=='undefined'&&module.exports?require('./core.js'):root.LoveCore;
const major=new Set([2,5,6]);
const places=['school','cafe','park','home','city','travel'];
function clone(x){return JSON.parse(JSON.stringify(x));}
function auto(s,i){const t=C.type(s.game.code);return (t.base+t.mode+i+(s.profile.focus==='dream'?1:s.profile.focus==='calm'?2:0))%3;}
function add(s,text,scene){s.caption=text;s.scene=scene;s.diary.unshift({age:s.age,season:s.season,text});s.diary=s.diary.slice(0,12);}
function scene(s){if(s.age<18)return ['school','park','school','home'][s.season];if(s.age<23)return ['cafe','travel','school','home'][s.season];if(s.age<60)return ['city','park','cafe','home'][s.season];return ['park','travel','cafe','home'][s.season];}
function daily(s){const a=s.age,q=s.season,t=C.type(s.game.code),name=s.profile.relation==='alone'?'新しく知り合った人':'あの人';
 const lines=a<18?[
 '新学期。席が近くなった'+name+'と、好きな音楽の話をした。',
 '夏の帰り道。コンビニで買ったアイスが溶ける前に、みんなで笑った。',
 '文化祭の準備。放課後の教室に、いつもより長く残っていた。',
 'テスト前。わからない問題を一緒に考えた。小さな「ありがとう」がうれしい。'
 ]:a<23?[
 '新しい生活にも少し慣れた。カフェで話していたら、気づけば夕方。',
 '友達と小さな旅へ。いつもと違う景色の中で、素直に話せた。',
 'やってみたいことが見つかった。恋の話も、夢の話も、今の自分の一部。',
 '今日はひとりでゆっくり。好きな飲み物と音楽で、気持ちを整えた。'
 ]:a<40?[
 '新しい仕事や学びに取り組む日々。「おつかれさま」の一言に、肩の力が抜けた。',
 '忙しかった一週間。散歩しながら、最近あったことを少しずつ話した。',
 'お気に入りのお店で待ち合わせ。何気ない会話が、いつの間にか大切な習慣に。',
 '寒い日は家で過ごす。温かいごはんを作って、自分のための時間も取った。'
 ]:a<60?[
 '慣れた毎日の中にも、小さな変化がある。今日は新しいことをひとつ始めた。',
 '季節の花を見に出かけた。歩く速さを合わせる、その時間が心地よかった。',
 '久しぶりに会う友達とお茶をした。あの頃の自分にも、会えた気がした。',
 '思い出の写真を見つけた。変わったものも、変わらない好きも、ここにある。'
 ]:[
 '春の公園へ。長くつづいたつながりと、新しく出会う楽しさがある。',
 '行ってみたかった場所へ。何歳になっても、初めての景色はうれしい。',
 'お茶を飲みながら昔の話をした。あの日の小さな選択が、今につながっていた。',
 '穏やかな一日。誰かといる時間も、自分で過ごす時間も、愛おしく思えた。'
 ];
 const extra=s.profile.focus==='dream'&&a%3===0?' 好きなことにも、一歩ずつ挑戦している。':s.profile.focus==='calm'&&a%3===0?' 無理をしない、自分のペースも忘れずに。':t.mode%2&&a%4===0?' それぞれの時間があるから、会えた日がもっと楽しい。':'';
 add(s,lines[q]+extra,scene(s));
}
function milestones(s){while(s.game.index<C.stages.length&&C.stages[s.game.index].age<=s.age){const i=s.game.index,st=C.stages[i];if(major.has(i)){s.pending=i;add(s,'この先を決める、大切な話がある。少し時間を止めて考えよう。',st.scene);return s;}const c=auto(s,i);s.game=C.choose(s.game,c);add(s,st.choices[c][0]+'。'+st.choices[c][1]+'日々を重ねていく。',st.scene);}return s;}
function init(code,profile={}){const p={relation:['crush','dating','alone'].includes(profile.relation)?profile.relation:'crush',focus:['love','dream','calm'].includes(profile.focus)?profile.focus:'love'};let s={version:2,profile:p,game:C.newGame(code),age:16,season:0,beat:0,pending:null,diary:[],caption:'',scene:'school',done:false};daily(s);return milestones(s);}
function advance(state){if(state.pending!==null||state.done)return clone(state);let s=clone(state);s.beat++;s.age=16+Math.floor(s.beat/4);s.season=s.beat%4;daily(s);milestones(s);if(s.game.index===C.stages.length){s.done=true;s.age=65;add(s,'あの放課後から、ここまで。あなたの恋のつづきが、一枚のカードになります。','sunset');}return s;}
function choose(state,index){if(state.pending===null||![0,1,2].includes(index))throw Error('no pending choice');const s=clone(state),st=C.stages[s.pending];s.game=C.choose(s.game,index);s.pending=null;add(s,st.choices[index][0]+'。'+st.choices[index][1]+'未来を選んだ。',st.scene);return s;}
function restore(x){if(!x||x.version!==2||!Number.isInteger(x.beat)||x.beat<0||x.beat>196||!C.restore(x.game))return null;try{let s=init(x.game.code,x.profile);let guard=0;while((s.beat<x.beat||s.game.log.length<x.game.log.length)&&guard++<210){if(s.pending!==null){const l=x.game.log[s.game.index];if(!l)return null;s=choose(s,l.choice);}else s=advance(s);}if(s.beat!==x.beat||s.game.log.length!==x.game.log.length)return null;return s;}catch(_){return null;}}
const api={init,advance,choose,restore,major:[...major]};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LoveWatch=api;
})(typeof window==='undefined'?globalThis:window);
