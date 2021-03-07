"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameMeaningFinderFactory = void 0;
const https_1 = __importDefault(require("https"));
const logger_1 = __importDefault(require("../app/logger"));
const NameMeaning_1 = __importDefault(require("../domain/NameMeaning"));
const cheerio_1 = __importDefault(require("cheerio"));
const DiacriticalMarksUtil_1 = __importDefault(require("../utils/DiacriticalMarksUtil"));
class PolishNameMeaningFinder {
    constructor() {
        this.NAME_MEANING_SERVICE_URL = "https://www.ksiegaimion.com/";
        this.NAME_MEANING_SECTION_TITLE = "Znaczenie imienia ";
    }
    findMeaningByName(name, then) {
        https_1.default.get(`${this.NAME_MEANING_SERVICE_URL}${DiacriticalMarksUtil_1.default.polish().simplify(name)}`, res => {
            let rawResponse = "";
            res.on("data", (chunk) => {
                rawResponse += chunk;
            });
            res.on("end", () => {
                this.parseNameMeaning(rawResponse);
            });
        });
    }
    ;
    findAllNameMeanings(names, then) {
        const requestsQueue = [];
        const meanings = [];
        this.findNameMeanings(names, meanings, then);
    }
    findNameMeanings(names = [], meanings = [], then) {
        const that = this;
        if (names.length !== 0) {
            const name = names.pop();
            if (undefined !== name) {
                https_1.default.get(`${this.NAME_MEANING_SERVICE_URL}${DiacriticalMarksUtil_1.default.polish().simplify(name)}`, res => {
                    let rawResponse = "";
                    res.on("data", (chunk) => {
                        rawResponse += chunk;
                    });
                    res.on("end", () => {
                        meanings.push(new NameMeaning_1.default(name, this.parseNameMeaning(rawResponse)));
                        if (names.length === 0) {
                            then(meanings);
                        }
                        else {
                            that.findNameMeanings(names, meanings, then);
                        }
                    });
                });
            }
        }
    }
    parseNameMeaning(serviceResponse) {
        const parser = cheerio_1.default.load(serviceResponse);
        const concreteNameMeaningArticleTitle = `${this.NAME_MEANING_SECTION_TITLE}`;
        const nameMeaningArticle = parser("article.single");
        if (nameMeaningArticle) {
            PolishNameMeaningFinder.LOGGER.info("Found name meaning article");
            PolishNameMeaningFinder.LOGGER.info("Next element within name meaning article: ", nameMeaningArticle.find("h1").first().text());
            const nameMeaningArticleTitle = nameMeaningArticle.find("h1").first().text();
            PolishNameMeaningFinder.LOGGER.info("Concrete name meaning: ", concreteNameMeaningArticleTitle);
            if (nameMeaningArticleTitle) {
                const nameMeaning = nameMeaningArticle.find("p").first();
                PolishNameMeaningFinder.LOGGER.info("Found name meaning article", nameMeaning.text());
                return nameMeaning.text();
            }
        }
        return "";
    }
}
PolishNameMeaningFinder.LOGGER = logger_1.default.getInstance("PolishNameMeaningFinder");
class NameMeaningFinderFactory {
    static polish() {
        return new PolishNameMeaningFinder();
    }
}
exports.NameMeaningFinderFactory = NameMeaningFinderFactory;
