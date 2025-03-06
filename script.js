function convert() {
    const value = parseFloat(document.getElementById("inputValue").value);
    const unit = document.getElementById("inputUnit").value;
    let resultText = "";

    if (isNaN(value)) {
        resultText = "Please enter a valid number!";
    } else if (unit === "pounds") {
        const kg = value * 0.453592;
        resultText = `${value} lb = ${kg.toFixed(2)} kg`;
    } else if (unit === "kilograms") {
        const lb = value * 2.20462;
        resultText = `${value} kg = ${lb.toFixed(2)} lb`;
    }

    document.getElementById("result").innerText = resultText;
}