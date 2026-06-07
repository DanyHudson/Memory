import { THEMES } from '../data/themes';
import type { GameState } from '../types/game';

type RenderGameOverParams = {
    rootElement: HTMLElement;
    gameState: GameState;
};

export function renderGameOver({
    rootElement,
    gameState,
}: RenderGameOverParams) {
    const theme = THEMES.find((entry) => entry.id === gameState.settings.themeId);

    if (!theme) {
        rootElement.innerHTML = '<p>Game configuration is invalid.</p>';
        return;
    }

    rootElement.innerHTML = `
        <main class="game-over-screen">
            <div class="game-over-screen__panel">
                <header class="game-over-screen__topbar">
                    <h1>Game Over</h1>
                </header>

                <div class="game-over-screen__content">
                    <p>Score: Blue - ${gameState.score.blue}, Orange - ${gameState.score.orange}</p>
                </div>
            </div>
        </main>
    `;
}