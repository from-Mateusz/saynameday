import * as Api from "./api"
import Logger from "./logger";
import NameDay from "./nameDay";
import * as NameDayCard from "./namedayCardCreator";
import * as CardsResultManager from "./nameDayCardResultsManager";

HTMLElement.prototype.isDisplayed = function() {
    if(!this.classList.contains("snd-pos--removed")) {
        return true;
    }
    return false;
};

HTMLElement.prototype.setDisplayed = function(on) {
    if(on) {
        if(!this.isDisplayed()) {
            this.classList.remove("snd-pos--removed");
        }
    }
    else {
        if(this.isDisplayed()) {
            this.classList.add("snd-pos--removed");
        }
    }
}

const apiClient = new Api.Client();
const logger = Logger.getInstance("CountryPicker");

const loaderOptions: Api.LoaderOptions = {
    on: () => {
        const loader = document.querySelector(".snd-loading-container") as HTMLElement;
        if(loader && !loader.isDisplayed()) {
            loader.setDisplayed(true)
        }
    },
    off: () => {
        const loader = document.querySelector(".snd-loading-container") as HTMLElement;
        if(loader && loader.isDisplayed()) {
            loader.classList.add("snd-pos--removed");
        }
    }
}

export default class CountryPicker {

    private static readonly LOGGER = Logger.getInstance("CountryPicker");

    enableCountryPicks() {
        const countryPickEntry = document.getElementById("country-select");
        const countriesList = document.getElementById("available-countries-list");
        
        if(!countryPickEntry) {
            throw new Error("Could not locate countries entry");
        }

        if(!countriesList) {
            throw new Error("Could not localte available countries' list")
        }
        
        countryPickEntry.addEventListener('click', event => {
            if(!countriesList.isDisplayed()) {
                countriesList.setDisplayed(true);
            }
            else {
                countriesList.setDisplayed(false);
            }
            event.preventDefault();
        });

        this.listenOnCountryPicks();
    }

    enableCountryPicksByGeoLocation() {
        const geoLocationIcon = document.querySelector(".snd-input-location-icon");
        if(!geoLocationIcon) {
            throw new Error("Could not locate geo location icon/button. Inspect your view structure.");
        }

        const that = this;
        geoLocationIcon.addEventListener("click", event => {
            CountryPicker.LOGGER.info("Picking name-days based on geo location");
            that.pickNameDaysByGeoLocation();
        })
    }


    listenOnCountryPicks() {
        const countriesList = document.getElementById("available-countries-list");
        const countryPickEvent = new CustomEvent('countryPick', {detail: ""});
        
        if(!countriesList) {
            throw new Error("Could not locate countries' list");
        }

        const countriesOnList = Array.from(countriesList.querySelectorAll(".option.available-country")) as HTMLElement[];

        if(!countriesOnList) {
            throw new Error("No available countries on list");
        }

        CountryPicker.LOGGER.info('Available countries on list: ', countriesOnList);
        
        const that = this;
        for(let country of countriesOnList) {
            country.addEventListener("click", event => {
                const code = country.dataset.countryCode;
                if(code) {
                    CountryPicker.LOGGER.info("Picking name-days by country code");
                    countriesList.setDisplayed(false);
                    this.pickNameDaysByCode(code);
                }
                event.preventDefault();
            });
        }
    }

    pickNameDaysByCode(code: string) {
        const that = this;
        apiClient.getNamedaysByCountryCode(code, namedays => {
            that.handleNameDaysResponse(namedays);
        }, loaderOptions); 
    }

    pickNameDaysByGeoLocation() {
        const that = this;
        apiClient.getNameDaysByCurrentLocation(namedays => {
            that.handleNameDaysResponse(namedays);
        }, loaderOptions)
    }

    private handleNameDaysResponse(namedays: NameDay[]) {
        if(namedays.length > 0) {
            let {country: {name}} = namedays[0];
            let announcementCountry = document.getElementById("snd-announ-country-name");
            if(announcementCountry) {
                announcementCountry.innerHTML = name;
            }
        }

        if(!this.assertHasAnyNamedays(namedays)) {
            CountryPicker.LOGGER.info("No NameDays Available");
            return;
        }

        const presentationNameDays = namedays;
        const namedayCardCreator = new NameDayCard.NameDayCardCreator();
        const nameDayCards = namedayCardCreator.createCards(presentationNameDays);
        CountryPicker.LOGGER.info("Entering new cards: ", namedays);
        CardsResultManager.clearNameDayCardsResults();
        CardsResultManager.makeSpaceAndEnterNextCards(nameDayCards.getCards());
        CardsResultManager.establishNavigtion(nameDayCards);
    }

    private assertHasAnyNamedays(namedays: NameDay[]) {
        if(namedays.length === 0) {
            return false;
        }
        if(namedays.length === 1) {
            if(namedays[0].name === "unknown") {
                return false;
            }
            return true;
        }
        return true;
    }
}