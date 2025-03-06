// Load saved units from localStorage on page load
window.onload = function () {
    const unit1 = localStorage.getItem("unit1") || "pounds";
    const unit2 = localStorage.getItem("unit2") || "kilograms";
    document.getElementById("unit1").value = unit1;
    document.getElementById("unit2").value = unit2;
};

// Determine precision based on unit type
function getPrecision(unit) {
    return unit === "grams" || unit === "ounces" ? 0 : 2;
}

function convert() {
    const value1Input = document.getElementById("value1");
    const value2Input = document.getElementById("value2");
    const value1 = parseFloat(value1Input.value) || 0; // Default to 0 if NaN
    const value2 = parseFloat(value2Input.value) || 0;
    const unit1 = document.getElementById("unit1").value;
    const unit2 = document.getElementById("unit2").value;

    // Conversion factors (relative to 1 kg)
    const conversions = {
        pounds: 2.20462,
        kilograms: 1,
        grams: 1000,
        ounces: 35.274,
        stones: 0.157473,
        us_tons: 0.00110231,
        uk_tons: 0.000984207,
        metric_tons: 0.001
    };

    // If value1 is being edited or value2 is empty, convert from value1 to value2
    if (value1Input === document.activeElement || value2Input.value === "") {
        if (value1Input.value === "" || isNaN(value1)) {
            value2Input.value = ""; // Reset value2 if value1 is cleared
        } else {
            const kgValue = value1 / conversions[unit1];
            value2Input.value = (kgValue * conversions[unit2]).toFixed(getPrecision(unit2));
        }
    }
    // If value2 is being edited or value1 is empty, convert from value2 to value1
    else if (value2Input === document.activeElement || value1Input.value === "") {
        if (value2Input.value === "" || isNaN(value2)) {
            value1Input.value = ""; // Reset value1 if value2 is cleared
        } else {
            const kgValue = value2 / conversions[unit2];
            value1Input.value = (kgValue * conversions[unit1]).toFixed(getPrecision(unit1));
        }
    }
}

function switchUnits() {
    const unit1Select = document.getElementById("unit1");
    const unit2Select = document.getElementById("unit2");
    const temp = unit1Select.value;
    unit1Select.value = unit2Select.value;
    unit2Select.value = temp;

    // Save to localStorage
    localStorage.setItem("unit1", unit1Select.value);
    localStorage.setItem("unit2", unit2Select.value);

    convert(); // Update values after switching
}

function copyResult() {
    const value2 = document.getElementById("value2").value;
    if (value2 !== "") {
        navigator.clipboard.writeText(value2).then(() => {
            const copyButton = document.getElementById("copyButton");
            copyButton.classList.add("copied");
            copyButton.textContent = "Copied!";
            setTimeout(() => {
                copyButton.classList.remove("copied");
                copyButton.textContent = "Copy Result";
            }, 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error("Failed to copy: ", err);
            alert("Failed to copy to clipboard!");
        });
    }
}