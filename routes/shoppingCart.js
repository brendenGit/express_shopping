const express = require("express");
const items = require('../fakeDb');
const ExpressError = require("../middleware/expressError");
const router = new express.Router();


router.get("/items", (req, res, next) => {
    return res.status(200).json(items);
})


router.get("/items/:name", (req, res, next) => {
    const name = req.params.name;
    try {
        const item = items.find(item => item.name === name)
        if (!item) throw new ExpressError('Item not found.', 404);
        return res.status(200).json(item);
    } catch (err) {
        next(err);
    };
});


router.post("/items", (req, res, next) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        if(!name || !price || typeof name !== 'string' || typeof price !== 'number') throw new ExpressError('Inavlid item', 400);

        const item = { name, price };
        items.push(item);
        res.status(201).json({"added": item});
    } catch (err) {
        next(err);
    };
});


router.patch("/items/:name", (req, res, next) => {
    try {
        const name = req.params.name;
        const newName = req.body.name;
        const newPrice = req.body.price;

        const item = items.find(item => item.name === name)
        if(!item || typeof newName !== 'string' || typeof newPrice !== 'number') throw new ExpressError('Invalid update', 400);

        item.name = newName;
        item.price = newPrice;

        res.status(201).json({"updated": item});
    } catch (err) {
        next(err);
    };
});


router.delete("/items/:name", (req, res, next) => {
    try {
        const name = req.params.name;

        const item = items.find(item => item.name === name)
        if(!item) throw new ExpressError('Cannot find item', 400);

        res.status(201).json({"message": "deleted"});
    } catch (err) {
        next(err);
    };

});

module.exports = router;