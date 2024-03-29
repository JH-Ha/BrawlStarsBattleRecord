import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation: {
            "userListGuide": "Click user name to check battle log and statistics.",
            "homeGuide": `You can check your battle log and brawlers' statistic at maps on this web site.
            
In the Home menu, we shows the win rate statistics information of the current event.

In the Players menu, you can check the users which are currently being tracked.
We saves battle records up to 50 games.
            
In the Maps, we provides the Brawler win rate for each map.
            
Stats and statistics are updated every hour.

contact : cubeprince@gmail.com`,
            "mapsGuide": "Click a map image to check win rate and pick rate of brawlers.",
            "battleLogTitle": "Battle Log",
            "gemGrab": "Gem Grab",
            "heist": "Heist",
            "brawlBall": "Brawl Ball",
            "bounty": "Bounty",
            "siege": "Siege",
            "hotZone": "Hot Zone",
            "knockout": "Knockout",
            "volleyBrawl": "Volley Brawl",
            "basketBrawl": "Basket Brawl",
            "holdTheTrophy": "Hold The Trophy",
            "trophyThieves": "Trophy Thieves",
            "soloShowdown": "Solo Showdown",
            "duoShowdown": "Duo Showdown",
            "superCityRampage": "Super City Rampage",
            "brawler": "brawler",
            /* 승패 */
            "victory": "victory",
            "defeat": "defeat",
            "draw": "draw",

            "soloRanked": "Power League",
            "teamRanked": "Power League",
            "registerGuide": "Register your tag for tracking",
            "newEventMsg": "New Events in",
            "endEventMsg": "Event Ends in",

            //시간표시
            "days": "d",
            "hours": "h",
            "minutes": "m",

            // search user
            "highestTrophies": "Highest Trophies",
            "trophies": "Trophies",
            "expLevel": "Exp Level",
            "3vs3Victories": "3vs3 Victories",
            "soloVictories": "Solo Victories",
            "duoVictories": "Duo Victories",

        }
    },
    ko: {
        translation: {
            "userListGuide": "유저 이름을 클릭하여 전투기록과 승률 통계를 확인해보세요",
            "homeGuide": `브롤스타즈 전적 검색 및 승률 확인이 가능한 사이트입니다.
            
상단 메뉴의 Home을 클릭하면, 현재 진행되고 있는 이벤트의 승률 통계 정보를 보여줍니다.

Players에는 현재 트래킹되고 있는 유저들의 정보를 확인할 수 있습니다.
최대 50게임까지 트래킹이 됩니다.
            
Maps에서는 맵별 브롤러 승률을 알 수 있습니다.
            
1시간 마다 전적과 통계가 업데이트 됩니다.
            
contact : cubeprince@gmail.com`,
            "mapsGuide": "맵 이미지를 클릭하여 브롤러의 승률과 픽률을 확인해보세요.",
            "battleLogTitle": "전투 기록",
            "mode": "모드",
            "gemGrab": "젬 그랩",
            "heist": "하이스트",
            "brawlBall": "브롤 볼",
            "bounty": "바운티",
            "siege": "시즈 팩토리",
            "hotZone": "핫 존",
            "soloShowdown": "솔로 쇼다운",
            "duoShowdown": "듀오 쇼다운",
            "knockout": "녹아웃",
            "volleyBrawl": "발리 브롤",
            "basketBrawl": "바스켓 브롤",
            "holdTheTrophy": "트로피를 잡아라",
            "trophyThieves": "트로피 도둑",

            /* 브롤러 이름 */
            "brawler": "브롤러",
            "SHELLY": "쉘리",
            "NITA": "니타",
            "COLT": "콜트",
            "BULL": "불",
            "JESSIE": "제시",
            "BROCK": "브록",
            "DYNAMIKE": "다이너마이크",
            "EL PRIMO": "엘 프리모",
            "BARLEY": "발리",
            "POCO": "포코",
            "RICO": "리코",
            "DARRYL": "대릴",
            "PIPER": "파이퍼",
            "PENNY": "페니",
            "BO": "보",
            "MORTIS": "모티스",
            "TARA": "타라",
            "PAM": "팸",
            "FRANK": "프랭크",
            "CROW": "크로우",
            "SPIKE": "스파이크",
            "LEON": "레온",
            "GENE": "진",
            "TICK": "틱",
            "ROSA": "로사",
            "8-BIT": "8비트",
            "CARL": "칼",
            "BIBI": "비비",
            "EMZ": "엠즈",
            "BEA": "비",
            "SPROUT": "스프라우트",
            "SANDY": "샌디",
            "JACKY": "재키",
            "MAX": "맥스",
            "MR. P": "미스터 P",
            "GALE": "게일",
            "COLETTE": "콜레트",
            "AMBER": "앰버",
            "BYRON": "바이런",
            "STU": "스튜",
            "COLONEL RUFFS": "러프스 대령",
            "LOU": "로우",
            "EDGAR": "에드거",
            "SURGE": "서지",
            "NANI": "나니",
            "BELLE": "벨",
            "SQUEAK": "스퀴크",
            "GRIFF": "그리프",
            "ASH": "애쉬",
            "BUZZ": "버즈",
            "MEG": "메그",
            "GROM": "그롬",
            "LOLA": "롤라",
            "FANG": "팽",
            /* 승패 */
            "victory": "승리",
            "defeat": "패배",
            "draw": "무승부",
            /* 맵 이름 */
            // gemGrab 
            "Hard Rock Mine": "암석 광산",
            "Crystal Arcade": "수정 오락실",
            "Deathcap Trap": "독버섯 함정",
            "Ice Fort": "얼음 요새",
            "Undermine": "흔들 광산",
            "Deep Diner": "지하굴 식당",
            "Double Swoosh": "이중 곡선",
            "Minecart Madness": "광기의 광산 열차",
            "Snake Shop": "뱀의 가게",
            "Corner Case": "코너 케이스",
            "Flooded Dam": "침수된 댐",
            "Rustic Arcade": "Rustic Arcade",
            "Arène en folie": "Arène en folie",
            "Red Herring": "Red Herring",
            "Gem Fort": "보석 요새",
            "Flooded Mine": "침수된 광산",
            "Four Squared": "포 스퀘어",
            "Acute Angle": "예리한 각도",
            "Pierced": "천공",
            "Cotton Candy Dreams": "솜사탕의 꿈",
            "Gem Source": "보석의 원천",

            // heist
            "Kaboom Canyon": "우당탕 협곡",
            "Safe Zone": "안전지대",
            "G.G. Mortuary": "GG 샵",
            "Hot Potato": "뜨거운 감자",
            "Turnaround": "역전",
            "Gentral Traffic": "Gentral Traffic",
            "Snaked Assault": "Snaked Assault",
            "Diagonal Alley": "대각선 골목",
            "Bridge Too Far": "머나먼 다리",
            "Rattlesnake Ravine": "방울뱀 협곡",
            // bounty 
            "Snake Prairie": "뱀의 초원",
            "Shooting Star": "별내림 계곡",
            "Canal Grande": "대운하",
            "Dry Season": "햇빛은 쨍쨍",
            "Land Ahoy": "육지 발견",
            "Purple Paradise": "퍼플 파라다이스",
            "Quick Skip": "퀵 스킵",
            "Open Plaza": "Open Plaza",
            "Cube Force": "큐브 포스",
            "Hideout": "은신처",
            "Electric Zone": "일렉트릭 존",
            "Layer Cake": "레이어 케이크",
            "Excel": "탁월한 선택",
            // brawlBall
            "Backyard Bowl": "뒷마당 월드컵",
            "Triple Dribble": "트리플 드리블",
            "Sneaky Fields": "스키니 필드",
            "Super Stadium": "슈퍼 스타디움",
            "Center Stage": "센터 스테이지",
            "Sunny Soccer": "화창한 날",
            "Field Goal": "필드 골",
            "Bank Shot": "뱅크슛",
            "superCityRampage": "슈퍼 시티 램피지",
            "Binary Coding": "이진 코드",
            "Firm Grip": "높은 점유율",
            "Sticky Notes": "포스트잇",
            "Pinhole Punt": "핀홀 필드",
            "Center Field": "센터필드",
            "Pinball Dreams": "핀볼 드림",
            "Slalom Slam": "장애물 코스",
            "Power Shot": "파워 슛",
            // "Encirclement" :
            // "Winter Party" :
            // "Jumping Beans" :
            // "Fast Fork" :
            // "Clean Shot" :
            // "Boxing Day" :
            //siege
            "Bot Drop": "로봇시대",
            "Some Assembly Required": "조립의 조건",
            "Nuts & Bolts": "볼트의 정석",
            "Robo Highway": "로보 하이웨이",
            "Factory Rush": "로봇 공장",
            "Olive Branch": "올리브 나뭇가지",
            "Junk Park": "고물 골원",
            "Robo Ring": "로봇 링",
            "Bric-a-Brac": "골동품",

            //"Bot Riot": 
            // hotZone
            "Massive Attack": "대공격",
            "Parallel Plays": "평행선",
            "Split": "틈",
            "Ring of Fire": "불의 고리",
            "Dueling Beetles": "곤충 싸움",
            "Night at the Museum": "나이트 뮤지엄",
            "Controller Chaos": "컨트롤러 카오스",
            "Danger Zone": "위험 지대",
            // knockout
            "Flaring Phoenix": "타오르는 불사조",
            "Middle Ground": "미들 그라운드",
            "Belle's Rock": "벨스 락",
            "Ends Meet": "하루살이",
            "Luis' Revenge": "루이스의 복수",
            "Deep End": "딥 엔드",
            "Goldarm Gulch": "골드암 협곡",

            // showdown
            "Dark Passage": "어두운 통로",
            "Scorched Stone": "불타는 돌무덤",
            "Cavern Churn": "우당탕 진흙탕",
            "Skull Creek": "해골천",
            "Ruins": "폐허",
            "Mystic Touch": "신비의 손길",
            "Double Trouble": "더블 트러블",
            "Dried Up River": "바짝 마른 강",
            "Acid Lakes": "산성 호수",
            "Dark Fantasies": "다크 판타지",
            "Feast or Famine": "모 아니면 도",
            "Safety Center": "안전 센터",
            "Rockwall Brawl": "바위 장벽 전투",
            "Stocky Stockades": "단단한 울타리",

            // "Triumvirate": 
            //     "Magnetic Field" :
            "SUPER CITY": "슈퍼 시티",

            "Statistics": "통계",
            "Win Rate": "승률",
            "Pick Rate": "픽률",
            "Avg Rank": "평균 랭크",

            "friendly": "친선전",
            "ranked": "경쟁전",

            "soloRanked": "파워 리그",
            "teamRanked": "파워 리그",

            "registration": "등록하기",
            "registerGuide": "전투기록을 트래킹하기 위해 태그를 등록하세요",
            "newEventMsg": "신규 이벤트까지",
            "endEventMsg": "이벤트 종료까지",
            //시간 표시
            "days": "일",
            "hours": "시간",
            "minutes": "분",

            // search user
            "highestTrophies": "최대 트로피",
            "trophies": "현재 트로피",
            "expLevel": "경험치 레벨",
            "3vs3Victories": "3대3 승리",
            "soloVictories": "솔로 승리",
            "duoVictories": "듀오 승리",

            "Today's Events": "오늘의 이벤트",
            "Next Events": "다음 이벤트",
        }
    },
    ja: {
        translation: {
            "userListGuide": "ユーザー名をクリックしてバトル履歴と勝率通計を確認してください。",
            "homeGuide": `ブロールスターズのバトル履歴と勝率通計が確認できるウェブサイトです。
            
上部のメニューのHomeクリックすると、現在進行中のイベントの勝率統計情報が表示されます。

Playersは現在追跡されているユーザーの情報を確認できます。
最大50ゲームまで記録しています。
            
Mapsでは、マップごとのキャラクターの勝率を提供しています。
            
1時間ごとにバトル履歴と統計が更新されます。

contact : cubeprince@gmail.com`,
            "mapsGuide": "マップのイメージをクリックしてキャラクターの勝率と選択率を確認してください。",
            "battleLogTitle": "バトル履歴",
            "mode": "モード",
            "gemGrab": "エメラルドハント",
            "heist": "強奪",
            "brawlBall": "ブロストライカー",
            "bounty": "賞金稼ぎ",
            "siege": "制圧",
            "hotZone": "ホットゾーン",
            "soloShowdown": "ソロ バトルロイヤル",
            "duoShowdown": "デュオ バトルロイヤル",
            "knockout": "ノックアウト",
            "volleyBrawl": "ブロスタバレー",
            "basketBrawl": "プロスタバスケ",
            "holdTheTrophy": "トロフィー争奪戦",
            "trophyThieves": "トロフィー泥棒",
            /* 브롤러 이름 */
            "brawler": "キャラクター",
            "SHELLY": "ジェリー",
            "NITA": "ニタ",
            "COLT": "コルト",
            "BULL": "ブル",
            "JESSIE": "ジェシー",
            "BROCK": "プロック",
            "DYNAMIKE": "ダイナマイク",
            "EL PRIMO": "エル　プリモ",
            "BARLEY": "バーリー",
            "POCO": "ポコ",
            "RICO": "リコ",
            "DARRYL": "ダリル",
            "PIPER": "エリザベス",
            "PENNY": "ペニー",
            "BO": "ボウ",
            "MORTIS": "モーティス",
            "TARA": "タラ",
            "PAM": "パム",
            "FRANK": "フランケン",
            "CROW": "クロウ",
            "SPIKE": "スパイク",
            "LEON": "レオン",
            "GENE": "ジーン",
            "TICK": "ティック",
            "ROSA": "ローサ",
            "8-BIT": "8ビット",
            "CARL": "カール",
            "BIBI": "ビビ",
            "EMZ": "Emz",
            "BEA": "ビー",
            "SPROUT": "スプラウト",
            "SANDY": "サンディ",
            "JACKY": "ジャッキー",
            "MAX": "Max",
            "MR. P": "ミスターP",
            "GALE": "ゲイル",
            "COLETTE": "コレット",
            "AMBER": "アンバー",
            "BYRON": "バイロン",
            "STU": "ストゥー",
            "COLONEL RUFFS": "ラフス大佐",
            "LOU": "ルー",
            "EDGAR": "エドガー",
            "SURGE": "サージ",
            "NANI": "ナーニ",
            "BELLE": "ベル",
            "SQUEAK": "スクウィーク",
            "GRIFF": "グリフ",
            "ASH": "アッシュ",
            "BUZZ": "バズ",
            "MEG": "メグ",
            "GROM": "グロム",
            "LOLA": "ローラ",
            "FANG": "ファング",
            /* 승패 */
            "victory": "勝利",
            "defeat": "敗北",
            "draw": "引き分け",
            /* 맵 이름 */
            // gemGrab 
            "Hard Rock Mine": "ごつごつ坑道",
            "Crystal Arcade": "クリスタルアーケード",
            "Deathcap Trap": "サボテンの罠",
            "Ice Fort": "氷の要塞",
            "Undermine": "アンダーマイン",
            "Deep Diner": "ディープダイナ―",
            "Double Swoosh": "ダブルレール",
            "Minecart Madness": "トロッコの狂気",
            "Snake Shop": "スネークショップ",
            "Corner Case": "コーナーケース",
            "Flooded Dam": "決壊したダム",
            "Rustic Arcade": "Rustic Arcade",
            "Arène en folie": "Arène en folie",
            "Red Herring": "Red Herring",
            "Gem Fort": "エメラルドの要塞",
            "Flooded Mine": "沈んだ鉱山",
            "Four Squared": "四畳半",
            "Acute Angle": "鋭いアングル",
            "Pierced": "串刺し",
            "Cotton Candy Dreams": "綿菓子パラダイス",
            "Gem Source": "エメラルドの源泉",

            // heist
            "Kaboom Canyon": "どんぱち谷",
            "Safe Zone": "安全地帯",
            "G.G. Mortuary": "G.G.遺体安置所",
            "Hot Potato": "ホットポテト",
            "Turnaround": "ターンアラウンド",
            "Gentral Traffic": "Gentral Traffic",
            "Snaked Assault": "Snaked Assault",
            "Diagonal Alley": "ジグザグロード",
            "Bridge Too Far": "橋の彼方",
            "Rattlesnake Ravine": "ガラガラヘビの谷",
            // bounty 
            "Snake Prairie": "ジグザグ草原",
            "Shooting Star": "流れ星",
            "Canal Grande": "グランドカナル",
            "Dry Season": "乾燥地帯",
            "Land Ahoy": "上陸準備",
            "Purple Paradise": "紫の楽園",
            "Quick Skip": "クイックスキップ",
            "Open Plaza": "Open Plaza",
            "Cube Force": "キューブフォース",
            "Hideout": "隠れ家",
            "Electric Zone": "ビリビリゾーン",
            "Layer Cake": "ミルフィーユ",
            "Excel": "優越感",
            // brawlBall
            "Backyard Bowl": "鉄壁の護り",
            "Triple Dribble": "トリプル　ドリブル",
            "Sneaky Fields": "静かな広場",
            "Super Stadium": "スーパースタジアム",
            "Center Stage": "中央コート",
            "Sunny Soccer": "サニーサッカー",
            "Field Goal": "フィールドゴール",
            "Bank Shot": "バンク　ショット",
            "superCityRampage": "スーパーシティ乱闘",
            "Binary Coding": "バイナリコード",
            "Firm Grip": "ポールポゼッション",
            "Sticky Notes": "付箋",
            "Pinhole Punt": "狭き門",
            "Center Field": "センターフィールド",
            "Pinball Dreams": "ピンボールドリーム",
            "Slalom Slam": "回転シュート",
            "Power Shot": "パワーショット",
            // "Encirclement" :
            // "Winter Party" :
            // "Jumping Beans" :
            // "Fast Fork" :
            // "Clean Shot" :
            // "Boxing Day" :
            //siege
            "Bot Drop": "ボットドロップ",
            "Some Assembly Required": "受注生産品",
            "Nuts & Bolts": "重要ポイント",
            "Robo Highway": "ロボットハイウェイ",
            "Factory Rush": "工場大乱闘",
            "Olive Branch": "オリーブの枝",
            "Junk Park": "ゴミの捨て場",
            "Robo Ring": "ロボットリング",
            "Bric-a-Brac": "骨董品",
            //"Bot Riot": 
            // hotZone
            "Massive Attack": "大打撃",
            "Parallel Plays": "パラレルワールド",
            "Split": "スプリット",
            "Ring of Fire": "炎のリング",
            "Dueling Beetles": "ビートルバトル",
            "Night at the Museum": "ナイトミュージアム",
            "Controller Chaos": "コントローラーカオス",
            "Danger Zone": "危険ゾーン",

            // knockout
            "Flaring Phoenix": "燃える不死鳥",
            "Middle Ground": "中州",
            "Belle's Rock": "ベルの岩",
            "Ends Meet": "帳尻合わせ",
            "Luis' Revenge": "ルイスのリベンジ",
            "Deep End": "ディープエンド",
            "Goldarm Gulch": "ゴールドアームの渓谷",
            // "Triumvirate": 
            //     "Magnetic Field" :
            //super city rampage
            "SUPER CITY": "スーパーシティ",
            // showdown
            "Dark Passage": " 暗い廊下",
            "Scorched Stone": "焼け野原",
            "Cavern Churn": "激動の洞窟",
            "Skull Creek": "ガイコツ川",
            "Ruins": "廃墟",
            "Mystic Touch": "神の手",
            "Double Trouble": "ダブルトラブル",
            "Dried Up River": "枯れた川",
            "Acid Lakes": "酸性湖",
            "Dark Fantasies": "暗黒のファンタジー",
            "Feast or Famine": "天国と地獄",
            "Safety Center": "安全センター",
            "Rockwall Brawl": "岩壁の決戦",
            "Stocky Stockades": "山盛りの在庫",

            "Statistics": "通計",
            "Win Rate": "勝率",
            "Pick Rate": "選択率",
            "Avg Rank": "平均ランク",

            //type
            "friendly": "フレンドバトル",
            "ranked": "ガチバトル",

            "soloRanked": "パワーリーグ",
            "teamRanked": "パワーリーグ",

            "registration": "登録する",
            "registerGuide": "バトル履歴をトラッキングするため、タグを登録してください",
            "newEventMsg": "新イベントまで",
            "endEventMsg": "イベント終了まで",

            //시간표시
            "days": "日",
            "hours": "時間",
            "minutes": "分",

            // search user
            "highestTrophies": "最大トロフィー数",
            "trophies": "現在トロフィー数",
            "expLevel": "レベル",
            "3vs3Victories": "3対3勝利数",
            "soloVictories": "ソロ勝利数",
            "duoVictories": "デュオ勝利数",

            "Today's Events": "今日のイベント",
            "Next Events": "ネクストイベント",
        }
    }
};
// i18n
//     .use(initReactI18next)
//     .init({
//         resources,
//         lng: "en",
//     });
//export default i18n;