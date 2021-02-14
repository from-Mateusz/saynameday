import express from "express";
import bodyParser from "body-parser";
import router = require('./routing');

const app = express();

app.use(router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'pug');

const port = 3000;
app.get('/', (req, res) => {
    res.send("Welcome to saynameday app!")
});

app.listen(port, () => console.log(`SayNameDay🎁 App is up and ready, listnening on port: ${port}`));