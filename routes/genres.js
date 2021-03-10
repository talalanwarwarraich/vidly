const auth = require("../middleware/auth");
const express = require("express");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

const apiEndPoint = "/";
const apiEndPointWithId = `/:id`;

//get generes
router.get(apiEndPoint, async (req, res) => {
    try {
        const genres = await Genre.find();
        res.send(genres);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get generes
router.get(apiEndPointWithId, async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            res.status(400).send("No record found with the given Id.");
            return;
        }
        res.send(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//post new genre
router.post(apiEndPoint, auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = new Genre({
        name: req.body.name,
    });

    try {
        const result = await genre.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//update existing genre
router.put(apiEndPointWithId, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
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
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//delete existing genre
router.delete(apiEndPointWithId, async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) {
            res.status(400).send("No record found with the given Id.");
            return;
        }
        res.send(genre);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
