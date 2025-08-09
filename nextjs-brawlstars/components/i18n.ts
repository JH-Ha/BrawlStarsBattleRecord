import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface TranslationResource {
    [key: string]: string;
}

interface Resources {
    [locale: string]: {
        translation: TranslationResource;
    };
}

const resources: Resources = {
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
            "victory": "victory",
            "defeat": "defeat",
            "draw": "draw",
            "soloRanked": "Power League",
            "teamRanked": "Power League",
            "registerGuide": "Register your tag for tracking",
            "newEventMsg": "New Events in",
            "endEventMsg": "Event Ends in",
            "days": "d",
            "hours": "h",
            "minutes": "m",
            "highestTrophies": "Highest Trophies",
            "trophies": "Trophies",
            "expLevel": "Exp Level",
            "3vs3Victories": "3vs3 Victories",
            "soloVictories": "Solo Victories",
            "duoVictories": "Duo Victories",
            "ago": "ago",
            "ongoing": "ongoing",
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
            "victory": "승리",
            "defeat": "패배",
            "draw": "무승부",
            // Map names and other translations truncated for brevity
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
            "days": "일",
            "hours": "시간",
            "minutes": "분",
            "highestTrophies": "최대 트로피",
            "trophies": "현재 트로피",
            "expLevel": "경험치 레벨",
            "3vs3Victories": "3대3 승리",
            "soloVictories": "솔로 승리",
            "duoVictories": "듀오 승리",
            "Today's Events": "오늘의 이벤트",
            "Next Events": "다음 이벤트",
            "ago": "전",
            "ongoing": "진행중",
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
            "brawler": "キャラクター",
            // Brawler names and other translations truncated for brevity
            "victory": "勝利",
            "defeat": "敗北",
            "draw": "引き分け",
            "Statistics": "通計",
            "Win Rate": "勝率",
            "Pick Rate": "選択率",
            "Avg Rank": "平均ランク",
            "friendly": "フレンドバトル",
            "ranked": "ガチバトル",
            "soloRanked": "パワーリーグ",
            "teamRanked": "パワーリーグ",
            "registration": "登録する",
            "registerGuide": "バトル履歴をトラッキングするため、タグを登録してください",
            "newEventMsg": "新イベントまで",
            "endEventMsg": "イベント終了まで",
            "days": "日",
            "hours": "時間",
            "minutes": "分",
            "highestTrophies": "最大トロフィー数",
            "trophies": "現在トロフィー数",
            "expLevel": "レベル",
            "3vs3Victories": "3対3勝利数",
            "soloVictories": "ソロ勝利数",
            "duoVictories": "デュオ勝利数",
            "Today's Events": "今日のイベント",
            "Next Events": "ネクストイベント",
            "ago": "前",
            "ongoing": "進行中",
        }
    }
};

// Uncomment and configure if needed
// i18n
//     .use(initReactI18next)
//     .init({
//         resources,
//         lng: "en",
//     });

export default i18n;
export { resources };