// Global score variable
let score = 0;

let elapsedTime = 0;
// Function to update and display the score
function updateScore(deltaScore: number) {
    score += deltaScore;
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
        scoreElement.classList.add('flash');
        setTimeout(() => {
            scoreElement.classList.remove('flash');
        }, 200); // Adjust duration as needed
    }
    console.log('Score:', score);
}
// Function to update game state based on elapsed time

export function updateGame(deltaTime: number) {
    // Update elapsed time
    elapsedTime += deltaTime;

    // Update score based on elapsed time
    const scoreIncrementRate = 1; // Score increments every second
    if (elapsedTime >= scoreIncrementRate) {
        const scoreToAdd = Math.floor(elapsedTime / scoreIncrementRate);
        updateScore(scoreToAdd);
        elapsedTime -= scoreToAdd * scoreIncrementRate; // Adjust elapsed time
    }

    // Update other game logic here (e.g., manageCacti, player movement, etc.)
}
