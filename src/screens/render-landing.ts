export function renderLanding(
    rootElement: HTMLElement,
    onPlay: () => void,
) {
    rootElement.innerHTML = `
        <main class="landing-screen">
            <section class="landing-screen__hero">
                <p class="landing-screen__eyebrow">It's play time.</p>
                <h1 class="landing-screen__title">Ready to play?</h1>

                <button
                    class="button button--primary landing-screen__action"
                    id="play-btn"
                    type="button"
                >
                    <span class="button__label">Play</span>
                </button>
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