import $ from "jquery";
import NameDay from "./nameDay";
import Logger from "./logger";
import GeoCodingApi from "./geocodingapi";
import * as NameDayCard from "./namedayCardCreator";
import * as CardsResultManager from "./nameDayCardResultsManager";

export interface LoaderOptions {
    on: () => void;
    off: () => void;
}

export class Client {

    private static readonly LOGGER = Logger.getInstance("ClientApi");

    private geoCodingApi: GeoCodingApi;

    constructor() {
        this.geoCodingApi = new GeoCodingApi();
    }

    getNamedaysByCountryCode(code: string, cb: (nameDays: NameDay[]) => void, loaderOptions?: LoaderOptions) {
        if(loaderOptions && loaderOptions.on()) {}
        $.ajax({
            url: `namedays/${code.toLowerCase()}`,
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

    getNameDaysByCurrentLocation(cb: (nameDays: NameDay[]) => void, loaderOptions?: LoaderOptions) {
        const navigator = window.navigator;
        const geoLocation = navigator.geolocation;
        geoLocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            this.geoCodingApi.doReverseGeoCoding({
                latitude: latitude,
                longtitude: longitude
            }, countryCode => {
                this.getNamedaysByCountryCode(countryCode.toLowerCase(), cb, loaderOptions);
                return;
            })
        })
    }
}