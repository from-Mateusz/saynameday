import https from "https";
import stru from "../utils/StringUtils";
import Logger from "../app/logger";
import NameMeaning from "../domain/NameMeaning";
import cheerio from "cheerio";
import DiacriticalMarksUtilFactory from "../utils/DiacriticalMarksUtil";
import StringUtils from "../utils/StringUtils";

interface NameMeaningFinder {
    findMeaningByName(name: string, then: (meaning: string) => void): void
    findAllNameMeanings(names: string[], then: (meanings: NameMeaning[]) => void): void;
}

class PolishNameMeaningFinder implements NameMeaningFinder {

    private static readonly LOGGER = Logger.getInstance("PolishNameMeaningFinder");

    private readonly NAME_MEANING_SERVICE_URL = "https://www.ksiegaimion.com/";
    
    private readonly NAME_MEANING_SECTION_TITLE = "Znaczenie imienia ";

    findMeaningByName(name: string, then: (meaning: string) => void): void {
        https.get(`${this.NAME_MEANING_SERVICE_URL}${DiacriticalMarksUtilFactory.polish().simplify(name)}`, res=> {
            let rawResponse = "";
            
            res.on("data", (chunk) => {
                rawResponse += chunk;
            });

            res.on("end", () => {
                this.parseNameMeaning(rawResponse);
            })
        })
    };

    findAllNameMeanings(names: string[], then: (meanings: NameMeaning[]) => void): void {
        const requestsQueue: Promise<any>[] = [];
        const meanings: NameMeaning[] = [];
        this.findNameMeanings(names, meanings, then);
    }

    private findNameMeanings(names: string[] = [], meanings: NameMeaning[] = [], then: (meanings: NameMeaning[]) => void): void {
        const that = this;
        if(names.length !== 0) {
            const name = names.pop();
            if(undefined !== name) {
                https.get(`${this.NAME_MEANING_SERVICE_URL}${DiacriticalMarksUtilFactory.polish().simplify(name)}`, res=> {
                    let rawResponse = "";
                    
                    res.on("data", (chunk) => {
                        rawResponse += chunk;
                    });
        
                    res.on("end", () => {
                        meanings.push(new NameMeaning(name, this.parseNameMeaning(rawResponse)));
                        if(names.length === 0) {
                            then(meanings);
                        }
                        else {
                            that.findNameMeanings(names, meanings, then);
                        }
                    })
                });
            }
        }
    }

    private parseNameMeaning(serviceResponse: string): string {
        const parser = cheerio.load(serviceResponse);
        const concreteNameMeaningArticleTitle = `${this.NAME_MEANING_SECTION_TITLE}`;
        const nameMeaningArticle = parser("article.single");
        if(nameMeaningArticle) {
            PolishNameMeaningFinder.LOGGER.info("Found name meaning article");
            PolishNameMeaningFinder.LOGGER.info("Next element within name meaning article: ", nameMeaningArticle.find("h1").first().text());
            const nameMeaningArticleTitle = nameMeaningArticle.find("h1").first().text();
            PolishNameMeaningFinder.LOGGER.info("Concrete name meaning: ", concreteNameMeaningArticleTitle);
            if(nameMeaningArticleTitle) {
                const nameMeaning = nameMeaningArticle.find("p").first();
                PolishNameMeaningFinder.LOGGER.info("Found name meaning article", nameMeaning.text());
                return nameMeaning.text();
            }
        }
        return "";
    }
}

export class NameMeaningFinderFactory {
    static polish(): NameMeaningFinder {
        return new PolishNameMeaningFinder();
    }
}