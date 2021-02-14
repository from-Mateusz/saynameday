import Country from "./Country";

export default class EmptyCountry extends Country {
    constructor() {
        super("undefined", "undefined");
    }

    isNull() {
        return true;
    }
}