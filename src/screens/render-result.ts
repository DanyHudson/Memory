import { THEMES } from '../data/themes';
import type { GameState } from '../types/game';

type RenderResultParams = {
    rootElement: HTMLElement;
    gameState: GameState;
};

export function renderResult({
    rootElement,
    gameState,
}: RenderResultParams) {
    const theme = THEMES.find((entry) => entry.id === gameState.settings.themeId);

    if (!theme) {
        rootElement.innerHTML = '<p>Game configuration is invalid.</p>';
        return;
    }

    rootElement.innerHTML = `
        <main class="result-screen">
            <div class="result-screen__panel">
                <p>The winner is:</p>
                <header class="result-screen__topbar">
                    <h1>${getResultLabel(gameState.winner)}</h1>
                </header>

                <div class="result-screen__content">
                    <p>Score: Blue - ${gameState.score.blue}, Orange - ${gameState.score.orange}</p>
                </div>
            </div>
        </main>
    `;
}

function getResultLabel(winner: GameState['winner']) {
    if (winner === 'blue') {
        return 'Blue Player';
    }

    if (winner === 'orange') {
        return 'Orange Player';
    }

    if (winner === 'draw') {
        return 'No Winner';
    }

    return '';
}