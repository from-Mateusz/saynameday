"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const NameDay_1 = __importDefault(require("../domain/NameDay"));
const EmptyNameDay_1 = __importDefault(require("../domain/EmptyNameDay"));
const NameDayDate_1 = __importDefault(require("../domain/NameDayDate"));
const logger_1 = __importDefault(require("../app/logger"));
const Repository_1 = __importDefault(require("../repository/Repository"));
const NameMeaningFinder_1 = require("../service/NameMeaningFinder");
const logger = new logger_1.default("NameDayApi");
const repository = Repository_1.default.getInstance();
class NameDayApi {
    static getInstance() {
        return NameDayApi.instance;
    }
    fetchNameDays(fn) {
        https_1.default.get("https://api.abalin.net/today?country", res => {
            NameDayApi.LOGGER.info("Looking for name meanings");
            let rawResponse = "";
            res.on('data', data => {
                rawResponse += data;
            });
            res.on("end", () => {
                const { data: { namedays, dates: { day, month } } } = JSON.parse(rawResponse);
                repository.findAllCountries(countries => {
                    const nameDays = [];
                    countries.forEach(country => {
                        const namesFromApi = namedays[country.getCode()];
                        const names = !namesFromApi ? [] : namesFromApi.split(",");
                        NameDayApi.LOGGER.info("Looking for name meanings");
                        if ("pl" === country.getCode()) {
                            const nameMeaningFinder = NameMeaningFinder_1.NameMeaningFinderFactory.polish();
                            for (let name of names) {
                                nameDays.push(new NameDay_1.default(country, new NameDayDate_1.default(day, month), name));
                                nameMeaningFinder.findMeaningByName(name, (meaning) => {
                                });
                            }
                        }
                        else {
                            for (let name of names) {
                                nameDays.push(new NameDay_1.default(country, new NameDayDate_1.default(day, month), name));
                            }
                        }
                    });
                    fn(nameDays);
                });
            });
            res.on('error', err => {
                logger.error("something bad has happen: ", err);
            });
        });
    }
    fetchNameDaysByCountryCode(code, fn) {
        https_1.default.get(`https://api.abalin.net/today?country=${code}`, res => {
            let rawResponse = "";
            res.on('data', data => {
                rawResponse += data;
            });
            res.on("end", () => {
                const { data: { namedays, dates: { day, month } } } = JSON.parse(rawResponse);
                repository.findCountryByCode(code, country => {
                    const nameDays = [];
                    const namesFromApi = namedays[code];
                    const names = !namesFromApi ? [] : namesFromApi.split(",").map(name => name.trim());
                    if (names.length === 0) {
                        fn([new EmptyNameDay_1.default(country, new NameDayDate_1.default(day, month))]);
                    }
                    else {
                        NameDayApi.LOGGER.info("Looking for name meanings");
                        if ("pl" === country.getCode()) {
                            const nameMeaningFinder = NameMeaningFinder_1.NameMeaningFinderFactory.polish();
                            // for(let name of names) {
                            //     NameDayApi.LOGGER.info("Looking for name meaning for: ", name);
                            //     // nameMeaningFinder.findMeaningByName(name, (meaning) => {
                            //     //     const nameMeaning = StringUtils.isNotEmpty(meaning) ? new NameMeaning(name, meaning) : new EmptyNameMeaning();
                            //     //     NameDayApi.LOGGER.info("Name meaning: ", nameMeaning);
                            //     //     nameDays.push(new NameDay(country, new NameDayDate(day, month), name, nameMeaning));
                            //     // });
                            // }
                            nameMeaningFinder.findAllNameMeanings(names, (meanings) => {
                                NameDayApi.LOGGER.info("Found name meanings: ", names);
                                for (let meaning of meanings) {
                                    nameDays.push(new NameDay_1.default(country, new NameDayDate_1.default(day, month), meaning.getName(), meaning));
                                }
                                fn(nameDays);
                            });
                        }
                        // repository.findNamesMeaning(names, meanings => {
                        //     for(let name of names) {
                        //                 let nameMeaning = new EmptyNameMeaning();
                        //                 for(let meaning of meanings) {
                        //                     if(name === meaning.getName()) {
                        //                         nameMeaning = meaning;
                        //                     }
                        //                 }
                        //                 nameDays.push(new NameDay(country, new NameDayDate(day, month), name, nameMeaning));
                        //     }
                        //     fn(nameDays);
                        // });
                    }
                });
            });
            res.on('error', err => {
                logger.error("something bad has happen: ", err);
            });
        });
    }
    haveNames(namedays) {
        logger.info('Namedays: ', namedays[Object.keys(namedays)[0]]);
        return "n\/a" !== namedays[Object.keys(namedays)[0]];
    }
}
exports.default = NameDayApi;
NameDayApi.instance = new NameDayApi();
NameDayApi.LOGGER = logger_1.default.getInstance("NameDayApi");
