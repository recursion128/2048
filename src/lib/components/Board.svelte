<script>
  import { grid, move } from '../store.js';
  import Tile from './Tile.svelte';
  import { flip } from 'svelte/animate';

  $: tiles = $grid.flatMap((row, i) => 
    row.map((cell, j) => ({ ...cell, row: i, col: j }))
  ).filter(tile => tile.value !== 0);

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  }

  function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const minSwipeDistance = 30; // Minimum distance for a swipe to be registered

    if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
      if (Math.abs(dx) > minSwipeDistance) {
        if (dx > 0) {
          move('right');
        } else {
          move('left');
        }
      }
    } else { // Vertical swipe
      if (Math.abs(dy) > minSwipeDistance) {
        if (dy > 0) {
          move('down');
        } else {
          move('up');
        }
      }
    }
  }

</script>

<div 
  class="board-container"
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
>
  <div class="grid-background">
    {#each Array(16) as _}
      <div class="grid-cell"></div>
    {/each}
  </div>

  <div class="tile-container">
    {#each tiles as tile (tile.id)}
      <div 
        class="tile-wrapper" 
        style="--row: {tile.row}; --col: {tile.col};"
        animate:flip={{ duration: 150 }}
      >
        <Tile value={tile.value} />
      </div>
    {/each}
  </div>
</div>

<style>
  .board-container {
    position: relative;
    width: 500px;
    height: 500px;
    background-color: #bbada0;
    border-radius: 6px;
    padding: 15px;
    box-sizing: border-box;
  }

  .grid-background {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
    width: 100%;
    height: 100%;
  }

  .grid-cell {
    background-color: rgba(238, 228, 218, 0.35);
    border-radius: 3px;
  }

  .tile-container {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
  }

  .tile-wrapper {
    position: absolute;
    width: calc(25% - 11.25px); /* (100% / 4) - (15px * 3 / 4) */
    height: calc(25% - 11.25px);
    top: calc(var(--row) * (25% + 3.75px)); /* 25% + (15px / 4) */
    left: calc(var(--col) * (25% + 3.75px));
    transition: top 0.15s ease-in-out, left 0.15s ease-in-out;
  }
</style>
