function convert() {
    const value1 = parseFloat(document.getElementById("value1").value) || 0;
    const value2 = parseFloat(document.getElementById("value2").value) || 0;
    const unit1 = document.getElementById("unit1").value;
    const unit2 = document.getElementById("unit2").value;
    const value1Input = document.getElementById("value1");
    const value2Input = document.getElementById("value2");

    // Conversion factors (relative to 1 kg)
    const conversions = {
        pounds: 2.20462,      // 1 kg = 2.20462 lb
        kilograms: 1,         // 1 kg = 1 kg
        grams: 1000,          // 1 kg = 1000 g
        ounces: 35.274,       // 1 kg = 35.274 oz
        stones: 0.157473,     // 1 kg = 0.157473 st
        us_tons: 0.00110231,  // 1 kg = 0.00110231 US tons
        uk_tons: 0.000984207, // 1 kg = 0.000984207 UK tons
        metric_tons: 0.001    // 1 kg = 0.001 metric tons
    };

    if (isNaN(value1) && isNaN(value2)) {
        value1Input.value = "";
        value2Input.value = "";
    } else if (!isNaN(value1)) {
        // Convert from value1 to value2
        const kgValue = value1 / conversions[unit1];
        value2Input.value = (kgValue * conversions[unit2]).toFixed(2);
    } else if (!isNaN(value2)) {
        // Convert from value2 to value1
        const kgValue = value2 / conversions[unit2];
        value1Input.value = (kgValue * conversions[unit1]).toFixed(2);
    }
}

function switchUnits() {
    const unit1 = document.getElementById("unit1");
    const unit2 = document.getElementById("unit2");
    const temp = unit1.value;
    unit1.value = unit2.value;
    unit2.value = temp;
    convert(); // Update values after switching
}