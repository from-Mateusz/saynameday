class Logger {
    constructor(name) {
        this.name = name;
    }

    static getInstance(name) {
        return new Logger(name);
    }

    info(msg, ...msgs) {
        console.log(this._createMsgPrefix(), msg, msgs);
    }

    error(msg, ...msgs) {
        console.error(this._createMsgPrefix(), msg, msgs);
    }

    _createMsgPrefix() {
        return `Logger ${this.name} speaks at [${new Date()}] about: `;
    }
}