import { THEMES } from '../data/themes';
import type { GameState } from '../types/game';

type RenderResultParams = {
    rootElement: HTMLElement;
    gameState: GameState;
    onHome: () => void;
    onPlayAgain: () => void;
};

export function renderResult({
    rootElement,
    gameState,
    onHome,
    onPlayAgain,
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
                    <div class="result-screen__actions">
                        <button id="result-home-btn" type="button">Home</button>
                        <button id="result-play-again-btn" type="button">Play again</button>
                    </div>
                </div>
            </div>
        </main>
    `;

    addResultScreenListeners(rootElement, onHome, onPlayAgain);
}

function addResultScreenListeners(
    rootElement: HTMLElement,
    onHome: () => void,
    onPlayAgain: () => void,
) {
    const homeButton = rootElement.querySelector<HTMLButtonElement>('#result-home-btn');
    const playAgainButton = rootElement.querySelector<HTMLButtonElement>('#result-play-again-btn');

    homeButton?.addEventListener('click', onHome);
    playAgainButton?.addEventListener('click', onPlayAgain);
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