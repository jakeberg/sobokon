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


// const win = [
//     "  WWWWW ",
//     "WWW   W ",
//     "WB    W ",
//     "WWW  BW ",
//     "WBWW  W ",
//     "W W B WW",
//     "W  X  BW",
//     "W   B  W",
//     "WWWWWWWW"
// ];

const main = document.querySelector("main");

var board = []

for (let x = 0; x < map.length; x++) {
    board[x] = map[x].split("");
}



// Draws the board based on the array above
function draw(startPos) {

    for (let i = 0; i < startPos.length; i++) {
        var newRow = document.createElement("div");
        newRow.className = ("flexbox");
        main.appendChild(newRow);

        for (let j = 0; j < startPos[i].length; j++) {
            let cell = startPos[i][j];

            if (cell === "W") {
                var newCol = document.createElement("div");
                newCol.className = ("wall");
            } else if (cell === " ") {
                var newCol = document.createElement("div");
                newCol.className = ("empty");
            } else if (cell === "O") {
                var newCol = document.createElement("div");
                newCol.className = ("empty spot");
            } else if (cell === "B") {
                var newCol = document.createElement("div");
                newCol.className = ("box");
            } else if (cell === "X") {
                var newCol = document.createElement("div");
                newCol.className = ("lightBox");
            } else if (cell === "S") {
                var newCol = document.createElement("div");
                newCol.className = ("player");
            } else if (cell === "SO") {
                var newCol = document.createElement("div");
                newCol.className = ("player");
            }
            newRow.appendChild(newCol);
        }
    }
}


draw(map);



movePlayer = function (event) {

    switch (event.key) {

        case "ArrowRight":

            reset(main);
            out1:
                for (i = 0; i < board.length; i++) {

                    if (board[i].includes("SO")) {
                        let playerOnO = board[i].indexOf("SO");
                        let playerBoxOnO = board[i].indexOf("BO");
                        if (board[i][playerOnO] == "SO" && board[i][playerOnO + 1] !== "W") {
                            board[i][playerOnO] = "O";
                            board[i][playerOnO + 1] = "S";
                            var newMap = board;
                        } else {
                            var newMap = board;
                        }
                        break out1;
                    }

                    if (board[i].includes("S")) {
                        let playerPos = board[i].indexOf("S");

                        if (board[i][playerPos + 1] == " ") {
                            board[i][playerPos] = " ";
                            board[i][playerPos + 1] = "S";
                            var newMap = board;
                        } else if (board[i][playerPos + 1] == "B" && board[i][playerPos + 2] !== "W") {
                            board[i][playerPos] = " ";
                            board[i][playerPos + 1] = "S";
                            board[i][playerPos + 2] = "B";
                            var newMap = board;
                        } else if (board[i][playerPos + 1] == "O") {
                            board[i][playerPos] = " ";
                            board[i][playerPos + 1] = "SO";
                            var newMap = board;
                        } else {
                            var newMap = board;
                        }
                    }
                }

            
            draw(newMap);
            break;


        case "ArrowLeft":
            reset(main);
            out2:
                for (i = 0; i < board.length; i++) {

                    if (board[i].includes("SO")) {
                        let playerOnO = board[i].indexOf("SO");
                        let playerBoxOnO = board[i].indexOf("BO");
                        if (board[i][playerOnO] == "SO" && board[i][playerOnO - 1] !== "W") {
                            board[i][playerOnO] = "O";
                            board[i][playerOnO - 1] = "S";
                            var newMap = board;
                        } else {
                            var newMap = board;
                        }
                        break out2;
                    }

                    if (board[i].includes("S")) {
                        let playerPos = board[i].indexOf("S");

                        if (board[i][playerPos - 1] == " ") {
                            board[i][playerPos] = " ";
                            board[i][playerPos - 1] = "S";
                            var newMap = board;
                        } else if (board[i][playerPos - 1] == "B" && board[i][playerPos - 2] !== "W") {
                            board[i][playerPos] = " ";
                            board[i][playerPos - 1] = "S";
                            board[i][playerPos - 2] = "B";
                            var newMap = board;
                        } else if (board[i][playerPos - 1] == "O") {
                            board[i][playerPos] = " ";
                            board[i][playerPos - 1] = "SO";
                            var newMap = board;
                        } else {
                            var newMap = board;
                        }
                    }
                }
            draw(newMap);
           
            break;

        case "ArrowUp":
            reset(main);
            for (i = 0; i < board.length; i++) {

                if (board[i].includes("S")) {
                    let playerPos = board[i].indexOf("S");

                    if (board[i - 1][playerPos] == " ") {
                        board[i][playerPos] = " ";
                        board[i - 1][playerPos] = "S";
                        var newMap = board;
                    } else if (board[i - 1][playerPos] == "B" && board[i - 2][playerPos] !== "W" && board[i - 2][playerPos] !== "B") {
                        board[i][playerPos] = " ";
                        board[i - 1][playerPos] = "S";
                        board[i - 2][playerPos] = "B";
                        var newMap = board;
                    } else {
                        var newMap = board;
                    }
                }
            }

            draw(newMap);
           
            break;

        case "ArrowDown":
            reset(main);
            outer:
                for (i = 0; i < board.length; i++) {
                    if (board[i].includes("S")) {
                        let playerPos = board[i].indexOf("S");

                        if (board[i + 1][playerPos] == " ") {
                            board[i][playerPos] = " ";
                            board[i + 1][playerPos] = "S";
                            var newMap = board;
                        } else if (board[i + 1][playerPos] == "B" && board[i + 2][playerPos] !== "W" && board[i + 2][playerPos] !== "B") {
                            board[i][playerPos] = " ";
                            board[i + 1][playerPos] = "S";
                            board[i + 2][playerPos] = "B";
                            var newMap = board;
                        } else {
                            var newMap = board;
                        }
                        break outer;
                    }
                }

            draw(newMap);
            
            break;
    }
}


document.addEventListener("keydown", movePlayer);

function reset(destination) {
    while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
    }
}


// function checkWin(m) {
//     for (i = 0; i < m.length; i++) {
//         if (m[i].includes("S")) {
//             let p = m[i].indexOf("S");
//             m[i][p] = " ";
//         }
//     }
//     if (m = win) {
//         alert("You win... but you're still a loser...")
//     }
// }