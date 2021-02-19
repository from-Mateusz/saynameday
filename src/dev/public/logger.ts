export default class Logger {

    constructor(private name: string) {}

    static getInstance(name: string): Logger {
        return new Logger(name);
    }

    info(msg: string, ...msgs: any[]) {
        console.log(this.createMessagePrefix(), msg, msgs);
    }

    error(msg: string, ...erroneusValues: any[]) {
        console.error(this.createMessagePrefix(), msg, erroneusValues);
    }

    private createMessagePrefix(): string {
        return `Logger ${this.name} speaks at [${new Date()}] about: `;
    }
}