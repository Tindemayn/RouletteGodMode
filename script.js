function calculate(event) {
    event.preventDefault();

    const lastNumber = parseInt(document.getElementById('lastNumber').value);
    const interval = parseFloat(document.getElementById('interval').value);
    const rotationTime = parseFloat(document.getElementById('rotationTime').value);
    const previousBet = parseFloat(document.getElementById('previousBet').value) || 0;
    const betType = document.getElementById('betType').value;
    const numberOfBets = parseInt(document.getElementById('numberOfBets').value);

    const predictedNumber = (lastNumber + interval) % 37;
    const nextThreeNumbers = [
        (lastNumber + interval * 1) % 37,
        (lastNumber + interval * 2) % 37,
        (lastNumber + interval * 3) % 37
    ];
    const nextFiveNumbers = [
        (lastNumber + interval * 1) % 37,
        (lastNumber + interval * 2) % 37,
        (lastNumber + interval * 3) % 37,
        (lastNumber + interval * 4) % 37,
        (lastNumber + interval * 5) % 37
    ];
    const predictedDozen = Math.floor(predictedNumber / 12) + 1;
    const predictedColor = predictedNumber % 2 === 0 ? 'Red' : 'Black';
    const nextBet = previousBet + numberOfBets * 2;

    document.getElementById('singleResult').textContent = `Predicted Number: ${predictedNumber}`;
    document.getElementById('threeNumbers').textContent = `Next 3 Numbers: ${nextThreeNumbers.join(', ')}`;
    document.getElementById('fiveNumbers').textContent = `Next 5 Numbers: ${nextFiveNumbers.join(', ')}`;
    document.getElementById('dozen').textContent = `Predicted Dozen: ${predictedDozen}`;
    document.getElementById('color').textContent = `Predicted Color: ${predictedColor}`;
    document.getElementById('nextBet').textContent = `Next Bet Amount: ${nextBet}`;
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    if (language === 'fi') {
        document.querySelector('header h1').textContent = 'Ruletti Ennustaja';
        document.querySelector('header a').textContent = 'Ohjeet';
        document.querySelector('label[for="lastNumber"]').textContent = 'Viimeinen Numero:';
        document.querySelector('label[for="interval"]').textContent = 'Pyöräytysten Välinen Aika (sekuntia):';
        document.querySelector('label[for="rotationTime"]').textContent = 'Yhden Kierroksen Aika (sekuntia):';
        document.querySelector('label[for="previousBet"]').textContent = 'Edellinen Panos (jos hävitty):';
        document.querySelector('label[for="betType"]').textContent = 'Panos Tyyppi:';
        document.querySelector('label[for="numberOfBets"]').textContent = 'Asetettujen Panosten Määrä:';
        document.querySelector('button[type="submit"]').textContent = 'Laske';
        document.querySelector('#results h2').textContent = 'Tulokset';
        document.querySelector('#notificationMessage').textContent = 'Olet ollut tällä sivulla 10 minuuttia! Muista lisätä sivu kirjanmerkkeihin.';
    } else {
        document.querySelector('header h1').textContent = 'Roulette Predictor';
        document.querySelector('header a').textContent = 'Instructions';
        document.querySelector('label[for="lastNumber"]').textContent = 'Last Number:';
        document.querySelector('label[for="interval"]').textContent = 'Interval Between Spins (seconds):';
        document.querySelector('label[for="rotationTime"]').textContent = 'Time for One Rotation (seconds):';
        document.querySelector('label[for="previousBet"]').textContent = 'Previous Bet (if lost):';
        document.querySelector('label[for="betType"]').textContent
 = 'Bet Type:';
        document.querySelector('label[for="numberOfBets"]').textContent = 'Number of Bets Placed:';
        document.querySelector('button[type="submit"]').textContent = 'Calculate';
        document.querySelector('#results h2').textContent = 'Results';
        document.querySelector('#notificationMessage').textContent = 'You have been on this page for 10 minutes! Remember to bookmark this page.';
    }
}

setTimeout(function() {
    document.getElementById('notificationBar').style.display = 'block';
}, 600000); // 10 minutes in milliseconds
