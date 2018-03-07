const map = [
  "  WWWWW ",
  "WWW   W ",
  "W   BBOSW ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
];

const main = document.querySelector("main");
var board = []

for (let x = 0; x < map.length; x++) {
    board[x] = map[x].split("");
    for (let y = 0; y < map[x].length; y++) {
        if ([x][y] == "X") {
            [x][y] = "B";
        }
    }
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
            } else if (cell === "BO") {
                var newCol = document.createElement("div");
                newCol.className = ("box");
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
            for (i = 0; i < board.length; i++) {

                if (board[i].includes("S")) {
                    let playerPos = board[i].indexOf("S");

                    if (board[i][playerPos + 1] == " ") {
                        board[i][playerPos] = " ";
                        board[i][playerPos + 1] = "S";
                        var newMap = board;
                        break;
                    } else if (board[i][playerPos + 1] == "B" && board[i][playerPos + 2] == "O") {
                        board[i][playerPos] = " ";
                        board[i][playerPos + 1] = "S";
                        board[i][playerPos + 2] = "BO";
                        var newMap = board;
                        break;

                        //////////
                    } else if (board[i][playerPos + 1] == "B" && board[i][playerPos + 1] !== "BO" && board[i][playerPos + 2] !== "W" && board[i][playerPos + 2] !== "B") {
                        board[i][playerPos] = " ";
                        board[i][playerPos + 1] = "S";
                        board[i][playerPos + 2] = "B";
                        var newMap = board;
                        break;
                    } else if (board[i][playerPos + 1] == "O") {
                        board[i][playerPos] = " ";
                        board[i][playerPos + 1] = "SO";
                        var newMap = board;
                        break;
                    }
                }

                if (board[i].includes("SO")) {
                    let playerOnO = board[i].indexOf("SO");
                    if (board[i][playerOnO + 1] != "W" && board[i][playerOnO + 1] != "B" ) {
                        board[i][playerOnO] = "O";
                        board[i][playerOnO + 1] = "S";
                        var newMap = board;
                        break;

                        ////////
                    } else if (board[i][playerOnO + 1] == "B" && board[i][playerOnO + 2] != "W" && board[i][playerOnO + 2] != "B") {
                        board[i][playerOnO] = "O";
                        board[i][playerOnO + 1] = "S";
                        board[i][playerOnO + 2] = "B";
                        var newMap = board;
                        break;
                    }
                }

                if (board[i].includes("BO")) {
                    let BoxOnO = board[i].indexOf("BO");
                    if (board[i][BoxOnO] == "BO" && board[i][BoxOnO + 1] !== "W") {
                        board[i][BoxOnO - 1] = " ";
                        board[i][BoxOnO] = "SO";
                        board[i][BoxOnO + 1] = "B";
                        break;
                    }
                }

            }
            var newMap = board;
            console.log(newMap)
            draw(newMap);
            break;

        case "ArrowLeft":
            reset(main);
            for (i = 0; i < board.length; i++) {
                if (board[i].includes("S")) {
                    let playerPos = board[i].indexOf("S");

                    if (board[i][playerPos - 1] == " ") {
                        board[i][playerPos] = " ";
                        board[i][playerPos - 1] = "S";
                        var newMap = board;
                        break;
                    } else if (board[i][playerPos - 1] == "B" && board[i][playerPos - 2] == "O") {
                        board[i][playerPos] = " ";
                        board[i][playerPos - 1] = "S";
                        board[i][playerPos - 2] = "BO";
                        var newMap = board;
                        break;

                        //////
                    } else if (board[i][playerPos - 1] == "B" && board[i][playerPos - 1] !== "BO" && board[i][playerPos - 2] !== "W" && board[i][playerPos - 2] !== "B") {
                        board[i][playerPos] = " ";
                        board[i][playerPos - 1] = "S";
                        board[i][playerPos - 2] = "B";
                        var newMap = board;
                        break;
                    } else if (board[i][playerPos - 1] == "O") {
                        board[i][playerPos] = " ";
                        board[i][playerPos - 1] = "SO";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("SO")) {
                    let playerOnO = board[i].indexOf("SO");
                    if (board[i][playerOnO - 1] != "W" && board[i][playerOnO - 1] != "B") {
                        board[i][playerOnO] = "O";
                        board[i][playerOnO - 1] = "S";
                        var newMap = board;
                        break;

                        //////
                    } else if (board[i][playerOnO - 1] == "B" && board[i][playerOnO - 2] != "W" && board[i][playerOnO - 2] != "B") {
                        board[i][playerOnO] = "O";
                        board[i][playerOnO - 1] = "S";
                        board[i][playerOnO - 2] = "B";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("BO")) {
                    let BoxOnO = board[i].indexOf("BO");
                    if (board[i][BoxOnO] == "BO" && board[i][BoxOnO - 1] !== "W") {
                        board[i][BoxOnO + 1] = " ";
                        board[i][BoxOnO] = "SO";
                        board[i][BoxOnO - 1] = "B";
                        break;
                    }
                }
            }
            var newMap = board;
            console.log(newMap)
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
                        break;
                    } else if (board[i - 1][playerPos] == "B" && board[i - 2][playerPos] == "O") {
                        board[i][playerPos] = " ";
                        board[i - 1][playerPos] = "S";
                        board[i - 2][playerPos] = "BO";
                        var newMap = board;
                        break;
                    } else if (board[i - 1][playerPos] == "B" && board[i - 2][playerPos] !== "BO" && board[i - 2][playerPos] !== "W") {
                        board[i][playerPos] = " ";
                        board[i - 1][playerPos] = "S";
                        board[i - 2][playerPos] = "B";
                        var newMap = board;
                        break;
                    } else if (board[i - 1][playerPos] == "O") {
                        board[i][playerPos] = " ";
                        board[i - 1][playerPos] = "SO";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("SO")) {
                    let playerOnO = board[i].indexOf("SO");
                    if (board[i - 1][playerOnO] != "W" && board[i - 1][playerOnO] != "B") {
                        board[i][playerOnO] = "O";
                        board[i - 1][playerOnO] = "S";
                        var newMap = board;
                        break;
                    } else if (board[i - 1][playerOnO] = "B" && board[i - 2][playerOnO] != "W") {
                        board[i][playerOnO] = "O";
                        board[i - 1][playerOnO] = "S";
                        board[i - 2][playerOnO] = "B";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("BO")) {
                    let BoxOnO = board[i].indexOf("BO");
                    if (board[i][BoxOnO] == "BO" && board[i - 1][BoxOnO] !== "W") {
                        board[i + 1][BoxOnO] = " ";
                        board[i][BoxOnO] = "SO";
                        board[i - 1][BoxOnO] = "B";
                        break;
                    }
                }
            }
            var newMap = board;
            draw(newMap);
            break;

        case "ArrowDown":
            reset(main);
            for (i = 0; i < board.length; i++) {
                if (board[i].includes("S")) {
                    let playerPos = board[i].indexOf("S");
                    if (board[i + 1][playerPos] == " ") {
                        board[i][playerPos] = " ";
                        board[i + 1][playerPos] = "S";
                        var newMap = board;
                        break;
                    } else if (board[i + 1][playerPos] == "B" && board[i + 2][playerPos] == "O") {
                        board[i][playerPos] = " ";
                        board[i + 1][playerPos] = "S";
                        board[i + 2][playerPos] = "BO";
                        var newMap = board;
                        break;
                    } else if (board[i + 1][playerPos] == "B" && board[i + 2][playerPos] !== "BO" && board[i + 2][playerPos] !== "W") {
                        board[i][playerPos] = " ";
                        board[i + 1][playerPos] = "S";
                        board[i + 2][playerPos] = "B";
                        var newMap = board;
                        break;
                    } else if (board[i + 1][playerPos] == "O") {
                        board[i][playerPos] = " ";
                        board[i + 1][playerPos] = "SO";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("SO")) {
                    let playerOnO = board[i].indexOf("SO");
                    if (board[i + 1][playerOnO] != "W" && board[i + 1][playerOnO] != "B") {
                        board[i][playerOnO] = "O";
                        board[i + 1][playerOnO] = "S";
                        var newMap = board;
                        break;
                    } else if (board[i + 1][playerOnO] = "B" && board[i + 2][playerOnO] != "W") {
                        board[i][playerOnO] = "O";
                        board[i + 1][playerOnO] = "S";
                        board[i + 2][playerOnO] = "B";
                        var newMap = board;
                        break;
                    }
                }
                if (board[i].includes("BO")) {
                    let BoxOnO = board[i].indexOf("BO");
                    if (board[i][BoxOnO] == "BO" && board[i - 1][BoxOnO] !== "W") {
                        board[i - 1][BoxOnO] = " ";
                        board[i][BoxOnO] = "SO";
                        board[i + 1][BoxOnO] = "B";
                        break;
                    }
                }
            }
            var newMap = board;
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