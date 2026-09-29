import { THEMES } from '../data/themes';
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
    const theme = THEMES.find((entry) => entry.id === gameState.settings.themeId);
    const isStartReady =
        gameState.settings.startingPlayer !== null &&
        gameState.settings.boardSize !== null;
    const themeSummary = theme?.label ?? 'Pick a theme';
    const playerSummary =
        gameState.settings.startingPlayer === null
            ? 'Pick a player'
            : gameState.settings.startingPlayer;

    const boardSizeSummary =
        gameState.settings.boardSize === null
            ? 'Pick a board size'
            : `${gameState.settings.boardSize} cards`;


    if (!theme) {
        rootElement.innerHTML = '<p>Game configuration is invalid.</p>';
        return;
    }

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
                        ${renderThemeOptions(gameState.settings.themeId)}
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
                       <!-- <div class="settings__preview-card settings__preview-card--back">
                            <img src="" alt="" class="settings__preview-image">
                        </div> -->

                        <div class="settings__preview-card settings__preview-card--front">
                            <img id="theme-preview-image" src="${theme.assets.visuals.default}" alt="${theme.label}" class="settings__preview-image">
                        </div>
                    </div>

                    <div class="settings__summary">
                        <div class="settings__summary-options">
                           <span class="settings__summary-item">
                                ${themeSummary}
                            </span>
                                              
                            <span class="settings__summary-item-divider"></span>

                            <!-- <span class="settings__summary-item">
                                ${gameState.settings.startingPlayer}
                            </span> -->

                            <span class="settings__summary-item">
                                ${playerSummary}
                            </span>

                            <span class="settings__summary-item-divider"></span>


                            <!-- <span class="settings__summary-item">
                                ${gameState.settings.boardSize} cards
                            </span> -->

                            <span class="settings__summary-item">
                            ${boardSizeSummary}
                            </span>

                        </div>

                        <div class="settings__start">
                            <button
                                id="start-btn"
                                class="button settings__start-button${!isStartReady ? ' settings__start-button--pending' : ''}"
                                type="button"
                            >
                                <img src="/src/assets/images/shared/icons/play-icon.svg" alt="Play Icon" class="button__icon">
                            Start
                            </button>
                        </div>

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

function renderThemeOptions(selectedThemeId: ThemeId) {
    return THEMES.map((themeOption) => renderThemeOption(themeOption.id, themeOption.label, selectedThemeId))
        .join('');
}

function renderThemeOption(themeId: ThemeId, label: string, selectedThemeId: ThemeId) {
    const inputId = `${themeId}-theme`;
    const checked = selectedThemeId === themeId ? 'checked' : '';
    return `<label class="settings__option settings__option--theme" for="${inputId}" data-theme-id="${themeId}">
                            <input class="settings__radio" type="radio" id="${inputId}" name="game-theme" value="${themeId}" ${checked}>
                            <span class="settings__option-label">${label}</span>
                        </label>`;
}

function addSettingsListeners(
    rootElement: HTMLElement,
    onThemeChange: (themeId: ThemeId) => void,
    onPlayerChange: (playerId: PlayerId) => void,
    onBoardSizeChange: (boardSizeId: BoardSizeId) => void,
) {
    const themeOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="game-theme"]');
    const themeLabels = rootElement.querySelectorAll<HTMLLabelElement>('.settings__option--theme');
    const previewImage = rootElement.querySelector<HTMLImageElement>('#theme-preview-image');

    bindThemeSelection(themeOptions, previewImage, onThemeChange);
    bindThemeHoverPreview(themeLabels, themeOptions, previewImage);
    bindPlayerSelection(rootElement, onPlayerChange);
    bindBoardSizeSelection(rootElement, onBoardSizeChange);
}

function bindThemeSelection(
    themeOptions: NodeListOf<HTMLInputElement>,
    previewImage: HTMLImageElement | null,
    onThemeChange: (themeId: ThemeId) => void,
) {
    themeOptions.forEach((option) => {
        option.addEventListener('change', () => onThemeChange(option.value as ThemeId));
        option.addEventListener('focus', () => setThemePreview(option.value as ThemeId, previewImage));
        option.addEventListener('blur', () => resetThemePreview(themeOptions, previewImage));
    });
}

function bindThemeHoverPreview(
    themeLabels: NodeListOf<HTMLLabelElement>,
    themeOptions: NodeListOf<HTMLInputElement>,
    previewImage: HTMLImageElement | null,
) {
    themeLabels.forEach((label) => {
        const themeId = label.dataset.themeId as ThemeId | undefined;
        if (!themeId) return;
        label.addEventListener('mouseenter', () => setThemePreview(themeId, previewImage));
        label.addEventListener('mouseleave', () => resetThemePreview(themeOptions, previewImage));
    });
}

function bindPlayerSelection(
    rootElement: HTMLElement,
    onPlayerChange: (playerId: PlayerId) => void,
) {
    rootElement.querySelectorAll<HTMLInputElement>('input[name="player"]').forEach((option) => {
        option.addEventListener('change', () => onPlayerChange(option.value as PlayerId));
    });
}

function bindBoardSizeSelection(
    rootElement: HTMLElement,
    onBoardSizeChange: (boardSizeId: BoardSizeId) => void,
) {
    rootElement.querySelectorAll<HTMLInputElement>('input[name="board-size"]').forEach((option) => {
        option.addEventListener('change', () => onBoardSizeChange(Number(option.value) as BoardSizeId));
    });
}

function setThemePreview(themeId: ThemeId, previewImage: HTMLImageElement | null) {
    const theme = THEMES.find((entry) => entry.id === themeId);
    if (!theme || !previewImage) return;
    previewImage.src = theme.assets.visuals.default;
    previewImage.alt = theme.label;
}

function resetThemePreview(
    themeOptions: NodeListOf<HTMLInputElement>,
    previewImage: HTMLImageElement | null,
) {
    const selectedTheme = Array.from(themeOptions).find((option) => option.checked);
    if (selectedTheme) setThemePreview(selectedTheme.value as ThemeId, previewImage);
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