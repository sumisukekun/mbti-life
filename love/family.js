(function(root){'use strict';
const milestones=[
 [34,0,'wedding','結婚式','大切な人たちに見守られて、結婚式の日を迎えた。緊張していたのに、隣の笑顔を見たら、いつものふたりに戻れた。','wedding','celebrate'],
 [34,1,'honeymoon','ふたりで新婚旅行','初めて「家族」として出かける旅。道に迷ったことまで、あとから笑える思い出になった。','travel','photo'],
 [34,2,'moving','新しい家へ引っ越し','段ボールの山の中で、最初のごはん。まだ家具の少ない部屋が、ふたりの家になっていく。','moving','move'],
 [35,0,'expecting','新しい家族の知らせ','赤ちゃんを迎えることになった。うれしさと、初めてのことへの不安。ふたりで少しずつ、親になる準備を始めた。','home','expecting','kids'],
 [35,2,'nursery','赤ちゃんを迎える準備','小さな服をたたみ、ベビーベッドを組み立てる。こんなに小さな靴下を履く人が、もうすぐここへ来る。','nursery','prepare','kids'],
 [36,0,'birth','赤ちゃんが生まれた日','赤ちゃんが生まれた。小さな手が指を握った瞬間、「これからよろしくね」が、自然とこぼれた。','nursery','baby','kids'],
 [36,2,'firstSmile','初めての笑顔','抱っこしていたら、赤ちゃんがこちらを見て笑った。寝不足の毎日にも、忘れたくない一瞬がある。','nursery','baby','kids'],
 [37,0,'firstSteps','初めての一歩','ソファから手を離して、一歩、もう一歩。よろけた先で抱きとめたら、子どもは得意そうに笑っていた。','home','play','kids'],
 [38,1,'familyTrip','家族ではじめての海','砂浜を怖がっていた子が、帰るころには貝殻を手放さない。荷物は増えたけれど、旅の楽しみも増えた。','beach','familywalk','kids'],
 [39,0,'kindergarten','幼稚園・保育園へ','大きなかばんを背負って、初めての登園。「いってきます」の小さな声に、こちらのほうが泣きそうになった。','school','schoolbag','kids'],
 [40,2,'sports','運動会の応援','走る子どもに、思わず大きな声が出た。順位より、最後まで走り切った笑顔を、何度も写真で見返した。','sports','cheer','kids'],
 [42,0,'primary','小学校の入学式','ランドセルがまだ大きい。桜の下で写真を撮りながら、あの小さな手がこんなに育ったことを実感した。','school','schoolbag','kids'],
 [43,3,'homework','宿題をいっしょに','宿題の「どうして？」に、こちらも考え込む。教えるつもりが、一緒に学ぶ冬の夜になった。','home','read','kids'],
 [45,1,'camping','家族でキャンプ','火おこしに苦戦して、夕食が少し遅くなった。外で食べるカレーに、子どもは何度もおかわりした。','camping','cook','kids'],
 [46,2,'petFamily','小さな家族が増えた','保護猫を家族に迎えた。名前を考える会議が長引いて、主役の猫は、ひざの上ですっかり眠っている。','home','pet','kids'],
 [48,0,'junior','中学生になった春','新しい制服に少し照れた顔。「写真は一枚だけね」と言われて、成長がうれしくて、少し寂しかった。','school','schoolbag','kids'],
 [49,2,'teenTalk','思春期の子と話す夜','言い合いになったあと、温かい飲み物を置いた。すぐ答えが出なくても、話を聞ける場所でいたい。','home','talk','kids'],
 [51,0,'highSchool','高校の入学式','高校生になった子の背丈が、自分とほとんど同じになった。制服姿を見送って、自分の放課後を思い出した。','school','schoolbag','kids'],
 [53,3,'exam','受験を見守る冬','夜食のおにぎりに、小さなメモを添えた。代わりには頑張れないけれど、そばで応援することはできる。','kitchen','cook','kids'],
 [54,0,'graduation','卒業、そして新しい道','卒業式の帰り道、子どもが未来の話をした。決めた道を聞いて、「応援してる」と伝えられた。','school','graduate','kids'],
 [54,2,'leaving','子どものひとり暮らし','引っ越し先に荷物を運んだ。「着いたら連絡してね」と言いながら、空いた部屋の静かさを想像した。','moving','move','kids'],
 [56,1,'anniversary','久しぶりに、ふたりだけで','子育ての話をいったん置いて、ふたりで小さな旅行へ。昔と違う私たちにも、まだ新しい思い出ができる。','travel','photo','kids'],
 [58,0,'firstJob','子どもの初任給','初任給でごちそうしてもらった。メニューを選ぶ背中が、急に頼もしく見えた。','restaurant','eat','kids'],
 [60,1,'childWedding','子どもの結婚式','子どもが選んだ大切な人と、結婚の日を迎えた。小さかった日の姿が重なって、拍手をする手に力がこもった。','wedding','childWedding','kids'],
 [62,0,'grandbirth','初めての孫が生まれた','孫が生まれた。そっと抱くと、あの頃と同じ小さな重み。「おじいちゃん、おばあちゃんになったんだね」と笑い合った。','nursery','grandbaby','kids'],
 [63,1,'grandwalk','孫と公園へ','孫の歩幅に合わせて、ゆっくり公園を一周。何でも指さす小さな手が、見慣れた景色を新しくしてくれる。','park','grandwalk','kids'],
 [64,2,'reunion','三世代の家族写真','久しぶりに家族が集まった。写真に収まりきらないくらい、笑い声も増えた。ひとりの放課後から、ここまでつながってきた。','home','reunion','kids'],
 [64,3,'retirement','これからの暮らし','働き方を少しゆるめて、これからやりたいことを書き出した。旅も、趣味も、大切な人と過ごす時間も。つづきはまだある。','home','map']
];
const together=[
 [38,1,'ふたりで海外旅行','行ってみたかった街へ。ふたりの旅の地図に、またひとつ、思い出の印が増えた。','travel','photo'],
 [42,2,'記念日のレストラン','結婚記念日に、少しおしゃれをして食事へ。いちばん笑ったのは、出会った頃の失敗談だった。','restaurant','eat'],
 [46,0,'猫のいる暮らし','猫を家族に迎えた。ふたりで選んだベッドには入らず、空き箱の中で気持ちよさそうに眠っている。','home','pet'],
 [51,1,'新しい趣味をふたりで','陶芸の教室へ。出来上がった器は形も色も違うけれど、どちらも毎日の食卓に並んでいる。','studio','paint'],
 [57,2,'友達家族と集まる日','友達の家に集まって、持ち寄りごはん。家族の形はそれぞれでも、笑って囲む食卓はあたたかい。','picnic','eat'],
 [62,0,'思い出の場所へ','昔よく歩いた道を、久しぶりにふたりで。変わったお店を数えながら、変わらない話し方にほっとした。','park','walk']
];
const own=[
 [34,0,'自分の暮らしを始める','好きな家具を少しずつそろえた。自分で選んだ部屋が、少しずつ落ち着く居場所になっていく。','moving','move'],
 [36,1,'ひとり旅の出会い','初めての街で、隣の席の人と話が弾んだ。自分のペースで歩いたから、出会えた景色がある。','travel','photo'],
 [39,2,'作品を初めて出展','ずっと続けていた作品を展示した。足を止めて見てくれる人がいて、胸がいっぱいになった。','gallery','paint'],
 [43,0,'仲間と新しい挑戦','気の合う仲間と、小さな活動を始めた。できることを持ち寄ると、ひとりでは見えなかった形ができた。','studio','paint'],
 [46,2,'猫が家族になった','猫を迎えて、いつもの部屋に新しい生活音が増えた。帰宅を待つ小さな姿に、今日も笑ってしまう。','home','pet'],
 [50,1,'節目の誕生日','友達が誕生日を祝ってくれた。今までの話も、これからの話も尽きなくて、帰るのが惜しい夜だった。','restaurant','celebrate'],
 [55,0,'新しいことを学び始める','もう一度、学ぶ場所へ。年齢の違う仲間と話すたびに、まだ知らない自分の興味が見つかる。','library','read'],
 [60,2,'長い付き合いの友達と','気づけば何十年の付き合い。久しぶりでも、昨日のつづきのように話せる友達がいる。','cafe','drink'],
 [63,1,'姪や甥の家族と遊ぶ日','親戚の子どもと公園へ。元気に走る姿を見ながら、いろいろな形で人とつながってきたことを思った。','park','grandwalk']
];
function state(s){const living=s.game.log.find(x=>x.stage===6);if(!living)return null;const branch=living.choice,children=branch===0&&s.age>=36?[{age:s.age-36,role:'child'}]:[];const grandchildren=branch===0&&s.age>=62?[{age:s.age-62,role:'grandchild'}]:[];return {branch,married:branch<2&&s.age>=34,children,grandchildren};}
function event(s){const f=state(s);if(!f)return null;let row;
 if(f.branch<2)row=milestones.find(x=>x[0]===s.age&&x[1]===s.season&&(!x[7]||f.branch===0));
 if(row){const [age,season,id,title,text,scene,action]=row;return {id:'family-'+id,title,text,scene,action,label:title,mood:'happy',weather:scene==='wedding'?'petals':['petals','sun','leaves','snow'][season],cast:2,major:true,family:f};}
 const pool=f.branch===1?together:f.branch===2?own:[];row=pool.find(x=>x[0]===s.age&&x[1]===s.season);
 if(row){const [age,season,title,text,scene,action]=row;return {id:'life-'+age+'-'+season,title,text,scene,action,label:title,mood:'happy',weather:['petals','sun','leaves','snow'][season],cast:f.branch===2&&action!=='grandwalk'?1:2,major:true,family:f};}
 if(f.branch===0&&s.age>=36&&s.age<54&&s.beat%3===0){const age=s.age-36,scenes=age<3?['nursery','home','park','nursery']:['park','beach','home','kitchen'],texts=age<3?['赤ちゃんの寝顔を見守る、静かな昼下がり。起こさないように、ふたりで小さな声で話した。','離乳食がほっぺにまで。うまく食べられない日も、一口ずつ、ゆっくりでいい。','ベビーカーでお散歩。いつもの公園に、赤ちゃんと初めて見る景色がある。','夜泣きの夜は、交代で抱っこ。眠い目をこすりながら、ふたりで助け合う。']:['子どもと公園で遊ぶ。昨日できなかったことが、今日はできる。そのたびに、いっしょに喜んだ。','家族で夏の遠出。子どもが見つけた宝物を入れるため、かばんに小さな袋を足した。','学校であったことを聞く夕方。話したい日も、話したくない日も、そばで待っている。','家族で台所に立った。子どもが手伝った一皿を、みんなで「おいしい」と食べた。'];return {id:'parent-'+s.beat,text:texts[s.season],scene:scenes[s.season],label:age<3?'赤ちゃんとの毎日':'子育てのひとこま',action:age<1?'baby':s.season===3?'cook':'familywalk',mood:'happy',weather:['petals','sun','leaves','snow'][s.season],cast:2,family:f};}
 return null;
}
const api={event,state,milestones};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LoveFamily=api;
})(typeof window==='undefined'?globalThis:window);
