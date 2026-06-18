import { BOARD_SIZES } from '../data/board-sizes';
import { THEMES } from '../data/themes';
import type { GameState } from '../types/game';

// type RenderGameParams = {
//     rootElement: HTMLElement;
//     gameState: GameState;
//     onExit: () => void;
//     onCardClick: (cardId: string) => void;
// };

type RenderGameParams = {
    rootElement: HTMLElement;
    gameState: GameState;
    isExitDialogOpen: boolean;
    onExit: () => void;
    onBackToGame: () => void;
    onConfirmExit: () => void;
    onCardClick: (cardId: string) => void;
};

export function renderGame({
    rootElement,
    gameState,
    isExitDialogOpen,
    onExit,
    onBackToGame,
    onConfirmExit,
    onCardClick,
}: RenderGameParams) {
    const board = BOARD_SIZES.find((entry) => entry.id === gameState.settings.boardSize);
    const theme = THEMES.find((entry) => entry.id === gameState.settings.themeId);

    if (!board || !theme) {
        rootElement.innerHTML = '<p>Game configuration is invalid.</p>';
        return;
    }

    const deckToRender = gameState.deck;

    rootElement.innerHTML = `
        <main class="game-screen">
            <div class="game-screen__panel">
                <header class="game-screen__topbar">
                    <div class="scoreboard" role="group" aria-label="Player scores">
                        <ul class="scoreboard__list">
                            <li class="scoreboard__player scoreboard__player--orange">
                                <img
                                    class="scoreboard__icon"
                                    src="${theme.assets.playerPawns.orange}"
                                    alt=""
                                    aria-hidden="true"
                                >
                                <span class="scoreboard__score">${gameState.score.orange}</span>
                            </li>

                            <li class="scoreboard__player scoreboard__player--blue">
                                <img
                                    class="scoreboard__icon"
                                    src="${theme.assets.playerPawns.blue}"
                                    alt=""
                                    aria-hidden="true"
                                >
                                <span class="scoreboard__score">${gameState.score.blue}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="game-screen__turn" role="status" aria-live="polite">
                        <span class="game-screen__turn-label">Current player:</span>
                        <img
                            class="game-screen__turn-icon"
                            src="${theme.assets.playerPawns[gameState.currentPlayer]}"
                            alt="${gameState.currentPlayer} player"
                        >
                    </div>

                    <button type="button" class="button button--ghost game-screen__exit">
                        <img
                            class="button__icon"
                            src="${theme.assets.exit.default}"
                            alt=""
                            aria-hidden="true"
                        >
                        <span class="button__label">Exit game</span>
                    </button>
                </header>

                <section class="game-screen__board-area" aria-label="Game board">
                    <div
                        class="game-board game-board--${board.id}"
                        style="--game-columns: ${board.columns};"
                    >
                        ${deckToRender
            .map(
                (card, index) => `
                                    <button
                                        type="button"
                                        class="game-card${card.isFlipped ? ' game-card--flipped' : ''}${card.isMatched ? ' game-card--matched' : ''}"
                                        aria-label="${card.isFlipped || card.isMatched ? card.alt : 'Hidden memory card'}"
                                        aria-pressed="${card.isFlipped ? 'true' : 'false'}"
                                        data-card-id="${card.id}"
                                        data-card-index="${index}"
                                    >
                                        <span class="game-card__face game-card__face--back" aria-hidden="true">
                                            <span class="game-card__back-icon">&lt;&gt;</span>
                                        </span>

                                        <span class="game-card__face game-card__face--front" aria-hidden="true">
                                            ${card.image
                        ? `<img class="game-card__image" src="${card.image}" alt="">`
                        : `<span class="game-card__placeholder"></span>`
                    }
                                        </span>
                                    </button>
                                `,
            )
            .join('')}
                    </div>
                </section>
            </div>

${isExitDialogOpen
            ? `
            <div class="exit-dialog" role="dialog" aria-modal="true" aria-labelledby="exit-dialog-title">
                <div class="exit-dialog__panel">
                    <h2 id="exit-dialog-title" class="exit-dialog__title">
                        Are you sure you want to quit the game?
                    </h2>

                    <div class="exit-dialog__actions">
                        <button
                            id="back-to-game-btn"
                            type="button"
                            class="button button--secondary"
                        >
                            Back to game
                        </button>

                        <button
                            id="confirm-exit-btn"
                            type="button"
                            class="button button--primary"
                        >
                            Exit game
                        </button>
                    </div>
                </div>
            </div>
        `
            : ''
        }

        </main>
    `;

    addExitButtonListener(rootElement, onExit);
    addCardListeners(rootElement, onCardClick);
    addExitDialogListeners(rootElement, onBackToGame, onConfirmExit);
}

function addExitButtonListener(
    rootElement: HTMLElement,
    onExit: () => void,
) {
    const exitButton = rootElement.querySelector<HTMLButtonElement>('.game-screen__exit');

    if (exitButton) {
        exitButton.addEventListener('click', onExit);
    }
}

function addCardListeners(
    rootElement: HTMLElement,
    onCardClick: (cardId: string) => void,
) {
    const cards = rootElement.querySelectorAll<HTMLButtonElement>('[data-card-id]');

    cards.forEach((cardElement) => {
        cardElement.addEventListener('click', () => {
            const cardId = cardElement.dataset.cardId;

            if (!cardId) {
                return;
            }

            onCardClick(cardId);
        });
    });
}

function addExitDialogListeners(
    rootElement: HTMLElement,
    onBackToGame: () => void,
    onConfirmExit: () => void,
) {
    const backButton = rootElement.querySelector<HTMLButtonElement>('#back-to-game-btn');
    const confirmButton = rootElement.querySelector<HTMLButtonElement>('#confirm-exit-btn');

    backButton?.addEventListener('click', onBackToGame);
    confirmButton?.addEventListener('click', onConfirmExit);
}