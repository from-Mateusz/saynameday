import Nullable from './Nullable';

export default class Country implements Nullable {
    constructor(private name: string, private code: string) {}

    getName() {
       return this.name; 
    }

    getCode() {
        return this.code;
    }

    isNull() {
        return false;
    }
}