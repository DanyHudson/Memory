import './styles/style.scss';
import type { GameState } from './types/game';
// import type { ThemeId } from './types/theme';
// import type { BoardSizeId } from './data/board-sizes';
import { INITIAL_GAME_STATE } from './state/initial-state';
import { renderLanding } from './screens/render-landing';
import { renderSettings } from './screens/render-settings';
import { renderGame } from './screens/render-game';
// import { renderResult } from './screens/render-result';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);

// gameState = gameState;

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}


function render(rootElement: HTMLElement) {
    if (gameState.screen === 'landing') {
        renderLanding(rootElement, () => openSettings(rootElement));
    } else if (gameState.screen === 'settings') {
        renderSettings({
            rootElement,
            gameState,
            onThemeChange: (themeId) => {
                gameState.settings.themeId = themeId;
                render(rootElement);
            },
            onPlayerChange: (playerId) => {
                gameState.settings.startingPlayer = playerId;
                render(rootElement);
            },
            onBoardSizeChange: (boardSizeId) => {
                gameState.settings.boardSize = boardSizeId;
                render(rootElement);
            },
            onStart: () => startGame(rootElement),
        });
    } else if (gameState.screen === 'game') {
        renderGame(rootElement, gameState);
    }
}

function openSettings(rootElement: HTMLElement) {
    gameState.screen = 'settings';
    render(rootElement);
}

function startGame(rootElement: HTMLElement) {
    gameState.screen = 'game';
    render(rootElement);
}

render(root);   