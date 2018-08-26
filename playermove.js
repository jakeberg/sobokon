// Takes values from the directional input and looks in the area around the player div 
// and either moves, or moves and pushes a box in the crates array
function playerMove(leftOrRight, upOrDown, boundaryCheckLR, boundaryCheckUD) {
    const checkForWall = currentMap[playerRow + upOrDown][playerCol + leftOrRight] !== "W";
    const checkForNull = crates[playerRow + upOrDown][playerCol + leftOrRight] == null;
    const checkForBox = crates[playerRow + upOrDown][playerCol + leftOrRight] == "box";
    const checkForExtraBox = crates[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "box";
    const checkForWallTwo = currentMap[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "W";

    if (checkForWall && checkForNull) {
        playerCol += leftOrRight;
        player.style.left = playerCol * 3 + "vw";
        playerRow += upOrDown;
        player.style.top = playerRow * 3 + "vw";

    }
    else if (checkForWall && checkForBox && checkForExtraBox && checkForWallTwo) {
        crates[playerRow + upOrDown][playerCol + leftOrRight] = null;
        crates[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] = "box";

        playerCol += leftOrRight;
        playerRow += upOrDown;
        player.style.left = playerCol * 3 + "vw";
        player.style.top = playerRow * 3 + "vw";
        moveBox(crates);
    }
}


//event listener for directional pad
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    switch (event.key) {
        case "ArrowRight":
            playerMove(+1, 0, +2, 0)
            break;

        case "ArrowLeft":
            playerMove(-1, 0, -2, 0)
            break;

        case "ArrowUp":
            playerMove(0, -1, 0, -2)
            break;

        case "ArrowDown":
            playerMove(0, +1, 0, +2)
            break;

        default:
            console.log(event.key)
    }
    checkWin();
});