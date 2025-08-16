<script>
  import { scale } from 'svelte/transition';
  export let value;

  const tileColors = {
    2: { bg: '#eee4da', color: '#776e65' },
    4: { bg: '#ede0c8', color: '#776e65' },
    8: { bg: '#f2b179', color: '#f9f6f2' },
    16: { bg: '#f59563', color: '#f9f6f2' },
    32: { bg: '#f67c5f', color: '#f9f6f2' },
    64: { bg: '#f65e3b', color: '#f9f6f2' },
    128: { bg: '#edcf72', color: '#f9f6f2' },
    256: { bg: '#edcc61', color: '#f9f6f2' },
    512: { bg: '#edc850', color: '#f9f6f2' },
    1024: { bg: '#edc53f', color: '#f9f6f2' },
    2048: { bg: '#edc22e', color: '#f9f6f2' },
  };

  $: colorStyle = tileColors[value] || { bg: '#3c3a32', color: '#f9f6f2' };
  
  $: fontSize = (() => {
    if (value > 4096) return '1.5em';
    if (value > 512) return '2em';
    if (value > 64) return '2.2em';
    return '3em';
  })();

</script>

<div 
  class="tile" 
  in:scale={{ duration: 150, start: 0.5 }}
  style="--bg-color: {colorStyle.bg}; --color: {colorStyle.color}; --font-size: {fontSize};"
>
  {value}
</div>

<style>
  .tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    font-weight: bold;
    font-size: var(--font-size);
    background-color: var(--bg-color);
    color: var(--color);
    transition: all 0.2s ease-in-out;
  }
</style>
