import fs from "fs";
import path from "path";
import Country from "../domain/Country";
import EmptyCountry from "../domain/EmptyCountry";
import NameMeaning from "../domain/NameMeaning";
import EmptyNameMeaning from "../domain/EmptyNameMeaning";
import Logger from "../logger";

const dbPath = path.join("X:\\Projects\\NodeJS\\saynameday\\db.json");
const charset = 'utf8';

const logger = new Logger("Repository");

export default class Repository {

    private static readonly instance = new Repository();

    private countries: Country[] = [];

    private meanings: NameMeaning[] = [];

    static getInstance() {
        return Repository.instance;
    }

    findAllCountries(fn: (data:Country[]) => void) :void {
        const results :Country[] = this.countries.length == 0 ? [] : this.countries;
        if(results.length == 0) {
            fs.readFile(dbPath, charset, (err, data) => {
                if(err) {
                    return logger.error("something went wrong ", err);
                }
                const {countries} = JSON.parse(data);
                for(let country of countries) {
                    results.push(new Country(country.name, country.code));
                }
                fn(results);
            })
        }
        else {
            fn(results);
        }
        return;
    }

    findCountryByCode(code: string, fn: (data:Country) => void) :void {
        let result = new EmptyCountry();
        if(0 == this.countries.length) {
            fs.readFile(dbPath, charset, (err, data) => {
                if(err) {
                    return logger.error("something went wrong ", err);
                }
                const {countries} = JSON.parse(data);
                for(let country of countries) {
                    if(code === country.code) {
                        result = new Country(country.name, country.code);
                    }
                }
                fn(result);
            })
        }
        else {
            for(let country of this.countries) {
                if(code === country.getCode()) {
                    result = new Country(country.getName(), country.getCode());
                }
            }
            fn(result);
        }
    }

    findNameMeaningByName(name: string, fn: (name: NameMeaning) => void) {
        let result = new EmptyNameMeaning();
        let thatNameMeanings = this.meanings;
        if(0 == this.meanings.length || undefined === this.meanings.find(meaning => name === meaning.getName())) {
            fs.readFile(dbPath, charset, (err, data) => {
                if(err) {
                    return logger.error("something wen wrong", err);
                }
                const {meanings} = JSON.parse(data);
                for(let meaning of meanings) {
                    let nameMeaning = new NameMeaning(meaning.name, meaning.meaning);
                    thatNameMeanings.push(nameMeaning)
                    if(name === meaning.name) {
                        result = nameMeaning;
                    }
                }
                fn(result);
            })
        }
        else {
            for(let meaning of this.meanings) {
                if(name === meaning.getName()) {
                    result = meaning;
                }
            }
            fn(result);
        }
    }

    /**
     * Method includes check if there are cached meanings for names passed as @param names.
     * If so, it should not read databse file. This is optimization and thanks to it,
     * application is bit more responsive and faster.
     * @param names 
     * @param fn 
     */
    findNamesMeaning(names: string[], fn: (names: NameMeaning[]) => void) {
        let result: NameMeaning[] = [];
        let shouldReadDB = true;
        if(this.meanings.length > 0) {
            let existingNamesStr = JSON.stringify(this.meanings.map(meaning => meaning.getName()));
            let shouldReadDB = names.every(name => existingNamesStr.includes(name));
        }

        if(shouldReadDB) {
            fs.readFile(dbPath, charset, (err, data) => {
                if(err) {
                    return logger.error("something wen wrong", err);
                }
                const {meanings} = JSON.parse(data);
                for(let meaning of meanings) {
                    let nameMeaning = new NameMeaning(meaning.name, meaning.meaning);
                    for(let name of names) {
                        if(name === nameMeaning.getName()) {
                            result.push(nameMeaning);
                        }
                    }
                }
                fn(result);
            })
        }

        else {
            for(let meaning of this.meanings) {
                for(let name of names) {
                    if(name === meaning.getName()) {
                        result.push(meaning);
                    }
                }
            }
            fn(result);
        }
 
    }
}