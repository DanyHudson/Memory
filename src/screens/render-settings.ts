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
    <main class="settings">
        <section class="settings__screen">
            <header class="settings__header">
                <h1 class="settings__title">Settings</h1>
            </header>

            <div class="settings__layout">
                <div class="settings__controls">
                    <fieldset class="settings__group">
                        <legend class="settings__group-title">
                            <img src="/src/assets/images/shared/icons/theme-palette-icon.svg" alt="" class="settings__group-icon">
                            Game themes
                        </legend>

                        <label class="settings__option settings__option--theme" for="da-projects-theme">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="da-projects-theme"
                                name="game-theme"
                                value="da-projects"
                                ${gameState.settings.themeId === 'da-projects' ? 'checked' : ''}
                            >
                            <span class="settings__option-label">DA Projects theme</span>
                        </label>

                        <label class="settings__option settings__option--theme" for="foods-theme">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="foods-theme"
                                name="game-theme"
                                value="foods"
                                ${gameState.settings.themeId === 'foods' ? 'checked' : ''}
                            >
                            <span class="settings__option-label">Foods theme</span>
                        </label>
                    </fieldset>

                    <fieldset class="settings__group">
                        <legend class="settings__group-title">
                            <img src="/src/assets/images/shared/icons/pawn-icon-mint.svg" alt="" class="settings__group-icon">
                            Choose player
                        </legend>

                        <label class="settings__option" for="blue-player">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="blue-player"
                                name="player"
                                value="blue"
                                ${gameState.settings.startingPlayer === 'blue' ? 'checked' : ''}
                            >
                            <span class="settings__option-label">Blue</span>
                        </label>

                        <label class="settings__option" for="orange-player">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="orange-player"
                                name="player"
                                value="orange"
                                ${gameState.settings.startingPlayer === 'orange' ? 'checked' : ''}
                            >
                            <span class="settings__option-label">Orange</span>
                        </label>
                    </fieldset>

                    <fieldset class="settings__group">
                        <legend class="settings__group-title">
                            <img src="/src/assets/images/shared/icons/board-size-icon.svg" alt="" class="settings__group-icon">
                            Board size
                        </legend>

                        <label class="settings__option" for="16-cards">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="16-cards"
                                name="board-size"
                                value="16"
                                ${gameState.settings.boardSize === 16 ? 'checked' : ''}
                            >
                            <span class="settings__option-label">16 cards</span>
                        </label>

                        <label class="settings__option" for="24-cards">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="24-cards"
                                name="board-size"
                                value="24"
                                ${gameState.settings.boardSize === 24 ? 'checked' : ''}
                            >
                            <span class="settings__option-label">24 cards</span>
                        </label>

                        <label class="settings__option" for="36-cards">
                            <input
                                class="settings__radio"
                                type="radio"
                                id="36-cards"
                                name="board-size"
                                value="36"
                                ${gameState.settings.boardSize === 36 ? 'checked' : ''}
                            >
                            <span class="settings__option-label">36 cards</span>
                        </label>
                    </fieldset>
                </div>

                <aside class="settings__preview">
                    <div class="settings__preview-stage">
                        <div class="settings__preview-card settings__preview-card--back">
                            <img src="" alt="" class="settings__preview-image">
                        </div>

                        <div class="settings__preview-card settings__preview-card--front">
                            <img src="" alt="" class="settings__preview-image">
                        </div>
                    </div>

                    <div class="settings__summary">
                        <div class="settings__summary-options">
                            <span class="settings__summary-item">
                                ${gameState.settings.themeId}
                              
                            </span>
                            /
                            <span class="settings__summary-item">
                                ${gameState.settings.startingPlayer}
                            </span>
                            /
                            <span class="settings__summary-item">
                                ${gameState.settings.boardSize} cards
                            </span>
                        </div>

                        <button id="start-btn" class="button settings__start-button">
                            Start
                        </button>
                    </div>
                </aside>
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