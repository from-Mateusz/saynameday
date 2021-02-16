import { raw } from "body-parser";
import https from "https";
import EmptyNameMeaning from "../domain/EmptyNameMeaning";
import NameDay from "../domain/NameDay";
import NameDayDate from "../domain/NameDayDate";
import Logger from "../logger"; 
import Repository from "../repository/Repository";

const logger = new Logger("NameDayApi");
const repository = Repository.getInstance();

export default class NameDayApi {

    private static readonly instance = new NameDayApi();

    public static getInstance() {
        return NameDayApi.instance;
    }

    fetchNameDays(fn: (data: NameDay[]) => void) {
        https.get("https://api.abalin.net/today?country", res => {
            
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
                        for(let name of names) {
                            nameDays.push(new NameDay(country, new NameDayDate(day, month), name));
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
                    repository.findNamesMeaning(names, meanings => {
                        for(let name of names) {
                            let nameMeaning = new EmptyNameMeaning();
                            for(let meaning of meanings) {
                                if(name === meaning.getName()) {
                                    nameMeaning = meaning;
                                }
                            }
                            nameDays.push(new NameDay(country, new NameDayDate(day, month), name, nameMeaning));
                        }
                        fn(nameDays);
                    });
                });
            });

            res.on('error', err => {
                logger.error("something bad has happen: ", err);
            })
        })
    }
}