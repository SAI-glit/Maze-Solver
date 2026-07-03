const rows = 20;
const cols = 20;
let grid = [];
let mode = "wall";
let start = null;
let end = null;

const gridElement = document.getElementById("grid");

// Create grid
for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click", () => handleClick(cell, r, c));

        gridElement.appendChild(cell);
        grid[r][c] = cell;
    }
}

function setMode(m) {
    mode = m;
}

function handleClick(cell, r, c) {
    if (mode === "wall") {
        cell.classList.toggle("wall");
    } 
    else if (mode === "start") {
        if (start) start.classList.remove("start");
        start = cell;
        cell.classList.add("start");
    } 
    else if (mode === "end") {
        if (end) end.classList.remove("end");
        end = cell;
        cell.classList.add("end");
    }
}

function getNeighbors(r, c) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    return dirs.map(d => [r + d[0], c + d[1]])
        .filter(([nr, nc]) => nr >= 0 && nc >= 0 && nr < rows && nc < cols);
}

async function solveBFS() {
    if (!start || !end) return alert("Set start and end");

    let queue = [[parseInt(start.dataset.row), parseInt(start.dataset.col)]];
    let visited = {};
    let parent = {};

    visited[`${start.dataset.row}-${start.dataset.col}`] = true;

    while (queue.length) {
        let [r, c] = queue.shift();
        let cell = grid[r][c];

        if (cell !== start && cell !== end) {
            cell.classList.add("visited");
            await sleep(20);
        }

        if (cell === end) break;

        for (let [nr, nc] of getNeighbors(r, c)) {
            let key = `${nr}-${nc}`;
            let next = grid[nr][nc];

            if (!visited[key] && !next.classList.contains("wall")) {
                queue.push([nr, nc]);
                visited[key] = true;
                parent[key] = [r, c];
            }
        }
    }

    drawPath(parent);
}

async function solveDFS() {
    let stack = [[parseInt(start.dataset.row), parseInt(start.dataset.col)]];
    let visited = {};
    let parent = {};

    while (stack.length) {
        let [r, c] = stack.pop();
        let key = `${r}-${c}`;
        if (visited[key]) continue;

        visited[key] = true;
        let cell = grid[r][c];

        if (cell !== start && cell !== end) {
            cell.classList.add("visited");
            await sleep(20);
        }

        if (cell === end) break;

        for (let [nr, nc] of getNeighbors(r, c)) {
            let next = grid[nr][nc];
            if (!visited[`${nr}-${nc}`] && !next.classList.contains("wall")) {
                stack.push([nr, nc]);
                parent[`${nr}-${nc}`] = [r, c];
            }
        }
    }

    drawPath(parent);
}

function drawPath(parent) {
    let cur = [parseInt(end.dataset.row), parseInt(end.dataset.col)];

    while (cur) {
        let [r, c] = cur;
        let cell = grid[r][c];

        if (cell !== start && cell !== end) {
            cell.classList.remove("visited");
            cell.classList.add("path");
        }

        cur = parent[`${r}-${c}`];
    }
}

function clearGrid() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.className = "cell";
    });
    start = null;
    end = null;
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}