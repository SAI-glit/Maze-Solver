# Maze-Solver
# 🧩 Maze Solver Visualizer

This is a small project I made to visualize how pathfinding algorithms work. You draw walls, set a start point and an end point, and then watch BFS or DFS figure out how to get from start to end.

Made this mainly to understand BFS/DFS better instead of just reading pseudocode lol.

## What it does

- 20x20 grid you can click on
- Draw walls anywhere on the grid
- Set a Start point (green) and End point (red)
- Run BFS or DFS and watch it search the grid cell by cell
- Once it finds the end, it highlights the shortest/found path in yellow
- Clear button to reset everything and try again

## How to run it

No setup needed, just open `index.html` in your browser and you're good to go.

## How to use it

1. Click the **Wall** button and start clicking cells to draw walls
2. Click **Start** and pick a cell to be your starting point
3. Click **End** and pick a cell to be your ending point
4. Hit **Solve BFS** or **Solve DFS** and watch the magic happen
5. Click **Clear** if you want to start over

## Files

- `index.html` — basic page layout and buttons
- `style.css` — makes it look decent (dark theme, colored cells)
- `script.js` — all the actual logic (grid, clicks, BFS, DFS)

## A bit about how it works

Each grid cell is just a div, and I store its row/col using data attributes. 

- **BFS** uses a queue and explores neighbor by neighbor, layer by layer — this is why it always finds the shortest path.
- **DFS** uses a stack and just goes as deep as it can before backtracking — doesn't guarantee shortest path but still finds *a* path.

While searching, I keep track of each cell's "parent" (the cell it came from), so once we hit the end, I can backtrack through parents to draw the final path.

