import { raw } from "body-parser";
import https from "https";
import EmptyNameMeaning from "../domain/EmptyNameMeaning";
import NameDay from "../domain/NameDay";
import EmptyNameDay from "../domain/EmptyNameDay";
import NameDayDate from "../domain/NameDayDate";
import Logger from "../app/logger"; 
import Repository from "../repository/Repository";
import {NameMeaningFinderFactory} from "../service/NameMeaningFinder";
import StringUtils from "../utils/StringUtils";
import NameMeaning from "../domain/NameMeaning";

const logger = new Logger("NameDayApi");
const repository = Repository.getInstance();

export default class NameDayApi {

    private static readonly instance = new NameDayApi();

    private static readonly LOGGER = Logger.getInstance("NameDayApi");

    public static getInstance() {
        return NameDayApi.instance;
    }

    fetchNameDays(fn: (data: NameDay[]) => void) {
        https.get("https://api.abalin.net/today?country", res => {
            NameDayApi.LOGGER.info("Looking for name meanings");
            
            let rawResponse = "";

            res.on('data', data => {
                rawResponse += data;
            });

            res.on("end", () => {
                const {data: {namedays, dates: {day, month}}} = JSON.parse(rawResponse);
                repository.findAllCountries(countries => {
                    const nameDays:NameDay[] = [];
                    countries.forEach(country => {
                        const namesFromApi = namedays[country.getCode()];
                        const names:string[] = !namesFromApi ? [] : namesFromApi.split(",")
                        NameDayApi.LOGGER.info("Looking for name meanings");
                        if("pl" === country.getCode()) {
                            const nameMeaningFinder = NameMeaningFinderFactory.polish();
                            for(let name of names) {
                                nameDays.push(new NameDay(country, new NameDayDate(day, month), name));
                                nameMeaningFinder.findMeaningByName(name, (meaning) => {
                                    
                                });
                            }
                        }
                        else {
                            for(let name of names) {
                                nameDays.push(new NameDay(country, new NameDayDate(day, month), name));
                            }
                        }
                    });
                    fn(nameDays);
                })
            });

            res.on('error', err => {
                logger.error("something bad has happen: ", err);
            })
            
        })
    }

    fetchNameDaysByCountryCode(code: string, fn: (data: NameDay[]) => void) {
        https.get(`https://api.abalin.net/today?country=${code}`, res => {
            
            let rawResponse = "";

            res.on('data', data => {
                rawResponse += data;
            });

            res.on("end", () => {
                const {data: {namedays, dates: {day, month}}} = JSON.parse(rawResponse);
                repository.findCountryByCode(code, country => {
                    const nameDays:NameDay[] = [];
                    const namesFromApi:string = namedays[code];
                    const names:string[] = !namesFromApi ? [] : namesFromApi.split(",").map(name => name.trim());
                    if(names.length === 0) {
                        fn([new EmptyNameDay(country, new NameDayDate(day, month))]);
                    }
                    else {
                        NameDayApi.LOGGER.info("Looking for name meanings");
                        if("pl" === country.getCode()) {
                            const nameMeaningFinder = NameMeaningFinderFactory.polish();
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
                                for(let meaning of meanings) {
                                    nameDays.push(new NameDay(country, new NameDayDate(day, month), meaning.getName(), meaning));
                                }
                                fn(nameDays);
                            })
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
            })
        })
    }

    haveNames(namedays:any) {
        logger.info('Namedays: ', namedays[Object.keys(namedays)[0]]);
        return "n\/a" !== namedays[Object.keys(namedays)[0]];
    }
}