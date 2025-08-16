<script>
  import Board from '$lib/components/Board.svelte';
  import Score from '$lib/components/Score.svelte';
  import { move } from '$lib/store.js';

  function handleKeydown(event) {
    switch (event.key) {
      case 'ArrowUp':
        move('up');
        event.preventDefault();
        break;
      case 'ArrowDown':
        move('down');
        event.preventDefault();
        break;
      case 'ArrowLeft':
        move('left');
        event.preventDefault();
        break;
      case 'ArrowRight':
        move('right');
        event.preventDefault();
        break;
    }
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Clear+Sans:wght@700&display=swap" rel="stylesheet">
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<main>
  <div class="game-container">
    <Score />
    <Board />
  </div>
</main>

<style>
  :global(body) {
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    background-color: #faf8ef;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .game-container {
    width: 90vw;
    max-width: 500px;
    position: relative;
    margin: 0 auto;
  }
</style>