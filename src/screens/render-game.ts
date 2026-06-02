import { BOARD_SIZES } from '../data/board-sizes';
import { THEMES } from '../data/themes';
import type { GameState } from '../types/game';

export function renderGame(
    rootElement: HTMLElement,
    gameState: GameState,
) {
    const board = BOARD_SIZES.find((entry) => entry.id === gameState.settings.boardSize);
    const theme = THEMES.find((entry) => entry.id === gameState.settings.themeId);

    if (!board || !theme) {
        rootElement.innerHTML = '<p>Game configuration is invalid.</p>';
        return;
    }

    const deckToRender = gameState.deck.length
        ? gameState.deck
        : Array.from({ length: board.totalCards }, (_, index) => ({
            id: `placeholder-${index + 1}`,
            faceId: `placeholder-${index + 1}`,
            image: '',
            alt: 'Placeholder card',
            isFlipped: false,
            isMatched: false,
        }));

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
                                        aria-label="${card.alt}"
                                        aria-pressed="${card.isFlipped ? 'true' : 'false'}"
                                        data-card-id="${card.id}"
                                        data-card-index="${index}"
                                    >
                                        <span class="game-card__face game-card__face--back" aria-hidden="true">
                                            <span class="game-card__back-icon">&lt;&gt;</span>
                                        </span>

                                        <span class="game-card__face game-card__face--front" aria-hidden="true">
                                            ${
                                                card.image
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
        </main>
    `;
}