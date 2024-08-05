document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.getElementById('notificationBar').style.display = 'block';
    }, 10 * 60 * 1000);

    const form = document.getElementById('inputForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateResults();
    });

    document.getElementById('language').addEventListener('change', changeLanguage);
});

function calculateResults() {
    const lastNumber = parseInt(document.getElementById('lastNumber').value);
    const interval = parseInt(document.getElementById('interval').value);
    const rotationTime = parseInt(document.getElementById('rotationTime').value);
    const previousBet = parseFloat(document.getElementById('previousBet').value || 0);
    const betType = document.getElementById('betType').value;
    const numberOfBets = parseInt(document.getElementById('numberOfBets').value);

    // Laskutoimitukset
    const predictedNumber = (lastNumber + Math.floor(interval / rotationTime)) % 37;
    const threeNumbers = [(predictedNumber + 37) % 37, (predictedNumber + 1) % 37, (predictedNumber + 2) % 37];
    const fiveNumbers = [(predictedNumber + 37) % 37, (predictedNumber + 1) % 37, (predictedNumber + 2) % 37, (predictedNumber + 3) % 37, (predictedNumber + 4) % 37];
    const predictedDozen = Math.floor(predictedNumber / 12) + 1;
    const predictedColor = predictedNumber % 2 === 0 ? 'Red' : 'Black';
    const nextBet = previousBet * 2;

    // Päivitä tulokset
    document.getElementById('singleResult').textContent = `Predicted Number: ${predictedNumber}`;
    document.getElementById('threeNumbers').textContent = `Next 3 Numbers: ${threeNumbers.join(', ')}`;
    document.getElementById('fiveNumbers').textContent = `Next 5 Numbers: ${fiveNumbers.join(', ')}`;
    document.getElementById('dozen').textContent = `Predicted Dozen: ${predictedDozen}`;
    document.getElementById('color').textContent = `Predicted Color: ${predictedColor}`;
    document.getElementById('nextBet').textContent = `Next Bet Amount: ${nextBet}`;

    // Päivitä ruletin pallon sijainti
    updateRoulette(predictedNumber);
}

function updateRoulette(predictedNumber) {
    const ball = document.getElementById('ball');
    const angle = (predictedNumber / 37) * 360;
    ball.style.transform = `rotate(${angle}deg) translate(0, -140px) rotate(-${angle}deg)`;
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    const texts = {
        en: {
            pageTitle: 'Roulette Predictor',
            instructionsLink: 'Instructions',
            lastNumberLabel: 'Last Number:',
            intervalLabel: 'Interval Between Spins (seconds):',
            rotationTimeLabel: 'Time for One Rotation (seconds):',
            previousBetLabel: 'Previous Bet (if lost):',
            betTypeLabel: 'Bet Type:',
            numberOfBetsLabel: 'Number of Bets Placed:',
            submitButton: 'Calculate',
            resultsTitle: 'Results',
            notificationMessage: 'You have been on this page for 10 minutes! Remember to bookmark this page.'
        },
        fi: {
            pageTitle: 'Ruletin Ennustaja',
            instructionsLink: 'Ohjeet',
            lastNumberLabel: 'Viimeinen numero:',
            intervalLabel: 'Aikaväli pyöräytysten välillä (sekuntia):',
            rotationTimeLabel: 'Aika yhdelle kierrokselle (sekuntia):',
            previousBetLabel: 'Edellinen panos (jos hävitty):',
            betTypeLabel: 'Panos tyyppi:',
            numberOfBetsLabel: 'Panosten lukumäärä:',
            submitButton: 'Laske',
            resultsTitle: 'Tulokset',
            notificationMessage: 'Olet ollut tällä sivulla 10 minuuttia! Muista lisätä tämä sivu kirjanmerkkeihin.'
        }
    };

    document.title = texts[language].pageTitle;
    document.querySelector('a[href="instructions.html"]').textContent = texts[language].instructionsLink;
    document.querySelector('label[for="lastNumber"]').textContent = texts[language].lastNumberLabel;
    document.querySelector('label[for="interval"]').textContent = texts[language].intervalLabel;
    document.querySelector('label[for="rotationTime"]').textContent = texts[language].rotationTimeLabel;
    document.querySelector('label[for="previousBet"]').textContent = texts[language].previousBetLabel;
    document.querySelector('label[for="betType"]').textContent = texts[language].betTypeLabel;
    document.querySelector('label[for="numberOfBets"]').textContent = texts[language].numberOfBetsLabel;
    document.querySelector('button[type="submit"]').textContent = texts[language].submitButton;
    document.querySelector('#results h2').textContent = texts[language].resultsTitle;
    document.getElementById('notificationMessage').textContent = texts[language].notificationMessage;
}
