, 29, 7, 28, 12, 35, 3, 26];
    const currentIndex = rouletteOrder.indexOf(lastNumber);

    if (currentIndex === -1) {
        alert("Invalid last number. Please enter a number between 0 and 36.");
        return;
    }

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

    // Update results on the page
    document.getElementById("singleResult").textContent = `Predicted Number: ${predictedNumber}`;
    document.getElementById("threeNumbers").textContent = `Next 3 Numbers: ${nextThreeNumbers.join(", ")}`;
    document.getElementById("fiveNumbers").textContent = `Next 5 Numbers: ${nextFiveNumbers.join(", ")}`;
    document.g, 29, 7, 28, 12, 35, 3, 26];
    const currentIndex = rouletteOrder.indexOf(lastNumber);

    if (currentIndex === -1) {
        alert("Invalid last number. Please enter a number between 0 and 36.");
        return;
    }

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

    // Update results on the page
    document.getElementById("singleResult").textContent = `Predicted Number: ${predictedNumber}`;
    document.getElementById("threeNumbers").textContent = `Next 3 Numbers: ${nextThreeNumbers.join(", ")}`;
    document.getElementById("fiveNumbers").textContent = `Next 5 Numbers: ${nextFiveNumbers.join(", ")}`;
    document.getElementById("dozen").textContent = `Predicted Dozen: ${predictedDozen}`;
    document.getElementById("color").textContent = `Predicted Color: ${predictedColor}`;
    document.getElementById("nextBet").textContent = `Next Bet Amount: ${nextBet}`;
}

