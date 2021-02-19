export default class Logger {
    constructor(private name: string) {}
    
    info(message:string, ...values:any) {
        console.log(this.createMessagePrefix(), message, values);
    }

    error(message:string, value:any) {
        console.error(this.createMessagePrefix(), message, value);
    }

    private createMessagePrefix() {
        const now = new Date();
        const msgPrefix = `Logger [${this.name}] speaks at [${now}] about: `;
        return msgPrefix;
    }
}