"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const jquery_1 = __importDefault(require("jquery"));
const logger_1 = __importDefault(require("./logger"));
const geocodingapi_1 = __importDefault(require("./geocodingapi"));
class Client {
    constructor() {
        this.geoCodingApi = new geocodingapi_1.default();
    }
    getNamedaysByCountryCode(code, cb, loaderOptions) {
        if (loaderOptions && loaderOptions.on()) { }
        jquery_1.default.ajax({
            url: `namedays/${code.toLowerCase()}`,
            method: "get"
        })
            .done((namedays) => {
            cb(namedays);
            if (loaderOptions && loaderOptions.off()) { }
        })
            .fail(() => {
            console.log('Something went wrong ');
        });
    }
    getNameDaysByCurrentLocation(cb, loaderOptions) {
        const navigator = window.navigator;
        const geoLocation = navigator.geolocation;
        geoLocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            this.geoCodingApi.doReverseGeoCoding({
                latitude: latitude,
                longtitude: longitude
            }, countryCode => {
                this.getNamedaysByCountryCode(countryCode.toLowerCase(), cb, loaderOptions);
                return;
            });
        });
    }
}
exports.Client = Client;
Client.LOGGER = logger_1.default.getInstance("ClientApi");
