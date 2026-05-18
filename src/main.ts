import './styles/style.scss';
import type { GameState, PlayerId, SettingsState } from './types/game';
import { THEMES } from './data/themes';
import { BOARD_SIZES } from './data/board-sizes';
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

           <!-- <div class="settings-item">
                <div class="settings-icon-container">
                    <img src="" alt="Colour Palette Icon" class="settings-icon">
                </div>
                <div class="settings-options-container">
                    <h2 class="settings-title">Game Themes</h2>
                    <div class="settings-options">
                        <input type="radio" id="da-projects-theme" name="game-theme"> <label for="da-projects-theme">DA Projects Theme</label>
                        <input type="radio" id="foods-theme" name="game-theme"> <label for="foods-theme">Foods Theme</label>
                    </div>
                </div>
            </div> -->

              <fieldset class="settings-item">
              <legend class="settings-title"><img src="" alt="" class="settings-icon">Game Themes</legend>
                    <div class="settings-option"><input type="radio" id="da-projects-theme" name="game-theme"> <label for="da-projects-theme">DA Projects Theme</label></div>
                    <div class="settings-option"><input type="radio" id="foods-theme" name="game-theme"> <label for="foods-theme">Foods Theme</label></div>
              </fieldset> 


            <!--<div class="settings-item">
                <div class="settings-icon-container">
                    <img src="" alt="Player Icon" class="settings-icon">
                </div>
                <div class="settings-options-container">
                    <h2 class="settings-title">Player</h2>
                    <div class="settings-options">
                        <input type="radio" id="blue-player" name="player"> <label for="blue-player">Blue Player</label>
                        <input type="radio" id="orange-player" name="player"> <label for="orange-player">Orange Player</label>
                    </div>
                </div>
            </div> -->

            <fieldset class="settings-item">
            <legend class="settings-title"><img src="" alt="" class="settings-icon">Player</legend> 
                    <div class="settings-option"><input type="radio" id="blue-player" name="player"> <label for="blue-player">Blue Player</label></div>
                    <div class="settings-option"><input type="radio" id="orange-player" name="player"> <label for="orange-player">Orange Player</label></div>
            </fieldset>


           <!-- <fieldset class="settings-item">
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
            </fieldset> -->

            <fieldset class="settings-item">
            <legend class="settings-title"><img src="" alt="" class="settings-icon" style="width: 24px; height: 24px; background-color: rgb(255, 255, 255);">Board Size</legend>          
                    <div class="settings-option"><input type="radio" id="16-cards" name="board-size"> <label for="16-cards">16 Cards</label></div>
                    <div class="settings-option"><input type="radio" id="24-cards" name="board-size"> <label for="24-cards">24 Cards</label></div>
                    <div class="settings-option"><input type="radio" id="36-cards" name="board-size"> <label for="36-cards">36 Cards</label></div>
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

function addSettingsListeners(rootElement: HTMLElement) {
    const themeOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="game-theme"]');
    const playerOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="player"]');
    const boardSizeOptions = rootElement.querySelectorAll<HTMLInputElement>('input[name="board-size"]');
} 

render(root);   