"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const router = require("./routing");
const app = express_1.default();
fs_1.default.readFile(path_1.default.join(__dirname, "./../env.json"), "utf8", (err, data) => {
    const envs = JSON.parse(data);
    app.use("/styling", express_1.default.static(path_1.default.join(__dirname, envs.styles)));
    app.use("/scripting", express_1.default.static(path_1.default.join(__dirname, envs.scripts)));
    app.set('views', path_1.default.join(__dirname, envs.views));
});
app.use(router);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('view engine', 'pug');
const port = 3000;
app.listen(port, () => console.log(`SayNameDay🎁 App is up and ready, listnening on port: ${port}`));
