"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Api = __importStar(require("./api"));
const logger_1 = __importDefault(require("./logger"));
const NameDayCard = __importStar(require("./namedayCardCreator"));
const CardsResultManager = __importStar(require("./nameDayCardResultsManager"));
HTMLElement.prototype.isDisplayed = function () {
    if (!this.classList.contains("snd-pos--removed")) {
        return true;
    }
    return false;
};
HTMLElement.prototype.setDisplayed = function (on) {
    if (on) {
        if (!this.isDisplayed()) {
            this.classList.remove("snd-pos--removed");
        }
    }
    else {
        if (this.isDisplayed()) {
            this.classList.add("snd-pos--removed");
        }
    }
};
const apiClient = new Api.Client();
const logger = logger_1.default.getInstance("CountryPicker");
const loaderOptions = {
    on: () => {
        const loader = document.querySelector(".snd-loading-container");
        if (loader && !loader.isDisplayed()) {
            loader.setDisplayed(true);
        }
    },
    off: () => {
        const loader = document.querySelector(".snd-loading-container");
        if (loader && loader.isDisplayed()) {
            loader.classList.add("snd-pos--removed");
        }
    }
};
class CountryPicker {
    enableCountryPicks() {
        const countryPickEntry = document.getElementById("country-select");
        const countriesList = document.getElementById("available-countries-list");
        if (!countryPickEntry) {
            throw new Error("Could not locate countries entry");
        }
        if (!countriesList) {
            throw new Error("Could not localte available countries' list");
        }
        countryPickEntry.addEventListener('click', event => {
            if (!countriesList.isDisplayed()) {
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
        const countryPickEvent = new CustomEvent('countryPick', { detail: "" });
        if (!countriesList) {
            throw new Error("Could not locate countries' list");
        }
        const countriesOnList = Array.from(countriesList.querySelectorAll(".option.available-country"));
        if (!countriesOnList) {
            throw new Error("No available countries on list");
        }
        CountryPicker.LOGGER.info('Available countries on list: ', countriesOnList);
        const that = this;
        for (let country of countriesOnList) {
            country.addEventListener("click", event => {
                const code = country.dataset.countryCode;
                if (code) {
                    CountryPicker.LOGGER.info("Picking name-days by country code");
                    countriesList.setDisplayed(false);
                    this.pickNameDaysByCode(code);
                }
                event.preventDefault();
            });
        }
    }
    pickNameDaysByCode(code) {
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
exports.default = CountryPicker;
CountryPicker.LOGGER = logger_1.default.getInstance("CountryPicker");
