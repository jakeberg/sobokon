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
var crates = [];
var playerRow;
var playerCol;

// Draws the board based on the array above
for (let r = 0; r < map.length; r++) {
    var row = map[r];
    var cellClass = [];
    for (let c = 0; c < row.length; c++) {
        let cell = row[c];
        var cellDiv = document.createElement("div");

        if (cell === "B") {
            cellDiv.className = ("empty");
            cellClass.push("box");
        } else if (cell === "W") {
            cellDiv.className = ("wall");
            cellClass.push(null);
        } else if (cell === " ") {
            cellDiv.className = ("empty");
            cellClass.push(null);
        } else if (cell === "O") {
            cellDiv.className = ("empty spot");
            cellClass.push(null);
        } else if (cell === "X") {
            cellDiv.className = ("empty spot");
            cellClass.push("box");
        } else if (cell === "S") {
            cellDiv.className = ("empty");
            cellClass.push(null);
            player.style.top = r * 40 + "px";
            player.style.left = c * 40 + "px";
            playerRow = r;
            playerCol = c;
        }
        board.appendChild(cellDiv);
    }
    crates.push(cellClass);
}

movePlayer = function (event) {
    let keyStroke = event.key;
    switch (keyStroke) {
        case "ArrowRight":
            if (map[playerRow][playerCol + 1] !== "W" && crates[playerRow][playerCol + 1] == null) {
                playerCol += 1;
                let moveC = playerCol;
                player.style.left = moveC * 40 + "px";
            } else if (crates[playerRow][playerCol + 1] == "box" && map[playerRow][playerCol + 2] !== "W" && crates[playerRow][playerCol + 2] !== "box") {
                crates[playerRow][playerCol + 1] = null;
                crates[playerRow][playerCol + 2] = "box";
                playerCol += 1;
                let moveC = playerCol;
                player.style.left = moveC * 40 + "px";
                var newStuff = crates;
                move(newStuff)
            }
            break;

        case "ArrowLeft":
            if (map[playerRow][playerCol - 1] !== "W" && crates[playerRow][playerCol - 1] == null) {
                playerCol -= 1;
                let moveC = playerCol;
                player.style.left = moveC * 40 + "px";
            } else if (crates[playerRow][playerCol - 1] == "box" && map[playerRow][playerCol - 2] !== "W" && crates[playerRow][playerCol - 2] !== "box") {
                crates[playerRow][playerCol - 1] = null;
                crates[playerRow][playerCol - 2] = "box";
                playerCol -= 1;
                let moveC = playerCol;
                player.style.left = moveC * 40 + "px";
                var newStuff = crates;
                move(newStuff)
            }
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
                let moveR = playerRow;
                player.style.top = moveR * 40 + "px";
                var newStuff = crates;
                move(newStuff)
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
                let moveR = playerRow;
                player.style.top = moveR * 40 + "px";
                var newStuff = crates;
                move(newStuff)
            }
            break;

        default:
            console.log(keyStroke)
    }
    checkwin();
}

document.addEventListener("keydown", movePlayer);

function move(boxDest) {
    reset();
    for (let x = 0; x < boxDest.length; x++) {
        var z = boxDest[x];
        for (let y = 0; y < z.length; y++) {
            var foo = z[y];
            var absoluteCrates = document.createElement("div");
            if (foo === "box") {
                absoluteCrates.className = ("box");
                absoluteCrates.style.top = x * 40 + "px";
                absoluteCrates.style.left = y * 40 + "px";
                boxes.appendChild(absoluteCrates);


            }
        }
    }
}
move(crates);

function reset() {
    while (boxes.firstChild) {
        boxes.removeChild(boxes.firstChild);
    }
}

function checkwin() {
    if (crates[2][1] == "box" && crates[3][5] == "box" && crates[4][1] == "box" && crates[5][4] == "box" && crates[6][3] == "box" && crates[6][6] == "box" && crates[7][4] == "box"){
        alert("You win!!!")
    }
}
