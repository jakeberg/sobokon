const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

const board = document.getElementById("board");
const boxes = document.getElementById("boxes");
var player = document.getElementById("player");
var winningSpots = [];
var cratesSpots = [];
var crates = [];
var playerRow;
var playerCol;

// Draws the board based on the array above
for (let r = 0; r < map.length; r++) {
    let row = map[r];
    var boxPosition = [];
    var spotPosition = [];

    for (let c = 0; c < row.length; c++) {
        let cell = row[c];
        var cellDiv = document.createElement("div");

        if (cell === "B") {
            cellDiv.className = ("empty");
        } else if (cell === "W") {
            cellDiv.className = ("wall");
        } else if (cell === " " || cell === "S") {
            cellDiv.className = ("empty");
        } else if (cell === "O" || cell === "X") {
            cellDiv.className = ("empty spot");
        }
        board.appendChild(cellDiv);

        if (cell === "B") {
            boxPosition.push("box");
        } else if (cell === "W") {
            boxPosition.push(null);
        } else if (cell === " ") {
            boxPosition.push(null);
        } else if (cell === "O") {
            boxPosition.push(null);
            winningSpots.push(String(r) + String(c));
        } else if (cell === "X") {
            boxPosition.push("box");
            winningSpots.push(String(r) + String(c));
        } else if (cell === "S") {
            boxPosition.push(null);
            player.style.top = r * 40 + "px";
            player.style.left = c * 40 + "px";
            playerRow = r;
            playerCol = c;
        }
    }
    crates.push(boxPosition);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            playerMove(+1, 0, +2, 0)
            break;

        case "ArrowLeft":
            playerMove(-1, 0, -2, 0)
            break;

        case "ArrowUp":
            if (map[playerRow - 1][playerCol] !== "W" && crates[playerRow - 1][playerCol] == null) {
                playerRow -= 1;
                let moveR = playerRow;
                player.style.top = moveR * 40 + "px";
            } else if (crates[playerRow - 1][playerCol] == "box" && map[playerRow - 2][playerCol] !== "W" && crates[playerRow - 2][playerCol] !== "box") {
                crates[playerRow - 1][playerCol] = null;
                crates[playerRow - 2][playerCol] = "box";
                playerRow -= 1;
                player.style.top = playerRow * 40 + "px";
                moveBox(crates)
            }
            break;

        case "ArrowDown":
            if (map[playerRow + 1][playerCol] !== "W" && crates[playerRow + 1][playerCol] == null) {
                playerRow += 1;
                let moveR = playerRow;
                player.style.top = moveR * 40 + "px";
            } else if (crates[playerRow + 1][playerCol] == "box" && map[playerRow + 2][playerCol] !== "W" && crates[playerRow + 2][playerCol] !== "box") {
                crates[playerRow + 1][playerCol] = null;
                crates[playerRow + 2][playerCol] = "box";
                playerRow += 1;
                player.style.top = playerRow * 40 + "px";
                moveBox(crates)
            }
            break;

        default:
            console.log(event.key)
    }
    checkWin();
});

function playerMove(leftOrRight, upOrDown, boundaryCheckLR, boundaryCheckUD) {
    const checkForWall = map[playerRow][playerCol + leftOrRight] !== "W";
    const checkForNull = crates[playerRow][playerCol + leftOrRight] == null;
    const checkForBox = crates[playerRow][playerCol + leftOrRight] == "box";
    const checkForExtraBox = crates[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "box";
    const checkForWallTwo = map[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "W"
    
    if (checkForWall && checkForNull) {
        playerCol += leftOrRight;
        player.style.left = playerCol * 40 + "px";

    } else if (checkForWall && checkForBox && checkForExtraBox && checkForWallTwo) {
        crates[playerRow][playerCol + leftOrRight] = null;
        crates[playerRow][playerCol + boundaryCheckLR] = "box";
        playerCol += leftOrRight;
        player.style.left = playerCol * 40 + "px";
        moveBox(crates);
    }
}

function moveBox(boxDest) {
    reset();
    for (let x = 0; x < boxDest.length; x++) {
        var z = boxDest[x];
        for (let y = 0; y < z.length; y++) {
            var cellOfCrateSpots = z[y];
            var absoluteCrates = document.createElement("div");
            if (cellOfCrateSpots === "box") {
                absoluteCrates.className = ("box");
                absoluteCrates.style.top = x * 40 + "px";
                absoluteCrates.style.left = y * 40 + "px";
                boxes.appendChild(absoluteCrates);
                cratesSpots.push(String(x) + String(y));
            }
        }
    }
}
moveBox(crates);

function reset() {
    cratesSpots = [];
    while (boxes.firstChild) {
        boxes.removeChild(boxes.firstChild);
    }
}

function checkWin() {
    let cratesSpotsString = cratesSpots.join("");
    let winningSpotsString = winningSpots.join("");
    if (cratesSpotsString == winningSpotsString) {
        document.getElementById("win").style.display = "block";
    }
}