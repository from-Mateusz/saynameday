const removedFromViewCssClass = "snd-pos--removed"; 

window.onload = () => {
    setupCountriesSelection();
};

function setupCountriesSelection() {
    const countrySelectInput = document.getElementById("country-select");
    if(!countrySelectInput) {
        throw new Error("Could not locate country select input. Check your view structure");
    }
    countrySelectInput.addEventListener("click", event => {
        showOrHideAvailableCountries(event);
    })
}

function showOrHideAvailableCountries(event) {
    if(!event) {
        throw new Error("Event has not been set");
    }
    
    const avialableCountryList = document.getElementById("available-countries");
    
    if(avialableCountryList.classList.contains(removedFromViewCssClass)) {
        avialableCountryList.classList.remove(removedFromViewCssClass);
    }
    else {
        avialableCountryList.classList.add(removedFromViewCssClass);
    }
    
    event.preventDefault();
}