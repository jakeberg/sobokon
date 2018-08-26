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
