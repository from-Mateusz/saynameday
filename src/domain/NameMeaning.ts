import Nullable from "./Nullable";

export default class NameMeaning implements Nullable {
    constructor(private name: string, private meaning: string) {}

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