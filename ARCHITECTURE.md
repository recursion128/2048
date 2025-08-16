# 2048-Svelte 游戏架构设计

## 1. 核心理念

本项目采用**状态驱动**的设计模式，将**游戏逻辑**与**视图渲染**完全分离。Svelte 的响应式能力将确保视图总是与状态保持同步。

## 2. 技术选型

- **框架**: Svelte
- **语言**: JavaScript (可选用 TypeScript 增强类型安全)
- **样式**: CSS / SCSS

## 3. 目录结构

```
/src
├── lib/
│   ├── components/      # Svelte 组件
│   │   ├── Board.svelte   # 游戏主面板，包含网格和瓦片
│   │   ├── Tile.svelte    # 单个数字瓦片
│   │   └── Score.svelte   # 分数/游戏状态显示
│   ├── store.js         # Svelte store，管理全局游戏状态
│   └── logic.js         # 核心游戏逻辑（移动、合并、生成新瓦片等）
└── App.svelte           # 应用主入口，处理用户输入
```

## 4. 模块职责

### `logic.js` (核心逻辑)

- 纯粹的 JS 模块，不依赖 Svelte。
- 负责处理游戏的所有规则和计算。
- 导出函数，如：
    - `move(grid, direction)`: 计算在给定方向上移动后的新网格和增加的分数。
    - `addNewTile(grid)`: 在一个随机的空格子中添加一个新的数字 (2 或 4)。
    - `isGameOver(grid)`: 检查游戏是否结束（没有空格子且无法再合并）。
    - `getInitialGrid()`: 创建一个初始化的游戏网格。

### `store.js` (状态管理)

- 使用 Svelte 的 `writable` store 创建一个单一数据源。
- **Store State**:
    - `grid`: `number[][]`，表示 4x4 的棋盘状态。
    - `score`: `number`，当前分数。
    - `isGameOver`: `boolean`，游戏是否结束。
- **Store Actions**:
    - `move(direction)`: 接收一个方向，调用 `logic.js` 中的 `move` 函数，并用返回结果更新 `grid` 和 `score` 状态。之后再调用 `addNewTile` 更新 `grid`。最后检查游戏是否结束并更新 `isGameOver`。
    - `restart()`: 重置所有状态到初始值。

### `components/` (视图组件)

- **`Tile.svelte`**:
    - Props: `value` (数字), `position` (位置)。
    - 根据 `value` 显示不同的数字和背景颜色。
    - 使用 Svelte 的 `transition` 或 `tweened` store 实现出现和移动的动画。
- **`Board.svelte`**:
    - 订阅 `store.js` 中的 `grid` 状态。
    - 使用 `#each` 循环遍历 `grid`，为每个非零的格子渲染一个 `Tile.svelte` 组件。
    - 负责渲染 4x4 的静态背景网格。
- **`Score.svelte`**:
    - 订阅 `store.js` 中的 `score` 和 `isGameOver` 状态并显示它们。
    - 包含 "新游戏" 按钮，点击时调用 `store.js` 的 `restart` action。

### `App.svelte` (主入口)

- 渲染 `Board` 和 `Score` 等主要组件。
- 使用 `<svelte:window on:keydown={...} />` 来监听全局键盘事件。
- 当用户按下上/下/左/右键时，调用 `store.js` 中的 `move(direction)` action。
