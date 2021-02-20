import NameMeaning from "./NameMeaning";
import Name from "./NameMeaning";

export default class EmptyNameMeaning extends NameMeaning {
    constructor() {
        super("undefined", "undefined");
    }

    isNull() {
        return true;
    }
}