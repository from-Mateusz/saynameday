import NameDay from "./NameDay";
import Country from "./Country";
import NameDayDate from "./NameDayDate";
import EmptyNameMeaning from "./EmptyNameMeaning"

export default class EmptyNameDay extends NameDay {
    
    constructor(country: Country, date: NameDayDate) {
        super(country, date, "unknown", new EmptyNameMeaning());
    }

    isNull() {
        return true;
    }
}