import Country from "./Country";
import EmptyNameMeaning from "./EmptyNameMeaning";
import NameDayDate from "./NameDayDate";
import NameMeaning from "./NameMeaning";
import Nullable from "./Nullable";

export default class NameDay implements Nullable {
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

    isNull() {
        return false;
    }
}