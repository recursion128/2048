import { writable, get } from 'svelte/store';
import { getInitialGrid, addNewTile, move as moveLogic, isGameOver as isGameOverLogic } from './logic.js';

// On the server, localStorage is not available. We need a check.
const isBrowser = typeof window !== 'undefined';

// Create writable stores for the game state
export const grid = writable(getInitialGrid());
export const score = writable(0);
export const isGameOver = writable(false);
export const highScore = writable(isBrowser ? parseInt(localStorage.getItem('highScore') || '0', 10) : 0);

// When the score changes, check if it's a new high score and save to localStorage.
score.subscribe(value => {
  if (isBrowser && value > get(highScore)) {
    highScore.set(value);
    localStorage.setItem('highScore', value.toString());
  }
});

/**
 * Handles a move in a given direction.
 * @param {'up' | 'down' | 'left' | 'right'} direction
 */
export function move(direction) {
  // Don't do anything if the game is over
  if (get(isGameOver)) {
    return;
  }

  const currentGrid = get(grid);
  const { grid: newGrid, score: scoreGained, moved } = moveLogic(currentGrid, direction);

  // Only update the state if a move actually happened
  if (moved) {
    addNewTile(newGrid);
    grid.set(newGrid);
    score.update(s => s + scoreGained);
    
    // Check if the game is over after the move
    if (isGameOverLogic(newGrid)) {
      isGameOver.set(true);
    }
  }
}

/**
 * Resets the game to its initial state.
 */
export function restart() {
  grid.set(getInitialGrid());
  score.set(0);
  isGameOver.set(false);
}
