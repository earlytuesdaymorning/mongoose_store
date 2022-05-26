//require dependencies
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const mongoose = require("mongoose");
const itemsController = require("./controllers/items");
// const morgan = require("morgan");

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
// app.use(morgan('dev'));
app.use(itemsController);

// //seed
// const storeSeed = require("./models/storeSeed.js");
// app.get("store/seed", (req, res) => {
//     Store.deleteMany({}, (error, allItems) => {});
//     Store.create(storeSeed, (error, data) => {
//         res.redirect("/store");
//     });
// });

//App is listening
app.listen(port, () => {
    console.log("listening on port", port);
});