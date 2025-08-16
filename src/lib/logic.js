let nextId = 1;

/**
 * Creates the initial grid for the game.
 * @returns {{value: number, id: number}[][]} A 4x4 grid with two initial tiles.
 */
export function getInitialGrid() {
  const grid = Array(4).fill(null).map(() => Array(4).fill(null).map(() => ({ value: 0, id: 0 })));
  addNewTile(grid);
  addNewTile(grid);
  return grid;
}

/**
 * Adds a new tile (either 2 or 4) to a random empty cell in the grid.
 * @param {{value: number, id: number}[][]} grid The current game grid.
 * @returns {{value: number, id: number}[][]} The grid with the new tile.
 */
export function addNewTile(grid) {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j].value === 0) {
        emptyCells.push({ i, j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[i][j] = {
      value: Math.random() < 0.9 ? 2 : 4,
      id: nextId++
    };
  }

  return grid;
}

/**
 * Handles the core game logic for moving tiles in a specific direction.
 * @param {number[][]} grid The current game grid.
 * @param {'up' | 'down' | 'left' | 'right'} direction The direction to move the tiles.
 * @returns {{grid: number[][], score: number, moved: boolean}} An object containing the new grid, the score gained in this move, and a boolean indicating if any tile moved.
 */
export function move(grid, direction) {
  // Create a deep copy to avoid modifying the original state directly.
  const newGrid = JSON.parse(JSON.stringify(grid));
  let totalScore = 0;
  let moved = false;

  // This function processes a single line (a row or a column).
  // It slides, merges, and calculates the score for that line.
  const processLine = (line) => {
    // 1. Filter out zeros to slide tiles.
    const filtered = line.filter(cell => cell.value !== 0);
    const newLine = [];
    let score = 0;

    // 2. Merge identical tiles.
    for (let i = 0; i < filtered.length; i++) {
      if (i + 1 < filtered.length && filtered[i].value === filtered[i + 1].value) {
        const mergedValue = filtered[i].value * 2;
        // When merging, we keep the ID of the second tile (the one that moves into the first).
        // A new ID could also be generated, but this is simpler.
        newLine.push({ value: mergedValue, id: filtered[i + 1].id });
        score += mergedValue;
        i++; // Skip the next tile as it has been merged.
      } else {
        newLine.push(filtered[i]);
      }
    }

    // 3. Create the final line with zero padding.
    const result = Array(4).fill({ value: 0, id: 0 });
    newLine.forEach((cell, index) => result[index] = cell);

    // 4. Check if the line has changed.
    const lineMoved = JSON.stringify(line.map(c => c.value)) !== JSON.stringify(result.map(c => c.value));
    
    return { line: result, score, moved: lineMoved };
  };

  if (direction === 'left') {
    for (let i = 0; i < 4; i++) {
      const result = processLine(newGrid[i]);
      if (result.moved) moved = true;
      totalScore += result.score;
      newGrid[i] = result.line;
    }
  } else if (direction === 'right') {
    for (let i = 0; i < 4; i++) {
      const reversedRow = newGrid[i].slice().reverse();
      const result = processLine(reversedRow);
      if (result.moved) moved = true;
      totalScore += result.score;
      newGrid[i] = result.line.reverse();
    }
  } else if (direction === 'up') {
    for (let j = 0; j < 4; j++) {
      const column = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]];
      const result = processLine(column);
      if (result.moved) moved = true;
      totalScore += result.score;
      for (let i = 0; i < 4; i++) {
        newGrid[i][j] = result.line[i];
      }
    }
  } else if (direction === 'down') {
    for (let j = 0; j < 4; j++) {
      const column = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]];
      const reversedColumn = column.slice().reverse();
      const result = processLine(reversedColumn);
      if (result.moved) moved = true;
      totalScore += result.score;
      const finalColumn = result.line.reverse();
      for (let i = 0; i < 4; i++) {
        newGrid[i][j] = finalColumn[i];
      }
    }
  }

  return { grid: newGrid, score: totalScore, moved };
}

/**
 * Checks if the game is over.
 * @param {number[][]} grid The current game grid.
 * @returns {boolean} True if the game is over, false otherwise.
 */
export function isGameOver(grid) {
  // Check for any empty cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j].value === 0) {
        return false; // Found an empty cell, game is not over
      }
    }
  }

  // Check for possible merges horizontally
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j].value === grid[i][j + 1].value) {
        return false; // Found a possible horizontal merge
      }
    }
  }

  // Check for possible merges vertically
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      if (grid[i][j].value === grid[i + 1][j].value) {
        return false; // Found a possible vertical merge
      }
    }
  }

  // No empty cells and no possible merges, game is over
  return true;
}