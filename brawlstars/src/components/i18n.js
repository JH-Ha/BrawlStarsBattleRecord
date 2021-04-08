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
            "soloShowdown": "Solo Showdown",
            "duoShowdown": "Duo Showdown",
            "brawler": "brawler",
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
            "gemGrab": "젬 그랩",
            "heist": "하이스트",
            "brawlBall": "브롤 볼",
            "bounty": "바운티",
            "siege": "시즈 팩토리",
            "hotZone": "핫 존",
            "soloShowdown": "솔로 쇼다운",
            "duoShowdown": "듀오 쇼다운",
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
            "gemGrab": "エメラルドハント",
            "heist": "強奪",
            "brawlBall": "ブロストライカー",
            "bounty": "賞金稼ぎ",
            "siege": "制圧",
            "hotZone": "ホットゾーン",
            "soloShowdown": "ソロ バトルロイヤル",
            "duoShowdown": "デュオ バトルロイヤル",
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