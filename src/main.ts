import './styles/style.scss';
import type { GameState } from './types/game';
import { INITIAL_GAME_STATE } from './state/initial-state';

let gameState: GameState = structuredClone(INITIAL_GAME_STATE);

// gameState = gameState;

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}


function render(rootElement: HTMLElement) {
    rootElement.innerHTML = `
        <main>
            <section class="start-screen">
                <header>
                    <h3>It's play time</h3>
                    <h1>Ready to play?</h1> 
                </header>
                <footer>
                    <button class="play-btn">Play</button>
                </footer>
            </section>
        </main>
    `;

}

render(root);   