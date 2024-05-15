// This variable contains all the dropdown select elements.
// There are two select elements in the html code.
// One is for "From" and the other is for "To".
// Each select element will contain all the countries country code,
// which will be implemented after few lines.
const dropdowns = document.querySelectorAll(".dropdown select");

// It contains the "From" dropdown.
const fromCurr = document.querySelector(".from select");
// It contains the "To" dropdown.
const toCurr = document.querySelector(".to select");

// It contains the main Get Exchange button element.
const btn = document.querySelector("form button");

// It contains the element where the output will be shown.
const output = document.querySelector(".msg");

// This for loop runs for all the select elements in the dropdowns.
for (const eachSelectElement of dropdowns) {
    // This for loop runs for all the countries in the countryList.
    for (const countryCode in countryList) {
        // Creates a new option element.
        const newOption = document.createElement("option");

        // Sets the countryCode as it's child.
        newOption.innerText = countryCode;

        // Sets the countryCode as it's value.
        newOption.value = countryCode;

        // This conditional just sets the default value of "From" to "USD" and "To" to "BDT".
        if (eachSelectElement.name === "from" && countryCode === "USD") {
            newOption.setAttribute("selected", true);
        } else if (eachSelectElement.name === "to" && countryCode === "BDT") {
            newOption.setAttribute("selected", true);
        }

        // Adds the newly created option element to the select element.
        eachSelectElement.appendChild(newOption);

        // On each option change the flag image updates.
        eachSelectElement.addEventListener("change", (e) => {
            updateFlag(e.target);
        });
    }
}

// This function takes an option element and checks it's selected country
// and then sets the selected countries flag image.
const updateFlag = (element) => {
    const countryCode = element.value;
    const countryCodeValue = countryList[countryCode];
    const flagImgSrc = `https://flagsapi.com/${countryCodeValue}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = flagImgSrc;
};

// This function updates the exchanged rate and shows the output.
const updateExchangeRate = async () => {
    const amountElement = document.querySelector(".amount input");
    const amount = amountElement.value ? amountElement.value : 1;

    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const allCurrencies = data[fromCurr.value.toLowerCase()];

    for (const currencies in allCurrencies) {
        if (currencies === toCurr.value.toLowerCase()) {
            const rate = allCurrencies[currencies];
            const convertedAmount = amount * rate;
            output.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        }
    }
};

// Whenever the button is clicked, run updateExchangeRate function.
btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

// Whenever the browser loads, run updateExchangeRate function.
window.addEventListener("load", () => {
    updateExchangeRate();
});
