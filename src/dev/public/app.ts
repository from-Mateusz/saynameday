import $ from "jquery";
import * as Api from "./api";
import Logger from "./logger";
import * as NameDayCard from "./namedayCardCreator";
import * as CardsResultManager from "./nameDayCardResultsManager"; 


const apiClient = new Api.Client();
const loaderOptions: Api.LoaderOptions = {
    on: () => {
        const loader = document.querySelector(".snd-loading-container");
        if(loader && loader.classList.contains("snd-pos--removed")) {
            loader.classList.remove("snd-pos--removed");
        }
    },
    off: () => {
        const loader = document.querySelector(".snd-loading-container");
        if(loader && !loader.classList.contains("snd-pos--removed")) {
            loader.classList.add("snd-pos--removed");
        }
    }
}
const logger = Logger.getInstance("SayNameDay");

window.onload = () => {
    
    apiClient.getNamedaysByCountryCode("pl", namedays => {
        const presentationNameDays = Array.from(namedays);
        const namedayCardCreator = new NameDayCard.NameDayCardCreator();
        const nameDayCards = namedayCardCreator.createCards(presentationNameDays);
        logger.info("Entering new cards!");
        logger.info("Api Cards:", nameDayCards.getCards());
        CardsResultManager.makeSpaceAndEnterNextCards(nameDayCards.getCards());
        CardsResultManager.establishNavigtion(nameDayCards);
    }, loaderOptions);
};
