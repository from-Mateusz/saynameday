import $ from "jquery";
import Logger from "./logger";

interface GeoCoordinates {
    latitude: number,
    longtitude: number
}

export default class GeoCodingApi {

    private static readonly key = "<your_api_key>";

    private static readonly LOGGER = Logger.getInstance("GeoCodingApi");

    doReverseGeoCoding(coordinates: GeoCoordinates, success: (countryCode: string) => void) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longtitude}&key=${GeoCodingApi.key}`,
            method: "get"
        })
        .done(data => {
            GeoCodingApi.LOGGER.info("Received geo data: ", data);
            const {results} = data;
            const decodedAddresses = Array.from(results).map(result => result as any)
                                                        .map(result => {
                                                            const {address_components} = result;
                                                            return address_components;
                                                        })
                                                        .map(addrComponents => {
                                                                let countryComponent = [];
                                                                for(let addrComponent of addrComponents) {
                                                                    const{types} = addrComponent;
                                                                    for(let type of types) {
                                                                        if(type === "country") {
                                                                            countryComponent = addrComponent;
                                                                        }
                                                                    }
                                                                }
                                                                return countryComponent;
                                                        });
            if(decodedAddresses.length > 0) {
                const {short_name: countryCode} = decodedAddresses[0]; 
                GeoCodingApi.LOGGER.info("Decoded country code: ", countryCode);
                success(countryCode);
            }                               
        })
    }
}