//require dependencies
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const mongoose = require("mongoose");
const Store = require("./models/store.js")
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

// //seed
// const storeSeed = require("./models/storeSeed.js");
// app.get("store/seed", (req, res) => {
//     Store.deleteMany({}, (error, allItems) => {});
//     Store.create(storeSeed, (error, data) => {
//         res.redirect("/store");
//     });
// });

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
            tabTitle: "Mongoose Store"
        });
    });
});

//New
app.get("/store/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "Seller Form"
    });
});

//Delete
app.delete("/store/:id", (req, res) => {
    Store.findByIdAndDelete(req.params.id, (error, deletedItem) => {
        res.redirect("/store")
    });
});

//Update
app.put("/store/:id", (req, res) => {
    Store.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedItem) => {
            res.redirect(`/store/${req.params.id}`)
        }
    );
});

//trying to route as put req but browser says cannot 
// app.put("/store/:id/buy", (req, res) => {
//     Store.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true },
//         (error, updatedItem) => {
//             item.qty -= 1;
//             item.save();
//             res.redirect("/store/:id");
//         }
//     )
// });
//need an app.put and buy route. buy should change and store not just update html

//Create
app.post("/store", (req, res) => {
    Store.create(req.body, (error, createdItem) => {
        res.redirect("/store")
    });
});

//Edit
app.get("/store/:id/edit", (req, res) => {
    Store.findById(req.params.id, (error, foundItem) => {
        res.render("edit.ejs", {
            item: foundItem,
            tabTitle: "Edit Item"
        });
    });
});

// app.get("/store/:id/buy", (req, res) => {
//     Store.findByIdAndUpdate(req.params.id, (error, foundItem) => {
//         item: foundItem,
//         req.body,
//         { new: true },
//         (error, updatedItem) => {
//             item.qty -= 1;
//             item.save();
//         },
//         res.redirect("/store/:id")
//     });
// });

//Show
app.get("/store/:id", (req, res) => {
    Store.findById(req.params.id, (err, foundItem) => {
        res.render("show.ejs", {
            item: foundItem,
            tabTitle: "Item Details"
        });
    });
});

app.get("/founder", (req, res) => {
    res.render("founder.ejs", {
        tabTitle: "Our Founder",
    });
});

//App is listening
app.listen(port, () => {
    console.log("listening on port", port);
});