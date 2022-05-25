//require dependencies
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const mongoose = require("mongoose");
const Store = require("./models/store.js")

//database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + "mongo is not running"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"))

//initialize express
const app = express();

//configure app settings
const port = 3000;

//mount middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//mount routes
//Index 
app.get("/", (req, res) => {
    //sending text "hello world"
    res.send("Hello World");
});

app.get("/store", (req, res) => {
    Store.find({}, (error, allItems) => {
        res.render("index.ejs", {
            items: allItems,
        });
    });
});

//New
app.get("/store/new", (req, res) => {
    res.render("new.ejs");
});

//D

//U

//C

//E

//Show


//App is listening
app.listen(port, () => {
    console.log("listening on port", port);
});