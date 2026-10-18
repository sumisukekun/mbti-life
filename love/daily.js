(function(root){'use strict';
// Every event owns its setting, action and expression, so the picture follows the story.
const source=[
`桜の花びらが髪に。{相手}が教えてくれて、ふたりで笑った。|park|walk|blush|petals|2
新しいノートを開いて、今年やりたいことをひとつ書いた。|library|write|think|sun|1
いちごのケーキを半分こ。大きいほうを譲り合ってしまった。|cafe|eat|happy|sun|2
窓辺の小さな鉢に芽が出た。昨日より少しだけ背が高い。|garden|water|happy|sun|1
雨宿りの軒先で、{相手}と同じ曲が好きだとわかった。|street|umbrella|blush|rain|2
お弁当を持って芝生へ。おにぎりがちょっと不格好でも、おいしい。|picnic|eat|happy|petals|2
待ち合わせに早く着いた。本屋で見つけた一冊を、あとで見せよう。|bookshop|read|think|sun|1
新しいスニーカーで遠回り。知らなかった小さな花屋を見つけた。|street|walk|happy|sun|1
公園で猫に出会った。そっとしゃがむと、向こうから近づいてきた。|park|pet|happy|petals|1
うまくいかなかった日。{相手}が温かい飲み物を差し出してくれた。|cafe|drink|soft|rain|2
朝のベランダで深呼吸。今日は少しだけ早く出かけてみる。|garden|stretch|happy|sun|1
撮った桜の写真が、ふたりとも同じ構図だった。なんだかうれしい。|park|photo|surprise|petals|2
手作りクッキーが少し焦げた。味見担当の{相手}は笑顔で食べた。|kitchen|cook|blush|sun|2
駅のホームで手を振る。次に会う日を決めたら、寂しさが少し和らいだ。|station|wave|soft|sun|2
新しい趣味の体験教室へ。最初の一歩は、やっぱり少し緊張する。|studio|paint|think|sun|1
夜、短いメッセージを送った。「今日もありがとう」だけで十分な日。|bedroom|phone|soft|night|1`,
`海まで小さな電車旅。潮風で髪がくしゃくしゃになって笑った。|beach|walk|happy|sun|2
縁日の金魚すくいに夢中。浴衣の袖を押さえて、もう一回だけ。|festival|scoop|surprise|night|2
アイスを選ぶのに真剣なふたり。結局、違う味をひと口ずつ交換した。|cafe|icecream|happy|sun|2
急な夕立。傘を寄せると、肩が少しだけ近くなった。|street|umbrella|blush|rain|2
夜空に花火が開いた。「きれい」の声が重なって、顔を見合わせた。|fireworks|look|surprise|night|2
涼しい図書館で調べもの。気づけば、読みたい本が増えていた。|library|read|think|sun|1
小さな水族館へ。クラゲの水槽の前では、会話もゆっくりになる。|aquarium|look|soft|blue|2
家で冷たいパフェ作り。フルーツをのせすぎて、倒れそうになった。|kitchen|cook|surprise|sun|2
ひまわり畑で写真を一枚。まぶしくて、ふたりとも目を細めた。|garden|photo|happy|sun|2
今日は好きな映画を観る日。ポップコーンの減り方が予想以上だった。|cinema|eat|surprise|night|2
朝の散歩で、いつもより早起きの犬に会った。暑くなる前にひと休み。|park|pet|happy|sun|1
旅行の地図を広げた。行きたい場所を丸で囲む時間から、もう楽しい。|home|map|happy|sun|2
帰りの電車でうとうと。窓に映る夕焼けが、少しずつ夜に変わった。|station|rest|sleepy|sunset|1
夏の空をスケッチ。絵の具の青を混ぜながら、時間を忘れた。|studio|paint|happy|sun|1
星を見に少し遠くへ。見つけた星座を、スマホより先に指さした。|rooftop|look|soft|night|2
エアコンの効いた部屋で、ごろごろ読書。予定を入れない休日も好き。|bedroom|read|sleepy|sun|1`,
`落ち葉を踏む音が楽しい。{相手}と、いつもよりゆっくり公園を歩いた。|park|walk|soft|leaves|2
焼きたてパンの香りにつられて寄り道。明日の朝の分まで買ってしまった。|bakery|eat|happy|sun|1
写真展へ。好きな一枚が違って、理由を聞くのがおもしろかった。|gallery|look|think|sun|2
かぼちゃのお菓子を作った。飾りの顔が、思ったよりとぼけた顔になった。|kitchen|cook|happy|sun|1
雨の夜に手紙を書く。直接だと言えないことが、今日は言葉になった。|bedroom|write|soft|rain|1
紅葉を見に日帰り旅。おみやげ選びにも、ふたりの好みが出ていた。|travel|photo|happy|leaves|2
難しいことに挑戦して、今日は少し失敗。好きなお茶を入れて仕切り直す。|home|drink|think|rain|1
小さな音楽会へ。帰り道も、好きだったメロディーが頭の中で鳴っている。|music|listen|soft|night|2
本屋で偶然、同じ棚に手が伸びた。おすすめを教え合って帰った。|bookshop|read|surprise|sun|2
週末のピクニック。温かいスープを分けると、手まで温まった。|picnic|drink|happy|leaves|2
新しい作品が完成。誰より先に見せたくなって、写真を送った。|studio|paint|happy|sun|1
夕焼けの屋上でひと息。今日あったことを、順番を気にせず話した。|rooftop|talk|soft|sunset|2
ハロウィンの小物を選んだ。似合わない帽子も、今日はかぶってみる。|festival|wave|happy|night|2
庭の鉢を植え替える。土だらけの手を見て、なんだか達成感があった。|garden|water|happy|sun|1
窓際で編み物を始めた。一目間違えて、ほどいて、また少し進む。|home|knit|think|sun|1
待ち合わせ場所で、すぐに{相手}を見つけた。好きな上着を覚えていたから。|street|wave|blush|leaves|2`,
`初雪の日。手のひらに落ちた雪が、見ているうちに消えた。|park|look|surprise|snow|2
カフェでホットココア。カップを包む手が、少しずつ温まる。|cafe|drink|soft|snow|2
イルミネーションの道へ。光の中で撮った写真は、少しだけぶれていた。|lights|photo|happy|night|2
おうちでクッキーを焼く。オーブンをのぞくたび、甘い香りが広がった。|kitchen|cook|happy|sun|1
新しい手帳に予定を書いた。空白の日にも、小さく「休む」と書き込んだ。|home|write|think|sun|1
マフラーを巻いて待ち合わせ。遠くから手を振る姿に、思わず笑顔。|station|wave|blush|snow|2
毛布と本と温かいお茶。今日は、この場所から動かないと決めた。|bedroom|read|sleepy|snow|1
少し気まずくなった日。「さっきはごめん」を、帰る前に伝えられた。|street|talk|soft|sunset|2
プレゼントを包むリボンが結べない。動画を見ながら、やっとひとつ完成。|home|gift|think|night|1
スノードームを振ってみた。小さな雪が落ちるまで、ふたりで眺めた。|cafe|gift|soft|snow|2
鍋のふたを開けると、窓がくもるほどの湯気。味見のひと口でほっとした。|kitchen|cook|happy|night|2
年末の片づけで懐かしい写真を発見。手を止めて、思い出話が始まった。|home|photo|soft|sun|2
雪の道に足あとを並べる。歩幅を合わせるのが、なんだかおもしろい。|street|walk|happy|snow|2
静かな美術館へ。冷たい外の空気まで、少し特別に感じる帰り道。|gallery|look|soft|sun|1
眠れない夜に音楽を一曲。返事を急がなくていいメッセージが届いていた。|bedroom|listen|soft|night|1
今年よかったことを三つ数えた。大きな出来事より、小さな日が浮かんだ。|rooftop|talk|happy|night|2`
];
const pools=source.map(s=>s.split('\n').map(row=>{const [text,scene,action,mood,weather,cast]=row.split('|');return {text,scene,action,mood,weather,cast:Number(cast)};}));
const context=[
 ['放課後の寄り道は、いつも少し特別。','明日の授業の話から、また笑いがこぼれた。','制服で過ごす季節を、ひとつずつ覚えていたい。','帰ったらやることもあるけれど、今だけもう少し。'],
 ['新しい暮らしの中に、お気に入りの場所が増えた。','予定を合わせるのは難しくても、この時間は大切。','初めてのことが多い毎日。今日もひとつ思い出になった。','背伸びしすぎず、今の自分で楽しめた。'],
 ['忙しい日々の合間に、こんな時間があると頑張れる。','前より少し、自分の「好き」がわかってきた。','うまくいく日もそうでない日も、暮らしは続いていく。','慣れた毎日にも、まだ知らない楽しみがあった。'],
 ['昔の自分なら選ばなかった楽しみを、今は知っている。','お互いの変化に気づけるくらい、日々を重ねてきた。','懐かしい話にも、新しい話にも、今日は花が咲いた。','年を重ねても、小さなときめきはちゃんとある。']
];
function event(s){const t=typeof module!=='undefined'&&module.exports?require('./core.js').type(s.game.code):root.LoveCore.type(s.game.code);const year=s.age-16,offset=t.base+3*t.mode+(s.profile.focus==='dream'?5:s.profile.focus==='calm'?9:0);const index=(year+offset)%16,e={...pools[s.season][index]};const band=s.age<18?0:s.age<23?1:s.age<45?2:3;let companion=s.profile.relation==='alone'?'友達':s.profile.relation==='dating'?'大切な人':'あの人';
 const living=s.game.log.find(l=>l.stage===6);if(living&&living.choice===2)companion='気の合う友達';
 e.text=e.text.replaceAll('{相手}',companion)+' '+context[band][(Math.floor(year/16)+year+s.season)%4];
 e.label={park:'公園',library:'図書館',cafe:'カフェ',garden:'花のある暮らし',street:'街角',picnic:'ピクニック',bookshop:'本屋',kitchen:'キッチン',station:'駅',studio:'アトリエ',bedroom:'自分の部屋',beach:'海辺',festival:'お祭り',fireworks:'花火の夜',aquarium:'水族館',cinema:'映画館',home:'リビング',rooftop:'空の見える場所',bakery:'パン屋',gallery:'美術館',travel:'小さな旅',music:'音楽会',lights:'光の並木道'}[e.scene];
 // A route changes the day itself, not only the final card.
 const career=s.game.log.find(l=>l.stage===5);if(career&&career.choice===0&&s.beat%11===0){e.scene='studio';e.action='paint';e.cast=1;e.label='新しい挑戦';e.text='挑戦すると決めたあの日から、少しずつ作品を作りためている。今日は、初めて誰かに褒めてもらえた。 '+context[band][year%4];e.mood='happy';}
 if(living&&living.choice===0&&s.beat%9===0){e.scene='kitchen';e.action='cook';e.cast=2;e.label='ふたりのキッチン';e.text='一緒に暮らす家で、今夜のごはんを相談中。好みが違うから、新しい料理も少しずつ増えていく。 '+context[band][year%4];e.mood='happy';}
 if(s.age<18&&['studio','home','library'].includes(e.scene)&&year%2===0){e.scene='classroom';e.label='放課後の教室';e.action=e.action==='paint'?'paint':'write';}
 e.id=s.season+'-'+index+'-'+band+'-'+Math.floor(year/16);return e;
}
const api={event,pools};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LoveDaily=api;
})(typeof window==='undefined'?globalThis:window);
