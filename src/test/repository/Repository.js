"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Country_1 = __importDefault(require("../domain/Country"));
const EmptyCountry_1 = __importDefault(require("../domain/EmptyCountry"));
const NameMeaning_1 = __importDefault(require("../domain/NameMeaning"));
const EmptyNameMeaning_1 = __importDefault(require("../domain/EmptyNameMeaning"));
const logger_1 = __importDefault(require("../app/logger"));
const dbPath = path_1.default.join("X:\\Projects\\NodeJS\\saynameday\\db.json");
const charset = 'utf8';
const logger = new logger_1.default("Repository");
class Repository {
    constructor() {
        this.countries = [];
        this.meanings = [];
    }
    static getInstance() {
        return Repository.instance;
    }
    findAllCountries(fn) {
        const results = this.countries.length == 0 ? [] : this.countries;
        if (results.length == 0) {
            fs_1.default.readFile(dbPath, charset, (err, data) => {
                if (err) {
                    return logger.error("something went wrong ", err);
                }
                const { countries } = JSON.parse(data);
                for (let country of countries) {
                    results.push(new Country_1.default(country.name, country.code));
                }
                fn(results);
            });
        }
        else {
            fn(results);
        }
        return;
    }
    findCountryByCode(code, fn) {
        let result = new EmptyCountry_1.default();
        if (0 == this.countries.length) {
            fs_1.default.readFile(dbPath, charset, (err, data) => {
                if (err) {
                    return logger.error("something went wrong ", err);
                }
                const { countries } = JSON.parse(data);
                for (let country of countries) {
                    if (code === country.code) {
                        result = new Country_1.default(country.name, country.code);
                    }
                }
                fn(result);
            });
        }
        else {
            for (let country of this.countries) {
                if (code === country.getCode()) {
                    result = new Country_1.default(country.getName(), country.getCode());
                }
            }
            fn(result);
        }
    }
    findNameMeaningByName(name, fn) {
        let result = new EmptyNameMeaning_1.default();
        let thatNameMeanings = this.meanings;
        if (0 == this.meanings.length || undefined === this.meanings.find(meaning => name === meaning.getName())) {
            fs_1.default.readFile(dbPath, charset, (err, data) => {
                if (err) {
                    return logger.error("something wen wrong", err);
                }
                const { meanings } = JSON.parse(data);
                for (let meaning of meanings) {
                    let nameMeaning = new NameMeaning_1.default(meaning.name, meaning.meaning);
                    thatNameMeanings.push(nameMeaning);
                    if (name === meaning.name) {
                        result = nameMeaning;
                    }
                }
                fn(result);
            });
        }
        else {
            for (let meaning of this.meanings) {
                if (name === meaning.getName()) {
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
    findNamesMeaning(names, fn) {
        let result = [];
        let shouldReadDB = true;
        if (this.meanings.length > 0) {
            let existingNamesStr = JSON.stringify(this.meanings.map(meaning => meaning.getName()));
            let shouldReadDB = names.every(name => existingNamesStr.includes(name));
        }
        if (shouldReadDB) {
            fs_1.default.readFile(dbPath, charset, (err, data) => {
                if (err) {
                    return logger.error("something wen wrong", err);
                }
                const { meanings } = JSON.parse(data);
                for (let meaning of meanings) {
                    let nameMeaning = new NameMeaning_1.default(meaning.name, meaning.meaning);
                    for (let name of names) {
                        if (name === nameMeaning.getName()) {
                            result.push(nameMeaning);
                        }
                    }
                }
                fn(result);
            });
        }
        else {
            for (let meaning of this.meanings) {
                for (let name of names) {
                    if (name === meaning.getName()) {
                        result.push(meaning);
                    }
                }
            }
            fn(result);
        }
    }
}
exports.default = Repository;
Repository.instance = new Repository();
