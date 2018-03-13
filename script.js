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
        // Makes game board where walls and storage spot divs are created
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
            player.style.top = r * 80 + "px";
            player.style.left = c * 80 + "px";
            playerRow = r;
            playerCol = c;
        }
    }
    crates.push(boxPosition);
}

//event listener for directional pad
document.addEventListener("keydown", (event) => {
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
    const checkForWall = map[playerRow + upOrDown][playerCol + leftOrRight] !== "W";
    const checkForNull = crates[playerRow + upOrDown][playerCol + leftOrRight] == null;
    const checkForBox = crates[playerRow + upOrDown][playerCol + leftOrRight] == "box";

    const checkForExtraBox = crates[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "box";
    const checkForWallTwo = map[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] !== "W";

    if (checkForWall && checkForNull) {
        playerCol += leftOrRight;
        player.style.left = playerCol * 80 + "px";
        playerRow += upOrDown;
        player.style.top = playerRow * 80 + "px";

    } else if (checkForWall && checkForBox && checkForExtraBox && checkForWallTwo) {
        crates[playerRow + upOrDown][playerCol + leftOrRight] = null;
        crates[playerRow + boundaryCheckUD][playerCol + boundaryCheckLR] = "box";

        playerCol += leftOrRight;
        playerRow += upOrDown;
        player.style.left = playerCol * 80 + "px";
        player.style.top = playerRow * 80 + "px";
        moveBox(crates);
    }
}

// The boxes are re-drawn after every keypress based on their current position in the crates array.
// The coordinates are then stored in an array so that they can be compaired with the winning coordinates.
function moveBox(boxDest) {
    reset();
    for (let x = 0; x < boxDest.length; x++) {
        var z = boxDest[x];
        for (let y = 0; y < z.length; y++) {
            var cellOfCrateSpots = z[y];
            var absoluteCrates = document.createElement("div");
            if (cellOfCrateSpots === "box") {
                absoluteCrates.className = ("box");
                absoluteCrates.style.top = x * 80 + "px";
                absoluteCrates.style.left = y * 80 + "px";
                boxes.appendChild(absoluteCrates);
                cratesSpots.push(String(x) + String(y));
            }
        }
    }
}
moveBox(crates);

// Boxes are reset before the boxes are re-drawn
function reset() {
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