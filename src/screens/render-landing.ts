export function renderLanding(
    rootElement: HTMLElement,
    onPlay: () => void,
) {
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

    addPlayButtonListener(rootElement, onPlay);
}

function addPlayButtonListener(
    rootElement: HTMLElement,
    onPlay: () => void,
) {
    const playButton = rootElement.querySelector<HTMLButtonElement>('#play-btn');

    if (playButton) {
        playButton.addEventListener('click', onPlay);
    }
}