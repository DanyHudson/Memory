import type { GameState, PlayerId } from '../types/game';
import type { ThemeId } from '../types/theme';
import type { BoardSizeId } from '../data/board-sizes';

type RenderSettingsParams = {
    rootElement: HTMLElement;
    gameState: GameState;
    onThemeChange: (themeId: ThemeId) => void;
    onPlayerChange: (playerId: PlayerId) => void;
    onBoardSizeChange: (boardSizeId: BoardSizeId) => void;
    onStart: () => void;
};

export function renderSettings({
    rootElement,
    gameState,
    onThemeChange,
    onPlayerChange,
    onBoardSizeChange,
    onStart,
}: RenderSettingsParams) {
    rootElement.innerHTML = `
        <main>
            <section class="settings-screen">
                <header>
                    <h1>Settings</h1>
                </header>

                <div class="settings-wrapper">
                    <div class="settings-select">
                        <fieldset class="settings-item">
                            <legend class="settings-title">
                                <img src="" alt="" class="settings-icon">
                                Game Themes
                            </legend>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="da-projects-theme"
                                    name="game-theme"
                                    value="da-projects"
                                    ${gameState.settings.themeId === 'da-projects' ? 'checked' : ''}
                                >
                                <label for="da-projects-theme">DA Projects Theme</label>
                            </div>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="foods-theme"
                                    name="game-theme"
                                    value="foods"
                                    ${gameState.settings.themeId === 'foods' ? 'checked' : ''}
                                >
                                <label for="foods-theme">Foods Theme</label>
                            </div>
                        </fieldset>

                        <fieldset class="settings-item">
                            <legend class="settings-title">
                                <img src="" alt="" class="settings-icon">
                                Player
                            </legend>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="blue-player"
                                    name="player"
                                    value="blue"
                                    ${gameState.settings.startingPlayer === 'blue' ? 'checked' : ''}
                                >
                                <label for="blue-player">Blue Player</label>
                            </div>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="orange-player"
                                    name="player"
                                    value="orange"
                                    ${gameState.settings.startingPlayer === 'orange' ? 'checked' : ''}
                                >
                                <label for="orange-player">Orange Player</label>
                            </div>
                        </fieldset>

                        <fieldset class="settings-item">
                            <legend class="settings-title">
                                <img src="" alt="" class="settings-icon">
                                Board Size
                            </legend>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="16-cards"
                                    name="board-size"
                                    value="16"
                                    ${gameState.settings.boardSize === 16 ? 'checked' : ''}
                                >
                                <label for="16-cards">16 Cards</label>
                            </div>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="24-cards"
                                    name="board-size"
                                    value="24"
                                    ${gameState.settings.boardSize === 24 ? 'checked' : ''}
                                >
                                <label for="24-cards">24 Cards</label>
                            </div>

                            <div class="settings-option">
                                <input
                                    type="radio"
                                    id="36-cards"
                                    name="board-size"
                                    value="36"
                                    ${gameState.settings.boardSize === 36 ? 'checked' : ''}
                                >
                                <label for="36-cards">36 Cards</label>
                            </div>
                        </fieldset>
                    </div>

                    <div class="settings-visual">
                        <div class="visual-shot">
                            <img src="" alt="">
                        </div>

                        <div class="settings-confirmed">
                            ${gameState.settings.themeId} /
                            ${gameState.settings.startingPlayer} /
                            ${gameState.settings.boardSize}
                            <button id="start-btn" class="start-btn">Start</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;

    addSettingsListeners(
        rootElement,
        onThemeChange,
        onPlayerChange,
        onBoardSizeChange,
    );

    addStartButtonListener(rootElement, onStart);
}

function addSettingsListeners(
    rootElement: HTMLElement,
    onThemeChange: (themeId: ThemeId) => void,
    onPlayerChange: (playerId: PlayerId) => void,
    onBoardSizeChange: (boardSizeId: BoardSizeId) => void,
) {
    const themeOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="game-theme"]');
    const playerOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="player"]');
    const boardSizeOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="board-size"]');

    themeOptions.forEach((option) => {
        option.addEventListener('change', () => {
            onThemeChange(option.value as ThemeId);
        });
    });

    playerOptions.forEach((option) => {
        option.addEventListener('change', () => {
            onPlayerChange(option.value as PlayerId);
        });
    });

    boardSizeOptions.forEach((option) => {
        option.addEventListener('change', () => {
            onBoardSizeChange(Number(option.value) as BoardSizeId);
        });
    });
}

function addStartButtonListener(
    rootElement: HTMLElement,
    onStart: () => void,
) {
    const startButton = rootElement.querySelector<HTMLButtonElement>('#start-btn');

    if (startButton) {
        startButton.addEventListener('click', onStart);
    }
}