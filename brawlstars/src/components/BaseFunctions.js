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

export { isTrio, isSolo, isDuo, isAll };