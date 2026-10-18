/* Result cards: deterministic canvas artwork. No image service or user input required. */
(function(root){
'use strict';
const W=1600,H=900,INK='#141938',PINK='#f42b7d',BLUE='#365bff',MUTED='#626987';
const HEAD_JA=[['会社を育てて、','自分の道を拓いた。'],['家族が増えて、','思い出も増えた。'],['長く生きて、','時代を見届けた。'],['旅に出て、','世界を歩いた。'],['ひとつの道を、','とことん極めた。'],['大切な人と、','愛を育てた。'],['こつこつ築いた、','ゆとりある人生。'],['小さな楽しみが、','人生を彩った。'],['何度つまずいても、','挑戦を選んだ。'],['ふつうの日々が、','宝物になった。']];
const HEAD_EN=[['Built a business.','Made a new path.'],['A growing family.','A lifetime of memories.'],['A long life.','So much to witness.'],['Set out to explore.','Walked the world.'],['Chose a craft.','Made it a life.'],['Made connections.','Built a life of love.'],['Built up savings.','Found room to breathe.'],['Little joys.','A colorful life.'],['Took a chance.','Kept moving forward.'],['Ordinary days.','An irreplaceable life.']];
function round(g,x,y,w,h,r,fill,stroke){g.beginPath();g.roundRect(x,y,w,h,r);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=2;g.stroke()}}
function fit(g,t,size,max,font){do{g.font='700 '+size+'px '+font;if(g.measureText(t).width<=max)return size;size-=2}while(size>18);return size}
function wrap(g,t,max){const out=[];let line='';for(const c of Array.from(t)){if(g.measureText(line+c).width>max&&line){out.push(line);line=''}line+=c}if(line)out.push(line);return out}
function star(g,x,y,on){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?7:16;const xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.closePath();g.fillStyle=on?'#f5b918':'#d4d8e4';g.fill()}
function art(g,x,y,w,h,theme,seed){
 g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.translate(x,y);const u=w/48;g.scale(u,u);const hh=h/u;
 const p=(a,b,c,d,color)=>{g.fillStyle=color;g.fillRect(a,b,c,d)};
 const cloud=(a,b)=>{p(a,b,8,2,'#fff');p(a+2,b-2,4,2,'#fff')};
 p(0,0,48,hh,'#9bdbf8');p(0,hh-11,48,11,'#7bc86c');p(0,hh-11,48,1,'#5cad56');cloud(2,12);cloud(37,6);cloud(34,28);
 const heart=(a,b,col=PINK)=>{p(a,b,2,2,col);p(a+3,b,2,2,col);p(a,b+2,5,2,col);p(a+1,b+4,3,1,col);p(a+2,b+5,1,1,col)};
 const tree=(a,b)=>{p(a+3,b+8,2,9,'#986035');p(a,b+3,8,7,'#389f53');p(a+2,b,4,3,'#389f53');p(a+1,b+5,2,2,'#2b8e48')};
 tree(1,hh-27);for(let i=0;i<13;i++){const xx=(i*13+seed%7)%48,yy=hh-8+(i*5)%7;p(xx,yy,1,1,i%3?'#5cad56':'#fff3a9')}
 const skin=['#f4c797','#c99168','#edbb98'][Math.abs(seed)%3],hair=theme===2?'#b7b8c4':['#292435','#6d432b','#302b3e'][Math.abs(seed)%3];
 const person=(a,b,sz,color,gray=false)=>{g.save();g.translate(a,b);g.scale(sz,sz);p(0,0,10,4,gray?'#b7b8c4':hair);p(0,4,10,7,skin);p(2,6,1.5,1.5,INK);p(6.5,6,1.5,1.5,INK);p(0,8,2,1,'#f6a6a8');p(8,8,2,1,'#f6a6a8');p(4,9,2,1,'#b76a65');p(-1,11,12,12,color);p(-3,12,2,8,skin);p(11,12,2,8,skin);p(1,23,2,10,'#393b55');p(7,23,2,10,'#393b55');p(1,32,4,1,'#393b55');p(7,32,4,1,'#393b55');g.restore()};
 const py=hh-44,shirt=[0,4].includes(theme)?'#365bff':theme===7?'#ffbd28':PINK;
 person(17,py,1,shirt,theme===2);
 heart(11,6);p(32,13,1,5,'#ffe076');p(30,15,5,1,'#ffe076');
 if(theme===3){p(9,hh-22,8,8,'#7f4d2a');p(11,hh-24,4,2,'#7f4d2a');p(10,hh-23,6,1,'#d39a49');p(31,py+12,10,9,'#fff4d1');p(32,py+13,3,7,'#8cca69');p(36,py+13,4,7,'#8ed4ee');p(42,hh-27,1,15,'#986035');p(39,hh-26,8,2,'#b77b3e');p(40,hh-22,7,2,'#b77b3e')}
 else if(theme===1){person(32,hh-35,.7,'#2caa79');person(9,hh-28,.5,'#ffb91c');person(39,hh-26,.45,'#365bff');heart(39,5)}
 else if(theme===5){person(31,hh-40,.85,'#279c78');heart(38,4);heart(6,24,'#ff83b0')}
 else if(theme===2){p(30,hh-26,1,16,'#986035');p(28,hh-26,3,1,'#986035');p(35,hh-22,8,6,'#f8efda');p(37,hh-24,4,2,'#fff');p(37,hh-20,4,2,PINK)}
 else if(theme===0||theme===4){p(5,hh-20,9,6,INK);p(6,hh-19,7,4,'#bee1ff');p(4,hh-14,12,1,'#737eae');p(33,hh-19,8,6,theme===0?'#ffbd28':'#365bff');p(35,hh-21,4,2,'#ffd66a');p(36,hh-24,2,3,'#ffd66a');heart(37,20,'#ffbd28')}
 else if(theme===6){for(let i=0;i<4;i++){p(5+i*2,hh-15-i*2,6,2,'#ffbe20');p(5+i*2,hh-16-i*2,6,1,'#ffe083')}p(34,hh-21,7,8,'#f7bd28');p(36,hh-23,3,2,'#f7bd28');p(37,hh-19,1,4,'#bd7d16')}
 else if(theme===8){p(33,hh-20,12,9,'#5b91b5');p(37,hh-25,8,5,'#5b91b5');p(40,hh-35,1,14,INK);p(41,hh-35,6,4,PINK)}
 else {p(32,hh-19,4,6,'#a56b39');p(33,hh-26,2,7,'#2b9f63');p(30,hh-24,3,3,'#2b9f63');p(35,hh-25,3,3,'#2b9f63');p(7,hh-19,6,5,'#fff');p(12,hh-18,2,3,'#fff');if(theme===7)heart(36,21,'#ffb91c')}
 g.restore();
}
function draw(g,d){
 const INK='#f3f5ff',MUTED='#b1c3e4';
 const font=d.font||'sans-serif',ja=d.lang==='ja',idx=Math.max(0,Math.min(9,d.theme|0));
 g.clearRect(0,0,W,H);g.fillStyle='#070d25';g.fillRect(0,0,W,H);round(g,23,23,W-38,H-38,26,'#674bad');round(g,16,12,W-38,H-38,26,'#111b38','#64dfff');
 g.textAlign='left';g.textBaseline='alphabetic';g.fillStyle=INK;fit(g,d.brand,44,1100,font);g.fillText(d.brand,54,75);if(ja){g.fillStyle=PINK;g.fillText('83',54,75);g.fillText('1',54+g.measureText('83億分の').width,75);g.fillStyle=INK}
 g.textAlign='right';g.font='700 25px '+font;g.fillText(ja?'人生の結果':'LIFE RESULT',1540,74);g.textAlign='left';
 art(g,32,110,610,670,idx,d.seed||0);
 const x=686,mw=842;
 round(g,x,117,190,63,20,PINK);g.font='700 42px '+font;g.fillStyle='#fff';g.fillText(d.type||'LIFE',x+28,163);
 const age=d.static?(ja?'選択がつくる物語':'A LIFE OF CHOICES'):(ja?d.country+'で生きた'+d.age+'年':d.country+' · '+d.age+' years');
 round(g,x+210,117,632,63,22,'#243455');g.fillStyle=INK;fit(g,age,32,590,font);g.fillText(age,x+230,161);
 const heads=d.headline||(ja?HEAD_JA:HEAD_EN)[idx];const size=Math.min(...heads.map(t=>fit(g,t,72,mw,font)));g.font='700 '+size+'px '+font;g.fillStyle=INK;
 heads.forEach((t,i)=>{g.fillStyle='#54254c';g.fillRect(x,253+i*87,mw-12,18);g.fillStyle=INK;g.fillText(t,x,260+i*87)});
 g.fillStyle=MUTED;fit(g,(ja?'称号｜':'TITLE · ')+d.title,29,mw,font);g.fillText((ja?'称号｜':'TITLE · ')+d.title,x,409);
 g.fillStyle=INK;let fs=31,lines;do{g.font='500 '+fs+'px '+font;lines=wrap(g,d.summary,mw);if(lines.length<=3)break;fs-=2}while(fs>19);lines.slice(0,3).forEach((t,i)=>g.fillText(t,x,468+i*43));
 g.strokeStyle='#354a73';g.lineWidth=2;g.beginPath();g.moveTo(x,595);g.lineTo(1532,595);g.stroke();
 if(d.static){g.fillStyle=INK;g.font='700 32px '+font;g.fillText(ja?'あなたなら、どんな人生？':'What life would you live?',x,657);g.font='500 25px '+font;g.fillStyle=MUTED;g.fillText(ja?'無料・登録不要で、もうひとつの人生へ。':'Start a new life. Free. No sign-up.',x,707)}
 else {const labels=d.labels||(ja?['仕事運','金運','愛情運','健康運']:['Work','Money','Love','Health']);['work','money','love','health'].forEach((k,i)=>{const xx=x+i*212;g.fillStyle=INK;g.font='500 26px '+font;g.fillText(labels[i],xx,638);const v=Math.max(1,Math.min(5,d.ratings[k]|0));for(let j=0;j<5;j++)star(g,xx+16+j*35,677,j<v)})}
 let xx=x;g.font='700 25px '+font;for(const t of (d.keywords||[]).slice(0,3)){const t2='#'+t,ww=g.measureText(t2).width+38;if(xx+ww>1534)break;round(g,xx,737,ww,46,8,'#284261');g.fillStyle='#fff';g.fillText(t2,xx+19,769);xx+=ww+12}
 g.strokeStyle='#354a73';g.beginPath();g.moveTo(50,811);g.lineTo(1542,811);g.stroke();g.fillStyle=MUTED;g.font='500 20px '+font;g.fillText(ja?'※ゲーム内の架空の人生です':'A fictional life in a game',54,852);
 g.fillStyle=INK;g.textAlign='right';g.font='700 26px '+font;g.fillText(ja?'あなたなら、どんな人生？':'What life would you live?',1538,849);g.fillStyle=MUTED;g.font='500 17px '+font;g.fillText('mbti.businessmaker.net',1538,868);g.textAlign='left';
}
root.LifeResultCard={draw,width:W,height:H,headlinesJA:HEAD_JA,headlinesEN:HEAD_EN};
})(typeof window!=='undefined'?window:globalThis);
