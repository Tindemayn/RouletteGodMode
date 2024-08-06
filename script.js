document.addEventListener('DOMContentLoaded', () => {
    setTimeout(function() {
        document.getElementById('notificationBar').style.display = 'block';
    }, 600000); // 10 minutes in milliseconds
});

function calculate(event) {
    event.preventDefault();

    const lastNumber = parseInt(document.getElementById('lastNumber').value);
    const interval = parseInt(document.getElementById('interval').value);
    const rotationTime = parseInt(document.getElementById('rotationTime').value);
    const previousBet = parseInt(document.getElementById('previousBet').value) || 0;
    const betType = document.getElementById('betType').value;
    const numberOfBets = parseInt(document.getElementById('numberOfBets').value);

    const numbers = [...Array(37).keys()];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const predictedNumber = numbers[randomIndex];

    document.getElementById('singleResult').textContent = 'Predicted Number: ' + predictedNumber;
    document.getElementById('threeNumbers').textContent = 'Next 3 Numbers: ' + getNextNumbers(3, randomIndex);
    document.getElementById('fiveNumbers').textContent = 'Next 5 Numbers: ' + getNextNumbers(5, randomIndex);
    document.getElementById('dozen').textContent = 'Predicted Dozen: ' + getPredictedDozen(predictedNumber);
    document.getElementById('color').textContent = 'Predicted Color: ' + getPredictedColor(predictedNumber);
    document.getElementById('nextBet').textContent = 'Next Bet Amount: ' + getNextBetAmount(previousBet, betType, numberOfBets);

    moveBall(predictedNumber);
}

function getNextNumbers(count, startIndex) {
    const numbers = [...Array(37).keys()];
    const nextNumbers = [];
    for (let i = 0; i < count; i++) {
        nextNumbers.push(numbers[(startIndex + i) % numbers.length]);
    }
    return nextNumbers.join(', ');
}

function getPredictedDozen(number) {
    if (number === 0) return '1st Dozen (1-12)';
    if (number <= 12) return '1st Dozen (1-12)';
    if (number <= 24) return '2nd Dozen (13-24)';
    return '3rd Dozen (25-36)';
}

function getPredictedColor(number) {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    if (number === 0) return 'Green';
    return redNumbers.includes(number) ? 'Red' : 'Black';
}

function getNextBetAmount(previousBet, betType, numberOfBets) {
    const betMultipliers = {
        'number': 36,
        'color': 2,
        'dozen': 3
    };
    const nextBet = previousBet * betMultipliers[betType];
    return nextBet;
}

function moveBall(number) {
    const angle = number * 9.72; // Each number is spaced 9.72 degrees apart
    const ball = document.getElementById('ball');
    ball.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(0, -120px)`;
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    if (language === 'fi') {
        document.querySelector('label[for="lastNumber"]').textContent = 'Viimeinen numero:';
        document.querySelector('label[for="interval"]').textContent = 'Aikaväli pyöräytysten välillä (sekuntia):';
        document.querySelector('label[for="rotationTime"]').textContent = 'Aika yhdelle kierrokselle (sekuntia):';
        document.querySelector('label[for="previousBet"]').textContent = 'Edellinen panos (jos hävitty):';
        document.querySelector('label[for="betType"]').textContent = 'Panostyyppi:';
        document.querySelector('label[for="numberOfBets"]').textContent = 'Panostusten määrä:';
        document.querySelector('button[type="submit"]').textContent = 'Laske';
        document.querySelector('#results h2').textContent = 'Tulokset';
        document.querySelector('#notificationMessage').textContent = 'Olet ollut tällä sivulla 10 minuuttia! Muista lisätä sivu kirjanmerkkeihin.';
    } else {
        document.querySelector('label[for="lastNumber"]').textContent = 'Last Number:';
        document.querySelector('label[for="interval"]').textContent = 'Interval Between Spins (seconds):';
        document.querySelector('label[for="rotationTime"]').textContent = 'Time for One Rotation (seconds):';
        document.querySelector('label[for="previousBet"]').textContent = 'Previous Bet (if lost):';
        document.querySelector('label[for="betType"]').textContent = 'Bet Type:';
        document.querySelector('label[for="numberOfBets"]').textContent = 'Number of Bets Placed:';
        document.querySelector('button[type="submit"]').textContent = 'Calculate';
        document.querySelector('#results h2').textContent = 'Results';
        document.querySelector('#notificationMessage').textContent = 'You have been on this page for 10 minutes! Remember to bookmark this page.';
    }
}
