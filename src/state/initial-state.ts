import type { GameState } from '../types/game';

export const INITIAL_GAME_STATE: GameState = {
    screen: 'landing',
    settings: {
        themeId: 'da-projects',
        boardSize: 16,
        startingPlayer: 'blue',
    },
    currentPlayer: 'blue',
    score: {
        blue: 0,
        orange: 0,
    },
    deck: [],
    flippedCardIds: [],
    winner: null,
};