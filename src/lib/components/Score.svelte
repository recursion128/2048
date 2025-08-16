<script>
  import { score, highScore, isGameOver, restart } from '../store.js';
</script>

<div class="header">
  <div class="title">2048</div>
  <div class="scores-container">
    <div class="score-container">
      <span class="label">分数</span>
      <span class="value">{$score}</span>
    </div>
    <div class="score-container">
      <span class="label">最高分</span>
      <span class="value">{$highScore}</span>
    </div>
  </div>
</div>

<div class="controls">
  <p class="game-intro">
    合并数字，得到 <strong>2048 方块！</strong>
  </p>
  <button class="restart-button" on:click={restart}>新游戏</button>
</div>

{#if $isGameOver}
  <div class="game-over-overlay">
    <div class="game-over-message">
      <h2>游戏结束！</h2>
      <p>你的分数：{$score}</p>
      <button on:click={restart}>再试一次</button>
    </div>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 4em;
    font-weight: bold;
    color: #776e65;
  }
  
  .scores-container {
    display: flex;
    gap: 8px;
  }

  .score-container {
    background-color: #bbada0;
    padding: 10px 25px;
    border-radius: 3px;
    text-align: center;
    color: #eee4da;
    min-width: 80px;
  }

  .score-container .label {
    display: block;
    font-size: 0.8em;
    font-weight: bold;
  }

  .score-container .value {
    font-size: 1.8em;
    font-weight: bold;
    color: white;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .game-intro {
    color: #776e65;
  }

  .restart-button {
    background-color: #8f7a66;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .restart-button:hover {
    background-color: #9f8b77;
  }

  .game-over-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(238, 228, 218, 0.73);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 100;
  }

  .game-over-message h2 {
    font-size: 3em;
    color: #776e65;
    margin-bottom: 10px;
  }
  
  .game-over-message button {
    margin-top: 20px;
    background-color: #8f7a66;
    color: white;
    border: none;
    padding: 10px 30px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 520px) {
    .title {
      font-size: 2.5em;
    }
    .score-container {
      padding: 5px 10px;
      min-width: 50px;
    }
    .score-container .label {
      font-size: 0.7em;
    }
    .score-container .value {
      font-size: 1.2em;
    }
    .game-intro {
      font-size: 0.9em;
    }
    .restart-button {
      padding: 8px 15px;
    }
  }
</style>
