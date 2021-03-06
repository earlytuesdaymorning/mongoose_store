//require dependencies
const express = require("express");
const Store = require("../models/store");

//initialize router
const router = express.Router();

//mount routes
//Index 
router.get("/", (req, res) => {
    //sending text "hello world"
    res.send("Hello World");
});

router.get("/store", (req, res) => {
    Store.find({}, (error, allItems) => {
        res.render("index.ejs", {
            items: allItems,
            tabTitle: "Mongoose Store"
        });
    });
});

//New
router.get("/store/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "Seller Form"
    });
});

//Delete
router.delete("/store/:id", (req, res) => {
    Store.findByIdAndDelete(req.params.id, (error, deletedItem) => {
        res.redirect("/store")
    });
});

//Update
router.put("/store/:id", (req, res) => {
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
// router.put("/store/:id/buy", (req, res) => {
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
//need an router.put and buy route. buy should change and store not just update html

//Create
router.post("/store", (req, res) => {
    Store.create(req.body, (error, createdItem) => {
        res.redirect("/store")
    });
});

//Edit
router.get("/store/:id/edit", (req, res) => {
    Store.findById(req.params.id, (error, foundItem) => {
        res.render("edit.ejs", {
            item: foundItem,
            tabTitle: "Edit Item"
        });
    });
});

// router.get("/store/:id/buy", (req, res) => {
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
router.get("/store/:id", (req, res) => {
    Store.findById(req.params.id, (err, foundItem) => {
        res.render("show.ejs", {
            item: foundItem,
            tabTitle: "Item Details"
        });
    });
});

router.get("/founder", (req, res) => {
    res.render("founder.ejs", {
        tabTitle: "Our Founder",
    });
});

//export
module.exports = router;