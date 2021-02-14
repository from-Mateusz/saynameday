import Country from "./Country";
import NameDayDate from "./NameDayDate";

export default class NameDay {
    constructor(private country: Country, private date: NameDayDate, private name: string) {}

    getCountryName() {
        return this.country.getName();
    }

    getCountryCode() {
        return this.country.getCode();
    }

    getName() {
        return this.name;
    }
}