# 2048-Svelte 开发任务列表

## Phase 1: 项目初始化与核心逻辑

- [ ] 使用 `npm create svelte@latest` 初始化一个新的 Svelte 项目。
- [ ] 创建 `src/lib/logic.js` 和 `src/lib/store.js` 文件。
- [ ] 在 `logic.js` 中实现 `getInitialGrid()` 函数，用于生成一个空的或带两个初始方块的棋盘。
- [ ] 在 `logic.js` 中实现 `addNewTile(grid)` 函数。
- [ ] 在 `logic.js` 中实现核心的 `move(grid, direction)` 逻辑。这是最复杂的部分，需要处理滑动和合并。
- [ ] 在 `logic.js` 中实现 `isGameOver(grid)` 逻辑。
- [ ] 在 `store.js` 中设置好 `grid`, `score`, `isGameOver` 的初始状态和 `restart` action。

## Phase 2: 基础 UI 组件开发

- [ ] 创建 `src/lib/components/Tile.svelte`，让它能根据传入的 `value` prop 显示数字和不同的颜色。
- [ ] 创建 `src/lib/components/Board.svelte`。
- [ ] 在 `Board.svelte` 中，订阅 `store.js` 的 `grid` 状态，并成功渲染出棋盘上的所有 `Tile` 组件。
- [ ] 创建 `src/lib/components/Score.svelte`，显示分数和 "新游戏" 按钮。

## Phase 3: 交互与联动

- [ ] 在 `App.svelte` 中，监听键盘的 `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` 事件。
- [ ] 将键盘事件与 `store.js` 中的 `move(direction)` action 连接起来。
- [ ] 将 "新游戏" 按钮与 `store.js` 中的 `restart` action 连接起来。
- [ ] 此时，游戏的核心功能应该已经可以玩了。

## Phase 4: 动画与样式优化

- [ ] 为 `Tile.svelte` 添加 Svelte `transition`，实现新方块出现时的动画（如 `fade` 或 `scale`）。
- [ ] 使用 Svelte 的 `tweened` store 或 `spring` store 来实现方块移动时的平滑动画效果。
- [ ] 优化整体 UI/UX，包括颜色、字体、布局等。
- [ ] 添加游戏结束时的遮罩层 (Overlay) 提示。

## Phase 5: 收尾工作

- [ ] 代码审查和重构。
- [ ] 添加必要的注释。
- [ ] (可选) 添加触摸滑动支持，以适配移动设备。
- [ ] (可选) 将最高分记录在 `localStorage` 中。
