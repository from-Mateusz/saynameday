import Name from "./NameMeaning";

export default class EmptyNameMeaning extends Name {
    constructor() {
        super("undefined", "undefined");
    }

    isNull() {
        return true;
    }
}