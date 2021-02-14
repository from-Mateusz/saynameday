import Nullable from './Nullable';

export default class Country implements Nullable {
    constructor(private name: string, private code: string) {}

    get Name() {
        return this.name;
    }

    get Code() {
        return this.code;
    }

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