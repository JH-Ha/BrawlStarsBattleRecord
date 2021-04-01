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

export { isTrio };