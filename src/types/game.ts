import type { BoardSizeId } from '../data/board-sizes';
import type { ThemeId } from './theme';

export type PlayerId = 'blue' | 'orange';

export type ScreenId = 'landing' | 'settings' | 'game' | 'result';

export type ResultId = 'blue' | 'orange' | 'draw' | null;


export type SettingsState = {
    themeId: ThemeId;
    boardSize: BoardSizeId;
    startingPlayer: PlayerId;
};

export type ScoreState = {
    blue: number;
    orange: number;
};

export type MemoryCard = {
    id: string;
    faceId: string;
    image: string;
    alt: string;
    isFlipped: boolean;
    isMatched: boolean;
};

export type GameState = {
    screen: ScreenId;
    settings: SettingsState;
    currentPlayer: PlayerId;
    score: ScoreState;
    deck: MemoryCard[];
    flippedCardIds: string[];
    winner: ResultId;
};
