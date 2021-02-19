import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import propertiesReader from "properties-reader";
import router = require('./routing');

const app = express();

fs.readFile(path.join(__dirname, "./../env.json"), "utf8", (err, data) => {
    const envs = JSON.parse(data);
    app.use("/styling", express.static(path.join(__dirname, envs.styles)))
    app.use("/scripting", express.static(path.join(__dirname, envs.scripts)));
    app.set('views', path.join(__dirname, envs.views));
});

app.use(router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'pug');

const port = 3000;
app.listen(port, () => console.log(`SayNameDay🎁 App is up and ready, listnening on port: ${port}`));