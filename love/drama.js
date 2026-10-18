(function(root){'use strict';
const C=typeof module!=='undefined'&&module.exports?require('./core.js'):root.LoveCore,F=typeof module!=='undefined'&&module.exports?require('./family.js'):root.LoveFamily;
function arc(id,title,group,rows,unlock){return {id,title,group,unlock,steps:rows.map(row=>{const [text,scene,action,mood,motion]=row.split('|');return {text,scene,action,mood,motion};})};}
const arcs=[
arc('cat','迷い猫、大追跡！','all',[
 '公園の植え込みから、小さな猫が飛び出した。首輪はあるのに、飼い主がいない。「待って、そっちは道路！」|park|run|surprise|chase',
 'やっと近づけたと思ったら、今度はベンチの下へ。おやつを置いて、驚かせないように待ってみる。|park|pet|think|catwait',
 '探していた飼い主が駆けつけた。猫は何事もなかったように腕の中へ。お礼に、近所のカフェを教えてもらった。|park|wave|happy|visitor'
],['catFriend','🐈','近所の猫と顔なじみ']),
arc('cake','ケーキが大変なことに','all',[
 'お祝いのケーキを焼こうとしたら、オーブンから予想外の煙！ 焦げた表面を見て、思わず固まった。|kitchen|cook|surprise|smoke',
 '失敗した生地で、小さなパフェを作ることに。フルーツを足して、名前も「気まぐれスイーツ」に変更！|kitchen|cook|think|busy',
 '見た目はちょっと不格好。でも、ひと口食べた友達が大笑いして「これ、また作って」。忘れられない誕生日になった。|home|celebrate|happy|party'
],['cooking','🧁','失敗しても楽しめる料理']),
arc('train','降りる駅、間違えた！','all',[
 '窓の景色に見とれていたら、降りる駅を通り過ぎた。次の電車まで、思っていたより時間がある…。|station|run|surprise|dash',
 'せっかくだから、知らない街を歩いてみた。路地の先に小さなパン屋。店の人が、海への近道を教えてくれた。|street|walk|think|travel',
 '坂を下りたら、きらきらした海が広がっていた。予定どおりなら見られなかった景色を、写真に残した。|beach|photo|happy|camera'
],['detour','🧳','寄り道で見つけた旅先']),
arc('friend','返事が来ない理由','all',[
 '楽しみにしていた約束が、急にキャンセルになった。メッセージを見直しては、「何か悪いこと言ったかな」と考えてしまう。|cafe|phone|sad|alone',
 'しばらくして、友達から電話。「最近、余裕がなくて」。返事の遅さだけでは、わからない事情があった。|bedroom|phone|soft|call',
 '久しぶりに会って、長い話をした。全部解決したわけじゃない。でも「また来週」と言える距離に戻れた。|cafe|drink|soft|close'
],['friend','💌','気にかけ合える友達']),
arc('exhibit','初めて、作品を人に見せる','all',[
 'ずっと作っていた作品を、公募に出してみることに。送信ボタンの前で、何度も写真を撮り直した。|studio|paint|think|busy',
 '会場で、自分より上手な作品ばかり目に入る。帰りたくなったとき、ひとりの人が作品の前で足を止めた。|gallery|look|sad|alone',
 '賞には届かなかった。でも「この色、好きです」と声をかけられた。そのひと言を、次の作品の一歩にする。|gallery|gift|soft|letter'
],['artist','🎨','絵を描き続ける習慣']),
arc('market','小さなお祭りの大仕事','all',[
 '地域のお祭りで、出店を手伝うことになった。軽い気持ちで引き受けたら、準備するものが山ほどある！|street|phone|surprise|busy',
 '看板も飾りも手作り。作業は進まないのに、なぜか笑いは止まらない。気づけば新しい仲間ができていた。|studio|paint|happy|visitor',
 '当日、店の前に初めてのお客さん。緊張しながら渡した品物に「ありがとう」。終わるころには、みんなでハイタッチ。|festival|cheer|happy|customers'
],['community','🎪','地域の仲間ができた']),
arc('rain','傘がひとつしかない','romance',[
 '帰ろうとした瞬間、土砂降りの雨。バッグを探したのに、傘がない。隣から「一緒に入る？」と声がした。|street|umbrella|blush|approach',
 '傘を持つ手が、少しだけ触れた。話したかったことはあるのに、雨の音に助けられて、まだ言えない。|street|umbrella|blush|close',
 '駅に着いても、すぐには別れなかった。「今度は晴れた日に、出かけよう」。新しい約束がひとつできた。|station|wave|happy|hearts'
],['promise','☂️','雨の日から始まった約束']),
arc('letter','机の上の、名前のない手紙','youth',[
 '放課後、ノートの間に手紙が挟まっていた。「今度の準備、いっしょにやらない？」名前は、裏に小さく書いてある。|classroom|read|surprise|letter',
 '返事を渡すタイミングが見つからない。廊下で何度もすれ違って、結局、帰り際に走って追いかけた。|school|run|blush|dash',
 '並んで作業を始めたら、緊張はいつの間にか消えていた。帰り道、「また明日」の言い方が少し変わった。|classroom|paint|happy|close'
],['classmate','📮','放課後を一緒に過ごす友達']),
arc('band','急きょ、ステージに出ることに','youth',[
 '文化祭の出番に、メンバーがひとり足りないらしい。「一曲だけでもお願い！」突然の頼みに、心臓が跳ねた。|music|phone|surprise|busy',
 '放課後の練習で、何度も間違えた。笑ってごまかしたけれど、帰ってからも頭の中でリズムを数えている。|music|dance|think|dance',
 '本番。最初の音は少し震えた。それでも最後までやり切ると、客席から拍手。仲間と顔を見合わせて、思い切り笑った。|concert|dance|happy|dance'
],['band','🎸','音楽を一緒に楽しむ仲間']),
arc('exam','模試の結果が、思ったより悪い','youth',[
 '返ってきた結果を見て、言葉が出なかった。頑張っていたつもりなのに。ノートを開く気になれない。|classroom|read|sad|alone',
 '友達と苦手なところを教え合った。「そこ、私もわからない」。ひとりで抱えていたときより、少し前が見えた。|library|write|think|close',
 '次のテストで、前には解けなかった問題が解けた。大逆転ではないけれど、自分で進んだ一歩は、ちゃんとうれしい。|classroom|cheer|happy|jump'
],['studyFriend','📚','一緒に学べる仲間']),
arc('invite','誘ったあとに、急に不安','romance',[
 '勢いで「週末、空いてる？」と送った。既読がついてから、スマホが気になって、何も手につかない。|bedroom|phone|think|phoneglow',
 '返事が来た。「空いてるよ。どこ行こう？」うれしくて、今度は行き先が決められない。地図を何度も開いた。|home|map|blush|busy',
 '待ち合わせで顔を見たら、考えていた台詞を忘れてしまった。でも、相手も少し緊張していた。ふたりで笑って歩き出す。|park|walk|happy|approach'
],['date','🌷','ふたりだけの待ち合わせ']),
arc('pitch','仕事のチャンスが突然来た','work',[
 '急に、人前で企画を話す役を任された。断りたい気持ちと、やってみたい気持ち。資料の一枚目から、手が止まる。|city|phone|surprise|busy',
 '練習では言葉が詰まってばかり。帰り道、説明を聞いてくれた仲間が「そこがいちばん面白い」と教えてくれた。|cafe|talk|think|close',
 '本番は完璧じゃなかった。でも、最後まで自分の言葉で話せた。会場を出ると、足取りが来たときより少し軽い。|office|cheer|happy|award'
],['challenge','✨','人前で伝えた自信']),
arc('shop','お店を開いたのに、誰も来ない','work',[
 'ずっと憧れていた、小さな週末のお店を開いた。飾りもメニューも準備万端。なのに、入口のベルが鳴らない。|cafe|look|sad|emptyshop',
 '仲間に相談して、看板と見せ方を変えてみた。試作品を配りながら、何が好きか、通りの人に聞いて回った。|street|gift|think|visitor',
 '翌週、ひとりのお客さんが「前にもらったの、おいしかった」と戻ってきた。行列ではない。でも、また開けたいと思えた。|cafe|serve|happy|customers'
],['shop','☕','週末だけの小さなお店']),
arc('changeJob','落ちた面接、そのあとに','work',[
 '挑戦したかった仕事の選考に、落ちた。画面の短い連絡が、なかなか閉じられない。今日は少し、落ち込んでいいことにした。|bedroom|phone|sad|alone',
 '以前一緒に働いた人から、別の話が届いた。「こんな仕事、興味ない？」考えていなかった道だった。|cafe|read|surprise|visitor',
 '新しい場所で働き始めた。まだ慣れないけれど、得意なことを頼られる瞬間がある。遠回りにも、つづきがあった。|office|wave|soft|customers'
],['newWork','💼','新しい働く場所']),
arc('distance','離れて暮らす、ふたりの作戦','couple',[
 'しばらく別の街で過ごすことになった。駅で手を振る。平気なふりをしていたけれど、電車が動くと急に寂しくなった。|station|wave|sad|depart',
 'ビデオ通話の時間が、なかなか合わない。「短くても、声だけ聞こう」。ふたりで、続けられるやり方を探した。|bedroom|phone|soft|call',
 '久しぶりの再会。話したいことが多すぎて、駅からなかなか進めない。離れていた時間も、ふたりの話になった。|station|hug|happy|hug'
],['longDistance','🚃','離れていてもつながる工夫']),
arc('fight','言いすぎた、夜','couple',[
 '小さなことから言い合いになった。言わなくてもいいことまで言ってしまい、食卓が静かになった。|kitchen|talk|sad|apart',
 'ひとりで歩きながら、何が嫌だったのか考えた。本当は、忙しさをわかってほしかったのかもしれない。|park|walk|think|alone',
 '「さっきは、ごめん」。謝ったあとに、お願いもひとつ伝えた。すぐ全部は変わらなくても、同じテーブルに戻れた。|home|hug|soft|hug'
],['reconcile','🤝','言葉にして仲直りできた日']),
arc('anniversary','忘れられた記念日？','couple',[
 '今日は大切な記念日のはず。相手はいつもどおりで、こちらも言い出せない。用意したプレゼントが、かばんの中で待っている。|home|gift|sad|apart',
 '「今日、何の日か覚えてる？」聞いた途端、相手の顔が固まった。ふたりで慌てて出かけることになった。|street|run|surprise|dash',
 '予約も豪華な花も間に合わない。でも、いつものカフェでケーキを半分こ。来年の予定を、その場で一緒に入れた。|cafe|celebrate|happy|party'
],['anniversary','🎂','ふたりで決めた記念日の約束']),
arc('toy','大事なぬいぐるみが、いない','parent',[
 '寝る前、子どもが泣き出した。いつものぬいぐるみが見つからない。さっきまで、確かにここにあったのに。|home|look|surprise|search',
 '公園のベンチも、帰り道も探した。見つからなくて帰宅すると、ソファの下から、見覚えのある耳が…。|park|run|think|search',
 'ぬいぐるみを抱えていたのは、猫だった！ 子どもは泣きながら笑って、猫の隣に、もう一枚小さな毛布を置いた。|home|pet|happy|cattoy'
],['familyJoke','🧸','家族だけが知っている笑い話']),
arc('schoolFight','「学校、行きたくない」','parent',[
 '朝、子どもが玄関で立ち止まった。「今日は、行きたくない」。急ぎたい気持ちを飲み込んで、いったん座った。|home|talk|sad|childsad',
 '少しずつ聞くと、友達とのすれ違いがあったらしい。代わりに答えを決めず、「どうしたい？」を一緒に考えた。|home|drink|soft|childtalk',
 '数日あと、「今日は話せた」と子どもが言った。まだ心配はあるけれど、帰って話せる場所でいようと思った。|school|wave|soft|family'
],['listening','🌱','子どもの話を待てる時間']),
arc('camp','キャンプが予定どおりにいかない','parent',[
 '家族でキャンプへ。テントの説明書を見ても、形にならない。子どもだけが「秘密基地みたい！」と楽しそう。|camping|map|surprise|busy',
 'ようやく張れたころに雨が降ってきた。予定していた焚き火はお休み。テントの中で、しりとり大会を始めた。|camping|talk|soft|raincamp',
 '朝、外に出たら晴れていた。少し焦げた朝ごはんを、みんなで食べる。大変だった話ほど、あとで何度も笑うらしい。|camping|cook|happy|family'
],['campMemory','🏕️','雨のキャンプの思い出']),
arc('balance','大事な日と、仕事の締め切り','parent',[
 '家族の約束がある日に、仕事が終わらない。時計とスマホを交互に見て、ひとりで焦ってしまう。|office|phone|think|busy',
 '「全部ひとりでやらなくていいよ」。連絡したら、家族も仕事の仲間も、できることを分けてくれた。|kitchen|cook|soft|family',
 '少し遅れて、みんなの輪に加わった。完璧な一日ではなかったけれど、一緒にろうそくを吹き消せた。|home|celebrate|happy|party'
],['teamFamily','🕯️','頼ってもいいと思えた日']),
arc('reunion','もう会えないと思っていた人','later',[
 '片づけていたら、昔の写真が出てきた。連絡先も変わった友達。今、どこで何をしているんだろう。|home|photo|soft|alone',
 '共通の知り合いを通じて、メッセージがつながった。「会いたいね」が、本当の予定になっていく。|bedroom|phone|surprise|phoneglow',
 '待ち合わせで、先に気づいたのは声だった。何十年ぶりでも、その笑い方は覚えている。話は、閉店まで終わらなかった。|cafe|drink|happy|visitor'
],['oldFriend','📷','もう一度つながった旧友']),
arc('garden','花壇から始まった、意外な役目','later',[
 '近所の花壇の手入れに参加した。土いじりだけのつもりが、イベントの飾り付けまで頼まれてしまった。|garden|water|surprise|busy',
 '昔やっていたことが、思いがけず役に立った。年下の仲間にやり方を聞かれ、少し照れながら手を動かす。|studio|paint|happy|visitor',
 '当日、花の前で写真を撮る人たちを見た。「また来年も」と声をかけられ、手帳に新しい予定が増えた。|garden|photo|soft|customers'
],['gardenTeam','🌼','近所で頼られる居場所']),
arc('grandday','孫を預かった、一日','grand',[
 '今日は孫とお留守番。おもちゃもおやつも準備したのに、さっそく部屋じゅうを探検し始めた！|home|run|surprise|grandrun',
 '静かになったと思ったら、紙いっぱいにお絵描き中。床にも少しはみ出したけれど、真剣な顔を見て、そっと隣に座った。|home|paint|soft|family',
 '帰り際、絵を一枚もらった。「また来るね」。少し疲れた体で、さっそくいちばん見える場所に飾った。|home|gift|happy|family'
],['grandDrawing','🖍️','孫からもらった一枚の絵'])
];
function seed(s){return Number.isInteger(s.profile.seed)?s.profile.seed>>>0:(parseInt(s.game.code,2)*2654435761)>>>0;}
function allowed(x,s,f){if(x.group==='all')return true;if(x.group==='youth')return s.age<23;if(x.group==='romance')return s.age<33&&s.profile.relation!=='alone';if(x.group==='work')return s.age>=23&&s.age<60;if(x.group==='couple')return s.age>=23&&(s.age<33?s.profile.relation!=='alone':f?.branch<2);if(x.group==='parent')return !!f?.children?.length&&f.children[0].age>=3&&f.children[0].age<18;if(x.group==='later')return s.age>=45;return x.group==='grand'&&!!f?.grandchildren?.length;}
function event(s){if(s.season===3||[18,27,33,65].includes(s.age))return null;
 // Keep all three parts together, and leave family milestone years intact.
 for(let q=0;q<3;q++){const test={...s,season:q,beat:(s.age-16)*4+q};if(F.event(test)?.major)return null;}
 const f=F.state(s),pool=arcs.filter(x=>allowed(x,s,f)&&!(x.id==='toy'&&s.age<46));if(!pool.length)return null;const n=seed(s),index=((s.age-17)+(n%pool.length))%pool.length,chosen=f?.grandchildren?.length&&s.age===63?arcs.find(x=>x.id==='grandday'):pool[(index+pool.length)%pool.length],part=s.season,step={...chosen.steps[part]},ending=part===2;
 if(chosen.id==='exhibit'&&(n+s.age)%2===0&&ending){step.text='小さな賞に、自分の名前があった。何度も見直してから、いちばん先に応援してくれた人へ連絡した。';step.mood='happy';step.motion='award';}
 return {...step,id:'episode-'+s.age+'-'+chosen.id+'-'+part,title:chosen.title,label:chosen.title,weather:step.action==='umbrella'?'rain':step.motion==='raincamp'?'rain':step.scene==='concert'?'night':['petals','sun','leaves'][part],cast:['alone','emptyshop'].includes(step.motion)?1:2,major:ending,family:['parent','grand'].includes(chosen.group)?f:undefined,episode:{id:chosen.id,title:chosen.title,part:part+1,total:3,tone:part===0?'突然の出来事':part===1?'気になる、その後':'物語のつづき',next:ending?'この日も、思い出になっていく。':part===0?'この出来事、まだつづきがあります。':'あの出来事の、その後へ。'},unlock:ending?chosen.unlock:null};
}
function followup(s){if(s.season!==3||!s.keepsakes?.length)return null;const item=s.keepsakes[(s.age+seed(s))%s.keepsakes.length];const stories={catFriend:['あの迷い猫と、近所で再会した。今日は追いかける必要もない。顔を覚えてくれたのか、向こうから近づいてきた。','park','pet'],shop:['週末のお店に、いつものお客さんが来た。「今日はこれにする」。あの日は鳴らなかったベルが、暮らしの音になっている。','cafe','serve'],artist:['あの展示から、また一枚、絵が増えた。上手く描くことより、今見ているものを残したくなっている。','studio','paint'],band:['文化祭から始まった音楽の仲間と、久しぶりに音を合わせた。昔の曲なのに、今の自分たちの音がする。','music','dance'],grandDrawing:['孫にもらった絵を眺める。あの日の慌ただしさまで思い出して、ひとりで少し笑ってしまった。','home','gift']};const x=stories[item[0]];if(!x)return null;return {id:'after-'+s.beat,title:item[2],label:item[2],text:x[0],scene:x[1],action:x[2],mood:'soft',motion:x[2]==='serve'?'customers':undefined,weather:'snow',cast:2};}
const api={arcs,event,followup};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LoveDrama=api;
})(typeof window==='undefined'?globalThis:window);
