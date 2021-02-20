"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const logger_1 = __importDefault(require("./logger"));
class GeoCodingApi {
    doReverseGeoCoding(coordinates, success) {
        jquery_1.default.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longtitude}&key=${GeoCodingApi.key}`,
            method: "get"
        })
            .done(data => {
            GeoCodingApi.LOGGER.info("Received geo data: ", data);
            const { results } = data;
            const decodedAddresses = Array.from(results).map(result => result)
                .map(result => {
                const { address_components } = result;
                return address_components;
            })
                .map(addrComponents => {
                let countryComponent = [];
                for (let addrComponent of addrComponents) {
                    const { types } = addrComponent;
                    for (let type of types) {
                        if (type === "country") {
                            countryComponent = addrComponent;
                        }
                    }
                }
                return countryComponent;
            });
            if (decodedAddresses.length > 0) {
                const { short_name: countryCode } = decodedAddresses[0];
                GeoCodingApi.LOGGER.info("Decoded country code: ", countryCode);
                success(countryCode);
            }
        });
    }
}
exports.default = GeoCodingApi;
GeoCodingApi.key = "AIzaSyAOxlc195r7KW3_AgTlUoSAzJD_ZVZPwrs";
GeoCodingApi.LOGGER = logger_1.default.getInstance("GeoCodingApi");
