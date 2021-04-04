function isTrio(mode) {
    let result = false;
    if (
        mode === "gemGrab" ||
        mode === "heist" ||
        mode === "siege" ||
        mode === "bounty" ||
        mode === "brawlBall" ||
        mode === "hotZone"
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

function calDisplayTime(battleTime) {
    let year = battleTime.substr(0, 4);
    let month = battleTime.substr(4, 2);
    let date = battleTime.substr(6, 2);
    let hours = battleTime.substr(8, 3);
    let minutes = battleTime.substr(11, 2);
    let seconds = battleTime.substr(13);

    let localeBattleTime = new Date(`${year}-${month}-${date}${hours}:${minutes}:${seconds}`);
    let now = new Date();
    let diffTime = (now - localeBattleTime) / 1000;
    let displayTime = '';
    // in one day
    if (diffTime < 86400) {
        let diffHours = Math.floor(diffTime / 3600);
        let diffMinutes = Math.floor((diffTime / 60 - diffHours * 60));
        console.log(`diffHours ${diffHours} diffMinues ${diffMinutes}`);
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

export { isTrio, isSolo, isDuo, isAll, calDisplayTime };