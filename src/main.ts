import './styles/style.scss';
import { BOARD_SIZES } from './data/board-sizes';
import { THEMES } from './data/themes';
import type { GameState } from './types/game';
// import type { ThemeId } from './types/theme';
// import type { BoardSizeId } from './data/board-sizes';
import { INITIAL_GAME_STATE } from './state/initial-state';
import { renderLanding } from './screens/render-landing';
import { renderSettings } from './screens/render-settings';
import { renderGame } from './screens/render-game';
// import { renderResult } from './screens/render-result';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);

let isResolvingTurn = false;


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
        renderGame({
            rootElement,
            gameState,
            onExit: () => exitGame(rootElement),
            onCardClick: (cardId) => flipCard(rootElement, cardId),
        });
    }
}

function openSettings(rootElement: HTMLElement) {
    gameState.screen = 'settings';
    render(rootElement);
}

function startGame(rootElement: HTMLElement) {
    gameState = createGameStateFromSettings(gameState);
    gameState.screen = 'game';
    render(rootElement);
}

function exitGame(rootElement: HTMLElement) {
    gameState.screen = 'settings';
    gameState.deck = [];
    gameState.flippedCardIds = [];
    gameState.score = {
        blue: 0,
        orange: 0,
    };
    gameState.winner = null;
    gameState.currentPlayer = gameState.settings.startingPlayer;
    render(rootElement);
}


function flipCard(rootElement: HTMLElement, cardId: string) {
    if (isResolvingTurn || gameState.flippedCardIds.length >= 2) {
        return;
    }

    const selectedCard = gameState.deck.find((card) => card.id === cardId);

    if (!selectedCard || selectedCard.isFlipped || selectedCard.isMatched) {
        return;
    }

    selectedCard.isFlipped = true;
    gameState.flippedCardIds.push(selectedCard.id);
    render(rootElement);

    if (gameState.flippedCardIds.length === 2) {
        isResolvingTurn = true;

        window.setTimeout(() => {
            resolveTurn();
            isResolvingTurn = false;
            render(rootElement);
        }, 900);
    }
}

function resolveTurn() {
    const [firstCardId, secondCardId] = gameState.flippedCardIds;
    const firstCard = gameState.deck.find((card) => card.id === firstCardId);
    const secondCard = gameState.deck.find((card) => card.id === secondCardId);

    if (!firstCard || !secondCard) {
        gameState.flippedCardIds = [];
        return;
    }

    if (firstCard.faceId === secondCard.faceId) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        gameState.score[gameState.currentPlayer] += 1;
    } else {
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        gameState.currentPlayer =
            gameState.currentPlayer === 'blue' ? 'orange' : 'blue';
    }

    gameState.flippedCardIds = [];
}

function createGameStateFromSettings(state: GameState): GameState {
    const board = BOARD_SIZES.find((entry) => entry.id === state.settings.boardSize);
    const theme = THEMES.find((entry) => entry.id === state.settings.themeId);

    if (!board || !theme) {
        return structuredClone(INITIAL_GAME_STATE);
    }

    const selectedFaces = theme.assets.cardFaces.slice(0, board.pairCount);
    const deck = shuffleArray(
        selectedFaces.flatMap((cardFace, index) => [
            {
                id: `${cardFace.id}-${index + 1}-a`,
                faceId: cardFace.id,
                image: cardFace.image,
                alt: cardFace.alt,
                isFlipped: false,
                isMatched: false,
            },
            {
                id: `${cardFace.id}-${index + 1}-b`,
                faceId: cardFace.id,
                image: cardFace.image,
                alt: cardFace.alt,
                isFlipped: false,
                isMatched: false,
            },
        ]),
    );

    return {
        ...structuredClone(state),
        currentPlayer: state.settings.startingPlayer,
        score: {
            blue: 0,
            orange: 0,
        },
        deck,
        flippedCardIds: [],
        winner: null,
    };
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let index = shuffledArray.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const currentValue = shuffledArray[index];

        shuffledArray[index] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = currentValue;
    }

    return shuffledArray;
}

render(root);   