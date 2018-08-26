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
drawBoard(map1)


// Allows player to choose map
chooseMap = document.querySelectorAll('.chooseMap')
chooseMap.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.innerHTML == "Map 1") {
            reset();
            drawBoard(map1);
        } else {
            reset();
            drawBoard(map2);
        }
    })
});


// Reset button that calls the reset function, then re-draws current map
document.getElementById("reset").addEventListener("click", () => {
    reset()
    drawBoard(currentMap)
})


// Resets by emptying the board then drawing the map with the current board
function reset(){
    let walls = document.querySelectorAll("div.wall, div.empty, div.box");
    walls.forEach(element => { element.remove() });
    winningSpots = []
    crates = []
    cratesSpots = []
    document.getElementById("win").style.display = "none";
}


// If the current coordinates of all the boxes matches the coordinates of the storage spots, the player wins.
function checkWin() {
    let cratesSpotsString = cratesSpots.join("");
    let winningSpotsString = winningSpots.join("");
    if (cratesSpotsString == winningSpotsString) {
        document.getElementById("win").style.display = "block";
    }
}