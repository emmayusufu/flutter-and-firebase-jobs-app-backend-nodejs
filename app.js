require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const Helpers = require("./utilities/helpers");

const app = express();

app.use(cors());
app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, 'public')));
require('./routes/index')(app)


app.use((req, res) => {
    res.status(404).send("route not found")
})

app.use((err, req, res) => {
    Helpers.logger.error(err.stack)
    res.status(500).json({error: err.message})
})

module.exports = app
