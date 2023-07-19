export function animateDigits(element, targetNumber, animationDuration) {
    const datatimeText = document.querySelector(`${element}`);
    const digits = datatimeText.textContent.slice(0, 2).trim();
    let currentNumber = parseInt(digits, 10);
    const startTime = Date.now();

    function updateText() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = elapsed / animationDuration;
        if (progress < 1) {
            currentNumber = Math.floor(progress * targetNumber);
            datatimeText.textContent = currentNumber.toString().padStart(2, '0') + datatimeText.textContent.slice(2);
            requestAnimationFrame(updateText);
        } else {
            datatimeText.textContent = targetNumber.toString().padStart(2, '0') + datatimeText.textContent.slice(2);
        }
    }

    requestAnimationFrame(updateText);
}