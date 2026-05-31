import type { GameState } from '../types/game';

export function renderGame(
    rootElement: HTMLElement,
    gameState: GameState,
) {
    rootElement.innerHTML = `
        <main>
            <section class="game-screen">
                <header>
                    <h1>Memory Game</h1>
                    <p>Theme: ${gameState.settings.themeId}</p>
                    <p>Player: ${gameState.settings.startingPlayer}</p>
                    <p>Board size: ${gameState.settings.boardSize}</p>
                </header>

                <div class="game-board">
                    Game board will be rendered here.
                </div>
            </section>
        </main>
    `;
}