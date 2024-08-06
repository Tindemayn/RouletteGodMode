document.addEventListener("DOMContentLoaded", function () {
    setTimeout(showNotification, 600000); // Show notification after 10 minutes
});

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
    
    const lastNumber = parseInt(document.getElementById("lastNumber").value);
    const interval = parseInt(document.getElementById("interval").value);
    const rotationTime = parseInt(document.getElementById("rotationTime").value);
    const previousBet = parseFloat(document.getElementById("previousBet").value) || 0;
    const betType = document.getElementById("betType").value;

    const rouletteOrder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

    // Find the current position of the last number
    let currentIndex = rouletteOrder.indexOf(lastNumber);

    // Calculate the next predicted positions based on the order
    const predictedNumber = rouletteOrder[(currentIndex + 1) % 37];
    const nextThreeNumbers = [
        rouletteOrder[(currentIndex + 2) % 37], 
        rouletteOrder[(currentIndex + 3) % 37], 
        rouletteOrder[(currentIndex + 4) % 37]
    ];
    const nextFiveNumbers = [
        rouletteOrder[(currentIndex + 2) % 37], 
        rouletteOrder[(currentIndex + 3) % 37], 
        rouletteOrder[(currentIndex + 4) % 37], 
        rouletteOrder[(currentIndex + 5) % 37], 
        rouletteOrder[(currentIndex + 6) % 37]
    ];

    const predictedDozen = Math.ceil(predictedNumber / 12);
    const predictedColor = predictedNumber % 2 === 0 ? "Black" : "Red";

    // Calculate next bet amount (mock calculation)
    const nextBet = previousBet * 2 || 1;

    // Update results on the page
    document.getElementById("singleResult").textContent = `Predicted Number: ${predictedNumber}`;
    document.getElementById("threeNumbers").textContent = `Next 3 Numbers: ${nextThreeNumbers.join(", ")}`;
    document.getElementById("fiveNumbers").textContent = `Next 5 Numbers: ${nextFiveNumbers.join(", ")}`;
    document.getElementById("dozen").textContent = `Predicted Dozen: ${predictedDozen}`;
    document.getElementById("color").textContent = `Predicted Color: ${predictedColor}`;
    document.getElementById("nextBet").textContent = `Next Bet Amount: ${nextBet}`;
}
