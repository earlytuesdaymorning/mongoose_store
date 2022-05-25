//require dependencies
const express = require("express");
const res = require("express/lib/response");
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
app.use(express.static("public"));

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

//Delete
app.delete("/store/:id", (req, res) => {
    Store.findByIdAndDelete(req.params.id, (error, deletedItem) => {
        res.send({success: true});
    });
});

//Update
app.put("/store/:id", (req, res) => {
    Store.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedItem) => {
            res.send(updatedItem);
        }
    );
});

//Create
app.post("/store", (req, res) => {
    Store.create(req.body, (error, createdItem) => {
        res.redirect("/store")
    });
});

//E

//Show
app.get('/store/:id', (req, res) => {
    Store.findById(req.params.id, (err, foundItem) => {
        res.render("show.ejs", {
            item: foundItem,
        });
    });
});

//App is listening
app.listen(port, () => {
    console.log("listening on port", port);
});