import './styles/style.scss';
import type { GameState, PlayerId, SettingsState } from './types/game';
import { INITIAL_GAME_STATE } from './state/initial-state';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);

// gameState = gameState;

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}


function render(rootElement: HTMLElement) {
    if (gameState.screen === 'landing') {
        renderLanding(rootElement);
    } else if (gameState.screen === 'settings') {
        renderSettings(rootElement);
    }
}

function renderLanding(rootElement: HTMLElement) {
    rootElement.innerHTML = `
        <main>
            <section class="start-screen">
                <header>
                    <h3>It's play time</h3>
                    <h1>Ready to play?</h1>
                </header>
                <footer>
                    <button class="play-btn" id="play-btn">Play</button>
                </footer>
            </section>
        </main>
    `;

    addStartButton(rootElement);
}

function renderSettings(rootElement: HTMLElement) {
    rootElement.innerHTML = `
   <main>
    <section class="settings-screen">
        <header>
            <h1>Settings</h1>
        </header>

        <div class="settings-select">

            <fieldset class="settings-item">
                <div class="settings-icon-container">
                    <img src="" alt="Colour Palette Icon" class="settings-icon">
                </div>
                <div class="settings-options-container">
                    <legend class="settings-title">Game Themes</legend>
                    <div class="settings-options">
                        <input type="radio" id="da-projects-theme" name="game-theme"> <label for="da-projects-theme">DA Projects Theme</label>
                        <input type="radio" id="foods-theme" name="game-theme"> <label for="foods-theme">Foods Theme</label>
                    </div>
                </div>
            </fieldset>


            <fieldset class="settings-item">
                <div class="settings-icon-container">
                    <img src="" alt="Player Icon" class="settings-icon">
                </div>
                <div class="settings-options-container">
                    <legend class="settings-title">Player</legend>
                    <div class="settings-options">
                        <input type="radio" id="blue-player" name="player"> <label for="blue-player">Blue Player</label>
                        <input type="radio" id="orange-player" name="player"> <label for="orange-player">Orange Player</label>
                    </div>
                </div>
            </fieldset>

            <fieldset class="settings-item">
                <div class="settings-icon-container">
                    <img src="" alt="Mobile Icon" class="settings-icon">
                </div>
                <div class="settings-options-container">
                    <legend class="settings-title">Board Size</legend>
                    <div class="settings-options">
                        <input type="radio" id="16-cards" name="board-size"> <label for="16-cards">16 Cards</label>
                        <input type="radio" id="24-cards" name="board-size"> <label for="24-cards">24 Cards</label>
                        <input type="radio" id="36-cards" name="board-size"> <label for="36-cards">36 Cards</label>
                    </div>
                </div>
            </fieldset>

        </div>

        <div class="settings-visual">
            <div class="visual-shot"><img src="" alt="">Screen Shot</div>
            <div class="settings-confirmed"> Game Theme / Player / Board Size </div>
        </div>

    </section>
    </main>
    `;
}

function startGame(rootElement: HTMLElement) {
    gameState.screen = 'settings';
    render(rootElement);
}

function addStartButton(rootElement: HTMLElement) {
    const playButton = document.querySelector<HTMLButtonElement>('#play-btn');
    if (playButton) {
        playButton.addEventListener('click', () => startGame(rootElement));
    }
}


render(root);   