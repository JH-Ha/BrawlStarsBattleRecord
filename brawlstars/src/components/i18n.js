import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation: {
            "userListGuide": "Click user name to check battle log and statistics.",
            "homeGuide": `You can check your battle log and brawlers' statistic at maps on this web site.
            
Click on the Players on the top menu to search your nickname and check the history
            
Check brawlers' win rate in Maps menu.

Game records are synchronized every hour.

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
            "brawler": "brawler",
            /* 승패 */
            "victory": "victory",
            "defeat": "defeat",
            "draw": "draw",

            "soloRanked": "Power League",
            "teamRanked": "Power League",
            "registerGuide": "Register your tag for tracking",

        }
    },
    ko: {
        translation: {
            "userListGuide": "유저 이름을 클릭하여 전투기록과 승률 통계를 확인해보세요",
            "homeGuide": `브롤스타즈 전적 검색 및 승률 확인이 가능한 사이트입니다.
            
상단의 Players를 클릭하여 자신의 닉네임을 검색하고 전적을 확인해보세요.
            
MapS에서는 맵별 브롤러 승률을 알 수 있습니다.
            
1시간 마다 전적이 동기화됩니다.
            
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
            // heist
            "Kaboom Canyon": "우당탕 협곡",
            "Safe Zone": "안전지대",
            "G.G. Mortuary": "GG 샵",
            "Hot Potato": "뜨거운 감자",
            "Turnaround": "역전",
            "Gentral Traffic": "Gentral Traffic",
            "Snaked Assault": "Snaked Assault",
            // bounty 
            "Snake Prairie": "뱀의 초원",
            "Shooting Star": "별내림 계곡",
            "Canal Grande": "대운하",
            "Dry Season": "햇빛은 쨍쨍",
            "Land Ahoy": "육지 발견",
            "Purple Paradise": "퍼플 파라다이스",
            "Quick Skip": "퀵 스킵",
            "Open Plaza": "Open Plaza",
            // brawlBall
            "Backyard Bowl": "뒷마당 월드컵",
            "Triple Dribble": "트리플 드리블",
            "Sneaky Fields": "스키니 필드",
            "Super Stadium": "슈퍼 스타디움",
            "Center Stage": "센터 스테이지",
            "Sunny Soccer": "화창한 날",
            "Field Goal": "필드 골",
            "Bank Shot": "뱅크슛",
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
            //"Bot Riot": 
            // hotZone
            "Massive Attack": "대공격",
            "Parallel Plays": "평행선",
            "Split": "틈",
            "Ring of Fire": "불의 고리",
            "Dueling Beetles": "곤충 싸움",
            // "Triumvirate": 
            //     "Magnetic Field" :

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
        }
    },
    ja: {
        translation: {
            "userListGuide": "ユーザー名をクリックしてバトル履歴と勝率通計を確認してください。",
            "homeGuide": `ブロールスターズのバトル履歴と勝率通計が確認できるウェブサイトです。
            
Playersをクリックして、自分のニックネームを検索して、バトル履歴を確認してください。
            
Mapsではマップごとのキャラクターの勝率を確認できます。

バトル履歴は1時間ごとに同期されます。

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
            // heist
            "Kaboom Canyon": "どんぱち谷",
            "Safe Zone": "安全地帯",
            "G.G. Mortuary": "G.G.遺体安置所",
            "Hot Potato": "ホットポテト",
            "Turnaround": "ターンアラウンド",
            "Gentral Traffic": "Gentral Traffic",
            "Snaked Assault": "Snaked Assault",
            // bounty 
            "Snake Prairie": "ジグザグ草原",
            "Shooting Star": "流れ星",
            "Canal Grande": "グランドカナル",
            "Dry Season": "乾燥地帯",
            "Land Ahoy": "上陸準備",
            "Purple Paradise": "紫の楽園",
            "Quick Skip": "クイックスキップ",
            "Open Plaza": "Open Plaza",
            // brawlBall
            "Backyard Bowl": "鉄壁の護り",
            "Triple Dribble": "トリプル　ドリブル",
            "Sneaky Fields": "静かな広場",
            "Super Stadium": "スーパースタジアム",
            "Center Stage": "中央コート",
            "Sunny Soccer": "サニーサッカー",
            "Field Goal": "フィールドゴール",
            "Bank Shot": "バンク　ショット",
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
            //"Bot Riot": 
            // hotZone
            "Massive Attack": "大打撃",
            "Parallel Plays": "パラレルワールド",
            "Split": "スプリット",
            "Ring of Fire": "炎のリング",
            "Dueling Beetles": "ビートルバトル",
            // "Triumvirate": 
            //     "Magnetic Field" :

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
        }
    }
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
    });
export default i18n;