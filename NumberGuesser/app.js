/*
Game rules:
- player guesses between min num and max num
- player gets a certain number of guesses
- notify player of guesses remaining
- notify the player of correct answer if they run out of guesses
- let player play again
*/

// Define game variables
let min = 1,
    max = 10,
    winNum = getWinNum(min, max);
    guessesLeft = 3;

    console.log(`WINNUM: ${winNum}`);
    console.log(typeof(winNum));

// Define UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    ogBorderColor = guessInput.style.borderColor;

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function() {
    // Play again option
    if (guessBtn.value === 'Play Again') {
        restartGame();
        return;
    }

    let guess = parseInt(guessInput.value);

    // Validate input
    if (guess <= max && guess >= min) {
        console.log('valid guess');
    } else {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
        return;
    }

    if (guess === winNum) {
        gameOver(true, `Congrats! ${winNum} is correct!`);
    } else {
        // Lose one guess
        guessesLeft--;
        guessInput.style.borderColor = 'red';
        guessInput.value = '';

        if (guessesLeft === 0) {
            // No guesses left, you lose
            console.log(winNum);
            gameOver(false, `You lose. The correct number was ${winNum}. Play again?`);
        } else {
            // Continue guessing
            // Change message
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
        }
    }
})

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function restartGame() {
    // Reset number of guesses
    guessesLeft = 3;

    // Reset winning number
    winNum = getWinNum(min, max);

    // Change button and border color of input back
    guessBtn.value = "Guess";
    guessInput.style.borderColor = ogBorderColor;

    // Clear message and input
    setMessage('');
    guessInput.value = '';

    // Re-enable input
    guessInput.disabled = false;
}

function gameOver(won, msg) {
    // Set color
    let color;
    won ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;

    // Change boarder color
    guessInput.style.borderColor = color;

    // Return success message
    setMessage(msg, color);

    // Change button to play again
    guessBtn.value = 'Play Again';
}

function getWinNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}