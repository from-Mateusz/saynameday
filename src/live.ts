import express from "express";
import bodyParser from "body-parser";
import path from "path";
import router = require('./routing');

const app = express();

app.use(router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/styles", express.static(path.join(__dirname, "views/styles")))
app.use("/scripts", express.static(path.join(__dirname, "views/scripts")));

console.log(path.join(__dirname, "/views/styles"));

app.set('views', 'src/views');
app.set('view engine', 'pug');

const port = 3000;
app.listen(port, () => console.log(`SayNameDay🎁 App is up and ready, listnening on port: ${port}`));