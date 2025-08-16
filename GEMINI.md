# Project: 2048 Game in Svelte

## Project Overview

This is a web-based implementation of the classic 2048 game, built using the Svelte framework and SvelteKit. The project was bootstrapped and developed interactively.

The architecture follows a clear separation of concerns:
-   **`src/lib/logic.js`**: Contains all the core game logic (moving tiles, merging, adding new tiles, checking for game over) as pure, framework-agnostic JavaScript functions.
-   **`src/lib/store.js`**: Manages the application's state (grid, score, game over status) using Svelte's reactive stores. It serves as the bridge between the core logic and the UI components.
-   **`src/lib/components/`**: A collection of Svelte components (`Board.svelte`, `Tile.svelte`, `Score.svelte`) responsible for rendering the game's UI based on the state from the store.
-   **`src/routes/+page.svelte`**: The main entry point of the application, which assembles the components and handles user input (keyboard and touch events).

The game is fully responsive, supports touch gestures for mobile play, and persists the high score to `localStorage`.

## Building and Running

The project uses Vite as its build tool, managed through npm scripts.

-   **To run the development server:**
    ```bash
    npm run dev
    ```
    You can also open the app in a new browser tab automatically:
    ```bash
    npm run dev -- --open
    ```

-   **To build the project for production:**
    ```bash
    npm run build
    ```

-   **To preview the production build:**
    ```bash
    npm run preview
    ```

## Development Conventions

-   **State Management**: All application state is managed centrally in `src/lib/store.js` using Svelte's `writable` stores. Components subscribe to these stores to reactively update the UI.
-   **Component Structure**: The UI is broken down into small, single-responsibility components. For example, `Tile.svelte` only knows how to render a single tile, while `Board.svelte` arranges them.
-   **Animation**: Animations are handled declaratively within Svelte components.
    -   `in:scale` is used for the appearance of new tiles.
    -   `animate:flip` is used for the smooth movement of tiles across the board, keyed by a unique tile ID.
-   **Deployment**: The project is configured with `@sveltejs/adapter-auto` in `svelte.config.js`, which makes it ready for zero-configuration deployment on platforms like Vercel.
