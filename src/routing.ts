import express from "express";
import Country from "./domain/Country";
import Repository from "./repository/Repository";
import NameDayApi from "./api/NameDayApi";
import Logger from "./logger";
import { RSA_NO_PADDING } from "constants";

const router = express.Router();
const repository = Repository.getInstance();
const logger = new Logger("Routing");

router.get('/', (req, res) => {
    res.send("Welcome to SayNameDay app");
});

router.get('/countries', (req, res) => {
   repository.findAllCountries(countries => {
       res.send(countries);
   })
});

router.get('/namedays', (req, res) => {
    const api = NameDayApi.getInstance();
    api.fetchNameDays((namedays) => {
        res.send(namedays);
    });
})

router.get('/namedays/:country', (req, res) => {
    const api = NameDayApi.getInstance();
    api.fetchNameDaysByCountryCode(req.params.country, (namedays) => {
        res.send(namedays)
    })
})

router.get('/meaning/:name', (req, res) => {
    const {name} = req.params;
    repository.findNameMeaningByName(name, meaning => {
        res.send(meaning);
    })
})

export = router;