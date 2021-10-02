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
        mode === "trophyThieves"
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

export { isTrio, isSolo, isDuo, isAll, getLocalTime, calDisplayTime };