import $ from "jquery";
import NameDay from "./nameDay";
import Logger from "./logger";
import * as NameDayCard from "./namedayCardCreator";
import * as CardsResultManager from "./nameDayCardResultsManager";

export interface LoaderOptions {
    on: () => void;
    off: () => void;
}

export class Client {

    private static readonly LOGGER = Logger.getInstance("ClientApi");

    getNamedaysByCountryCode(code: string, cb: (nameDays: NameDay[]) => void, loaderOptions?: LoaderOptions) {
        if(loaderOptions && loaderOptions.on()) {}
        $.ajax({
            url: `namedays/${code}`,
            method: "get"
        })

        .done((namedays) => {
            cb(namedays);
            if(loaderOptions && loaderOptions.off()) {}
        })

        .fail(() => {
            console.log('Something went wrong ');
        })
    }
}