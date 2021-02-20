"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const jquery_1 = __importDefault(require("jquery"));
const logger_1 = __importDefault(require("./logger"));
class Client {
    getNamedaysByCountryCode(code, cb, loaderOptions) {
        if (loaderOptions && loaderOptions.on()) { }
        jquery_1.default.ajax({
            url: `namedays/${code}`,
            method: "get"
        })
            .done((namedays) => {
            cb(namedays);
            if (loaderOptions && loaderOptions.off()) { }
        })
            .fail(() => {
            console.log('Something went wrong ');
        });
    }
}
exports.Client = Client;
Client.LOGGER = logger_1.default.getInstance("ClientApi");
