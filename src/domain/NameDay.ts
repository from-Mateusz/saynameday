import Country from "./Country";
import EmptyNameMeaning from "./EmptyNameMeaning";
import NameDayDate from "./NameDayDate";
import NameMeaning from "./NameMeaning";

export default class NameDay {
    constructor(private country: Country, private date: NameDayDate, private name: string, private meaning: NameMeaning = new EmptyNameMeaning()) {}

    getCountryName() {
        return this.country.getName();
    }

    getCountryCode() {
        return this.country.getCode();
    }

    getName() {
        return this.name;
    }

    getMeaning() {
        return this.meaning;
    }
}