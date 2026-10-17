/* ドット絵の情景（scene） */
const SW=192,SH=96,GY=78;
function sceneInfo(){
  if(s.dead)return {place:'grave',label:'pl.grave'};
  if(s.health<30)return {place:'hospital',label:'pl.hospital'};
  if(s.uni)return {place:'school',label:'pl.school'};
  if(s.working)return {place:s.founder?'tower':'office',label:s.founder?'pl.tower':'pl.office'};
  if(s.retired)return {place:'park',label:'pl.park'};
  return {place:'home',label:s.house?'pl.myhouse':'pl.home'};
}
function season(){return (s.age-s.startAge)%4}
function scenePeople(){
  const hair=a=>a>=78?'#F2F2F2':a>=58?'#A9A9B3':'#2B2233';
  const g=grp(s.type),shirt={nt:'#3D6BFF',nf:'#F2367F',sj:'#1F9D6B',sp:'#F2A20C'}[g];
  const ppl=[{a:s.age,shirt,hair:hair(s.age),main:true}];
  if(s.married?s.age>=(s.marriedAt||0):s.partner)ppl.push({a:s.age,shirt:'#8E6CF0',hair:hair(s.age),long:true});
  if(!s.kidsOut)s.kidAges.slice(0,3).forEach((b,i)=>{const a=s.age-b;if(a>=0)ppl.push({a,shirt:['#FFB547','#4CC9F0','#9BE564'][i],hair:'#3A2A20'})});
  if(s.grandAt&&s.age>=s.grandAt)for(let i=0;i<Math.min(2,s.grand);i++)ppl.push({a:3+i*2,shirt:'#FF8FB1',hair:'#3A2A20'});
  return ppl;
}
function px(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)}
function drawPerson(c,x,p,t,i){
  const k=p.a<4?.5:p.a<10?.66:p.a<15?.85:1;const bob=(Math.floor(t/400+i)%2)*(p.a>75?0:1);
  const H=Math.round(16*k),hw=Math.max(3,Math.round(5*k)),y=GY-H-bob;
  px(c,x,y,hw,hw,'#F3C9A6');                       // 顔
  px(c,x,y-1,hw,2,p.hair);                          // 髪
  if(p.long)px(c,x-1,y,1,hw+2,p.hair),px(c,x+hw,y,1,hw+2,p.hair);
  px(c,x+1,y+Math.round(hw/2),1,1,'#2B2233');       // 目
  const bh=Math.round(7*k);px(c,x-1,y+hw,hw+2,bh,p.shirt); // 服
  px(c,x,y+hw+bh,1,H-hw-bh+bob,'#3B3B4F');px(c,x+hw-1,y+hw+bh,1,H-hw-bh+bob,'#3B3B4F'); // 脚
  if(p.a>=75&&p.main){px(c,x+hw+2,y+hw,1,H-hw+bob,'#7A5230')} // 杖
  if(p.tie)px(c,x+Math.floor(hw/2),y+hw,1,4,'#E5484D');
  if(p.veil){px(c,x-1,y-2,hw+2,2,'#FFFFFF');px(c,x-2,y,1,H-4,'rgba(255,255,255,.85)');px(c,x-1,y+hw,hw+2,H-hw,'#FFFFFF')}
  if(p.tear){const d=Math.floor(t/200)%4;px(c,x,y+3+d,1,1,'#4CC9F0');px(c,x+hw-1,y+3+((d+2)%4),1,1,'#4CC9F0')}
}
function drawPlace(c,pl,t){
  const W=SW;
  if(pl==='school'){px(c,96,34,70,GY-34,'#E9D9C4');px(c,96,30,70,5,'#B0574B');for(let i=0;i<5;i++)for(let j=0;j<3;j++)px(c,101+i*13,40+j*12,7,7,'#7FB3E0');px(c,125,20,12,12,'#E9D9C4');px(c,128,23,6,6,'#fff');px(c,130,24,1,3,'#333');px(c,130,26,3,1,'#333');px(c,127,GY-12,8,12,'#7A5230')}
  else if(pl==='office'||pl==='tower'){const bs=[[100,30,22],[124,18,26],[152,38,20],[174,26,16]];bs.forEach(([x,y,w],k)=>{px(c,x,y,w,GY-y,['#5B6B8C','#4A5878','#6C7A99','#56658A'][k]);for(let yy=y+4;yy<GY-6;yy+=6)for(let xx=x+3;xx<x+w-3;xx+=5)px(c,xx,yy,3,3,((xx*7+yy*3+Math.floor(t/1500))%11)<6?'#FFE08A':'#2E3650')});
    if(pl==='tower'){px(c,136,4,1,14,'#333');px(c,137,4,8,5,'#F2367F')}}
  else if(pl==='home'||pl==='park'&&s.house){const x=112;
    if(s.house){px(c,x,46,52,GY-46,'#F4E1C1');for(let i=0;i<18;i++)px(c,x-4+i*1.5,46-i,60-i*3,1,'#C0504D');px(c,x+8,56,10,9,'#8EC5EA');px(c,x+34,56,10,9,'#8EC5EA');px(c,x+22,62,8,16,'#7A5230')}
    else{px(c,x,30,56,GY-30,'#D7D3CF');for(let j=0;j<4;j++)for(let i=0;i<4;i++)px(c,x+5+i*13,35+j*10,8,6,'#8EC5EA');}
    if(pl==='park')drawPark(c,t,true)}
  if(pl==='park'&&!s.house)drawPark(c,t,false);
  if(pl==='hospital'){px(c,104,28,70,GY-28,'#F7F7F7');px(c,104,28,70,4,'#9AC3E6');px(c,133,12,12,12,'#fff');px(c,137,14,4,8,'#E5484D');px(c,135,16,8,4,'#E5484D');for(let i=0;i<4;i++)for(let j=0;j<3;j++)px(c,109+i*16,38+j*12,9,7,'#B9DDF5')}
  if(pl==='grave'){px(c,128,50,18,GY-50,'#9A9AA8');px(c,126,48,22,4,'#8A8A98');px(c,136,54,2,16,'#6E6E7C');px(c,122,GY-4,30,4,'#7D7D8B');[[120,'#F2367F'],[150,'#FFC93C'],[156,'#F2367F']].forEach(([x,col])=>{px(c,x,GY-6,1,6,'#3E8E41');px(c,x-1,GY-8,3,3,col)})}
}
function drawPark(c,t,small){const x=small?56:120;px(c,x+12,40,6,GY-40,'#7A5230');px(c,x,26,30,18,'#3E8E41');px(c,x+4,20,22,8,'#4FA35A');px(c,x+40,GY-8,22,2,'#A0522D');px(c,x+42,GY-6,2,6,'#6B3A1E');px(c,x+58,GY-6,2,6,'#6B3A1E')}
function drawSceneBase(c,t){
  const se=season(),h=s.happy,dead=s.dead;
  const skyTop=dead?'#F6A57B':h<35?'#7E8AA6':['#FFD6E5','#7FC8FF','#FFC48A','#C9D7EA'][se];
  const skyBot=dead?'#FBD9B4':h<35?'#B2BACB':['#FFF2F7','#CFEBFF','#FFE7C9','#EEF3FA'][se];
  const gr=c.createLinearGradient(0,0,0,GY);gr.addColorStop(0,skyTop);gr.addColorStop(1,skyBot);c.fillStyle=gr;c.fillRect(0,0,SW,GY);
  // 太陽 or 雲
  if(h>=55&&!dead){px(c,16,10,10,10,'#FFE36E');px(c,14,12,14,6,'#FFE36E');px(c,18,8,6,14,'#FFE36E')}
  for(let k=0;k<3;k++){const cx=((t/90+k*70)%(SW+40))-30,cy=8+k*9;const cc=h<35?'#9AA3B5':'#FFFFFF';px(c,cx,cy,18,4,cc);px(c,cx+4,cy-3,10,4,cc)}
  if(s.trips>0&&!dead){const ax=SW-((t/25)%(SW+30));px(c,ax,14,10,2,'#F7F7F7');px(c,ax+3,11,3,8,'#F7F7F7');px(c,ax+9,12,2,3,'#F2367F')}
  // 地面
  px(c,0,GY,SW,SH-GY,dead?'#8DB27E':['#8FD18A','#5DBB63','#C9A15A','#F4F7FB'][se]);px(c,0,GY,SW,2,'rgba(0,0,0,.08)');
  // 季節のつぶ（桜・雪・落ち葉）
  if(!dead&&se!==1)for(let k=0;k<14;k++){const fx=(k*37+t/(se===3?40:30))%SW,fy=(k*23+t/(se===3?30:45))%GY;px(c,fx,fy,se===3?2:1,se===3?2:1,se===0?'#FF9EC4':se===2?'#E07B39':'#FFFFFF')}
  if(h<35&&!dead)for(let k=0;k<26;k++){const rx=(k*29+t/6)%SW,ry=(k*17+t/3)%GY;px(c,rx,ry,1,3,'rgba(80,110,170,.55)')}
  const pl=(typeof sceneOverride!=='undefined'&&sceneOverride&&sceneOverride.place)||sceneInfo().place;drawPlace(c,pl,t);
  if(!dead){const ppl=scenePeople();let x=26;ppl.forEach((p,i)=>{drawPerson(c,x,p,t,i);x+=p.a<10?8:11});
    if(s.pet&&s.age>=(s.petAt||0)){const cx=x+4;px(c,cx,GY-4,6,4,'#5A4A42');px(c,cx+5,GY-6,3,3,'#5A4A42');px(c,cx+5,GY-7,1,1,'#5A4A42');px(c,cx+7,GY-7,1,1,'#5A4A42');px(c,cx-1,GY-6,1,3,'#5A4A42')}}
}

function heart(c,x,y,col){col=col||'#F2367F';px(c,x,y,2,2,col);px(c,x+3,y,2,2,col);px(c,x,y+1,5,2,col);px(c,x+1,y+3,3,1,col);px(c,x+2,y+4,1,1,col)}
function hearts(c,t,x0,y0){for(let k=0;k<4;k++){const y=y0-((t/45+k*9)%30);heart(c,x0+(k*7)%18,y)}}
function confetti(c,t){const cols=['#F2367F','#FFC93C','#3D6BFF','#1F9D6B','#8E6CF0'];for(let k=0;k<34;k++){const x=(k*41+t/(18+k%4*6))%SW,y=(k*29+t/(14+k%3*5))%GY;px(c,x,y,2,1+(k%2),cols[k%5])}}
function petalsF(c,t){for(let k=0;k<22;k++){const x=(k*37+t/28)%SW,y=(k*23+t/36)%GY;px(c,x,y,2,1,'#FF9EC4')}}
function coinsRain(c,t){for(let k=0;k<18;k++){const x=(k*43)%SW,y=(k*31+t/12)%(GY+10)-10;px(c,x,y,4,4,'#FFC93C');px(c,x+1,y+1,2,2,'#E0A400')}}
function stars(c,t){for(let k=0;k<26;k++){const x=(k*53)%SW,y=(k*19)%(GY-20);if((k+Math.floor(t/500))%5)px(c,x,y,1,1,'#FFF7C2')}px(c,160,10,8,8,'#FFF2A8');px(c,163,10,5,6,'#1B2148')}
function skyFill(c,a,b){const g=c.createLinearGradient(0,0,0,GY);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,SW,GY)}
function room(c,wall,floor){px(c,0,0,SW,GY,wall);px(c,0,GY,SW,SH-GY,floor);px(c,0,GY-2,SW,2,'rgba(0,0,0,.12)')}
function rainF(c,t){for(let k=0;k<30;k++){const rx=(k*29+t/6)%SW,ry=(k*17+t/3)%GY;px(c,rx,ry,1,3,'rgba(80,110,170,.6)')}}
function mountains(c,col1,col2){for(let i=0;i<60;i++){px(c,10+i,40+Math.abs(30-i),1,GY-40-Math.abs(30-i),col1)}for(let i=0;i<80;i++){px(c,70+i,30+Math.abs(40-i)*.9,1,GY-30-Math.abs(40-i)*.9,col2)}px(c,104,30,12,4,'#FFFFFF')}
function shop(c,x,open){px(c,x,36,64,GY-36,'#F4E1C1');for(let i=0;i<8;i++)px(c,x+i*8,32,8,8,i%2?'#FFFFFF':'#F2367F');
  if(open){px(c,x+8,46,20,20,'#8EC5EA');px(c,x+38,46,14,GY-46,'#7A5230');px(c,x+28,22,1,10,'#333');px(c,x+29,22,8,5,'#FFC93C')}
  else{for(let y=44;y<GY;y+=3)px(c,x+4,y,56,2,'#9AA0AE')}}
function people(c,t,ppl,x0){let x=x0||26;ppl.forEach((p,i)=>{drawPerson(c,x,p,t,i);x+=p.a<10?8:11});return x}
function me(extra){const p=scenePeople()[0];return Object.assign({},p,extra||{})}
function mate(extra){return Object.assign({a:s.age,shirt:'#8E6CF0',hair:s.age>=58?'#A9A9B3':'#2B2233',long:true},extra||{})}
function drawSpecial(c,t,key){
  const se=season(),fam=scenePeople();let x;
  switch(key){
  case 'wedding':case 'friendwed':{skyFill(c,'#BFE3FF','#F5FBFF');px(c,0,GY,SW,SH-GY,'#9ED89A');
    px(c,112,30,46,GY-30,'#FFFFFF');for(let i=0;i<24;i++)px(c,112+i,30-i*.7,46-i*2,1,'#E8E8F0');px(c,133,8,4,6,'#FFC93C');px(c,128,48,14,GY-48,'#C9A15A');px(c,118,40,6,8,'#BFE3FF');px(c,146,40,6,8,'#BFE3FF');
    if(key==='wedding'){people(c,t,[me({shirt:'#22223A',tie:1}),mate({shirt:'#FFFFFF',veil:1})],70);hearts(c,t,74,40)}
    else{people(c,t,[me({tear:1})],40);people(c,t,[{a:30,shirt:'#22223A',hair:'#2B2233',tie:1},{a:30,shirt:'#FFFFFF',hair:'#5A3A2A',long:1,veil:1}],80)}
    petalsF(c,t);break}
  case 'baby':case 'grandbaby':{room(c,'#FFF1E6','#E8C9A8');px(c,120,18,40,26,'#BFE3FF');px(c,139,18,2,26,'#FFF1E6');px(c,120,30,40,2,'#FFF1E6');
    px(c,104,GY-14,60,8,'#FFFFFF');px(c,104,GY-6,3,6,'#9A7B5A');px(c,161,GY-6,3,6,'#9A7B5A');
    x=people(c,t,key==='baby'?fam.slice(0,2):[fam[0]].concat(s.married?[fam[1]]:[]),40);
    px(c,x-6,GY-14,7,5,'#FFFFFF');px(c,x-3,GY-15,3,3,'#F3C9A6');hearts(c,t,x-10,40);break}
  case 'date':{skyFill(c,'#FFB8A8','#FFE6D6');px(c,0,GY,SW,SH-GY,'#6FBF73');
    const cx=140,cy=38,r=26;for(let a=0;a<64;a++){const an=a/64*6.283;px(c,cx+Math.cos(an)*r,cy+Math.sin(an)*r,1,1,'#7A6C8C')}
    for(let k=0;k<8;k++){const an=k/8*6.283+t/4000;const gx=cx+Math.cos(an)*r,gy=cy+Math.sin(an)*r;px(c,cx,cy,1,1,'#7A6C8C');px(c,gx-2,gy,5,4,['#F2367F','#FFC93C','#3D6BFF','#1F9D6B'][k%4])}
    px(c,cx-1,cy,2,GY-cy,'#7A6C8C');people(c,t,[me(),mate()],60);hearts(c,t,64,44);break}
  case 'breakup':{skyFill(c,'#5E6785','#8C93A8');px(c,0,GY,SW,SH-GY,'#6D7A6C');px(c,60,GY-8,26,2,'#6B4A30');px(c,62,GY-6,2,6,'#4A3020');px(c,82,GY-6,2,6,'#4A3020');
    people(c,t,[me()],70);px(c,140,20,2,GY-20,'#3A3F55');px(c,134,18,14,4,'#FFE9A8');rainF(c,t);break}
  case 'cohabit':{room(c,'#F6EFE6','#D9B99B');px(c,20,20,34,26,'#BFE3FF');px(c,36,20,2,26,'#F6EFE6');px(c,120,GY-20,50,20,'#8E6CF0');px(c,120,GY-26,50,6,'#A78BFA');
    people(c,t,[me(),mate()],70);hearts(c,t,74,40);break}
  case 'entrance':{skyFill(c,'#FFD6E5','#FFF2F7');px(c,0,GY,SW,SH-GY,'#8FD18A');drawPlace(c,'school',t);px(c,20,30,6,GY-30,'#7A5230');px(c,8,16,32,18,'#FFB3CF');px(c,12,10,22,8,'#FFC6DA');
    px(c,84,44,3,GY-44,'#555');px(c,84,44,14,8,'#FFFFFF');people(c,t,[me()].concat(s.age<20?[]:[]),54);petalsF(c,t);break}
  case 'firstjob':case 'jobchange':case 'mentor':case 'fight':case 'promotion':case 'retire':{
    const gloomy=key==='fight';skyFill(c,gloomy?'#8D96AE':'#9ED2FF',gloomy?'#C3C8D6':'#E8F5FF');px(c,0,GY,SW,SH-GY,'#B9C0CC');drawPlace(c,'office',t);
    const suit=me({shirt:key==='retire'?me().shirt:'#2B3550',tie:key!=='retire'});
    if(key==='mentor')people(c,t,[suit,{a:24,shirt:'#4CC9F0',hair:'#3A2A20'}],40);else people(c,t,[suit],50);
    if(key==='firstjob'||key==='jobchange')px(c,63,GY-9,6,5,key==='jobchange'?'#C9A15A':'#3B2B20');
    if(key==='jobchange'){px(c,60,GY-14,10,8,'#C9A15A');px(c,60,GY-14,10,1,'#9A7B4A')}
    if(key==='fight'){px(c,49,GY-24,6,1,'#E5484D');px(c,51,GY-26,1,5,'#E5484D');px(c,53,GY-26,1,5,'#E5484D')}
    if(key==='promotion'){px(c,70,GY-14,8,6,'#FFC93C');px(c,72,GY-8,4,4,'#E0A400');px(c,70,GY-4,8,2,'#B07C00');confetti(c,t)}
    if(key==='retire'){px(c,62,GY-14,4,6,'#3E8E41');heart(c,60,GY-18,'#F2367F');px(c,64,GY-19,3,3,'#FFC93C');confetti(c,t)}
    if(key==='mentor'){for(let k=0;k<3;k++)px(c,58+k*5,GY-28-((t/80+k*4)%6),2,2,'#FFC93C')}
    break}
  case 'startup':case 'closed':{const ok=key==='startup';skyFill(c,ok?'#9ED2FF':'#6C7591',ok?'#E8F5FF':'#9AA0B4');px(c,0,GY,SW,SH-GY,'#B9C0CC');shop(c,104,ok);people(c,t,[me()],60);
    if(ok)confetti(c,t);else rainF(c,t);break}
  case 'newhouse':{skyFill(c,'#9ED2FF','#E8F5FF');px(c,0,GY,SW,SH-GY,'#8FD18A');const h=s.house;s.house=true;drawPlace(c,'home',t);s.house=h;
    x=people(c,t,fam.filter(p=>!p.main||true).slice(0,4),30);px(c,x,GY-12,4,4,'#FFC93C');px(c,x+3,GY-11,4,1,'#FFC93C');confetti(c,t);break}
  case 'country':{skyFill(c,'#8FD3FF','#E6F7FF');mountains(c,'#6FA36B','#5B8F5B');px(c,0,GY,SW,SH-GY,'#7CC36B');for(let i=0;i<SW;i+=6)px(c,i,GY+4+(i%12?0:3),3,3,'#5DA34F');
    px(c,130,54,30,GY-54,'#F4E1C1');for(let i=0;i<10;i++)px(c,128+i,54-i,34-i*2,1,'#6B4A30');people(c,t,fam.slice(0,4),40);break}
  case 'travel':{skyFill(c,'#5EC8FF','#C9F0FF');px(c,0,GY-14,SW,14,'#3AA0E0');for(let i=0;i<SW;i+=9)px(c,(i+t/60)%SW,GY-10,5,1,'#FFFFFF');px(c,0,GY,SW,SH-GY,'#F7E2A6');
    px(c,150,34,3,GY-34,'#8A5A2B');px(c,138,30,28,5,'#3E8E41');px(c,144,26,16,5,'#4FA35A');
    const ax=SW-((t/12)%(SW+60));px(c,ax,18,26,5,'#FFFFFF');px(c,ax+8,10,6,20,'#FFFFFF');px(c,ax+22,13,4,6,'#F2367F');for(let i=0;i<4;i++)px(c,ax+3+i*4,19,2,2,'#7FB3E0');
    people(c,t,[me()].concat(s.partner?[fam[1]]:[]),40);px(c,66,GY-8,7,8,'#F2367F');break}
  case 'mountain':{skyFill(c,'#8FD3FF','#E6F7FF');mountains(c,'#7A8CA6','#5E6F8C');px(c,0,GY,SW,SH-GY,'#8FB27E');people(c,t,[me()],80);px(c,77,GY-15,4,8,'#C0504D');break}
  case 'hosp':case 'clinic':{room(c,'#EEF5FA','#CFD8E0');px(c,20,14,34,24,'#BFE3FF');px(c,36,14,2,24,'#EEF5FA');
    if(key==='hosp'){px(c,80,GY-14,70,6,'#FFFFFF');px(c,80,GY-8,3,8,'#9AA0AE');px(c,147,GY-8,3,8,'#9AA0AE');px(c,80,GY-22,4,10,'#9AA0AE');
      const p=me();px(c,86,GY-19,5,5,'#F3C9A6');px(c,86,GY-20,5,2,p.hair);px(c,92,GY-18,40,5,'#9EC5E8');px(c,160,GY-34,2,34,'#9AA0AE');px(c,156,GY-34,8,8,'#DCEBFF');
      if(s.partner||s.married)people(c,t,[fam[1]],60)}
    else{people(c,t,[me(),{a:45,shirt:'#FFFFFF',hair:'#2B2233'}],80);px(c,100,GY-12,5,7,'#F7F7F7');px(c,101,GY-11,3,1,'#333')}break}
  case 'gym':{room(c,'#E9EDF5','#8A8FA0');for(let i=0;i<3;i++){px(c,110+i*22,GY-6,14,2,'#333');px(c,110+i*22,GY-9,3,8,'#555');px(c,121+i*22,GY-9,3,8,'#555')}
    px(c,20,10,60,30,'#C9D7EA');people(c,t,[me({shirt:'#E5484D'})],50);const up=Math.floor(t/400)%2;px(c,47,GY-18-up*4,17,2,'#333');break}
  case 'walk':{skyFill(c,'#FFE2B0','#FFF6E5');px(c,0,GY,SW,SH-GY,'#8FD18A');drawPark(c,t,false);people(c,t,fam.slice(0,2),30+((t/60)%40));break}
  case 'stage':{room(c,'#140F2A','#241A3F');px(c,40,30,112,10,'#3A2F6B');for(let k=0;k<3;k++){const lx=60+k*36;c.fillStyle=['rgba(242,54,127,.25)','rgba(255,201,60,.25)','rgba(61,107,255,.25)'][k];c.beginPath();c.moveTo(lx,0);c.lineTo(lx-14,40);c.lineTo(lx+14,40);c.fill()}
    people(c,t,[{a:22,shirt:'#FFFFFF',hair:'#FFC93C'}],92);for(let k=0;k<7;k++){const px0=20+k*24;const wave=Math.floor(t/300+k)%2;people(c,t,[k===3?me():{a:25,shirt:'#3A3150',hair:'#2B2233'}],px0);px(c,px0+6,GY-24-wave*2,1,6,['#F2367F','#4CC9F0','#FFC93C'][k%3])}break}
  case 'gamer':case 'cozy':{room(c,'#1E2340','#2E3355');px(c,20,12,30,24,'#0E1330');stars(c,t);px(c,20,12,30,1,'#3B4270');
    if(key==='gamer'){px(c,90,GY-30,40,24,'#111');px(c,92,GY-28,36,20,['#4CC9F0','#F2367F','#9BE564'][Math.floor(t/500)%3]);px(c,84,GY-6,52,2,'#6B4A30');people(c,t,[me()],70)}
    else{px(c,90,GY-16,60,10,'#8E6CF0');people(c,t,[me()],100);px(c,120,GY-12,4,4,'#FFFFFF');px(c,121,GY-16,1,3,'rgba(255,255,255,.6)');if(s.pet)px(c,140,GY-20,6,4,'#5A4A42')}break}
  case 'izakaya':case 'campfire':{skyFill(c,'#1B2148','#3A3F7A');stars(c,t);px(c,0,GY,SW,SH-GY,key==='izakaya'?'#5A4632':'#3E5A3A');
    if(key==='izakaya'){px(c,90,30,90,GY-30,'#6B3A1E');px(c,90,30,90,6,'#2B1A10');for(let k=0;k<3;k++){px(c,100+k*28,38,8,12,'#E5484D');px(c,102+k*28,36,4,2,'#2B1A10')}px(c,60,GY-10,30,3,'#A0522D')}
    else{const f=Math.floor(t/150)%3;px(c,96,GY-4,16,4,'#6B4A30');px(c,99,GY-10-f,10,7+f,'#FF8A3D');px(c,101,GY-14-f,6,6,'#FFC93C')}
    people(c,t,[me(),{a:s.age,shirt:'#4CC9F0',hair:'#2B2233'},{a:s.age,shirt:'#FFB547',hair:'#5A3A2A',long:1},{a:s.age,shirt:'#9BE564',hair:'#2B2233'}],key==='izakaya'?16:44);break}
  case 'study':case 'book':{room(c,'#F4F0E8','#C9A97E');
    if(key==='book'){for(let j=0;j<3;j++){px(c,100,20+j*18,80,2,'#7A5230');for(let i=0;i<14;i++)px(c,102+i*5.5,8+j*18,4,12,['#F2367F','#3D6BFF','#1F9D6B','#FFC93C','#8E6CF0'][(i+j)%5])}px(c,70,GY-14,12,10,'#F2367F');px(c,72,GY-12,8,1,'#FFFFFF')}
    else{px(c,90,GY-16,60,4,'#7A5230');px(c,94,GY-12,3,12,'#7A5230');px(c,143,GY-12,3,12,'#7A5230');px(c,100,GY-22,14,6,'#3D6BFF');px(c,116,GY-21,10,5,'#FFFFFF');px(c,130,GY-26,3,10,'#FFE36E');px(c,128,GY-28,7,3,'#FFF6C2')}
    people(c,t,[me()],key==='book'?50:80);break}
  case 'coins':{skyFill(c,'#FFE9A8','#FFF8E0');px(c,0,GY,SW,SH-GY,'#8FD18A');coinsRain(c,t);people(c,t,[me()],80);break}
  case 'crash':{room(c,'#2A2E45','#3A3F5A');px(c,90,10,90,50,'#11152A');const pts=[[92,20],[110,24],[124,18],[140,36],[156,44],[176,56]];for(let i=0;i<pts.length-1;i++){const [x1,y1]=pts[i],[x2,y2]=pts[i+1];for(let k=0;k<=20;k++)px(c,x1+(x2-x1)*k/20,y1+(y2-y1)*k/20,2,2,'#E5484D')}
    people(c,t,[me()],50);px(c,52,GY-26,1,4,'#8EC5EA');break}
  case 'cat':{room(c,'#FFF1E6','#E8C9A8');px(c,20,14,30,22,'#BFE3FF');people(c,t,fam.slice(0,2),40);const cx=90;px(c,cx,GY-10,16,10,'#5A4A42');px(c,cx+12,GY-16,10,9,'#5A4A42');px(c,cx+12,GY-19,2,3,'#5A4A42');px(c,cx+20,GY-19,2,3,'#5A4A42');px(c,cx+14,GY-13,1,1,'#FFE36E');px(c,cx+19,GY-13,1,1,'#FFE36E');px(c,cx-3,GY-16-(Math.floor(t/300)%2),2,8,'#5A4A42');hearts(c,t,cx+10,34);break}
  case 'care':{room(c,'#F6EFE6','#D9B99B');px(c,20,20,34,26,'#BFE3FF');people(c,t,[me()],60);
    const ex=80;px(c,ex,GY-10,12,2,'#555');px(c,ex+1,GY-8,8,8,'#222');px(c,ex+3,GY-6,4,4,'#888');px(c,ex+2,GY-22,5,5,'#F3C9A6');px(c,ex+2,GY-23,5,2,'#F2F2F2');px(c,ex+1,GY-17,7,7,'#9AA0AE');hearts(c,t,74,40);break}
  case 'hobby':{room(c,'#F4F0E8','#C9A97E');px(c,100,GY-34,24,22,'#FFFFFF');px(c,98,GY-36,28,2,'#7A5230');px(c,104,GY-30,8,6,'#3D6BFF');px(c,112,GY-24,8,8,'#F2367F');px(c,100,GY-12,2,12,'#7A5230');px(c,122,GY-12,2,12,'#7A5230');
    px(c,140,GY-14,10,8,'#FFC93C');px(c,143,GY-6,4,4,'#E0A400');px(c,140,GY-2,10,2,'#B07C00');people(c,t,[me()],70);break}
  case 'kidsout':{skyFill(c,'#9ED2FF','#E8F5FF');px(c,0,GY,SW,SH-GY,'#8FD18A');drawPlace(c,'home',t);people(c,t,fam.slice(0,2),30);
    const kx=70+((t/50)%40);people(c,t,[{a:22,shirt:'#FFB547',hair:'#3A2A20'}],kx);px(c,kx+8,GY-8,6,8,'#3D6BFF');break}
  case 'buzz':{skyFill(c,'#FFE0EF','#FFF5FA');px(c,0,GY,SW,SH-GY,'#C9D7EA');px(c,110,10,36,62,'#22223A');px(c,113,15,30,50,'#FFFFFF');
    for(let k=0;k<6;k++){const y=60-((t/30+k*12)%50);heart(c,118+(k*9)%22,y+5)}people(c,t,[me()],70);break}
  case 'volunteer':{skyFill(c,'#9ED2FF','#E8F5FF');px(c,0,GY,SW,SH-GY,'#8FD18A');drawPark(c,t,false);people(c,t,[me(),{a:60,shirt:'#9BE564',hair:'#A9A9B3'},{a:10,shirt:'#4CC9F0',hair:'#3A2A20'}],40);px(c,80,GY-8,7,8,'#3A3F55');hearts(c,t,60,40);break}
  case 'cafe':{skyFill(c,'#FFE2B0','#FFF6E5');px(c,0,GY,SW,SH-GY,'#C9B79A');px(c,96,30,84,GY-30,'#F4E1C1');for(let i=0;i<11;i++)px(c,96+i*8,26,8,8,i%2?'#FFFFFF':'#1F9D6B');px(c,104,40,30,20,'#8EC5EA');px(c,150,44,14,GY-44,'#7A5230');
    px(c,40,GY-10,30,2,'#7A5230');px(c,54,GY-8,2,8,'#7A5230');px(c,48,GY-13,3,3,'#FFFFFF');people(c,t,[me(),{a:s.age,shirt:'#FFB547',hair:'#A9A9B3'}],22);break}
  case 'funeral':{skyFill(c,'#2A2F55','#7A6E9A');stars(c,t);px(c,0,GY,SW,SH-GY,'#4A4F66');
    px(c,118,40,44,GY-40,'#3A3550');px(c,118,38,44,3,'#2A2540');px(c,132,46,16,18,'#E9E4D6');px(c,134,48,12,14,'#B9B2A0');px(c,137,50,6,6,'#F3C9A6');px(c,137,49,6,2,scenePeople()[0].hair);
    [[122,'#FFFFFF'],[126,'#F2E6FF'],[154,'#FFFFFF'],[158,'#FFF2C2']].forEach(([fx,col])=>{px(c,fx,GY-14,2,14,'#3E8E41');px(c,fx-2,GY-18,6,5,col)});
    if(COUNTRY==='jp'||COUNTRY==='kr'||COUNTRY==='tw'){for(let k=0;k<3;k++){px(c,136+k*4,GY-12,1,8,'#C9A15A');for(let j=0;j<6;j++)px(c,136+k*4+Math.round(Math.sin(t/400+j+k)*1.5),GY-14-j*3-((t/60)%3),1,2,'rgba(230,230,240,.45)')}}
    else{for(let k=0;k<4;k++){px(c,126+k*10,GY-8,2,6,'#F7F1E0');const f=Math.floor(t/180+k)%2;px(c,126+k*10,GY-11-f,2,3,'#FFC93C')}}
    const mourn=[];const fam=scenePeople().slice(1);fam.forEach(p=>mourn.push(Object.assign({},p,{a:Math.max(p.a,8),shirt:'#1E1E28'})));
    for(let k=0;k<3;k++)mourn.push({a:50,shirt:'#1E1E28',hair:['#2B2233','#A9A9B3','#5A3A2A'][k],long:k===1});
    people(c,t,mourn.slice(0,8),14);break}
  }
}

