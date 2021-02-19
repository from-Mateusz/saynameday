"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Repository_1 = __importDefault(require("../repository/Repository"));
const NameDayApi_1 = __importDefault(require("../service/NameDayApi"));
const logger_1 = __importDefault(require("./logger"));
const router = express_1.default.Router();
const repository = Repository_1.default.getInstance();
const logger = new logger_1.default("Routing");
router.get('/', (req, res) => {
    repository.findAllCountries(countries => {
        res.render('home', { countries: countries });
    });
});
router.get('/countries', (req, res) => {
    repository.findAllCountries(countries => {
        res.send(countries);
    });
});
router.get('/namedays', (req, res) => {
    const api = NameDayApi_1.default.getInstance();
    api.fetchNameDays((namedays) => {
        res.send(namedays);
    });
});
router.get('/namedays/:country', (req, res) => {
    const api = NameDayApi_1.default.getInstance();
    api.fetchNameDaysByCountryCode(req.params.country, (namedays) => {
        res.send(namedays);
    });
});
router.get('/meaning/:name', (req, res) => {
    const { name } = req.params;
    repository.findNameMeaningByName(name, meaning => {
        res.send(meaning);
    });
});
module.exports = router;
