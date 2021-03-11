const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

const apiEndPoint = "/";
const apiEndPointWithId = `/:id`;

//get generes
router.get(apiEndPoint, async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

//get generes
router.get(apiEndPointWithId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(400).send("No record found with the given Id.");
        return;
    }
    res.send(genre);
});

//post new genre
router.post(apiEndPoint, auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = new Genre({
        name: req.body.name,
    });

    const result = await genre.save();
    res.send(result);
});

//update existing genre
router.put(apiEndPointWithId, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    );
    if (!genre) {
        res.status(400).send("No record found with the given Id.");
        return;
    }
    res.send(genre);
});

//delete existing genre
router.delete(apiEndPointWithId, [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
        res.status(400).send("No record found with the given Id.");
        return;
    }
    res.send(genre);
});

module.exports = router;
