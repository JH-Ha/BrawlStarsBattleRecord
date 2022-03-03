function isTrio(mode) {
    let result = false;
    if (
        mode === "gemGrab" ||
        mode === "heist" ||
        mode === "siege" ||
        mode === "bounty" ||
        mode === "brawlBall" ||
        mode === "hotZone" ||
        mode === "knockout" ||
        mode === "volleyBrawl" ||
        mode === "basketBrawl" ||
        mode === "holdTheTrophy" ||
        mode === "trophyThieves" ||
        mode === "wipeout"
    ) {
        result = true;
    }
    return result;
}

function isSolo(mode) {
    if (mode === "soloShowdown") {
        return true;
    }
    return false;
}
function isDuo(mode) {
    if (mode === "duoShowdown") {
        return true;
    }
    return false;
}
function isAll(mode) {
    if (mode === "ALL") {
        return true;
    }
    return false;
}
function getLocalTime(time) {
    let year = time.substr(0, 4);
    let month = time.substr(4, 2);
    let date = time.substr(6, 2);
    let hours = time.substr(8, 3);
    let minutes = time.substr(11, 2);
    let seconds = time.substr(13);

    return new Date(`${year}-${month}-${date}${hours}:${minutes}:${seconds}`);
}
function calDisplayTime(battleTime) {
    let localeBattleTime = getLocalTime(battleTime);
    let now = new Date();
    let diffTime = (now - localeBattleTime) / 1000;
    let displayTime = '';
    // in one day
    if (diffTime < 86400) {
        let diffHours = Math.floor(diffTime / 3600);
        let diffMinutes = Math.floor((diffTime / 60 - diffHours * 60));

        if (diffHours >= 1) {
            displayTime += `${diffHours} h `;
        }
        if (diffMinutes >= 1) {
            displayTime += `${diffMinutes} m `;
        }
        displayTime += `ago`;
    } else {
        function addZero(num) {
            if (parseInt(num) < 10) {
                return `0` + num;
            }
            return num;
        }
        displayTime = `${localeBattleTime.getFullYear()}-${addZero(localeBattleTime.getMonth() + 1)}-${addZero(localeBattleTime.getDate())} ${addZero(localeBattleTime.getHours())}:${addZero(localeBattleTime.getMinutes())}:${addZero(localeBattleTime.getSeconds())}`;
    }
    return displayTime;
}
function calDisplayMapTime(startTime, endTime) {
    let startLocalTime = getLocalTime(startTime);
    let endLocalTime = getLocalTime(endTime);
    let now = new Date();
    let diffTime = (now - endLocalTime) / 1000;
    let displayTime = '';
    if (now <= endLocalTime && now >= startLocalTime) {
        displayTime = 'now';
    }
    else if (diffTime < 0) {
        diffTime = -diffTime;
        let diffDays = Math.floor(diffTime / 86400);
        let diffHours = Math.floor(diffTime / 3600 - diffDays * 24);
        let diffMinutes = Math.floor((diffTime / 60 % 60));

        if (diffDays >= 1) {
            displayTime += `${diffDays}d `;
        }
        if (diffHours >= 1) {
            displayTime += `${diffHours}h `;
        }
        if (diffMinutes >= 1) {
            displayTime += `${diffMinutes}m `;
        }

        displayTime = `in ${displayTime}`;
    }
    // in one day
    else if (diffTime < 86400) {
        let diffHours = Math.floor(diffTime / 3600);
        let diffMinutes = Math.floor((diffTime / 60 - diffHours * 60));

        if (diffHours >= 1) {
            displayTime += `${diffHours}h `;
        }
        if (diffMinutes >= 1) {
            displayTime += `${diffMinutes}m `;
        }
        displayTime += `ago`;
    } else {
        let diffDays = Math.floor(diffTime / 86400);
        displayTime = `${diffDays}d ago`;
    }
    return displayTime;
}

function calWinRate(data, mode) {
    let records = {};
    let recordArr = [];
    let sumTotalGameNum = 0;
    //console.log(`data : ${data}`);

    data.forEach(e => {

        if (isTrio(mode)) {
            if (records[e.brawlerName] === undefined) {
                records[e.brawlerName] = {
                };
            }
            records[e.brawlerName] = {
                ...records[e.brawlerName],
                [e.result]: e.cnt,
            }
        } else {
            records[e.brawlerName] = {
                brawlerName: e.brawlerName,
                averageRank: e.rankSum / e.cnt,
                cnt: e.cnt,
            }
        }
    });
    if (isTrio(mode)) {
        for (let key in records) {
            let { victory, defeat, draw } = records[key];
            const victoryNum = victory || 0;
            const defeatNum = defeat || 0;
            const drawNum = draw || 0;
            const totalGameNum = victoryNum + defeatNum + drawNum;
            recordArr.push({
                "brawlerName": key,
                "victory": victoryNum,
                "defeat": defeatNum,
                "draw": drawNum,
                "winRate": (victoryNum) / totalGameNum,
                "totalGameNum": totalGameNum
            });
            sumTotalGameNum += totalGameNum;
        }

        recordArr.sort((a, b) => {
            return b.winRate - a.winRate;
        })
    } else {
        for (let key in records) {
            let { averageRank, cnt } = records[key];
            recordArr.push({
                "brawlerName": key,
                "averageRank": averageRank,
                "totalGameNum": cnt
            });
            sumTotalGameNum += cnt;
        }
        recordArr.sort((a, b) => {
            return a.averageRank - b.averageRank;
        })
    }
    return recordArr;
}

export { isTrio, isSolo, isDuo, isAll, getLocalTime, calDisplayTime, calWinRate, calDisplayMapTime };