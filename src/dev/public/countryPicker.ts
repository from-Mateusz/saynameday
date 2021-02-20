import * as Api from "./api"
import Logger from "./logger";
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
        apiClient.getNamedaysByCountryCode(code, namedays => {
            const presentationNameDays = Array.from(namedays);
            const namedayCardCreator = new NameDayCard.NameDayCardCreator();
            const nameDayCards = namedayCardCreator.createCards(presentationNameDays);
            CountryPicker.LOGGER.info("Entering new cards: ", namedays);
            CardsResultManager.clearNameDayCardsResults();
            CardsResultManager.makeSpaceAndEnterNextCards(nameDayCards.getCards());
            CardsResultManager.establishNavigtion(nameDayCards);
        }, loaderOptions); 
    }
}