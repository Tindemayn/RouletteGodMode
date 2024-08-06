document.addEventListener("DOMContentLoaded", function () {
    // Show notification after 10 minutes
    setTimeout(showNotification, 600000); 

    // Save initial interval and rotation time values
    document.getElementById('interval').addEventListener('input', saveInitialValues);
    document.getElementById('rotationTime').addEventListener('input', saveInitialValues);
});

let initialInterval = '';
let initialRotationTime = '';

function saveInitialValues() {
    if (initialInterval === '' && initialRotationTime === '') {
        initialInterval = document.getElementById('interval').value;
        initialRotationTime = document.getElementById('rotationTime').value;
    } else {
        document.getElementById('interval').value = initialInterval;
        document.getElementById('rotationTime').value = initialRotationTime;
    }
}

function showNotification() {
    document.getElementById("notificationBar").style.display = "block";
}

function changeLanguage() {
    const lang = document.getElementById("language").value;
    if (lang === "fi") {
        document.querySelector("header h1").textContent = "Ruletti Ennustaja";
        document.querySelector("label[for='lastNumber']").textContent = "Viimeinen Numero:";
        document.querySelector("label[for='interval']").textContent = "Pyöräytysten välinen aika (sekunteina):";
        document.querySelector("label[for='rotationTime']").textContent = "Yhden kierroksen aika (sekunteina):";
        document.querySelector("label[for='previousBet']").textContent = "Edellinen Panos (jos hävitty):";
        document.querySelector("label[for='betType']").textContent = "Panostyyppi:";
        document.querySelector("button[type='submit']").textContent = "Laske";
        document.querySelector("#results h2").textContent = "Tulokset";
        document.getElementById("notificationMessage").textContent = "Olet ollut tällä sivulla 10 minuuttia! Muista lisätä tämä sivu kirjanmerkkeihin.";
    } else {
        document.querySelector("header h1").textContent = "Roulette Predictor";
        document.querySelector("label[for='lastNumber']").textContent = "Last Number:";
        document.querySelector("label[for='interval']").textContent = "Interval Between Spins (seconds):";
        document.querySelector("label[for='rotationTime']").textContent = "Time for One Rotation (seconds):";
        document.querySelector("label[for='previousBet']").textContent = "Previous Bet (if lost):";
        document.querySelector("label[for='betType']").textContent = "Bet Type:";
        document.querySelector("button[type='submit']").textContent = "Calculate";
        document.querySelector("#results h2").textContent = "Results";
        document.getElementById("notificationMessage").textContent = "You have been on this page for 10 minutes! Remember to bookmark this page.";
    }
}

function calculate(event) {
    event.preventDefault();

    // Read inputs and parse them
    const lastNumbers = document.getElementById("lastNumber").value.split(',').map(num => parseInt(num.trim()));
    const intervals = document.getElementById("interval").value.split(',').map(num => parseInt(num.trim()));
    const rotationTimes = document.getElementById("rotationTime").value.split(',').map(num => parseInt(num.trim()));
    const previousBet = parseFloat(document.getElementById("previousBet").value) || 0;
    const betType = document.getElementById("betType").value;

    // Validate inputs
    if (lastNumbers.some(isNaN) || intervals.some(isNaN) || rotationTimes.some(isNaN)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const rouletteOrder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    let results = '';

    lastNumbers.forEach((lastNumber, index) => {
        const currentIndex = rouletteOrder.indexOf(lastNumber);

        if (currentIndex === -1) {
            results += `Invalid last number: ${lastNumber}. Please enter a number between 0 and 36.<br>`;
            return;
        }

        const interval = intervals[index % intervals.length];
        const rotationTime = rotationTimes[index % rotationTimes.length];
        const predictedNumber = rouletteOrder[(currentIndex + Math.floor(rotationTime / interval)) % 37];
        const nextThreeNumbers = [
            rouletteOrder[(currentIndex + 2) % 37],
            rouletteOrder[(currentIndex + 3) % 37],
            rouletteOrder[(currentIndex + 4) % 37]
        ];
        const nextFiveNumbers = [
            ...nextThreeNumbers,
            rouletteOrder[(currentIndex + 5) % 37],
            rouletteOrder[(currentIndex + 6) % 37]
        ];

        const predictedDozen = Math.ceil(predictedNumber / 12);
        const predictedColor = (predictedNumber % 2 === 0 && predictedNumber !== 0) ? "Black" : "Red";

        // Calculate next bet amount (mock calculation)
        const nextBet = previousBet * 2 || 1;

        // Append results for this set of inputs
        results += `<strong>Set ${index + 1}</strong><br>`;
        results += `Predicted Number: ${predictedNumber}<br>`;
        results += `Next 3 Numbers: ${nextThreeNumbers.join(", ")}<br>`;
        results += `Next 5 Numbers: ${nextFiveNumbers.join(", ")}<br>`;
        results += `Dozen: ${predictedDozen}<br>`;
        results += `Color: ${predictedColor}<br>`;
        results += `Recommended Bet: $${nextBet.toFixed(2)}<br><br>`;
    });

    // Display results
    document.getElementById("singleResult").innerHTML = results;
}
