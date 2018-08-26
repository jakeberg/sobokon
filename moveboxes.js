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
