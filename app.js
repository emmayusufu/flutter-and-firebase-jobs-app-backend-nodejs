require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const app = express();

const userRoutes = require("./routes/user");
const hiringRoutes = require("./routes/hiring");

app.use(cors());
app.use(logger(`dev`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/api',userRoutes);
app.use('/api',hiringRoutes);

app.use((req, res, next)=>{
    res.status(404).send("route not found")
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).json({error:err.message})
})

module.exports = app
