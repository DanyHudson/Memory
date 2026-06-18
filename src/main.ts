import './styles/style.scss';
import type { GameState, MemoryCard } from './types/game';
import { INITIAL_GAME_STATE } from './state/initial-state';
import { createGameStateFromSettings, getWinner, isGameFinished } from './state/game-logic';
import { renderLanding } from './screens/render-landing';
import { renderSettings } from './screens/render-settings';
import { renderGame } from './screens/render-game';
import { renderGameOver } from './screens/render-game-over';
import { renderResult } from './screens/render-result';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);
let isResolvingTurn = false;
let isExitDialogOpen = false;
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
    if (gameState.screen === 'game') {
        renderGameScreen(rootElement);
        return;
    }
    if (gameState.screen === 'game-over') {
        renderGameOverScreen(rootElement);
        return;
    }
    renderResultScreen(rootElement);
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
        isExitDialogOpen,
        onExit: () => openExitDialog(rootElement),
        onBackToGame: () => closeExitDialog(rootElement),
        onConfirmExit: () => confirmExitGame(rootElement),
        onCardClick: (cardId) => flipCard(rootElement, cardId),
    });
}

function renderGameOverScreen(rootElement: HTMLElement) {
    renderGameOver({
        rootElement,
        gameState,
    });
}

function renderResultScreen(rootElement: HTMLElement) {
    renderResult({
        rootElement,
        gameState,
        onHome: () => goHome(rootElement),
        // onPlayAgain: () => playAgain(rootElement),
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

function goHome(rootElement: HTMLElement) {
    gameState = structuredClone(INITIAL_GAME_STATE);
    render(rootElement);
}

// function playAgain(rootElement: HTMLElement) {
//     gameState = createGameStateFromSettings(gameState);
//     gameState.screen = 'game';
//     render(rootElement);
// }

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
    if (gameState.flippedCardIds.length !== 2) {
        return;
    }

    isResolvingTurn = true;

    window.setTimeout(() => {
        resolveTurn(rootElement);
        isResolvingTurn = false;
        render(rootElement);
    }, 900);
}

function resolveTurn(rootElement: HTMLElement) {
    const [firstCardId, secondCardId] = gameState.flippedCardIds;
    const firstCard = gameState.deck.find((card) => card.id === firstCardId);
    const secondCard = gameState.deck.find((card) => card.id === secondCardId);
    if (!firstCard || !secondCard) {
        gameState.flippedCardIds = [];
        return;
    }
    matchFlippedCards(firstCard, secondCard);
    gameState.flippedCardIds = [];
    openGameOverScreen(rootElement);
}

function openGameOverScreen(rootElement: HTMLElement) {
    if (!isGameFinished(gameState.deck)) {
        return;
    }

    gameState.winner = getWinner(gameState.score);
    gameState.screen = 'game-over';

    window.setTimeout(() => {
        gameState.screen = 'result';
        render(rootElement);
    }, 1500);
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

function openExitDialog(rootElement: HTMLElement) {
    isExitDialogOpen = true;
    render(rootElement);
}

function closeExitDialog(rootElement: HTMLElement) {
    isExitDialogOpen = false;
    render(rootElement);
}

function confirmExitGame(rootElement: HTMLElement) {
    isExitDialogOpen = false;
    exitGame(rootElement);
}

render(root);   