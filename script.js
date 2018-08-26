const map1 = [
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

const map2 = [
    "    WWWWW          ",
    "    W   W          ",
    "    WB  W          ",
    "  WWW  BWW         ",
    "  W  B B W         ",
    "WWW W WW W   WWWWWW",
    "W   W WW WWWWW  OOW",
    "W B  B          OOW",
    "WWWWW WWW WSWW  OOW",
    "    W     WWWWWWWWW",
    "    WWWWWWW        "
]

const board = document.getElementById("board");
const boxes = document.getElementById("boxes");
let player = document.getElementById("player");
let winningSpots = [];
let cratesSpots = [];
let crates = [];
let playerRow;
let playerCol;
let currentMap;

//Initializes with map 1
drawBoard(map1);

// Allows player to choose map
chooseMap = document.querySelectorAll('.chooseMap')
chooseMap.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.innerHTML == "Map 1") {
            let walls = document.querySelectorAll("div.wall, div.empty, div.box");
            walls.forEach(element => { element.remove() });
            winningSpots = []
            crates = []
            cratesSpots = []
            drawBoard(map1);
        } else {
            let walls = document.querySelectorAll("div.wall, div.empty, div.box");
            walls.forEach(element => { element.remove() });
            winningSpots = []
            crates = []
            cratesSpots = []
            drawBoard(map2);
        }
    })
});

// Draws the board based on the array above
function drawBoard(m) {
    currentMap = m;
    mapWidth = currentMap[0].length
    mapHeight = currentMap.length
    boardWidth = mapWidth * 3
    boardHeight = mapHeight * 3
    board.style.width = boardWidth + "vw"
    board.style.height = boardHeight + "vw"
    for (let r = 0; r < m.length; r++) {
        let row = m[r];
        let boxPosition = [];

        for (let c = 0; c < row.length; c++) {
            let cell = row[c];
            let cellDiv = document.createElement("div");
            // Makes game board where walls and storage spot divs are created
            if (cell === "B") {
                cellDiv.className = ("empty");
            } else if (cell === "W") {
                cellDiv.className = ("wall");
            } else if (cell === " ") {
                cellDiv.className = ("empty");
            } else if (cell === "S") {
                cellDiv.className = ("empty");
            } else if (cell === "O" || cell === "X") {
                cellDiv.className = ("empty spot");
            }
            board.appendChild(cellDiv);
            // Creates a separate array to keep track of the boxes
            // The coordinates of the storage spaces are stored to compare with the current box positions to determine a winning senario.
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
                player.style.top = r * 3 + "vw";
                player.style.left = c * 3 + "vw";
                playerRow = r;
                playerCol = c;
            }
        }
        crates.push(boxPosition);
    }
    moveBox(crates);
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

// The boxes are re-drawn after every keypress based on their current position in the crates array.
// The coordinates are then stored in an array so that they can be compaired with the winning coordinates.
function moveBox(boxDest) {
    redraw();
    for (let x = 0; x < boxDest.length; x++) {
        let z = boxDest[x];
        for (let y = 0; y < z.length; y++) {
            let cellOfCrateSpots = z[y];
            let absoluteCrates = document.createElement("div");
            if (cellOfCrateSpots === "box") {
                absoluteCrates.className = ("box");
                absoluteCrates.style.top = x * 3 + "vw";
                absoluteCrates.style.left = y * 3 + "vw";
                boxes.appendChild(absoluteCrates);
                cratesSpots.push(String(x) + String(y));
            }
        }
    }
}


// Boxes are reset before the boxes are re-drawn
function redraw() {
    cratesSpots = [];
    while (boxes.firstChild) {
        boxes.removeChild(boxes.firstChild);
    }
}

// If the current coordinates of all the boxes matches the coordinates of the storage spots, the player wins.
function checkWin() {
    let cratesSpotsString = cratesSpots.join("");
    let winningSpotsString = winningSpots.join("");
    if (cratesSpotsString == winningSpotsString) {
        document.getElementById("win").style.display = "block";
    }
}

// Resets by emptying the board then drawing the map with the current board
document.getElementById("reset").addEventListener("click", () => {
    let walls = document.querySelectorAll("div.wall, div.empty, div.box");
    walls.forEach(element => { element.remove() });
    winningSpots = []
    crates = []
    cratesSpots = []
    drawBoard(currentMap)
})