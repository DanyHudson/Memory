import { BOARD_SIZES } from '../data/board-sizes';
import { THEMES } from '../data/themes';
import type { BoardSize } from '../data/board-sizes';
import type { Theme, CardFace } from '../types/theme';
import type { GameState, MemoryCard, ResultId, ScoreState } from '../types/game';
import { INITIAL_GAME_STATE } from './initial-state';

export function createGameStateFromSettings(state: GameState): GameState {
    const board = findBoardSize(state);
    const theme = findTheme(state);

    if (!board || !theme) {
        return structuredClone(INITIAL_GAME_STATE);
    }

    return buildGameState(state, board, theme);
}

export function createEmptyScore(): ScoreState {
    return {
        blue: 0,
        orange: 0,
    };
}

export function isGameFinished(deck: MemoryCard[]) {
    return deck.every((card) => card.isMatched);
}

export function getWinner(score: ScoreState): ResultId {
    if (score.blue > score.orange) {
        return 'blue';
    }
    if (score.orange > score.blue) {
        return 'orange';
    }
    return 'draw';
}

function findBoardSize(state: GameState): BoardSize | undefined {
    return BOARD_SIZES.find((entry) => entry.id === state.settings.boardSize);
}

function findTheme(state: GameState): Theme | undefined {
    return THEMES.find((entry) => entry.id === state.settings.themeId);
}

function buildGameState(
    state: GameState,
    board: BoardSize,
    theme: Theme,
): GameState {
    return {
        ...structuredClone(state),
        currentPlayer: state.settings.startingPlayer,
        score: createEmptyScore(),
        deck: createDeck(board.pairCount, theme.assets.cardFaces),
        flippedCardIds: [],
        winner: null,
    };
}

function createDeck(pairCount: number, cardFaces: CardFace[]) {
    const selectedFaces = cardFaces.slice(0, pairCount);
    const deck = selectedFaces.flatMap(createCardPair);
    return shuffleArray(deck);
}

function createCardPair(cardFace: CardFace, index: number) {
    return [
        createMemoryCard(cardFace, index, 'a'),
        createMemoryCard(cardFace, index, 'b'),
    ];
}

function createMemoryCard(
    cardFace: CardFace,
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