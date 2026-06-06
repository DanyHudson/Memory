import './styles/style.scss';
import { BOARD_SIZES } from './data/board-sizes';
import { THEMES } from './data/themes';
import type { GameState, MemoryCard } from './types/game';
import { INITIAL_GAME_STATE } from './state/initial-state';
import { renderLanding } from './screens/render-landing';
import { renderSettings } from './screens/render-settings';
import { renderGame } from './screens/render-game';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);

let isResolvingTurn = false;


const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

function render(rootElement: HTMLElement) {
    if (gameState.screen === 'landing') {
        renderLandingScreen(rootElement);
        return;
    }

    if (gameState.screen === 'settings') {
        renderSettingsScreen(rootElement);
        return;
    }

    renderGameScreen(rootElement);
}

function renderLandingScreen(rootElement: HTMLElement) {
    renderLanding(rootElement, () => openSettings(rootElement));
}

function renderSettingsScreen(rootElement: HTMLElement) {
    renderSettings({
        rootElement,
        gameState,
        onThemeChange: (themeId) => updateTheme(rootElement, themeId),
        onPlayerChange: (playerId) => updateStartingPlayer(rootElement, playerId),
        onBoardSizeChange: (boardSizeId) => updateBoardSize(rootElement, boardSizeId),
        onStart: () => startGame(rootElement),
    });
}

function renderGameScreen(rootElement: HTMLElement) {
    renderGame({
        rootElement,
        gameState,
        onExit: () => exitGame(rootElement),
        onCardClick: (cardId) => flipCard(rootElement, cardId),
    });
}

function updateTheme(
    rootElement: HTMLElement,
    themeId: GameState['settings']['themeId'],
) {
    gameState.settings.themeId = themeId;
    render(rootElement);
}

function updateStartingPlayer(
    rootElement: HTMLElement,
    playerId: GameState['settings']['startingPlayer'],
) {
    gameState.settings.startingPlayer = playerId;
    render(rootElement);
}

function updateBoardSize(
    rootElement: HTMLElement,
    boardSizeId: GameState['settings']['boardSize'],
) {
    gameState.settings.boardSize = boardSizeId;
    render(rootElement);
}

// ::::::::::::::::::::

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

    handleSecondCardFlip(rootElement);
}


function handleSecondCardFlip(rootElement: HTMLElement) {
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

    matchFlippedCards(firstCard, secondCard);
    gameState.flippedCardIds = [];
}


function matchFlippedCards(firstCard: MemoryCard, secondCard: MemoryCard) {
    if (firstCard.faceId === secondCard.faceId) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        gameState.score[gameState.currentPlayer] += 1;
        return;
    }

    firstCard.isFlipped = false;
    secondCard.isFlipped = false;
    gameState.currentPlayer =
        gameState.currentPlayer === 'blue' ? 'orange' : 'blue';
}

// function createGameStateFromSettings(state: GameState): GameState {
//     const board = BOARD_SIZES.find((entry) => entry.id === state.settings.boardSize);
//     const theme = THEMES.find((entry) => entry.id === state.settings.themeId);

//     if (!board || !theme) {
//         return structuredClone(INITIAL_GAME_STATE);
//     }

//     const selectedFaces = theme.assets.cardFaces.slice(0, board.pairCount);
//     const deck = shuffleArray(
//         selectedFaces.flatMap((cardFace, index) => [
//             {
//                 id: `${cardFace.id}-${index + 1}-a`,
//                 faceId: cardFace.id,
//                 image: cardFace.image,
//                 alt: cardFace.alt,
//                 isFlipped: false,
//                 isMatched: false,
//             },
//             {
//                 id: `${cardFace.id}-${index + 1}-b`,
//                 faceId: cardFace.id,
//                 image: cardFace.image,
//                 alt: cardFace.alt,
//                 isFlipped: false,
//                 isMatched: false,
//             },
//         ]),
//     );

//     return {
//         ...structuredClone(state),
//         currentPlayer: state.settings.startingPlayer,
//         score: {
//             blue: 0,
//             orange: 0,
//         },
//         deck,
//         flippedCardIds: [],
//         winner: null,
//     };
// }

function createGameStateFromSettings(state: GameState): GameState {
    const board = findBoardSize(state);
    const theme = findTheme(state);

    if (!board || !theme) {
        return structuredClone(INITIAL_GAME_STATE);
    }

    return buildGameState(state, board, theme);
}

function findBoardSize(state: GameState) {
    return BOARD_SIZES.find((entry) => entry.id === state.settings.boardSize);
}

function findTheme(state: GameState) {
    return THEMES.find((entry) => entry.id === state.settings.themeId);
}

function buildGameState(
    state: GameState,
    board: ReturnType<typeof findBoardSize>,
    theme: ReturnType<typeof findTheme>,
): GameState {
    if (!board || !theme) {
        return structuredClone(INITIAL_GAME_STATE);
    }

    return {
        ...structuredClone(state),
        currentPlayer: state.settings.startingPlayer,
        score: createEmptyScore(),
        deck: createDeck(board.pairCount, theme.assets.cardFaces),
        flippedCardIds: [],
        winner: null,
    };
}

function createEmptyScore() {
    return {
        blue: 0,
        orange: 0,
    };
}

function createDeck(pairCount: number, cardFaces: typeof THEMES[number]['assets']['cardFaces']) {
    const selectedFaces = cardFaces.slice(0, pairCount);
    const deck = selectedFaces.flatMap(createCardPair);

    return shuffleArray(deck);
}

function createCardPair(cardFace: typeof THEMES[number]['assets']['cardFaces'][number], index: number) {
    return [
        createMemoryCard(cardFace, index, 'a'),
        createMemoryCard(cardFace, index, 'b'),
    ];
}

function createMemoryCard(
    cardFace: typeof THEMES[number]['assets']['cardFaces'][number],
    index: number,
    suffix: 'a' | 'b',
): MemoryCard {
    return {
        id: `${cardFace.id}-${index + 1}-${suffix}`,
        faceId: cardFace.id,
        image: cardFace.image,
        alt: cardFace.alt,
        isFlipped: false,
        isMatched: false,
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